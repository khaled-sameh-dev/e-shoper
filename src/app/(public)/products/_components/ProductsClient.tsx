"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductCard from "../../_components/ProductCard";

interface ProductsClientProps {
  initialProducts: any[];
  initialTotal: number;
  categories: any[];
  tags: any[];
}

// Filter Sidebar Component
const FilterSidebar = ({ categories, tags, onFilterChange, isOpen, onClose }: any) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      tags: selectedTags,
      priceRange
    });
  }, [selectedCategories, selectedTags, priceRange]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Filters</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div>
            <h3 className="font-bold text-base mb-3">Categories</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                    className="cursor-pointer border border-black/50"
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="cursor-pointer text-sm font-mono"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div>
          <h3 className="font-bold text-base mb-3">Price Range</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-black"
            />
            <div className="flex items-center justify-between text-sm text-gray-600 font-mono">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div>
            <h3 className="font-bold text-base mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagChange(tag.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all ${
                    selectedTags.includes(tag.id)
                      ? 'bg-black text-white border-black'
                      : 'bg-gray-100 text-black border-gray-300 hover:border-black'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Client Component
function ProductsClient({
  initialProducts,
  initialTotal,
  categories,
  tags
}: ProductsClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<any>({
    categories: [],
    tags: [],
    priceRange: [0, 1000]
  });
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isUsingSemanticSearch, setIsUsingSemanticSearch] = useState(false);

  // Handle semantic search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // Reset to initial products if search is cleared
      setProducts(initialProducts);
      setTotal(initialTotal);
      setIsUsingSemanticSearch(false);
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: searchQuery,
          filters: {
            categories: filters.categories,
            tags: filters.tags,
            priceRange: filters.priceRange
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setIsUsingSemanticSearch(true);
      } else {
        console.error('Search failed:', response.statusText);
        // Fallback to simple text search on client side
        const filtered = initialProducts.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filtered);
        setTotal(filtered.length);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to simple text search
      const filtered = initialProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
      setTotal(filtered.length);
    } finally {
      setIsSearching(false);
    }
  };

  // Apply client-side filters and sorting
  useEffect(() => {
    // If using semantic search, don't override the results
    if (isUsingSemanticSearch) return;

    let filtered = [...initialProducts];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => 
        filters.categories.includes(p.categoryId)
      );
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(p => 
        p.tags && p.tags.some((tag: string) => filters.tags.includes(tag))
      );
    }

    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setProducts(filtered);
    setTotal(filtered.length);
  }, [filters, sortBy, initialProducts, isUsingSemanticSearch]);

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setProducts(initialProducts);
    setTotal(initialTotal);
    setIsUsingSemanticSearch(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-8">
              <FilterSidebar
                categories={categories}
                tags={tags}
                onFilterChange={setFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </aside>

          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
              onClick={() => setIsFilterOpen(false)}
            >
              <div 
                className="fixed left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <FilterSidebar
                    categories={categories}
                    tags={tags}
                    onFilterChange={setFilters}
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products using natural language... (e.g., 'wireless headphones for running')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-10 py-6 text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    'Search'
                  )}
                </Button>
              </div>
              {isUsingSemanticSearch && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Showing semantic search results for "{searchQuery}"
                </p>
              )}
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    className="lg:hidden"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{total}</span> result{total !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg mb-2">No products found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} item={product} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductsClient