"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { X, SlidersHorizontal } from "lucide-react";
import { getProducts, getCategories } from "@/actions/ProductActions";
import ProductCard from '../_components/ProductCard';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(false);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const availableColors = ["Black", "White", "Blue", "Red", "Green", "Gray", "Navy", "Beige"];

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    setProducts([]);
    fetchProducts(1, true);
  }, [priceRange, selectedSizes, selectedColors, selectedCategories, isFeaturedOnly, queryParam]);

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (pageNum: number = 1, reset: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getProducts({
        page: pageNum,
        limit: 12,
        categorySlug: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
        isFeatured: isFeaturedOnly || undefined,
      });

      // Apply client-side filters for price, sizes, and colors
      let filteredProducts = result.products;

      // Filter by price range
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );

      // Filter by sizes
      if (selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
          p.sizes?.some((size: string) => selectedSizes.includes(size))
        );
      }

      // Filter by colors
      if (selectedColors.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
          p.colors?.some((color: string) => 
            selectedColors.some(sc => color.toLowerCase().includes(sc.toLowerCase()))
          )
        );
      }

      // Filter by search query (if exists)
      if (queryParam) {
        const query = queryParam.toLowerCase();
        filteredProducts = filteredProducts.filter((p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags?.some((tag: string) => tag.toLowerCase().includes(query))
        );
      }

      if (reset) {
        setProducts(filteredProducts);
      } else {
        setProducts((prev) => [...prev, ...filteredProducts]);
      }

      setTotalProducts(result.total);
      setHasMore(pageNum < result.totalPages && filteredProducts.length > 0);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, false);
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleCategoryToggle = (categorySlug: string) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug) ? prev.filter(c => c !== categorySlug) : [categorySlug]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setIsFeaturedOnly(false);
  };

  const activeFiltersCount = 
    selectedSizes.length + 
    selectedColors.length + 
    selectedCategories.length + 
    (isFeaturedOnly ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              {queryParam ? (
                <>Search Results for <span className="text-main-blue">"{queryParam}"</span></>
              ) : (
                <>All <span className="text-main-blue/50">Products</span></>
              )}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden bg-main-blue hover:bg-main-blue/90"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedSizes={selectedSizes}
                handleSizeToggle={handleSizeToggle}
                selectedColors={selectedColors}
                handleColorToggle={handleColorToggle}
                selectedCategories={selectedCategories}
                handleCategoryToggle={handleCategoryToggle}
                isFeaturedOnly={isFeaturedOnly}
                setIsFeaturedOnly={setIsFeaturedOnly}
                clearAllFilters={clearAllFilters}
                activeFiltersCount={activeFiltersCount}
                availableSizes={availableSizes}
                availableColors={availableColors}
                categories={categories}
              />
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
              <div 
                className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <FilterSidebar
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedSizes={selectedSizes}
                    handleSizeToggle={handleSizeToggle}
                    selectedColors={selectedColors}
                    handleColorToggle={handleColorToggle}
                    selectedCategories={selectedCategories}
                    handleCategoryToggle={handleCategoryToggle}
                    isFeaturedOnly={isFeaturedOnly}
                    setIsFeaturedOnly={setIsFeaturedOnly}
                    clearAllFilters={clearAllFilters}
                    activeFiltersCount={activeFiltersCount}
                    availableSizes={availableSizes}
                    availableColors={availableColors}
                    categories={categories}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h2 className="text-red-800 font-semibold mb-2">Error</h2>
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {!loading && products.length === 0 && !error && (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {queryParam ? 'No products found' : 'No products available'}
                </h2>
                <p className="text-gray-500">
                  {queryParam ? 'Try adjusting your search or filters' : 'Check back later for new products'}
                </p>
              </div>
            )}

            {products.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} item={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="bg-main-blue hover:bg-main-blue/90 px-8"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Initial Loading State */}
            {loading && products.length === 0 && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-blue"></div>
                <p className="ml-4 text-gray-600">Loading products...</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedSizes,
  handleSizeToggle,
  selectedColors,
  handleColorToggle,
  selectedCategories,
  handleCategoryToggle,
  isFeaturedOnly,
  setIsFeaturedOnly,
  clearAllFilters,
  activeFiltersCount,
  availableSizes,
  availableColors,
  categories,
}: any) => {
  return (
    <>
      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pb-4 border-b">
          <span className="text-sm font-semibold">
            {activeFiltersCount} Filter{activeFiltersCount !== 1 ? 's' : ''} Applied
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-main-blue hover:text-main-blue/80 h-auto p-0"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-4 pb-6 border-b">
        <h3 className="font-bold text-base">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3 pb-6 border-b">
        <h3 className="font-bold text-base">Categories</h3>
        <div className="space-y-2">
          {categories.map((category: Category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryToggle(category.slug)}
              />
              <label
                htmlFor={`category-${category.slug}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3 pb-6 border-b">
        <h3 className="font-bold text-base">Size</h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size: string) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 border rounded text-sm transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-main-blue text-white border-main-blue'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3 pb-6 border-b">
        <h3 className="font-bold text-base">Color</h3>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color: string) => (
            <button
              key={color}
              onClick={() => handleColorToggle(color)}
              className={`px-4 py-2 border rounded text-sm transition-colors ${
                selectedColors.includes(color)
                  ? 'bg-main-blue text-white border-main-blue'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Only */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={isFeaturedOnly}
            onCheckedChange={(checked) => setIsFeaturedOnly(checked as boolean)}
          />
          <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
            Featured Products Only
          </label>
        </div>
      </div>
    </>
  );
};

export default SearchPage;