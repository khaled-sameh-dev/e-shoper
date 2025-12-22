import { Product } from "@/types";

// Sorting function
export const sortProducts = (products: Product[], sortType: string) => {
  const sorted = [...products];

  switch (sortType) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "price-low":
      return sorted.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-high":
      return sorted.sort((a, b) => Number(b.price) - Number(a.price));
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      // Featured products first, then by relevance if available
      return sorted.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        // If both featured or both not, sort by relevance score if available
        const aScore = (a as any).relevanceScore || 0;
        const bScore = (b as any).relevanceScore || 0;
        return bScore - aScore;
      });
  }
};
