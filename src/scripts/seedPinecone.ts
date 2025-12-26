// import { buildProductText } from "@/lib/search/buildProductText";
// import { prisma } from "../lib/db/prisma";
// import { deleteAllVectors, upsertVectors } from "@/lib/pinecone";
// import { embedText } from "@/lib/embeddings";
// import { getCategoryById } from "@/lib/db/product.model";

// async function main() {
//   try {
//     if (process.env.NODE_ENV === "production") {
//       throw new Error("Pinecone seeding is disabled in production");
//     }

//     await deleteAllVectors();

//     const allProducts = await prisma.product.findMany({
//       where: { isActive: true },
//       include: {
//         category: true,
//         tags: { include: { tag: true } },
//         variants: { select: { size: true, color: true } },
//       },
//     });

//     if (allProducts.length === 0) {
//       console.log("No products found. Please run seed:products first!");
//       return;
//     }

//     const batchSize = 10;

//     for (let i = 0; i < allProducts.length; i += batchSize) {
//       const batch = allProducts.slice(i, i + batchSize);

//       const texts = batch.map((product) => buildProductText(product));

//       const embeddings = await Promise.all(
//         texts.map((text) => embedText(text))
//       );

//       const upsertPayload = await Promise.all(
//         batch.map(async (p, idx) => {
//           const tagSlugs = p.tags.map((pt) => pt.tag.slug);

//           const category = await getCategoryById(p.categoryId);

//           const sizes = Array.from(
//             new Set(p.variants.map((v) => v.size).filter(Boolean))
//           );

//           const colors = Array.from(
//             new Set(p.variants.map((v) => v.color).filter(Boolean))
//           );

//           return {
//             id: p.id,
//             values: embeddings[idx],
//             metadata: {
//               slug: p.slug,
//               name: p.name,
//               price: p.price,

//               // filters
//               category: category?.slug,
//               tags: tagSlugs,
//               sizes,
//               colors,
//             },
//           };
//         })
//       );

//       await upsertVectors(upsertPayload);

//       console.log(
//         `Upserted batch ${i}-${i + batchSize} (${upsertPayload.length})`
//       );
//     }
//   } catch (e) {
//     console.error("Error seeding Pinecone:", e);
//     throw e;
//   }
// }

// main()
//   .catch((e) => {
//     console.error("\n❌ Fatal error:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


import { buildProductText } from "@/lib/search/buildProductText";
import { prisma } from "../lib/db/prisma";
import { deleteAllVectors, upsertVectors } from "@/lib/pinecone";
import { embedText } from "@/lib/embeddings";
import { getCategoryById } from "@/lib/db/product.model";

async function main() {
  try {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Pinecone seeding is disabled in production");
    }

    await deleteAllVectors();

    const allProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        tags: { include: { tag: true } },
        variants: { select: { size: true, color: true } },
      },
    });

    if (allProducts.length === 0) {
      console.log("No products found. Please run seed:products first!");
      return;
    }

    const batchSize = 10;

    for (let i = 0; i < allProducts.length; i += batchSize) {
      const batch = allProducts.slice(i, i + batchSize);

      const texts = batch.map((product) => buildProductText(product));

      const embeddings = await Promise.all(
        texts.map((text) => embedText(text))
      );

      const upsertPayload = await Promise.all(
        batch.map(async (p, idx) => {
          const tagNames = p.tags.map((pt) => pt.tag.slug);

          const categorySlug = await getCategoryById(p.categoryId).then(
            (data) => data?.slug
          );

          // استخراج الألوان الفريدة من الـ variants
          const colors = [
            ...new Set(
              p.variants
                .map((v) => v.color)
                .filter((color): color is string => color !== null)
            ),
          ];

          // استخراج الأحجام الفريدة من الـ variants
          const sizes = [
            ...new Set(
              p.variants
                .map((v) => v.size)
                .filter((size): size is string => size !== null)
            ),
          ];

          return {
            id: p.id,
            values: embeddings[idx],
            metadata: {
              slug: p.slug,
              name: p.name,
              price: p.price,
              categorySlug: categorySlug || "",
              colors: colors,
              sizes: sizes,
              tags: tagNames,
            },
          };
        })
      );

      await upsertVectors(upsertPayload);

      console.log(
        `Upserted batch ${i / batchSize + 1}/${Math.ceil(
          allProducts.length / batchSize
        )} (${upsertPayload.length} products)`
      );
    }

    console.log(`\n✅ Successfully seeded ${allProducts.length} products to Pinecone`);
  } catch (e) {
    console.error("Error seeding Pinecone:", e);
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