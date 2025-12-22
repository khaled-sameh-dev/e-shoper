// import { toggleFilterValue } from "@/lib/utils";
// import { clearAllFilters, updateFilter } from "@/store/filterSlice";
// import { RootState } from "@/store/store";
// import { useDispatch, useSelector } from "react-redux";

// export const useFilter = () => {
//   const dispatch = useDispatch();
//   const filters = useSelector((state: RootState) => state.filter.filters);

//   const toggleFilter = (key: keyof typeof filters, value: string) => {
//     dispatch(
//       updateFilter({
//         [key]: toggleFilterValue(filters[key] as string[], value),
//       })
//     );
//   };

//   const setRange = (range: [number, number]) => {

//     dispatch(updateFilter({ priceRange: range }));
//   };

//   const clearFilters = () => {
//     dispatch(clearAllFilters());
//   };

//   return { filters, setRange, toggleFilter, clearFilters };
// };

import { toggleFilterValue } from "@/lib/utils";
import { clearAllFilters, updateFilter } from "@/store/filterSlice";
import { RootState } from "@/store/store";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter.filters);

  // Toggle any filter array (categories, tags, sizes, colors)
  const toggleFilter = useCallback(
    (key: keyof typeof filters, value: string) => {
      const currentArray = filters[key] as string[];
      const newArray = toggleFilterValue(currentArray, value);

      dispatch(updateFilter({ [key]: newArray }));
    },
    [filters, dispatch]
  );

  // Set price range
  const setRange = useCallback(
    (range: [number, number]) => {
      dispatch(updateFilter({ priceRange: range }));
    },
    [dispatch]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      (filters.categories?.length ?? 0) > 0 ||
      (filters.tags?.length ?? 0) > 0 ||
      (filters.sizes?.length ?? 0) > 0 ||
      (filters.colors?.length ?? 0) > 0 ||
      (filters.priceRange?.[0] ?? 0) > 0 ||
      (filters.priceRange?.[1] ?? 1000) < 1000
    );
  }, [filters]);

  // Build filters payload for API requests
  const buildFiltersPayload = useCallback(() => {
    const payload: Record<string, any> = {};

    if ((filters.categories?.length ?? 0) > 0) {
      payload.categories = filters.categories;
    }

    if ((filters.tags?.length ?? 0) > 0) {
      payload.tags = filters.tags;
    }

    if ((filters.sizes?.length ?? 0) > 0) {
      payload.sizes = filters.sizes;
    }

    if ((filters.colors?.length ?? 0) > 0) {
      payload.colors = filters.colors;
    }

    if ((filters.priceRange?.[0] ?? 0) > 0 || (filters.priceRange?.[1] ?? 1000) < 1000) {
      payload.priceRange = filters.priceRange;
    }

    return Object.keys(payload).length > 0 ? payload : undefined;
  }, [filters]);

  // Get active filters count (for UI badges)
  const activeFiltersCount = useMemo(() => {
    let count = 0;

    count += filters.categories?.length ?? 0;
    count += filters.tags?.length ?? 0;
    count += filters.sizes?.length ?? 0;
    count += filters.colors?.length ?? 0;

    // Count price range as 1 if it's not default
    if ((filters.priceRange?.[0] ?? 0) > 0 || (filters.priceRange?.[1] ?? 1000) < 1000) {
      count += 1;
    }

    return count;
  }, [filters]);

  // Check if a specific filter value is active
  const isFilterActive = useCallback(
    (key: keyof typeof filters, value: string) => {
      const filterArray = filters[key];
      if (Array.isArray(filterArray)) {
        return filterArray.includes(value);
      }
      return false;
    },
    [filters]
  );

  // Set multiple filters at once (for bulk operations)
  const setFilters = useCallback(
    (newFilters: Partial<typeof filters>) => {
      dispatch(updateFilter(newFilters));
    },
    [dispatch]
  );

  return {
    // State
    filters,

    // Computed values
    hasActiveFilters,
    activeFiltersCount,

    // Actions
    toggleFilter,
    setRange,
    clearFilters,
    setFilters,

    // Utilities
    buildFiltersPayload,
    isFilterActive,
  };
};
