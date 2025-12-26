import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductBreadcrumb from "./_components/ProductBreadcrumb";
import ProductImageGallery from "./_components/ProductImageGallery";
import ProductInfo from "./_components/ProductInfo";
import ProductTabs from "../_components/ProductTabs";

import { getProductById } from "@/actions/ProductActions";
import { ProductDetailData } from "@/types/product";


// Server Component - Fetches data
export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  try {
    const {productId} = await params
    const productData: ProductDetailData | null = await getProductById(productId);

    if (!productData) {
      notFound();
    }

    const allImages = [productData.mainImage, ...productData.images];

    // Calculate final price with discount
    const finalPrice = productData.discountAmount 
      ? productData.price - productData.discountAmount 
      : productData.price;

    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto md:max-w-7xl px-4 py-8">
          {/* Breadcrumb */}
          <ProductBreadcrumb
            categoryName={productData.category.name}
            categorySlug={productData.category.slug}
            productName={productData.name}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image Gallery */}
            <ProductImageGallery
              images={allImages}
              productName={productData.name}
              isFeatured={productData.isFeatured}
              comparePrice={productData.price}
              price={finalPrice}
            />

            {/* Product Info */}
            <ProductInfo product={productData} />
          </div>

          {/* Tabs Section */}
          <ProductTabs product={productData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    throw error; // Will be caught by error.tsx
  }
}