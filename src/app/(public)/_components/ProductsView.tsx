"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useEffect } from "react";

interface ProductsViewProps {
  products: Product[];
}
const ProductsView = ({ products }: ProductsViewProps) => {
  useEffect(() => {
    console.log("products", products);
  }, [products]);
  if (!products) return;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {products.map((p) => (
        <ProductCard item={p} />
      ))}
    </div>
  );
};

export default ProductsView;
