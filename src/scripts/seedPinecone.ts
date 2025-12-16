import { prisma } from "../lib/db/prisma";
import { embedText, upsertVectors } from "../lib/embeddings";

async function main() {
  try {
    const allProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        tags: { include: { tag: true } },
        variants: { select: { size: true, color: true } },
      },
    });

    if (allProducts.length === 0) {
      console.log("⚠️  No products found. Please run seed:products first!");
      return;
    }

    const batchSize = 10;

    for (let i = 0; i < allProducts.length; i += batchSize) {
      const batch = allProducts.slice(i, i + batchSize);
      const texts = batch.map(
        (product) => `${product.name}: ${product.description}`
      );

      const embeddings = await Promise.all(
        texts.map((text) => embedText(text))
      );

      const upsertPayload = batch.map((p, idx) => {
        const tagNames = p.tags.map((pt) => pt.tag.name);
        return {
          id: p.id,
          values: embeddings[idx],
          metadata: {
            slug: p.slug,
            name: p.name,
            price: p.price,
            categoryId: p.categoryId,
            tags: tagNames,
          },
        };
      });

      await upsertVectors(upsertPayload);

      console.log(
        `Upserted batch ${i}-${i + batchSize} (${upsertPayload.length})`
      );
    }
  } catch (e) {
    console.error("❌ Error seeding Pinecone:", e);
    throw e;
  }
}

main()
  .catch((e) => {
    console.error("\n❌ Fatal error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
