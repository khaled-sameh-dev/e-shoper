import Link from "next/link";

import { Button } from "@/components/ui/button";

import SalesBanner from "./_components/SalesBanner";
import ProductsSlider from "./_components/ProductsView";
import CategoriesSection from "./_components/CategoriesSection";
import NewsletterSection from "./_components/NewsletterSection";
import {
  getAllProducts,
  getCategories,
  getProducts,
} from "@/actions/ProductActions";

async function Home() {
  const { data } = await getAllProducts({ page: 1, limit: 8 });
  const categories = await getCategories();

  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div className="space-y-20 my-16 w-full px-8 mx-auto md:max-w-7xl">
        <SalesBanner />

        <div className="space-y-4 container mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
            NEW <span className="text-main-blue/50">ARRIVALS</span>
          </h1>

          <div className="flex flex-col gap-6 md:flex-row items-start md:items-center justify-between">
            <p className="text-sm text-gray-600 font-semibold max-w-xl">
              Discover the latest drops fresh off the design table. From
              trend-setting staples to must-have pieces, our newest arrivals are
              here to elevate your wardrobe.
            </p>
            <Button
              variant={"link"}
              className="bg-main-blue text-white hover:bg-main-blue/70"
            >
              <Link href={"/products"}>View All Products</Link>
            </Button>
          </div>

          {/* Products Display */}
          <div className="my-8">
            {!data.length ? (
              <p className="text-xl font-bold text-gray-600">No Products Yet</p>
            ) : (
              <ProductsSlider products={data} />
            )}
          </div>
        </div>

        <div className="container mx-auto">
          <CategoriesSection categories={categories} />
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}

export default Home;
