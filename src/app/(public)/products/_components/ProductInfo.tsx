"use client";

import { useState } from "react";
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    comparePrice: number | null;
    stock: number;
    sku: string | null;
    rating: number;
    reviewCount: number;
    category: {
      name: string;
      slug: string;
    };
    colors?: string[];
    sizes?: string[];
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      productId: product.id,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    // TODO: Implement add to cart logic
  };

  const handleAddToWishlist = () => {
    console.log("Add to wishlist:", product.id);
    // TODO: Implement wishlist logic
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
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              {product.rating.toFixed(1)} ({product.reviewCount}{" "}
              {product.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm">
          {product.category.name}
        </Badge>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="text-xl text-gray-500 line-through">
            ${product.comparePrice.toFixed(2)}
          </span>
        )}
        <Badge
          variant={product.stock > 0 ? "default" : "destructive"}
          className="ml-2"
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </Badge>
      </div>

      {/* SKU */}
      {product.sku && (
        <p className="text-sm text-gray-600">
          SKU: <span className="font-mono">{product.sku}</span>
        </p>
      )}

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      <Separator />

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">
            Color:{" "}
            <span className="font-normal text-gray-600">{selectedColor}</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "border-black ring-2 ring-black ring-offset-2 scale-110"
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
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Size</label>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
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

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-8 font-semibold min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-sm text-orange-600 font-medium">
              Only {product.stock} left!
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-2">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 h-12 text-base font-semibold"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12"
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12"
          onClick={handleShare}
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Truck className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-semibold">Free Shipping</p>
            <p className="text-xs text-gray-600">Orders over $50</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <RefreshCw className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-semibold">Easy Returns</p>
            <p className="text-xs text-gray-600">30 day returns</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Shield className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-semibold">Secure Payment</p>
            <p className="text-xs text-gray-600">100% protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}