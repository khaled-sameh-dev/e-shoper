// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { embedText, queryVector } from "@/lib/embeddings";
import { prisma } from "@/lib/prisma";
import { convertProduct, convertProductVariant } from "@/types";

const RELEVANCE_THRESHOLD = 0.4; // 60% relevance threshold

export async function POST(request: NextRequest) {
  try {
    const { query, topK = 20, filters, page = 1, limit = 12 } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required and must be a string" },
        { status: 400 }
      );
    }

    const currentPage = Math.max(1, page);
    const itemsPerPage = Math.min(Math.max(1, limit), 100);
    const skip = (currentPage - 1) * itemsPerPage;

    // Generate embedding for the search query
    const queryEmbedding = await embedText(query);

    // Build filter object for Pinecone
    const pineconeFilter: Record<string, any> = {};

    if (filters) {
      // Categories filter
      if (filters.categories && filters.categories.length > 0) {
        pineconeFilter.categoryId = { $in: filters.categories };
      }

      // Price filter
      if (filters.price && filters.price.length === 2) {
        pineconeFilter.price = {
          $gte: filters.price[0],
          $lte: filters.price[1],
        };
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        pineconeFilter.tags = { $in: filters.tags };
      }

      // Colors filter
      if (filters.colors && filters.colors.length > 0) {
        pineconeFilter.colors = { $in: filters.colors };
      }

      // Sizes filter
      if (filters.sizes && filters.sizes.length > 0) {
        pineconeFilter.sizes = { $in: filters.sizes };
      }
    }

    // Query Pinecone for similar products
    const vectorTopK = Math.min(topK * 5, 100);
    const vectorResults = await queryVector(
      queryEmbedding,
      vectorTopK,
      Object.keys(pineconeFilter).length > 0 ? pineconeFilter : undefined
    );

    if (!vectorResults.matches || vectorResults.matches.length === 0) {
      return NextResponse.json({ 
        products: [], 
        total: 0,
        currentPage: 1,
        totalPages: 0,
        query 
      });
    }

    // Filter results by relevance threshold (60%)
    const relevantMatches = vectorResults.matches.filter(
      (match) => (match.score || 0) >= RELEVANCE_THRESHOLD
    );

    if (relevantMatches.length === 0) {
      return NextResponse.json({ 
        products: [], 
        total: 0,
        currentPage: 1,
        totalPages: 0,
        query,
        message: "No products found with sufficient relevance (60% or higher)"
      });
    }

    // Extract product IDs from filtered results
    const allProductIds = relevantMatches.map((match) => match.id);
    const totalMatches = allProductIds.length;
    
    // Apply pagination to product IDs
    const paginatedProductIds = allProductIds.slice(skip, skip + itemsPerPage);

    // Fetch full product details from database for current page only
    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: paginatedProductIds },
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
    });

    // Create a map for quick relevance score lookup
    const scoreMap = new Map(
      relevantMatches.map((match) => [match.id, match.score || 0])
    );

    // Convert and enrich products with variants data
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

      // Get relevance score from vector search
      const relevanceScore = scoreMap.get(product.id) || 0;

      return {
        ...convertedProduct,
        category: product.category,
        variants: convertedVariants,
        tags,
        colors,
        sizes,
        relevanceScore,
        relevancePercentage: Math.round(relevanceScore * 100), // Add percentage for display
      };
    });

    // Sort by relevance score (higher is better)
    products.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalMatches / itemsPerPage);

    return NextResponse.json({
      products,
      total: totalMatches,
      currentPage,
      totalPages,
      limit: itemsPerPage,
      hasMore: currentPage < totalPages,
      query,
      relevanceThreshold: RELEVANCE_THRESHOLD * 100, // Return as percentage
    });
  } catch (error: any) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: error.message || "An unexpected error occurred",
        products: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
        hasMore: false,
      },
      { status: 500 }
    );
  }
}

// GET endpoint with 60% threshold
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "query" is required' },
        { status: 400 }
      );
    }

    const topK = 10;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(Math.max(1, topK), 100);
    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * limit;

    // Generate embedding and search
    const queryEmbedding = await embedText(query);
    const vectorTopK = Math.min(topK * 5, 100);
    const vectorResults = await queryVector(queryEmbedding, vectorTopK);

    if (!vectorResults.matches || vectorResults.matches.length === 0) {
      return NextResponse.json({ 
        products: [], 
        total: 0,
        currentPage: 1,
        totalPages: 0,
        hasMore: false,
        query 
      });
    }

    // Filter by relevance threshold
    const relevantMatches = vectorResults.matches.filter(
      (match) => (match.score || 0) >= RELEVANCE_THRESHOLD
    );

    if (relevantMatches.length === 0) {
      return NextResponse.json({ 
        products: [], 
        total: 0,
        currentPage: 1,
        totalPages: 0,
        hasMore: false,
        query,
        message: "No products found with sufficient relevance (60% or higher)"
      });
    }

    const allProductIds = relevantMatches.map((match) => match.id);
    const totalMatches = allProductIds.length;
    const paginatedProductIds = allProductIds.slice(skip, skip + limit);

    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: paginatedProductIds },
        isActive: true,
      },
      include: {
        category: true,
        variants: true,
        tags: {
          include: { tag: true },
        },
      },
    });

    const scoreMap = new Map(
      relevantMatches.map((match) => [match.id, match.score || 0])
    );

    const products = dbProducts.map((product) => {
      const convertedProduct = convertProduct(product);
      const convertedVariants = product.variants.map(convertProductVariant);

      const sizes = Array.from(
        new Set(
          convertedVariants
            .map((v) => v.size)
            .filter((size): size is string => size !== null)
        )
      );

      const colors = Array.from(
        new Set(
          convertedVariants
            .map((v) => v.color)
            .filter((color): color is string => color !== null)
        )
      );

      const tags = product.tags.map((pt) => pt.tag.name);
      const relevanceScore = scoreMap.get(product.id) || 0;

      return {
        ...convertedProduct,
        category: product.category,
        variants: convertedVariants,
        tags,
        colors,
        sizes,
        relevanceScore,
        relevancePercentage: Math.round(relevanceScore * 100),
      };
    });

    products.sort((a, b) => b.relevanceScore - a.relevanceScore);

    const totalPages = Math.ceil(totalMatches / limit);

    return NextResponse.json({
      products,
      total: totalMatches,
      currentPage,
      totalPages,
      limit,
      hasMore: currentPage < totalPages,
      query,
      relevanceThreshold: RELEVANCE_THRESHOLD * 100,
    });
  } catch (error: any) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: error.message || "An unexpected error occurred",
        products: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
        hasMore: false,
      },
      { status: 500 }
    );
  }
}