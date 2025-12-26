"use server";

import { prisma } from "@/lib/db/prisma";
import { Category, Tag } from "@/types";
import { index } from "@/lib/pinecone";
import { convertProductVariant } from "@/lib/utils";

import {
  getAllProductsFromDB,
  getProductsCountFromDB,
} from "@/lib/db/product.model";

interface ProductsParamsProps {
  page?: number;
  limit?: number;
}

export interface QueryParamsProps {
  query?: string;
  filters?: {
    categories?: Category[];
    price?: number[];
    tags?: Tag[];
    colors?: string[];
  };
  topK?: number;
  pageNum?: number;
  limit?: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const getAllProducts = async (params?: ProductsParamsProps) => {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 12;

  if (page < 1) {
    throw new Error("VALIDATION_ERROR: Page must be >= 1");
  }

  const skip = (page - 1) * limit;
  const where = { isActive: true };

  const [products, total] = await Promise.all([
    getAllProductsFromDB(where, { take: limit, skip }),
    getProductsCountFromDB(where),
  ]);


  if (!products.length && page === 1) {
    return {
      data: [],
      pagination: {
        page: 1,
        pageSize: limit,
        totalItems: 0,
        hasMore: false,
      },
    };
  }
  

  return {
    data: products,
    pagination: {
      page,
      pageSize: limit,
      totalItems: total,
      hasMore: page < Math.ceil(total / limit),
    },
  };
};


const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: text,
        model: "text-embedding-3-small",
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
};

// Search products using Pinecone vector search
export const searchProductsWithPinecone = async ({
  query,
  filters,
  topK = 12,
  pageNum = 1,
}: QueryParamsProps) => {
  try {
    // Generate embedding for the search query
    const embedding = await generateEmbedding(query || "");

    // Build Pinecone filter
    const pineconeFilter: any = {};

    if (filters?.categories && filters.categories.length > 0) {
      pineconeFilter.categoryId = {
        $in: filters.categories.map((c) => c.id),
      };
    }

    if (filters?.tags && filters.tags.length > 0) {
      pineconeFilter.tags = {
        $in: filters.tags.map((t) => t.name),
      };
    }

    if (filters?.colors && filters.colors.length > 0) {
      pineconeFilter.colors = {
        $in: filters.colors,
      };
    }

    if (filters?.price && filters.price.length === 2) {
      pineconeFilter.price = {
        $gte: filters.price[0],
        $lte: filters.price[1],
      };
    }

    // Query Pinecone
    const queryResponse = await index.query({
      vector: embedding,
      topK: topK * pageNum, // Fetch enough results for pagination
      filter: pineconeFilter,
      includeMetadata: true,
    });

    // Extract product IDs from Pinecone results
    const startIndex = (pageNum - 1) * topK;
    const endIndex = startIndex + topK;
    const paginatedMatches = queryResponse.matches.slice(startIndex, endIndex);

    const productIds = paginatedMatches.map((match) => match.id);

    if (productIds.length === 0) {
      return {
        data: [],
        pagination: {
          page: pageNum,
          pageSize: topK,
          totalPages: 0,
          totalItems: 0,
          hasMore: false,
        },
      };
    }

    // Fetch full product details from database
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
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
        reviews: true,
      },
    });

    console.log("products" , products)

    // Sort products by Pinecone relevance score
    const sortedProducts = productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => p !== null);



    // Convert Decimal fields to numbers and calculate stock
    const convertedProducts = sortedProducts.map((product) => {
      // Calculate total stock from variants
      const totalStock =
        product.variants.length > 0
          ? product.variants.reduce(
              (acc, variant) => acc + (variant.stock || 0),
              0
            )
          : 0;

      return {
        ...product,
        category: product.category,
        tags: product.tags,
        variants: product.variants.map(convertProductVariant),
        stock: totalStock,
        reviews: product.reviews,
      };
    });

    const totalResults = queryResponse.matches.length;
    const totalPages = Math.ceil(totalResults / topK);

    return {
      data: convertedProducts,
      pagination: {
        page: pageNum,
        pageSize: topK,
        totalPages,
        totalItems: totalResults,
        hasMore: pageNum < totalPages,
      },
    };
  } catch (error) {
    console.error("Error in Pinecone search:", error);
    throw new Error(
      `Pinecone search failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};


// Get single product by ID
export const getProductById = async (id: string) => {
  try {

    if(!id){
      return null;
    }
    
    const product = await prisma.product.findUnique({
      where: {
        id,
        isActive: true,
      },
      include: {
        category: true,
        variants: {
          orderBy: {
            createdAt: "asc",
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        reviews: {
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    // Convert product (Decimal to number)
    const convertedProduct = product;
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

    // Calculate average rating from reviews
    const rating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length
        : 0;

    // Format reviews
    const reviews = product.reviews.map((review) => ({
      id: review.id,
      author: review.user.name || "Anonymous",
      authorImage: review.user.image,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      images: review.images,
      isVerified: review.isVerified,
      date: new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    // Calculate total stock
    const totalStock =
      convertedVariants.length > 0
        ? convertedVariants.reduce(
            (acc, variant) => acc + (variant.stock || 0),
            0
          )
        : 0;

    return {
      ...convertedProduct,
      category: product.category,
      variants: convertedVariants,
      tags,
      colors,
      sizes,
      stock: totalStock,
      rating: Math.round(rating * 10) / 10,
      reviewCount: product.reviews.length,
      reviews,
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error(
      `Error fetching product: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return categories as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getTags = async (): Promise<Tag[]> => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
      },
    });

    return tags as Tag[];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};