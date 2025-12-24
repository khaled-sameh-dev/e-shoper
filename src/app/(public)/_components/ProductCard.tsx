
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Plus,
  Minus,
  TrendingUp,
  Heart,
  Check,
} from "lucide-react";
import { Product, ProductVariant, Category, ProductTag, Tag } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementCartItem,
  decrementCartItem,
  selectCartLoading,
  selectCartItemAllQuantity,
} from "@/store/cartSlice";
import { CartItem } from "@/types";

interface ProductCardProps {
  item: Product & {
    category?: Category;
    tags?: (ProductTag & { tag: Tag })[];
    variants?: ProductVariant[];
    relevanceScore?: number;
    relevancePercentage?: number;
  };
}

const ProductCard = ({ item }: ProductCardProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCartLoading);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  // Get the first variant as default
  const defaultVariant = item.variants?.[0];

  // Get cart quantity for this product's default variant
  const cartQuantity = useSelector(
    selectCartItemAllQuantity(item.id)
  );

  // Calculate final price with discount
  const finalPrice = item.discountAmount
    ? item.price - item.discountAmount
    : item.price;

  // Calculate discount percentage
  const discountPercentage = item.discountAmount
    ? Math.round((item.discountAmount / item.price) * 100)
    : null;

  // Calculate total stock from all variants
  const totalStock = item.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
  const isOutOfStock = totalStock === 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || !item.isActive || !defaultVariant) return;

    const cartItem: CartItem = {
      productId: item.id,
      variantId: defaultVariant.id,
      quantity: 1,
      attributes: {
        color: defaultVariant.color,
        size: defaultVariant.size,
      },
    };

    dispatch(addToCart(cartItem));

    // Show success feedback
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 1500);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (cartQuantity >= totalStock || !defaultVariant) return;

    const cartItemId = `${item.id}:${defaultVariant.id}`;
    dispatch(incrementCartItem(cartItemId));
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (cartQuantity <= 0 || !defaultVariant) return;

    const cartItemId = `${item.id}:${defaultVariant.id}`;
    dispatch(decrementCartItem(cartItemId));
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    if (isOutOfStock) return;
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    // TODO: Add wishlist API call
  };

  if (!item.isActive) return null;

  return (
    <div className={`group relative ${isOutOfStock ? "opacity-60" : ""}`}>
      {/* Product Image Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-[3/4]">
        <Link href={`/products/${item.id}`}>
          <Image
            src={item.mainImage}
            alt={item.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isOutOfStock
                ? "grayscale group-hover:scale-100"
                : "group-hover:scale-110"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={item.isFeatured}
          />
        </Link>

        {/* Wishlist Button - Top Right */}
        <button
          onClick={toggleWishlist}
          disabled={isOutOfStock}
          className={`absolute top-3 right-3 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all ${
            isOutOfStock ? "cursor-not-allowed opacity-50" : ""
          }`}
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Badges Container - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {/* Out of Stock Badge */}
          {isOutOfStock && (
            <span className="bg-gray-800 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">
              Out of Stock
            </span>
          )}

          {/* Relevance Badge */}
          {!isOutOfStock &&
            item.relevancePercentage &&
            item.relevancePercentage >= 75 && (
              <span className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {item.relevancePercentage}%
              </span>
            )}

          {/* Discount Badge */}
          {!isOutOfStock && discountPercentage && discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">
              -{discountPercentage}%
            </span>
          )}

          {/* Featured Badge */}
          {!isOutOfStock && item.isFeatured && !discountPercentage && (
            <span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
              Featured
            </span>
          )}

          {/* Low Stock Warning */}
          {totalStock > 0 && totalStock <= 5 && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
              Only {totalStock} left
            </span>
          )}
        </div>

        {/* Quick Add to Cart - Bottom Overlay */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {cartQuantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className={`w-full font-semibold shadow-lg transition-all ${
                  showAddedToCart
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-white hover:bg-gray-100 text-gray-900"
                }`}
              >
                {showAddedToCart ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Quick Add
                  </>
                )}
              </Button>
            ) : (
              <div className="flex items-center justify-between gap-2 bg-white rounded-lg p-1.5 shadow-lg">
                <Button
                  onClick={handleDecrease}
                  disabled={isLoading}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <span className="font-bold text-base min-w-[2rem] text-center">
                  {cartQuantity}
                </span>

                <Button
                  onClick={handleIncrease}
                  disabled={cartQuantity >= totalStock || isLoading}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        {/* Category */}
        {item.category && (
          <Link
            href={`/categories/${item.category?.slug}`}
            className={`text-xs font-medium uppercase tracking-wide transition-colors ${
              isOutOfStock
                ? "text-gray-400 hover:text-gray-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item.category?.name}
          </Link>
        )}

        {/* Product Name */}
        <Link href={`/products/${item.id}`}>
          <h3
            className={`font-semibold text-sm leading-tight line-clamp-2 transition-colors min-h-[2.5rem] ${
              isOutOfStock
                ? "text-gray-500 group-hover:text-gray-600"
                : "text-gray-900 group-hover:text-blue-600"
            }`}
          >
            {item?.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className={`font-bold text-lg ${
              isOutOfStock ? "text-gray-400" : "text-gray-900"
            }`}
          >
            ${finalPrice.toFixed(2)}
          </span>
          {item?.discountAmount && item?.discountAmount > 0 && (
            <span
              className={`text-sm line-through ${
                isOutOfStock ? "text-gray-300" : "text-gray-400"
              }`}
            >
              ${item?.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Tags */}
        {item?.tags && item.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap pt-1">
            {item.tags.slice(0, 2).map((tagItem, idx) => (
              <Link
                key={idx}
                href={`/tags/${tagItem.tag?.slug}`}
                className={`text-xs px-2 py-1 rounded-md transition-colors ${
                  isOutOfStock
                    ? "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tagItem.tag?.name}
              </Link>
            ))}
            {item?.tags.length > 2 && (
              <span
                className={`text-xs px-2 py-1 ${
                  isOutOfStock ? "text-gray-300" : "text-gray-400"
                }`}
              >
                +{item?.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Stock Indicator & Cart Status */}
        <div className="flex items-center justify-between pt-1">
          {!isOutOfStock && totalStock <= 10 && (
            <p
              className={`text-xs font-medium ${
                totalStock <= 5 ? "text-orange-600" : "text-green-600"
              }`}
            >
              {totalStock <= 5
                ? `Hurry! Only ${totalStock} left`
                : `${totalStock} in stock`}
            </p>
          )}

          {cartQuantity > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              <ShoppingCart className="w-3 h-3" />
              {cartQuantity} in cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


