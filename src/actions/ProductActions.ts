"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  convertProduct,
  convertProductVariant,
  Product,
  ProductVariant,
} from "@/types";

// Add this interface for products with variants
interface ProductWithVariantsAndTags extends Product {
  variants: ProductVariant[];
  tags: string[];
  colors: string[];
  sizes: string[];
}

/**
 * Get products with pagination and filters
 */
// export async function getProducts(params?: {
//   page?: number;
//   limit?: number;
//   categorySlug?: string;
//   isFeatured?: boolean;
// }) {
//   const page = params?.page || 1;
//   const limit = params?.limit || 12;
//   const skip = (page - 1) * limit;

//   const where: any = { isActive: true };

//   if (params?.categorySlug) {
//     where.category = { slug: params.categorySlug };
//   }

//   if (params?.isFeatured !== undefined) {
//     where.isFeatured = params.isFeatured;
//   }

//   const [dbProducts, total] = await Promise.all([
//     prisma.product.findMany({
//       where,
//       include: {
//         category: true,
//         variants: true,
//         tags: {
//           include: {
//             tag: true,
//           },
//         },
//       },
//       skip,
//       take: limit,
//       orderBy: { createdAt: "desc" },
//     }),
//     prisma.product.count({ where }),
//   ]);

//   // Convert Prisma products with Decimal to frontend products with number
//   // and extract variants data
//   const products: ProductWithVariantsAndTags[] = dbProducts.map((product) => {
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

//     console.log("length" , products.length)
//     console.log("products" , products)

//     return {
//       ...convertedProduct,
//       variants: convertedVariants,
//       tags,
//       colors,
//       sizes,
//     };
//   });

//   return {
//     products,
//     total,
//     page,
//     totalPages: Math.ceil(total / limit),
//   };
// }

// actions/ProductActions.ts - Add this updated getProducts function
// This replaces your existing getProducts function

// export async function getProducts(params?: {
//   page?: number;
//   limit?: number;
//   categorySlug?: string;
//   categories?: string[];
//   tags?: string[];
//   sizes?: string[];
//   colors?: string[];
//   minPrice?: number;
//   maxPrice?: number;
//   sort?: string;
//   isFeatured?: boolean;
// }) {
//   const page = params?.page || 1;
//   const limit = params?.limit || 12;
//   const skip = (page - 1) * limit;

//   const where: any = { isActive: true };

//   // Category filter
//   if (params?.categorySlug) {
//     where.category = { slug: params.categorySlug };
//   }

//   // Multiple categories filter
//   if (params?.categories && params.categories.length > 0) {
//     where.categoryId = { in: params.categories };
//   }

//   // Tags filter
//   if (params?.tags && params.tags.length > 0) {
//     where.tags = {
//       some: {
//         tagId: { in: params.tags }
//       }
//     };
//   }

//   // Price range filter
//   if (params?.minPrice !== undefined || params?.maxPrice !== undefined) {
//     where.price = {};
//     if (params.minPrice !== undefined) {
//       where.price.gte = params.minPrice;
//     }
//     if (params.maxPrice !== undefined) {
//       where.price.lte = params.maxPrice;
//     }
//   }

//   // Sizes filter (check variants)
//   if (params?.sizes && params.sizes.length > 0) {
//     where.variants = {
//       some: {
//         size: { in: params.sizes }
//       }
//     };
//   }

//   // Colors filter (check variants)
//   if (params?.colors && params.colors.length > 0) {
//     where.variants = {
//       some: {
//         color: { in: params.colors }
//       }
//     };
//   }

//   // Featured filter
//   if (params?.isFeatured !== undefined) {
//     where.isFeatured = params.isFeatured;
//   }

//   // Determine sort order
//   let orderBy: any = { createdAt: "desc" }; // default
  
//   if (params?.sort) {
//     switch (params.sort) {
//       case "price-low":
//         orderBy = { price: "asc" };
//         break;
//       case "price-high":
//         orderBy = { price: "desc" };
//         break;
//       case "name":
//         orderBy = { name: "asc" };
//         break;
//       case "newest":
//         orderBy = { createdAt: "desc" };
//         break;
//       case "featured":
//         orderBy = [{ isFeatured: "desc" }, { createdAt: "desc" }];
//         break;
//     }
//   }

//   const [dbProducts, total] = await Promise.all([
//     prisma.product.findMany({
//       where,
//       include: {
//         category: true,
//         variants: true,
//         tags: {
//           include: {
//             tag: true,
//           },
//         },
//       },
//       skip,
//       take: limit,
//       orderBy,
//     }),
//     prisma.product.count({ where }),
//   ]);

//   // Convert Prisma products with Decimal to frontend products with number
//   const products: ProductWithVariantsAndTags[] = dbProducts.map((product) => {
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

//     return {
//       ...convertedProduct,
//       variants: convertedVariants,
//       tags,
//       colors,
//       sizes,
//     };
//   });

//   return {
//     products,
//     total,
//     page,
//     totalPages: Math.ceil(total / limit),
//   };
// }



/**
 * Get single product by slug
 */
