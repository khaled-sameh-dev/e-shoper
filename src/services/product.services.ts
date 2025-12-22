import { getAllProducts, getProductById } from "@/actions/ProductActions";
import { embedText } from "@/lib/embeddings";
import { queryVector } from "@/lib/pinecone";
import { Filters } from "@/types";
import { NextResponse } from "next/server";

export async function fetchAllProducts(cursor: string | null, limit: number) {
  try {
    const page = cursor ? parseInt(cursor) : 1;

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid cursor format" },
        { status: 400 }
      );
    }
    const result = await getAllProducts({ page, limit });

    const nextCursor = result.pagination.hasMore ? String(page + 1) : null;

    return NextResponse.json({
      products: result.data,
      pagination: {
        limit,
        total: result.pagination.totalItems,
        nextCursor,
      },
    });
  } catch (error) {
    console.error("Error During fetch all products:", error);
    throw error;
  }
}

const MIN_SCORE = 0.3;

export async function fetchProductsWithVector(
  query: string,
  filters: Filters,
  cursor: string | null,
  limit: number
) {
  try {
    const searchText = query.trim() || "";
    const vectorQuery = await embedText(searchText);

    // Increase topK to account for filtering and pagination
    const topK = limit * 10;

    // Build Pinecone filter object
    const pineconeFilter = buildPineconeFilter(filters);

    console.log("pinecone filter", pineconeFilter);
    const pineconeResult = await queryVector(
      vectorQuery,
      topK,
      Object.keys(pineconeFilter).length > 0 ? pineconeFilter : undefined
    );

    console.log("pinecone results", pineconeResult);

    if (!pineconeResult.matches || !pineconeResult.matches.length) {
      return NextResponse.json({
        products: [],
        pagination: { total: 0, limit, nextCursor: null },
      });
    }

    let matchesResults = !filters
      ? pineconeResult.matches
          .filter((match) => (match.score || 0) >= MIN_SCORE)
          .map((match) => ({ id: match.id, score: match.score }))
      : pineconeResult.matches;

    const totalMatches = matchesResults.length;

    if (cursor) {
      const cursorData = parseCursor(cursor);
      if (cursorData) {
        matchesResults = matchesResults.filter(
          (match) => (match.score || 0) < cursorData.score
        );
      }
    }

    console.log("match results", matchesResults);
    console.log("match results length", totalMatches);

    if (!matchesResults.length) {
      return NextResponse.json({
        products: [],
        pagination: { total: totalMatches, limit, nextCursor: null },
      });
    }

    const pageResults = matchesResults.slice(0, limit);
    console.log("page", pageResults);
    const hasMore = matchesResults.length > limit;

    console.log("has more", hasMore);

    const lastItem = pageResults[pageResults.length - 1];
    console.log("cursor", cursor);
    const nextCursor = hasMore
      ? createCursor({ id: lastItem.id, score: lastItem.score || 0 })
      : null;

    console.log("cursor", nextCursor);
    const productsPromises = pageResults.map((item) =>
      getProductById(item.id).catch((err) => {
        console.error(`Failed to fetch product ${item.id}:`, err);
        return null;
      })
    );

    const products = await Promise.all(productsPromises);

    const validProducts = products.filter((p) => p !== null);

    return NextResponse.json({
      products: validProducts,
      pagination: {
        limit,
        total: totalMatches,
        nextCursor,
      },
    });
  } catch (error) {
    console.error("Error During fetch all products:", error);
    throw error;
  }
}

// Helper: Parse cursor string
function parseCursor(cursor: string): { id: string; score: number } | null {
  try {
    const [id, scoreStr] = cursor.split(":");
    const score = parseFloat(scoreStr);

    if (!id || isNaN(score)) {
      console.warn("Invalid cursor format:", cursor);
      return null;
    }

    return { id, score };
  } catch (err) {
    console.error("Error parsing cursor:", err);
    return null;
  }
}

// Helper: Create cursor string
function createCursor(item: { id: string; score: number }): string {
  return `${item.id}:${item.score}`;
}

// Helper: Build Pinecone filter from request filters
function buildPineconeFilter(filters?: Filters): Record<string, any> {
  if (!filters) return {};

  const pineconeFilter: Record<string, any> = {};

  // Categories filter
  if (filters.categories?.length) {
    pineconeFilter["categorySlug"] = { $in: filters.categories };
  }

  // Tags filter
  if (filters.tags?.length) {
    pineconeFilter["tags"] = { $in: filters.tags };
  }

  // Colors filter
  if (filters.colors?.length) {
    pineconeFilter["colors"] = { $in: filters.colors };
  }

  // Sizes filter
  if (filters.sizes?.length) {
    pineconeFilter["sizes"] = { $in: filters.sizes };
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange.length === 2) {
    const [min, max] = filters.priceRange;

    // Only add filter if it's not the default range
    if (min > 0 || max < 1000) {
      pineconeFilter["price"] = {
        $gte: min,
        $lte: max,
      };
    }
  }

  return pineconeFilter;
}
