import { Product } from "@/types";

export function buildProductText(product: any) {
  const category = product.category ? product.category.name : "";
  const tags = product.tags.map((t: any) => t.tag.name).join(", ");
  const variants = product.variants
    .map((v: any) => `${v.size} ${v.color}`)
    .join(", ");

  return `
    Product: ${product.name}
    Description: ${product.description}
    Category: ${category}
    Tags: ${tags}
    Variants: ${variants}
  `;
}
