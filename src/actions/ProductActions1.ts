// "use server";
// import { prisma } from "@/lib/prisma";
// import { Category, Tag } from "@/types";

// interface ProductsParamsProps {
//   page?: number;
//   limit?: number;
// }

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// export const getAllProducts = async (params?: ProductsParamsProps) => {
//   const page = params?.page || 1;
//   const limit = params?.limit || 12;
//   const skip = (page - 1) * limit;

//   console.log("once");

//   try {
//     const where = { isActive: true };

//     const [products, total] = await Promise.all([
//       prisma.product.findMany({
//         where,
//         include: {
//           category: true,
//           variants: true,
//           tags: {
//             include: {
//               tag: true,
//             },
//           },
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         skip,
//         take: limit,
//       }),
//       prisma.product.count({ where }),
//     ]);

//     if (!products.length && page === 1) {
//       return { data: [], total: 0, totalPages: 0 };
//     }

//     return {
//       data: products,
//       total,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//     };
//   } catch (error) {
//     console.error("Error retrieving products:", error);
//     throw new Error(
//       `Error while retrieving products: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`
//     );
//   }
// };

// export interface QueryParamsProps {
//   query?: string;
//   filters?: {
//     categories?: Category[];
//     price?: number[];
//     tags?: Tag[];
//     colors?: string[];
//   };
//   topK?: number;
//   pageNum?: number;
// }

// export const getProducts = async ({
//   topK = 12,
//   query,
//   filters,
//   pageNum = 1,
// }: QueryParamsProps) => {
//   // If no query and no filters, use regular pagination
//   const hasQuery = query && query.trim().length > 0;
//   const hasFilters =
//     filters &&
//     (filters.categories?.length ||
//       filters.tags?.length ||
//       filters.colors?.length ||
//       filters.price);

//   if (!hasQuery && !hasFilters) {
//     console.log("Fetching all products with pagination, page:", pageNum);
//     return await getAllProducts({ page: pageNum, limit: topK });
//   }

//   try {
//     const res = await fetch(`${baseUrl}/api/search`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         filters,
//         query,
//         page: pageNum,
//         limit: topK,
//       }),
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Search API responded with status: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Error in vector search:", error);
//     throw new Error(
//       `Search failed: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`
//     );
//   }
// };

// export const getCategories = async (): Promise<Category[]> => {
//   try {
//     const categories = await prisma.category.findMany({
//       orderBy: {
//         name: "asc",
//       },
//       select: {
//         id: true,
//         name: true,
//         slug: true,
//         description: true,
//         image: true,
//         parentId: true,
//       },
//     });

//     return categories as Category[];
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// };

// export const getTags = async (): Promise<Tag[]> => {
//   try {
//     const tags = await prisma.tag.findMany({
//       orderBy: {
//         name: "asc",
//       },
//       select: {
//         id: true,
//         name: true,
//         slug: true,
//       },
//     });

//     return tags as Tag[];
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     return [];
//   }
// };

// "use server";
// import { prisma } from "@/lib/prisma";
// import { Category, Tag, convertProduct, convertProductVariant } from "@/types";

// interface ProductsParamsProps {
//   page?: number;
//   limit?: number;
// }

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// export const getAllProducts = async (params?: ProductsParamsProps) => {
//   const page = params?.page || 1;
//   const limit = params?.limit || 12;
//   const skip = (page - 1) * limit;

//   console.log("once");

//   try {
//     const where = { isActive: true };

//     const [products, total] = await Promise.all([
//       prisma.product.findMany({
//         where,
//         include: {
//           category: true,
//           variants: true,
//           tags: {
//             include: {
//               tag: true,
//             },
//           },
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         skip,
//         take: limit,
//       }),
//       prisma.product.count({ where }),
//     ]);

//     if (!products.length && page === 1) {
//       return { data: [], total: 0, totalPages: 0 };
//     }

//     console.log("roducts" ,products)

//     return {
//       data: products,
//       total,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//     };
//   } catch (error) {
//     console.error("Error retrieving products:", error);
//     throw new Error(
//       `Error while retrieving products: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`
//     );
//   }
// };

