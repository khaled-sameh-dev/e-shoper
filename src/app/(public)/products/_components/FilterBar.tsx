// // app/products/_components/FilterBar.tsx
// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Check } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect } from "react";
// import { Category, Tag } from "@/types";
// import { Slider } from "@/components/ui/slider";
// import { AVAILABLE_SIZES, MAIN_COLORS } from "@/types/contants";
// import CollapsibleFilter from "./CollapsibleFilter";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import {
//   toggleCategory,
//   toggleTag,
//   toggleSize,
//   toggleColor,
//   setPriceRange,
//   clearAllFilters,
//   initializeFilters,
// } from "@/store/filterSlice";
// import { useRouter, useSearchParams } from "next/navigation";

// interface FilterSidebarProps {
//   categories: Category[];
//   tags: Tag[];
// }

// const FilterSidebar = ({ categories, tags }: FilterSidebarProps) => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Get filters from Redux store
//   const filters = useSelector((state: RootState) => state.filter);

//   // Initialize filters from URL on mount
//   useEffect(() => {
//     const urlCategories = searchParams.get("categories")?.split(",") || [];
//     const urlTags = searchParams.get("tags")?.split(",") || [];
//     const urlSizes = searchParams.get("sizes")?.split(",") || [];
//     const urlColors = searchParams.get("colors")?.split(",") || [];
//     const urlMinPrice = parseInt(searchParams.get("minPrice") || "0");
//     const urlMaxPrice = parseInt(searchParams.get("maxPrice") || "1000");

//     dispatch(
//       initializeFilters({
//         categories: urlCategories,
//         tags: urlTags,
//         sizes: urlSizes,
//         colors: urlColors,
//         priceRange: [urlMinPrice, urlMaxPrice],
//       })
//     );
//   }, []);

//   // Update URL when filters change
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());

//     // Update categories
//     if (filters.categories.length > 0) {
//       params.set("categories", filters.categories.join(","));
//     } else {
//       params.delete("categories");
//     }

//     // Update tags
//     if (filters.tags.length > 0) {
//       params.set("tags", filters.tags.join(","));
//     } else {
//       params.delete("tags");
//     }

//     // Update sizes
//     if (filters.sizes.length > 0) {
//       params.set("sizes", filters.sizes.join(","));
//     } else {
//       params.delete("sizes");
//     }

//     // Update colors
//     if (filters.colors.length > 0) {
//       params.set("colors", filters.colors.join(","));
//     } else {
//       params.delete("colors");
//     }

//     // Update price range
//     if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
//       params.set("minPrice", filters.priceRange[0].toString());
//       params.set("maxPrice", filters.priceRange[1].toString());
//     } else {
//       params.delete("minPrice");
//       params.delete("maxPrice");
//     }

//     // Reset to page 1 when filters change
//     params.delete("page");

//     router.push(`/products?${params.toString()}`, { scroll: false });
//   }, [filters, router, searchParams]);

//   const handleClearAll = () => {
//     dispatch(clearAllFilters());
//   };

//   const hasActiveFilters =
//     filters.categories.length > 0 ||
//     filters.tags.length > 0 ||
//     filters.sizes.length > 0 ||
//     filters.colors.length > 0 ||
//     filters.priceRange[0] > 0 ||
//     filters.priceRange[1] < 1000;

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//       className="flex flex-col space-y-6"
//     >
//       {/* Clear All Button */}
//       {hasActiveFilters && (
//         <div className="flex items-center justify-between px-4">
//           <span className="text-sm font-semibold">Active Filters</span>
//           <button
//             onClick={handleClearAll}
//             className="text-sm text-red-600 hover:text-red-700 font-medium"
//           >
//             Clear All
//           </button>
//         </div>
//       )}

//       <div className="w-full space-y-10 pr-0 lg:pr-10">
//         {/* Categories Section */}
//         {categories && categories.length > 0 && (
//           <div>
//             <CollapsibleFilter label="Category">
//               <motion.ul
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//                 className="w-full space-y-3 px-4"
//               >
//                 <AnimatePresence>
//                   {categories.map((category, index) => (
//                     <motion.li
//                       key={category.id}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="flex items-center gap-2"
//                     >
//                       <Checkbox
//                         id={`category-${category.id}`}
//                         checked={filters.categories.includes(category.id)}
//                         onCheckedChange={() =>
//                           dispatch(toggleCategory(category.id))
//                         }
//                         className="cursor-pointer border border-black/50"
//                       />
//                       <Label
//                         htmlFor={`category-${category.id}`}
//                         className="cursor-pointer text-sm font-mono"
//                       >
//                         {category.name}
//                       </Label>
//                     </motion.li>
//                   ))}
//                 </AnimatePresence>
//               </motion.ul>
//             </CollapsibleFilter>
//           </div>
//         )}

//         {/* Price Range Section */}
//         <div className="w-full">
//           <CollapsibleFilter label="Price Range">
//             <div className="space-y-3 px-4">
//               <Slider
//                 value={filters.priceRange}
//                 onValueChange={(value) =>
//                   dispatch(setPriceRange(value as [number, number]))
//                 }
//                 min={0}
//                 max={1000}
//                 step={10}
//               />
//               <div className="flex items-center justify-between text-sm text-gray-600 font-mono">
//                 <span>${filters.priceRange[0]}</span>
//                 <span>${filters.priceRange[1]}</span>
//               </div>
//             </div>
//           </CollapsibleFilter>
//         </div>

