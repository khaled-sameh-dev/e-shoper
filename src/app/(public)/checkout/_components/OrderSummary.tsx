// app/(public)/checkout/_components/OrderSummary.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  items: any[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((total, item) => {
    if (!item.product) return total;
    const price = item.product.price;
    const discount = item.product.discountAmount || 0;
    const finalPrice = price - discount;
    return total + finalPrice * item.quantity;
  }, 0);

  const shipping = 5.99; // Standard shipping
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {items.map((item) => {
            if (!item.product) return null;

            const finalPrice =
              item.product.price - (item.product.discountAmount || 0);

            return (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={item.product.mainImage}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                    {item.quantity}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">
                    {item.product.name}
                  </p>
                  {item.attributes?.color && (
                    <p className="text-xs text-gray-500">
                      {item.attributes.color}
                      {item.attributes.size && ` • ${item.attributes.size}`}
                    </p>
                  )}
                  <p className="text-sm font-semibold mt-1">
                    ${finalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (Est.)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600">
            🔒 Secure checkout powered by Stripe
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
