"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/types/contants";
import { OrderStatus } from "@/types";

interface OrdersListProps {
  orders: any[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start shopping to see your orders here
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const statusColor = {
          [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
          [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-800",
          [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-800",
          [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
          [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
          [OrderStatus.REFUNDED]: "bg-gray-100 text-gray-800",
        };

        return (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusColor[order.status as OrderStatus]}>
                      {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white"
                      >
                        <Image
                          src={item.product.mainImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-lg font-bold">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
