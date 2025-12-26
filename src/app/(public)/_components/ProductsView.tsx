import { Product } from "@/types";
import ProductCard from "../products/_components/ProductCard";
import CarouselContainer from "@/components/CarouselContainer";

interface ProductsViewProps {
  products: Product[];
}
const ProductsSlider = ({ products }: ProductsViewProps) => {
  if (!products) return;
  return (
    <CarouselContainer>
      {products.map((p) => (
        <ProductCard item={p} key={p.id} />
      ))}
    </CarouselContainer>
  );
};

export default ProductsSlider;
