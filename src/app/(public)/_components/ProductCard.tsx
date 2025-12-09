// "use client"

// import React, { useState } from 'react';
// import { Product, ProductVariant } from "@/types";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Plus, Minus } from "lucide-react";

// interface ProductCardProps {
//   item: Product & {
//     variants?: ProductVariant[];
//     tags?: string[];
//     colors?: string[];
//     sizes?: string[];
//   };
// }

// const ProductCard = ({ item }: ProductCardProps) => {
//   const [quantity, setQuantity] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   // Calculate discount percentage if comparePrice exists
//   const discountPercentage = item.comparePrice 
//     ? Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)
//     : null;

//   const handleAddToCart = async () => {
//     if (item.stock === 0) return;
//     setIsLoading(true);
    
//     try {
//       // TODO: Add your cart API call here
//       // await addToCart({ productId: item.id, quantity: 1 });
//       setQuantity(1);
//       console.log('Added to cart:', item.id);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleIncrease = async () => {
//     if (quantity >= item.stock) return;
//     setIsLoading(true);
    
//     try {
//       // TODO: Add your cart update API call here
//       // await updateCart({ productId: item.id, quantity: quantity + 1 });
//       setQuantity(prev => prev + 1);
//       console.log('Increased quantity:', quantity + 1);
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDecrease = async () => {
//     if (quantity <= 0) return;
//     setIsLoading(true);
    
//     try {
//       // TODO: Add your cart update API call here
//       // await updateCart({ productId: item.id, quantity: quantity - 1 });
//       setQuantity(prev => prev - 1);
//       console.log('Decreased quantity:', quantity - 1);
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="group">
//       {/* Product Image with Overlays */}
//       <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[3/4]">
//         <Link href={`/products/${item.slug}`}>
//           <Image
//             src={item.mainImage || '/placeholder-image.jpg'}
//             alt={item.name}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//           />
//         </Link>
        
//         {/* Badges Container - Top Left */}
//         <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
//           {/* Discount Badge */}
//           {discountPercentage && discountPercentage > 0 && (
//             <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
//               -{discountPercentage}%
//             </span>
//           )}

//           {/* Featured Badge */}
//           {item.isFeatured && !discountPercentage && (
//             <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded shadow-md">
//               Featured
//             </span>
//           )}

//           {/* Low Stock Warning */}
//           {item.stock > 0 && item.stock <= item.lowStockAlert && (
//             <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
//               Only {item.stock} left
//             </span>
//           )}
//         </div>

//         {/* Stock Status - Top Right */}
//         {item.stock > 0 && item.stock > item.lowStockAlert && (
//           <div className="absolute top-3 right-3 z-10">
//             <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
//               In Stock
//             </span>
//           </div>
//         )}

//         {/* Out of Stock Overlay */}
//         {item.stock === 0 && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
//             <span className="bg-white text-black text-sm font-bold px-4 py-2 rounded shadow-lg">
//               Out of Stock
//             </span>
//           </div>
//         )}

//         {/* Add to Cart Button - Bottom Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//           {quantity === 0 ? (
//             <Button
//               onClick={handleAddToCart}
//               disabled={item.stock === 0 || isLoading}
//               className="w-full bg-white hover:bg-gray-100 text-black font-semibold"
//             >
//               <ShoppingCart className="w-4 h-4 mr-2" />
//               {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//             </Button>
//           ) : (
//             <div className="flex items-center justify-between gap-2 bg-white rounded-lg p-2">
//               <Button
//                 onClick={handleDecrease}
//                 disabled={isLoading}
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8"
//               >
//                 <Minus className="w-4 h-4" />
//               </Button>
              
//               <span className="font-semibold text-base min-w-[2.5rem] text-center">
//                 {quantity}
//               </span>
              
//               <Button
//                 onClick={handleIncrease}
//                 disabled={quantity >= item.stock || isLoading}
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8"
//               >
//                 <Plus className="w-4 h-4" />
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Product Details */}
//       <div className="space-y-2">
//         <Link href={`/products/${item.slug}`}>
//           {/* Product Name */}
//           <h3 className="font-bold text-base tracking-wide line-clamp-2 group-hover:text-main-blue transition-colors">
//             {item.name}
//           </h3>

//           {/* Description */}
//           {item.description && (
//             <p className="text-sm text-gray-600 line-clamp-2 mt-2">
//               {item.description}
//             </p>
//           )}
//         </Link>

//         {/* Price Section */}
//         {/* <div className="flex items-center gap-2 pt-1">
//           <span className="font-bold text-lg">
//             ${item.price.toFixed(2)}
//           </span>
//           {item.comparePrice && item.comparePrice > item.price && (
//             <span className="text-sm text-gray-400 line-through">
//               ${item.comparePrice.toFixed(2)}
//             </span>
//           )}
//         </div> */}

