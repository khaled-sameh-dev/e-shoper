"use client";

import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";
import {
  selectCartItems,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "@/store/cartSlice";
import { CartItem, Product, ProductVariant } from "@/types";
import { getProductById } from "@/actions/ProductActions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CartPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [itemsWithProducts, setItemsWithProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  // Fetch product data for each cart item
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const itemsWithData = await Promise.all(
          cartItems.map(async (item) => {
            try {
              const product = await getProductById(item.productId);
              if (!product)
                return {
                  ...item,
                  id: item.id,
                  product: undefined,
                  variant: null,
                };

              const variant =
                product.variants?.find(
                  (v: ProductVariant) => v.id === item.variantId
                ) || null;

              return {
                ...item,
                id: item.id,
                product: product as Product,
                variant,
              };
            } catch (error) {
              console.error(`Error fetching product ${item.productId}:`, error);
              return {
                ...item,
                id: item.id,
                product: undefined,
                variant: null,
              };
            }
          })
        );

        setItemsWithProducts(itemsWithData);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [cartItems]);

  const subtotal = itemsWithProducts.reduce((total, item) => {
    if (!item.product) return total;
    const price = item.product.price;
    const discount = item.product.discountAmount || 0;
    const finalPrice = price - discount;
    return total + finalPrice * item.quantity;
  }, 0);

  const discount = itemsWithProducts.reduce((total, item) => {
    if (!item.product) return total;
    const discountAmount = item.product.discountAmount || 0;
    return total + discountAmount * item.quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal;

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = useCallback(() => {
    if (!isLoaded) return;

    console.log("user 2" , user)

    if (!user) {
      router.push("/sign-in?redirect_url=/checkout");
    } else {
      console.log("checkout")
      console.log("router", router)
      router.push("/checkout");
    }
  }, [user, isLoaded]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto text-gray-400 animate-spin mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Shopping Cart ({cartItems.length})
          </h1>
          <button
            onClick={handleClearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence mode="popLayout">
              {itemsWithProducts.map((item) => {
                if (!item.product) return null;

                const finalPrice =
                  item.product.price - (item.product.discountAmount || 0);
                const itemTotal = finalPrice * item.quantity;
                const maxStock = item.variant?.stock || 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    layout
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <Link
                        href={`/products/${item.productId}`}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={item.product.mainImage}
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.productId}`}
                              className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 transition-colors text-sm sm:text-base"
                            >
                              {item.product.name}
                            </Link>

                            {/* Variant Details */}
                            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mt-1.5">
                              {item.attributes?.color && (
                                <span className="flex items-center gap-1">
                                  <span
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{
                                      backgroundColor:
                                        item.attributes.color.toLowerCase(),
                                    }}
                                  />
                                  {item.attributes.color}
                                </span>
                              )}
                              {item.attributes?.size && (
                                <span className="bg-gray-100 px-2 py-0.5 rounded">
                                  Size: {item.attributes.size}
                                </span>
                              )}
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mt-2">
                              <span className="font-bold text-gray-900 text-sm sm:text-base">
                                ${finalPrice.toFixed(2)}
                              </span>
                              {item.product.discountAmount &&
                                item.product.discountAmount > 0 && (
                                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                                    ${item.product.price.toFixed(2)}
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Remove Button - Desktop */}
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="hidden sm:block text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls & Item Total */}
                        <div className="flex items-center justify-between mt-3 gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 font-semibold min-w-[3rem] text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= maxStock}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              ${itemTotal.toFixed(2)}
                            </span>
                            {/* Remove Button - Mobile */}
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="sm:hidden text-gray-400 hover:text-red-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-5">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span className="font-semibold">
                    ${(subtotal + discount).toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Auth Alert */}
              {isLoaded && !user && (
                <Alert className="mb-4">
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    Sign in to proceed with checkout
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleCheckout}
                className="w-full mb-3"
                size="lg"
              >
                {!user ? "Sign In to Checkout" : "Proceed to Checkout"}
              </Button>

              <Link
                href="/products"
                className="block text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Savings Summary */}
              {discount > 0 && (
                <div className="mt-5 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    🎉 You're saving ${discount.toFixed(2)} on this order!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
