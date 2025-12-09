const FilterSkeleton = () => {
  return (
    <div className="w-2xs space-y-6">
      <div className="pr-10">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSkeleton