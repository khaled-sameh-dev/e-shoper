import ProductSkeleton from "./ProductSkeleton";

function ProductsPageSkeleton() {
  return (
    <div className="px-4 lg:px-10 py-6">
      <div className="container mx-auto">
        <div className="flex gap-6 lg:gap-10">
          <aside className="flex-shrink-0 relative hidden lg:block w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </aside>
          <main className="flex-1 bg-white shadow-sm rounded-lg p-4 lg:p-10">
            <div className="mb-6 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductsPageSkeleton;
