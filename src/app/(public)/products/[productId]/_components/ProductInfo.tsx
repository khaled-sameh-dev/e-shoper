"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductDetailData } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementCartItem,
  decrementCartItem,
  selectCartItemQuantity,
  selectCartLoading,
} from "@/store/cartSlice";
import { CartItem } from "@/types";

interface ProductInfoProps {
  product: ProductDetailData;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCartLoading);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] || null
  );
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  // Find the selected variant based on color and size
  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const availableStock = selectedVariant?.stock || 0;

  // Get cart item quantity for this specific variant
  const cartItemQuantity = useSelector(
    selectCartItemQuantity(product.id, selectedVariant?.id || null)
  );

  // Calculate final price with discount
  const finalPrice = product.discountAmount
    ? product.price - product.discountAmount
    : product.price;

  const discountPercentage = product.discountAmount
    ? Math.round((product.discountAmount / product.price) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedVariant || availableStock === 0) return;

    const cartItem: CartItem = {
      productId: product.id,
      variantId: selectedVariant.id,
      quantity: 1,
      attributes: {
        color: selectedColor,
        size: selectedSize,
      },
    };

    dispatch(addToCart(cartItem));

    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleIncrementInCart = () => {
    if (!selectedVariant || cartItemQuantity >= availableStock) return;
    const cartItemId = `${product.id}:${selectedVariant.id}`;
    dispatch(incrementCartItem(cartItemId));
  };

  const handleDecrementInCart = () => {
    if (!selectedVariant) return;
    const cartItemId = `${product.id}:${selectedVariant.id}`;
    dispatch(decrementCartItem(cartItemId));
  };

  const handleAddToWishlist = () => {
    console.log("Add to wishlist:", {
      productId: product.id,
      variantId: selectedVariant?.id,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share failed:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const isInCart = cartItemQuantity > 0;

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1.5">
              {product.rating.toFixed(1)} ({product.reviewCount}{" "}
              {product.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs px-2 py-0.5">
          {product.category.name}
        </Badge>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl font-bold text-gray-900">
          ${finalPrice.toFixed(2)}
        </span>
        {product.discountAmount && product.discountAmount > 0 && (
          <>
            <span className="text-lg text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant="destructive" className="text-xs px-2 py-0.5">
              Save ${product.discountAmount.toFixed(2)} ({discountPercentage}%
              off)
            </Badge>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-4">
        <Badge
          variant={availableStock > 0 ? "default" : "destructive"}
          className="text-xs px-2 py-0.5"
        >
          {availableStock > 0 ? `${availableStock} in stock` : "Out of stock"}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>

      <Separator />

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-900 mb-6">
            Color:
            <span className="font-normal text-gray-600 ml-2">{selectedColor}</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-lg border-2 transition-all ${
                  selectedColor === color
                    ? "border-black ring-2 ring-black ring-offset-2 scale-105"
                    : "border-gray-300 hover:border-gray-400 hover:scale-105"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-900">Size</label>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-gray-900 hover:bg-gray-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cart Status */}
      {isInCart && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {cartItemQuantity} {cartItemQuantity === 1 ? "item" : "items"}{" "}
                in cart
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDecrementInCart}
                disabled={isLoading}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="font-bold text-sm min-w-[1.5rem] text-center">
                {cartItemQuantity}
              </span>
              <Button
                onClick={handleIncrementInCart}
                disabled={cartItemQuantity >= availableStock || isLoading}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleAddToCart}
          disabled={
            availableStock === 0 ||
            !selectedVariant ||
            isLoading ||
            cartItemQuantity >= availableStock
          }
          className={`flex-1 h-11 text-sm font-semibold transition-all ${
            showAddedToCart ? "bg-green-600 hover:bg-green-700" : ""
          }`}
          size="lg"
        >
          {showAddedToCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Cart!
            </>
          ) : availableStock === 0 ? (
            "Out of Stock"
          ) : cartItemQuantity >= availableStock ? (
            "Max Stock Reached"
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-11 w-11 p-0"
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-11 w-11 p-0"
          onClick={handleShare}
          aria-label="Share product"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded-lg">
            <Truck className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <p className="text-xs font-semibold">Free Shipping</p>
            <p className="text-xs text-gray-600">Orders over $50</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded-lg">
            <RefreshCw className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <p className="text-xs font-semibold">Easy Returns</p>
            <p className="text-xs text-gray-600">30 day returns</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded-lg">
            <Shield className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <p className="text-xs font-semibold">Secure Payment</p>
            <p className="text-xs text-gray-600">100% protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}