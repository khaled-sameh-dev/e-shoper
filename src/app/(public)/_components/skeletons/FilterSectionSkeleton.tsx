import React from "react";

const FilterSectionSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title Skeleton */}
      <div className="flex items-center justify-between w-full mb-2">
        <div className="h-4 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </div>

      {/* Items Skeleton */}
      <ul className="space-y-3">
        {/* item 1 */}
        <li className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </li>

        {/* item 2 */}
        <li className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-4 w-28 bg-gray-300 rounded"></div>
        </li>

        {/* item 3 */}
        <li className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </li>

        {/* item 4 */}
        <li className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-4 w-36 bg-gray-300 rounded"></div>
        </li>
      </ul>
    </div>
  );
};

export default FilterSectionSkeleton;
