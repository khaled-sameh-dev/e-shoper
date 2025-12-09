"use server";
import { prisma } from "@/lib/prisma";
import { Category, Tag } from "@/types";

interface ProductsParamsProps {
  page?: number;
  limit?: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const getAllProducts = async (params?: ProductsParamsProps) => {
  const page = params?.page || 1;
  const limit = params?.limit || 12;
  const skip = (page - 1) * limit;

  console.log("once");

  try {
    const where = { isActive: true };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    if (!products.length && page === 1) {
      return { data: [], total: 0, totalPages: 0 };
    }

    return {
      data: products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw new Error(
      `Error while retrieving products: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

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
}

export const getProducts = async ({
  topK = 12,
  query,
  filters,
  pageNum = 1,
}: QueryParamsProps) => {
  // If no query and no filters, use regular pagination
  const hasQuery = query && query.trim().length > 0;
  const hasFilters =
    filters &&
    (filters.categories?.length ||
      filters.tags?.length ||
      filters.colors?.length ||
      filters.price);

  if (!hasQuery && !hasFilters) {
    console.log("Fetching all products with pagination, page:", pageNum);
    return await getAllProducts({ page: pageNum, limit: topK });
  }

  try {
    const res = await fetch(`${baseUrl}/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filters,
        query,
        page: pageNum,
        limit: topK,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Search API responded with status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in vector search:", error);
    throw new Error(
      `Search failed: ${
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
        parentId: true,
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
      },
    });

    return tags as Tag[];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