//         {/* Available Sizes */}
//         {item.sizes && item.sizes.length > 0 && (
//           <div className="flex gap-2 flex-wrap">
//             {item.sizes.map((size, idx) => (
//               <span
//                 key={idx}
//                 className="text-xs border border-gray-300 px-2 py-1 rounded hover:border-gray-600 cursor-pointer transition-colors"
//               >
//                 {size}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Tags */}
//         {item.tags && item.tags.length > 0 && (
//           <div className="flex gap-1.5 flex-wrap">
//             {item.tags.slice(0, 3).map((tag, idx) => (
//               <span
//                 key={idx}
//                 className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Color Swatches */}
//         {item.colors && item.colors.length > 0 && (
//           <div className="flex gap-2">
//             {item.colors.map((color, idx) => (
//               <div
//                 key={idx}
//                 className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-600 transition-colors"
//                 style={{ backgroundColor: color }}
//                 title={color}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// app/_components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import { Product, ProductVariant } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, TrendingUp } from "lucide-react";

interface ProductCardProps {
  item: Product & {
    variants?: ProductVariant[];
    tags?: string[];
    colors?: string[];
    sizes?: string[];
    relevanceScore?: number;
    relevancePercentage?: number;
  };
}

const ProductCard = ({ item }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate discount percentage if comparePrice exists
  const discountPercentage = item.comparePrice
    ? Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)
    : null;

  const handleAddToCart = async () => {
    if (item.stock === 0) return;
    setIsLoading(true);

    try {
      // TODO: Add your cart API call here
      // await addToCart({ productId: item.id, quantity: 1 });
      setQuantity(1);
      console.log("Added to cart:", item.id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrease = async () => {
    if (quantity >= item.stock) return;
    setIsLoading(true);

    try {
      // TODO: Add your cart update API call here
      // await updateCart({ productId: item.id, quantity: quantity + 1 });
      setQuantity((prev) => prev + 1);
      console.log("Increased quantity:", quantity + 1);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 0) return;
    setIsLoading(true);

    try {
      // TODO: Add your cart update API call here
      // await updateCart({ productId: item.id, quantity: quantity - 1 });
      setQuantity((prev) => prev - 1);
      console.log("Decreased quantity:", quantity - 1);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group">
      {/* Product Image with Overlays */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[3/4]">
        <Link href={`/products/${item.slug}`}>
          <Image
            src={item.mainImage || "/placeholder-image.jpg"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Badges Container - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {/* Relevance Badge - Show if relevance is high */}
          {item.relevancePercentage && item.relevancePercentage >= 80 && (
            <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {item.relevancePercentage}% Match
            </span>
          )}

          {/* Discount Badge */}
          {discountPercentage && discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
              -{discountPercentage}%
            </span>
          )}

          {/* Featured Badge */}
          {item.isFeatured &&
            !discountPercentage &&
            (!item.relevancePercentage || item.relevancePercentage < 80) && (
              <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded shadow-md">
                Featured
              </span>
            )}

          {/* Low Stock Warning */}
          {item.stock > 0 && item.stock <= item.lowStockAlert && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
              Only {item.stock} left
            </span>
          )}
        </div>

        {/* Stock Status - Top Right */}
        {item.stock > 0 && item.stock > item.lowStockAlert && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
              In Stock
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {item.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="bg-white text-black text-sm font-bold px-4 py-2 rounded shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Add to Cart Button - Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {quantity === 0 ? (
            <Button
              onClick={handleAddToCart}
              disabled={item.stock === 0 || isLoading}
              className="w-full bg-white hover:bg-gray-100 text-black font-semibold"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          ) : (
            <div className="flex items-center justify-between gap-2 bg-white rounded-lg p-2">
              <Button
                onClick={handleDecrease}
                disabled={isLoading}
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                <Minus className="w-4 h-4" />
              </Button>

              <span className="font-semibold text-base min-w-[2.5rem] text-center">
                {quantity}
              </span>

              <Button
                onClick={handleIncrease}
                disabled={quantity >= item.stock || isLoading}
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        <Link href={`/products/${item.slug}`}>
          {/* Product Name */}
          <h3 className="font-bold text-base tracking-wide line-clamp-2 group-hover:text-main-blue transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
              {item.description}
            </p>
          )}
        </Link>

        {/* Price Section
        <div className="flex items-center gap-2 pt-1">
          <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
          {item.comparePrice && item.comparePrice > item.price && (
            <span className="text-sm text-gray-400 line-through">
              ${item.comparePrice.toFixed(2)}
            </span>
          )}
        </div> */}

        {/* Available Sizes */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {item.sizes.slice(0, 5).map((size, idx) => (
              <span
                key={idx}
                className="text-xs border border-gray-300 px-2 py-1 rounded hover:border-gray-600 cursor-pointer transition-colors"
              >
                {size}
              </span>
            ))}
            {item.sizes.length > 5 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{item.sizes.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {/* {item.tags && item.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {tag.name}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )} */}

        {/* Color Swatches */}
        {item.colors && item.colors.length > 0 && (
          <div className="flex gap-2">
            {item.colors.slice(0, 6).map((color, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-600 transition-colors"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {item.colors.length > 6 && (
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500">
                +{item.colors.length - 6}
              </div>
            )}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default ProductCard;
