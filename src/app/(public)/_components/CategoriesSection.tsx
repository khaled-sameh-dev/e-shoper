import React from 'react';
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold tracking-wide">
        SHOP BY <span className="text-main-blue/50">CATEGORY</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.slice(0, 4).map((category) => (
          <Link 
            key={category.id} 
            href={`/category/${category.slug}`}
            className="group bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
          >
            {/* Image Column */}
            <div className="relative w-full md:w-1/2 md:h-auto max-h-80 bg-gray-200">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 aspect-video"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold tracking-wide uppercase mb-4">
                {category.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {category.description || 'Discover our collection'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;