import { Suspense } from "react";


import ProductsPageSkeleton from "./_components/skeleton/ProductsPageSkeleton";
import ProductsView from "./_components/ProductsView";

import { getCategories, getTags } from "@/actions/ProductActions";
import FilterSidebar from "../_components/FilterSidebar";

async function ProductsPageContent() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  return (
    <div className="px-4 lg:px-10 py-6">
      <div className="container mx-auto">
        <div className="flex gap-6 lg:gap-10">
          <aside className="hidden lg:block flex-shrink-0 w-64">
            <div className="sticky top-6">
              <FilterSidebar categories={categories} tags={tags} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <ProductsView categories={categories} tags={tags} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}
