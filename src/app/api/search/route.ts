import { fetchAllProducts, fetchProductsWithVector } from "@/services/product.services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, limit = 12, cursor, filters } = body;

    // Validate limit
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid limit parameter. Must be between 1 and 100." },
        { status: 400 }
      );
    }

    const hasQuery = query && query.trim().length > 0

    if(!hasQuery && !filters){
      return await fetchAllProducts(cursor, limit);
    }

    console.log("found filter or query")
    console.log("filters" , filters)
    return await fetchProductsWithVector(query || "", filters, cursor, limit);

  } catch (err) {
    console.error("Search API error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    const statusCode = errorMessage.includes("embedding") ? 503 : 500;

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
