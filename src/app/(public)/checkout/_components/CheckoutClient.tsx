// app/(public)/checkout/_components/CheckoutClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectCartItems } from "@/store/cartSlice";
import { Address } from "@/types";
import { getProductById } from "@/actions/ProductActions";
import { Loader2 } from "lucide-react";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

interface CheckoutClientProps {
  savedAddresses: Address[];
}

export default function CheckoutClient({
  savedAddresses,
}: CheckoutClientProps) {
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const [itemsWithProducts, setItemsWithProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
      return;
    }

    const fetchProductData = async () => {
      setLoading(true);
      try {
        const itemsWithData = await Promise.all(
          cartItems.map(async (item) => {
            try {
              const product = await getProductById(item.productId);
              if (!product) return null;

              const variant = product.variants?.find(
                (v) => v.id === item.variantId
              );

              return {
                ...item,
                product,
                variant,
              };
            } catch (error) {
              console.error(`Error fetching product ${item.productId}:`, error);
              return null;
            }
          })
        );

        setItemsWithProducts(itemsWithData.filter((item) => item !== null));
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [cartItems, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CheckoutForm
          savedAddresses={savedAddresses}
          cartItems={itemsWithProducts}
        />
      </div>
      <div className="lg:col-span-1">
        <OrderSummary items={itemsWithProducts} />
      </div>
    </div>
  );
}