// export interface QueryParamsProps {
//   query?: string;
//   filters?: {
//     categories?: Category[];
//     price?: number[];
//     tags?: Tag[];
//     colors?: string[];
//   };
//   topK?: number;
//   pageNum?: number;
// }

// export const getProducts = async ({
//   topK = 12,
//   query,
//   filters,
//   pageNum = 1,
// }: QueryParamsProps) => {
//   // If no query and no filters, use regular pagination
//   const hasQuery = query && query.trim().length > 0;
//   const hasFilters =
//     filters &&
//     (filters.categories?.length ||
//       filters.tags?.length ||
//       filters.colors?.length ||
//       filters.price);

//   if (!hasQuery && !hasFilters) {
//     console.log("Fetching all products with pagination, page:", pageNum);
//     return await getAllProducts({ page: pageNum, limit: topK });
//   }

//   try {
//     const res = await fetch(`${baseUrl}/api/search`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         filters,
//         query,
//         page: pageNum,
//         limit: topK,
//       }),
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Search API responded with status: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Error in vector search:", error);
//     throw new Error(
//       `Search failed: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`
//     );
//   }
// };

// // Get single product by ID
// export const getProductById = async (id: string) => {
//   try {
//     const product = await prisma.product.findUnique({
//       where: {
//         id: id,
//         isActive: true,
//       },
//       include: {
//         category: true,
//         variants: {
//           orderBy: {
//             createdAt: "asc",
//           },
//         },
//         tags: {
//           include: {
//             tag: true,
//           },
//         },
//         reviews: {
//           take: 10,
//           orderBy: {
//             createdAt: "desc",
//           },
//           include: {
//             user: {
//               select: {
//                 name: true,
//                 image: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     // Product not found
//     if (!product) {
//       return null;
//     }

//     // Convert product (Decimal to number)
//     const convertedProduct = convertProduct(product);
//     const convertedVariants = product.variants.map(convertProductVariant);

//     // Extract unique sizes from variants
//     const sizes = Array.from(
//       new Set(
//         convertedVariants
//           .map((v) => v.size)
//           .filter((size): size is string => size !== null)
//       )
//     );

//     // Extract unique colors from variants
//     const colors = Array.from(
//       new Set(
//         convertedVariants
//           .map((v) => v.color)
//           .filter((color): color is string => color !== null)
//       )
//     );

//     // Extract tag names
//     const tags = product.tags.map((pt) => pt.tag.name);

//     // Calculate average rating from reviews
//     const rating =
//       product.reviews.length > 0
//         ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
//           product.reviews.length
//         : 0;

//     // Format reviews
//     const reviews = product.reviews.map((review) => ({
//       id: review.id,
//       author: review.user.name || "Anonymous",
//       authorImage: review.user.image,
//       rating: review.rating,
//       title: review.title,
//       comment: review.comment,
//       images: review.images,
//       isVerified: review.isVerified,
//       date: new Date(review.createdAt).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//     }));

//     // Calculate total stock
//     const totalStock =
//       convertedVariants.length > 0
//         ? convertedVariants.reduce(
//             (acc, variant) => acc + (variant.stock || 0),
//             0
//           )
//         : product.stock;

//     // Build product data
//     return {
//       ...convertedProduct,
//       category: product.category,
//       variants: convertedVariants,
//       tags,
//       colors,
//       sizes,
//       stock: totalStock,
//       rating: Math.round(rating * 10) / 10,
//       reviewCount: product.reviews.length,
//       reviews,
//     };
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     throw new Error(
//       `Error fetching product: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`
//     );
//   }
// };

// export const getCategories = async (): Promise<Category[]> => {
//   try {
//     const categories = await prisma.category.findMany({
//       orderBy: {
//         name: "asc",
//       },
//       select: {
//         id: true,
//         name: true,
//         slug: true,
//         description: true,
//         image: true,
//         parentId: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     return categories as Category[];
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// };

// export const getTags = async (): Promise<Tag[]> => {
//   try {
//     const tags = await prisma.tag.findMany({
//       orderBy: {
//         name: "asc",
//       },
//       select: {
//         id: true,
//         name: true,
//         slug: true,
//         createdAt: true,
//       },
//     });

//     return tags as Tag[];
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     return [];
//   }
// };
