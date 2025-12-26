"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

import { Category, Tag } from "@/types";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { AVAILABLE_SIZES, MAIN_COLORS } from "@/types/contants";
import { useFilter } from "@/hooks/use-filter";
import CollapsibleFilter from "./CollapsibleFilter";


interface FilterSidebarProps {
  categories: Category[];
  tags: Tag[];
}

const FilterSidebar = ({ categories, tags }: FilterSidebarProps) => {
  const {
    filters,
    clearFilters,
    toggleFilter,
    setRange,
    hasActiveFilters,
    activeFiltersCount,
  } = useFilter();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-6"
    >
      {hasActiveFilters && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded">
          <span className="text-sm font-semibold">
            {activeFiltersCount} Active Filters
          </span>
          <Button
            variant={"destructive"}
            onClick={clearFilters}
            className="text-xs font-medium"
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="w-full space-y-10 pr-0 lg:pr-10">
        {categories?.length > 0 && (
          <CollapsibleFilter label="Category">
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full space-y-3 px-4"
            >
              {categories.map((category, index) => (
                <motion.li
                  key={category.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    checked={filters?.categories?.includes(category.slug)}
                    onCheckedChange={() =>
                      toggleFilter("categories", category.slug)
                    }
                  />
                  <Label
                    className="cursor-pointer text-sm font-mono"
                    id={category.slug}
                  >
                    {category.name}
                  </Label>
                </motion.li>
              ))}
            </motion.ul>
          </CollapsibleFilter>
        )}

        {/* Price Range */}
        <CollapsibleFilter label="Price Range">
          <div className="space-y-3 px-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setRange(value as [number, number])}
              min={0}
              max={1000}
              step={10}
            />
            <div className="flex items-center justify-between text-sm text-gray-600 font-mono">
              <span>${filters.priceRange && filters.priceRange[0]}</span>
              <span>${filters.priceRange && filters.priceRange[1]}</span>
            </div>
          </div>
        </CollapsibleFilter>

        {/* Colors */}
        <CollapsibleFilter label="Colors">
          <div className="px-4 flex flex-wrap gap-3">
            {MAIN_COLORS.map((color) => {
              const isSelected = filters?.colors?.includes(color.name);

              return (
                <motion.button
                  key={color.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFilter("colors", color.name)}
                  className={`w-6 h-6 rounded cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "ring-2 ring-offset-2 ring-black"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        color.value === "#FFF" ? "text-black" : "text-white"
                      }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </CollapsibleFilter>

        {/* Sizes */}
        <CollapsibleFilter label="Sizes">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-3 px-4"
          >
            {AVAILABLE_SIZES.map((size, index) => (
              <motion.li
                key={size}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={filters?.sizes?.includes(size)}
                  onCheckedChange={() => toggleFilter("sizes", size)}
                />
                <Label className="text-sm font-mono">{size}</Label>
              </motion.li>
            ))}
          </motion.ul>
        </CollapsibleFilter>

        {/* Tags */}
        {tags?.length > 0 && (
          <CollapsibleFilter label="Tags">
            <div className="px-4 flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isSelected = filters?.tags?.includes(tag.slug);

                return (
                  <motion.button
                    key={tag.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => toggleFilter("tags", tag.slug)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 text-black border-black"
                    }`}
                  >
                    {tag.name}
                  </motion.button>
                );
              })}
            </div>
          </CollapsibleFilter>
        )}
      </div>
    </motion.div>
  );
};

export default FilterSidebar;
