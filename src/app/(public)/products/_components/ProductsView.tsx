// app/products/_components/ProductsView.tsx
"use client";

import { getProducts } from "@/actions/ProductActions";
import { Category, Product, Tag } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import { Button } from "@/components/ui/button";
import ProductsGrid from "../../_components/ProductsGrid";
import ProductsToolbar from "../../_components/ProductsToolbar";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const LIMIT_PER_PAGE = 12;

interface ProductsViewProps {
  categories: Category[];
  tags: Tag[];
}

const EmptyState = ({ query }: { query?: string | null }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <svg
      className="w-24 h-24 text-gray-300 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      {query ? "No products found" : "No products available"}
    </h3>
    <p className="text-gray-500 text-center max-w-md">
      {query
        ? `We couldn't find any products matching "${query}" with at least 60% relevance. Try adjusting your search or filters.`
        : "There are no products to display at the moment."}
    </p>
  </div>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <svg
      className="w-24 h-24 text-red-300 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Oops! Something went wrong
    </h3>
    <p className="text-gray-500 text-center max-w-md mb-4">{error}</p>
    <Button onClick={onRetry} className="px-6 py-2">
      Try Again
    </Button>
  </div>
);

const ProductsView = ({ categories, tags }: ProductsViewProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const sortBy = searchParams.get("sort") || "featured";

  const filters = useSelector((state: RootState) => state.filter, shallowEqual);
  const memoFilters = useMemo(() => filters, [filters]);

  // Fetch products function
  const fetchProducts = async (page: number, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const hasQuery = query?.trim();
      const hasFilters =
        memoFilters.categories.length > 0 ||
        memoFilters.tags.length > 0 ||
        memoFilters.colors.length > 0 ||
        memoFilters.sizes.length > 0 ||
        memoFilters.priceRange[0] > 0 ||
        memoFilters.priceRange[1] < 1000;

      let result;

      if (hasQuery || hasFilters) {
        // Build filters object for API
        const apiFilters: any = {};

        if (memoFilters.categories.length > 0) {
          apiFilters.categories = memoFilters.categories;
        }

        if (memoFilters.tags.length > 0) {
          apiFilters.tags = memoFilters.tags;
        }

        if (memoFilters.colors.length > 0) {
          apiFilters.colors = memoFilters.colors;
        }

        if (memoFilters.sizes.length > 0) {
          apiFilters.sizes = memoFilters.sizes;
        }

        if (memoFilters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
          apiFilters.price = memoFilters.priceRange;
        }

        // Vector search with query/filters and pagination
        result = await getProducts({
          query: query?.trim() || undefined,
          filters: Object.keys(apiFilters).length > 0 ? apiFilters : undefined,
          topK: LIMIT_PER_PAGE,
          pageNum: page,
        });
      } else {
        // Get all products with pagination
        result = await getProducts({
          pageNum: page,
          topK: LIMIT_PER_PAGE,
        });
      }

      // Handle different response formats
      let productsData = result.data || [];
      const totalCount = result.pagination.totalItems || 0;

      // Apply client-side sorting if needed
      productsData = sortProducts(productsData, sortBy);

      // Append or replace products
      if (append) {
        setProducts((prev) => [...prev, ...productsData]);
      } else {
        setProducts(productsData);
      }

      setTotal(totalCount);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load products. Please try again.";
      setError(errorMessage);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Sorting function
  const sortProducts = (products: Product[], sortType: string) => {
    const sorted = [...products];

    switch (sortType) {
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "price-low":
        return sorted.sort((a, b) => Number(a.price) - Number(b.price));
      case "price-high":
        return sorted.sort((a, b) => Number(b.price) - Number(a.price));
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        // Featured products first, then by relevance if available
        return sorted.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          // If both featured or both not, sort by relevance score if available
          const aScore = (a as any).relevanceScore || 0;
          const bScore = (b as any).relevanceScore || 0;
          return bScore - aScore;
        });
    }
  };

  // Initial fetch and refetch on query/filter/sort change
  useEffect(() => {
    console.log("render");
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(1, false);
  }, [query, memoFilters, sortBy]);

  // Calculate values
  const showingCount = useMemo(() => products.length, [products]);
  const hasMore = useMemo(() => products.length < total, [products, total]);

  // Check if filters are active
  const hasActiveFilters =
    memoFilters.categories.length > 0 ||
    memoFilters.tags.length > 0 ||
    memoFilters.sizes.length > 0 ||
    memoFilters.colors.length > 0 ||
    memoFilters.priceRange[0] > 0 ||
    memoFilters.priceRange[1] < 1000;

  // Retry handler
  const handleRetry = () => {
    fetchProducts(currentPage, false);
  };

  // Load more handler
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProducts(currentPage + 1, true);
    }
  };

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
        <ProductsToolbar total={0} categories={categories} tags={tags} />
        <EmptyState query={query} />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 lg:p-10">
      {/* Toolbar with filters and sorting */}
      <ProductsToolbar total={total} categories={categories} tags={tags} />

      {/* Results summary */}
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
              (with filters applied, minimum 60% relevance)
            </span>
          )}
        </p>
      </div>

      {/* Products Grid */}
      <ProductsGrid products={products} total={total} />

      {/* Load More Section */}
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

        {/* End of results message */}
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