export async function getProductBySlug(slug: string) {
  const dbProduct = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      tags: {
        include: { tag: true },
      },
      reviews: {
        include: {
          user: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!dbProduct) return null;

  const convertedVariants = dbProduct.variants.map(convertProductVariant);

  // Extract unique sizes from variants
  const sizes = Array.from(
    new Set(
      convertedVariants
        .map((v) => v.size)
        .filter((size): size is string => size !== null)
    )
  );

  // Extract unique colors from variants
  const colors = Array.from(
    new Set(
      convertedVariants
        .map((v) => v.color)
        .filter((color): color is string => color !== null)
    )
  );

  // Extract tag names
  const tags = dbProduct.tags.map((pt) => pt.tag.name);

  // Convert the product and its variants
  const product = {
    ...convertProduct(dbProduct),
    category: dbProduct.category,
    variants: convertedVariants,
    tags,
    colors,
    sizes,
    reviews: dbProduct.reviews,
  };

  return product;
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 8) {
  const dbProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
      isActive: true,
    },
    include: {
      category: true,
      variants: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  // Convert products with variants and tags
  const products = dbProducts.map((product) => {
    const convertedProduct = convertProduct(product);
    const convertedVariants = product.variants.map(convertProductVariant);

    // Extract unique sizes from variants
    const sizes = Array.from(
      new Set(
        convertedVariants
          .map((v) => v.size)
          .filter((size): size is string => size !== null)
      )
    );

    // Extract unique colors from variants
    const colors = Array.from(
      new Set(
        convertedVariants
          .map((v) => v.color)
          .filter((color): color is string => color !== null)
      )
    );

    // Extract tag names
    const tags = product.tags.map((pt) => pt.tag.name);

    return {
      ...convertedProduct,
      category: product.category,
      variants: convertedVariants,
      tags,
      colors,
      sizes,
    };
  });

  return products;
}

/**
 * Get related products
 */
export async function getRelatedProducts(
  productId: string,
  categoryId: string
) {
  const dbProducts = await prisma.product.findMany({
    where: {
      categoryId,
      isActive: true,
      id: { not: productId },
    },
    include: {
      category: true,
      variants: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    take: 4,
  });

  // Convert products with variants and tags
  const products = dbProducts.map((product) => {
    const convertedProduct = convertProduct(product);
    const convertedVariants = product.variants.map(convertProductVariant);

    // Extract unique sizes from variants
    const sizes = Array.from(
      new Set(
        convertedVariants
          .map((v) => v.size)
          .filter((size): size is string => size !== null)
      )
    );

    // Extract unique colors from variants
    const colors = Array.from(
      new Set(
        convertedVariants
          .map((v) => v.color)
          .filter((color): color is string => color !== null)
      )
    );

    // Extract tag names
    const tags = product.tags.map((pt) => pt.tag.name);

    return {
      ...convertedProduct,
      category: product.category,
      variants: convertedVariants,
      tags,
      colors,
      sizes,
    };
  });

  return products;
}

/**
 * Create product (Admin)
 */
export async function createProduct(data: {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  mainImage: string;
  images?: string[];
  stock?: number;
  sku?: string;
}) {
  try {
    const dbProduct = await prisma.product.create({
      data: {
        ...data,
        stock: data.stock || 0,
      },
    });

    const product = convertProduct(dbProduct);

    revalidatePath("/products");
    return { success: true, product };
  } catch (error) {
    return { success: false, error: "Failed to create product" };
  }
}

/**
 * Update product (Admin)
 */
export async function updateProduct(id: string, data: any) {
  try {
    const dbProduct = await prisma.product.update({
      where: { id },
      data,
    });

    const product = convertProduct(dbProduct);

    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    return { success: true, product };
  } catch (error) {
    return { success: false, error: "Failed to update product" };
  }
}

/**
 * Delete product (Admin)
 */
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete product" };
  }
}

// ============================================================================
// CATEGORY ACTIONS
// ============================================================================

/**
 * Get all categories
 */
export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return categories;
}

export async function getTags() {
  const response = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });

  return response;
}

/**
 * Get main categories with children
 */
export async function getMainCategories() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true,
    },
    orderBy: { name: "asc" },
  });
  return categories;
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
      parent: true,
    },
  });
  return category;
}

/**
 * Create category (Admin)
 */
export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}) {
  try {
    const category = await prisma.category.create({ data });
    revalidatePath("/products");
    return { success: true, category };
  } catch (error) {
    return { success: false, error: "Failed to create category" };
  }
}

/**
 * Update category (Admin)
 */
export async function updateCategory(id: string, data: any) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    });
    revalidatePath("/products");
    return { success: true, category };
  } catch (error) {
    return { success: false, error: "Failed to update category" };
  }
}

/**
 * Delete category (Admin)
 */
export async function deleteCategory(id: string) {
  try {
    // Check if has products
    const count = await prisma.product.count({
      where: { categoryId: id },
    });

    if (count > 0) {
      return { success: false, error: "Category has products" };
    }

    await prisma.category.delete({ where: { id } });
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete category" };
  }
}