//         {/* Colors Section */}
//         <div className="w-full">
//           <CollapsibleFilter label="Colors">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//               className="px-4"
//             >
//               <div className="flex flex-wrap gap-3">
//                 {MAIN_COLORS.map((color, index) => {
//                   const isSelected = filters.colors.includes(color.value);

//                   return (
//                     <motion.button
//                       key={color.value}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: index * 0.05 }}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => dispatch(toggleColor(color.value))}
//                       className={`
//                           relative w-6 h-6 rounded cursor-pointer
//                           transition-all duration-200
//                           ${
//                             isSelected
//                               ? "ring-2 ring-offset-2 ring-black"
//                               : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
//                           }
//                           ${color.border ? "border-2 border-gray-300" : ""}
//                         `}
//                       style={{ backgroundColor: color.value }}
//                       title={color.name}
//                       aria-label={`Select ${color.name}`}
//                     >
//                       {isSelected && (
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           exit={{ scale: 0 }}
//                           className="absolute inset-0 flex items-center justify-center"
//                         >
//                           <Check
//                             className={`w-4 h-4 ${
//                               color.value === "#FFFFFF" ||
//                               color.value === "#F5F5DC"
//                                 ? "text-black"
//                                 : "text-white"
//                             }`}
//                             strokeWidth={3}
//                           />
//                         </motion.div>
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </CollapsibleFilter>
//         </div>

//         {/* Size Section */}
//         <div className="w-full">
//           <CollapsibleFilter label="Size">
//             <motion.ul
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//               className="w-full space-y-3 px-4"
//             >
//               <AnimatePresence>
//                 {AVAILABLE_SIZES.map((size, index) => (
//                   <motion.li
//                     key={size}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="flex items-center gap-2"
//                   >
//                     <Checkbox
//                       id={`size-${size}`}
//                       checked={filters.sizes.includes(size)}
//                       onCheckedChange={() => dispatch(toggleSize(size))}
//                       className="cursor-pointer border border-black/50"
//                     />
//                     <Label
//                       htmlFor={`size-${size}`}
//                       className="cursor-pointer text-sm font-mono"
//                     >
//                       {size}
//                     </Label>
//                   </motion.li>
//                 ))}
//               </AnimatePresence>
//             </motion.ul>
//           </CollapsibleFilter>
//         </div>

//         {/* Tags Section */}
//         {tags && tags.length > 0 && (
//           <div className="w-full">
//             <CollapsibleFilter label="Looking for tags...?">
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//                 className="px-4"
//               >
//                 <div className="flex flex-wrap gap-2">
//                   <AnimatePresence>
//                     {tags.map((tag, index) => {
//                       const isSelected = filters.tags.includes(tag.id);

//                       return (
//                         <motion.button
//                           key={tag.id}
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: index * 0.05 }}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => dispatch(toggleTag(tag.id))}
//                           className={`
//                               px-3 py-1 rounded-full text-xs font-semibold
//                               border-2 transition-all duration-200
//                               ${
//                                 isSelected
//                                   ? "bg-black text-white border-black"
//                                   : "bg-gray-100 text-black border-black hover:bg-gray-100"
//                               }
//                             `}
//                         >
//                           {tag.name}
//                         </motion.button>
//                       );
//                     })}
//                   </AnimatePresence>
//                 </div>
//               </motion.div>
//             </CollapsibleFilter>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default FilterSidebar;

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Category, Tag } from "@/types";
import { Slider } from "@/components/ui/slider";
import { AVAILABLE_SIZES, MAIN_COLORS } from "@/types/contants";
import CollapsibleFilter from "./CollapsibleFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFilter } from "@/hooks/use-filter";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  categories: Category[];
  tags: Tag[];
}

const FilterSidebar = ({ categories, tags }: FilterSidebarProps) => {
  const { filters, clearFilters, toggleFilter, setRange } = useFilter();

  const hasActiveFilters = useMemo(
    () =>
      filters.categories.length > 0 ||
      filters.tags.length > 0 ||
      filters.sizes.length > 0 ||
      filters.colors.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 1000,
    [filters]
  );

  const activeFiltersCount = useMemo(
    () =>
      filters.categories.length +
      filters.tags.length +
      filters.sizes.length +
      filters.colors.length +
      (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 ? 1 : 0),
    [filters]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-6"
    >
      {/* Clear All Button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded">
          <span className="text-sm font-semibold">{activeFiltersCount} Active Filters</span>
          <Button variant={"destructive"}
            onClick={clearFilters}
            className="text-xs font-medium"
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="w-full space-y-10 pr-0 lg:pr-10">
        {/* Categories */}
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
                    checked={filters.categories.includes(category.slug)}
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
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </CollapsibleFilter>

        {/* Colors */}
        <CollapsibleFilter label="Colors">
          <div className="px-4 flex flex-wrap gap-3">
            {MAIN_COLORS.map((color) => {
              const isSelected = filters.colors.includes(color.name);

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
                  checked={filters.sizes.includes(size)}
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
                const isSelected = filters.tags.includes(tag.slug);

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
