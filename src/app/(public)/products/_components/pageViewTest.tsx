
"use client";

import { Category, Filters, Product, Tag } from "@/types";
import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useState,
  useMemo,
  useTransition,
  useCallback,
} from "react";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import { Button } from "@/components/ui/button";
import ProductsGrid from "../../_components/ProductsGrid";
import ProductsToolbar from "../../_components/ProductsToolbar";
import { useFilter } from "@/hooks/use-filter";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

const LIMIT_PER_PAGE = 12;

interface ProductsViewProps {
  categories: Category[];
  tags: Tag[];
}

interface QueryParamsPayload {
  query?: string;
  filters?: Filters;
  limit: number;
  cursor?: string | null;
}

const ProductsView = ({ categories, tags }: ProductsViewProps) => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<boolean>(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { filters, hasActiveFilters } = useFilter();

  // Build query params with useMemo
  const queryParams: QueryParamsPayload = useMemo(
    () => ({
      query: query.trim() || undefined,
      filters: hasActiveFilters ? filters : undefined,
      limit: LIMIT_PER_PAGE,
      cursor: nextCursor,
    }),
    [query, filters, hasActiveFilters, nextCursor]
  );

  // Unified fetch function for all cases (DB + Pinecone)
  const fetchProducts = useCallback(
    async (append: boolean = false) => {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);

      try {
        // Build payload
        const payload: QueryParamsPayload = {
          query: query.trim() || undefined,
          filters: hasActiveFilters ? filters : undefined,
          limit: LIMIT_PER_PAGE,
          cursor: append ? nextCursor : null,
        };

        console.log("Fetching products with payload:", payload);

        const res = await fetch(`/api/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({...payload , hasActiveFilters}),
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("Received data:", data);

        const productsData = data.products || [];
        const totalCount = data.pagination.total || 0;
        const newCursor = data.pagination.nextCursor || null;

        // Update products state
        if (append) {
          setProducts((prev) => [...prev, ...productsData]);
        } else {
          setProducts(productsData);
        }

        setTotal(totalCount);
        setNextCursor(newCursor);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load products. Please try again.";
        setError(errorMessage);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [query, filters, hasActiveFilters, nextCursor]
  );

  // Reset and fetch when query or filters change (NOT cursor)
  useEffect(() => {
    startTransition(() => {
      setNextCursor(null);
      setProducts([]);
      fetchProducts(false);
    });
  }, [query, filters, hasActiveFilters]);

  // Handle load more
  const handleLoadMore = () => {
    if (!loadingMore && nextCursor) {
      fetchProducts(true);
    }
  };

  // Handle retry
  const handleRetry = () => {
    setProducts([]);
    setNextCursor(null);
    fetchProducts(false);
  };

  const showingCount = useMemo(() => products.length, [products]);
  const hasMore = useMemo(() => !!nextCursor, [nextCursor]);

  // Loading state (initial load)
  if (loading && products.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 lg:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 lg:p-10">
        <ErrorState error={error} onRetry={handleRetry} />
      </div>
    );
  }

  // Empty state
  if (!loading && products.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 lg:p-10">
        <ProductsToolbar categories={categories} tags={tags} />
        <EmptyState query={query} />
      </div>
    );
  }

  // Success state with products
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 lg:p-10">
      <ProductsToolbar categories={categories} tags={tags} />

      <div className="mb-6">
        <p className="text-gray-600">
          Showing {showingCount} of {total} products
          {query && (
            <span className="ml-1">
              for <span className="font-semibold">"{query}"</span>
            </span>
          )}
          {hasActiveFilters && (
            <span className="ml-1 text-sm text-gray-500">
              (with filters applied)
            </span>
          )}
        </p>
      </div>

      <ProductsGrid products={products} total={total} />

      <div className="mt-8">
        {hasMore && (
          <div className="flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-8 py-3 min-w-[200px]"
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                `Load More (${total - showingCount} remaining)`
              )}
            </Button>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-center text-gray-500 py-4">
            You've reached the end of the results
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsView;