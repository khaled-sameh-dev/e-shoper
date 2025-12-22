// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductBreadcrumb from "../_components/ProductBreadcrumb";
import ProductImageGallery from "../_components/ProductImageGallery";
import ProductInfo from "../_components/ProductInfo";
import ProductTabs from "../_components/ProductTabs";

import { getProductById } from "@/actions/ProductActions";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const productData = await getProductById(params.id);

    if (!productData) {
      return { title: "Product Not Found" };
    }

    return {
      title: productData.name,
      description: productData.description,
      openGraph: {
        title: productData.name,
        description: productData.description,
        images: [productData.mainImage],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: productData.name,
        description: productData.description,
        images: [productData.mainImage],
      },
    };
  } catch (error) {
    return { title: "Product" };
  }
}

// Server Component - Fetches data
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    // Fetch product using server action
    const productData = await getProductById(params.id);

    // Product not found
    if (!productData) {
      notFound();
    }

    const allImages = [productData.mainImage, ...productData.images];

    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb - Server Component */}
          <ProductBreadcrumb
            categoryName={productData.category.name}
            categorySlug={productData.category.slug}
            productName={productData.name}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image Gallery - Client Component (for interactivity) */}
            <ProductImageGallery
              images={allImages}
              productName={productData.name}
              isFeatured={productData.isFeatured}
              comparePrice={productData.price}
              price={productData.price}
            />

            {/* Product Info - Client Component (for interactivity) */}
            <ProductInfo product={productData} />
          </div>

          {/* Tabs Section - Client Component (for tab switching) */}
          <ProductTabs product={productData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    throw error; // Will be caught by error.tsx
  }
}
