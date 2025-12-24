// import { notFound } from "next/navigation";
// import { Metadata } from "next";
// import ProductBreadcrumb from "../_components/ProductBreadcrumb";
// import ProductImageGallery from "../_components/ProductImageGallery";
// import ProductInfo from "../_components/ProductInfo";
// import ProductTabs from "../_components/ProductTabs";

// import { getProductById } from "@/actions/ProductActions";

// // Generate metadata for SEO
// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   try {
//     const productData = await getProductById(params.id);

//     if (!productData) {
//       return { title: "Product Not Found" };
//     }

//     // Calculate final price with discount
//     const finalPrice = productData.discountAmount
//       ? productData.price - productData.discountAmount
//       : productData.price;

//     return {
//       title: `${productData.name} | Your Store Name`,
//       description: productData.description.substring(0, 160),
//       openGraph: {
//         title: productData.name,
//         description: productData.description,
//         images: [
//           {
//             url: productData.mainImage,
//             width: 1200,
//             height: 630,
//             alt: productData.name,
//           },
//         ],
//         type: "website",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: productData.name,
//         description: productData.description,
//         images: [productData.mainImage],
//       },
//       // Additional SEO metadata
//       alternates: {
//         canonical: `/products/${productData.slug}`,
//       },
//       other: {
//         "product:price:amount": finalPrice.toString(),
//         "product:price:currency": "USD",
//         "product:availability": productData.isActive
//           ? "in stock"
//           : "out of stock",
//         "product:category": productData.category.name,
//       },
//     };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return { title: "Product" };
//   }
// }

// // Server Component - Fetches data
// const ProductPage = async ({ params }: { params: { id: string } }) => {
//   try {
//     const productData = await getProductById(params.id);

//     if (!productData) {
//       notFound();
//     }

//     // Combine main image with additional images
//     const allImages = [productData.mainImage, ...productData.images];

//     // Calculate final price with discount
//     const finalPrice = productData.discountAmount
//       ? productData.price - productData.discountAmount
//       : productData.price;

//     return (
//       <div className="min-h-screen bg-white">
//         <div className="container mx-auto px-4 py-8">
//           {/* Breadcrumb - Server Component */}
//           <ProductBreadcrumb
//             categoryName={productData.category.name}
//             categorySlug={productData.category.slug}
//             productName={productData.name}
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
//             {/* Image Gallery - Client Component (for interactivity) */}
//             <ProductImageGallery
//               images={allImages}
//               productName={productData.name}
//               isFeatured={productData.isFeatured}
//               comparePrice={productData.price}
//               price={finalPrice}
//             />

//             {/* Product Info - Client Component (for interactivity) */}
//             <ProductInfo product={productData} />
//           </div>

//           {/* Tabs Section - Client Component (for tab switching) */}
//           <ProductTabs product={productData} />
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error loading product:", error);
//     throw error; // Will be caught by error.tsx
//   }
// };

// export default ProductPage;


// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductBreadcrumb from "../_components/ProductBreadcrumb";
import ProductImageGallery from "../_components/ProductImageGallery";
import ProductInfo from "../_components/ProductInfo";
import ProductTabs from "../_components/ProductTabs";

import { getProductById } from "@/actions/ProductActions";
import { ProductDetailData } from "@/types/product";

// Generate metadata for SEO
// export async function generateMetadata({
//   params,
// }: {
//   params: {productId: string };
// }): Promise<Metadata> {
//   try {
//     const {productId} = await params;
//     const productData = await getProductById(productId);

//     if (!productData) {
//       return { title: "Product Not Found" };
//     }

//     // Calculate final price with discount
//     const finalPrice = productData.discountAmount 
//       ? productData.price - productData.discountAmount 
//       : productData.price;

//     return {
//       title: `${productData.name} | Your Store`,
//       description: productData.description.substring(0, 160),
//       openGraph: {
//         title: productData.name,
//         description: productData.description,
//         images: [
//           {
//             url: productData.mainImage,
//             width: 1200,
//             height: 630,
//             alt: productData.name,
//           }
//         ],
//         type: "website",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: productData.name,
//         description: productData.description,
//         images: [productData.mainImage],
//       },
//       alternates: {
//         canonical: `/products/${productData.slug}`,
//       },
//       other: {
//         'product:price:amount': finalPrice.toString(),
//         'product:price:currency': 'USD',
//         'product:availability': productData.stock > 0 ? 'in stock' : 'out of stock',
//         'product:category': productData.category.name,
//       }
//     };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return { title: "Product" };
//   }
// }

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

    // Combine main image with additional images
    const allImages = [productData.mainImage, ...productData.images];

    // Calculate final price with discount
    const finalPrice = productData.discountAmount 
      ? productData.price - productData.discountAmount 
      : productData.price;

    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
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