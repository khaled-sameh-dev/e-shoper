// types/product.ts
import { Product, Category, ProductVariant } from "@/types";

// Review type returned by getProductById
export interface ProductReview {
  id: string;
  author: string;
  authorImage: string | null;
  rating: number;
  title: string | null;
  comment: string;
  images: string[];
  isVerified: boolean;
  date: string;
}

// Product type returned by getProductById action
export interface ProductDetailData extends Omit<Product, "categoryId"> {
  category: Category;
  variants: ProductVariant[];
  tags: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

// Type guard to check if product has required data
export function isProductDetailData(
  product: any
): product is ProductDetailData {
  return (
    product &&
    typeof product === "object" &&
    "category" in product &&
    "variants" in product &&
    "tags" in product &&
    "reviews" in product
  );
}
