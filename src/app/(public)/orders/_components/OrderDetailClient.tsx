// app/(public)/orders/[orderId]/_components/OrderDetailClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  Check,
  Clock,
  X,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ORDER_STATUS_LABELS } from "@/types/contants";
import { OrderStatus } from "@/types";

interface OrderDetailClientProps {
  order: any;
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  const statusSteps = [
    { status: OrderStatus.PENDING, label: "Order Placed", icon: Package },
    { status: OrderStatus.PROCESSING, label: "Processing", icon: Clock },
    { status: OrderStatus.SHIPPED, label: "Shipped", icon: Truck },
    { status: OrderStatus.DELIVERED, label: "Delivered", icon: Check },
  ];

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.status === order.status
  );

  const isCancelled = order.status === OrderStatus.CANCELLED;
  const isRefunded = order.status === OrderStatus.REFUNDED;

  const statusColor = {
    [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-800",
    [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-800",
    [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
    [OrderStatus.REFUNDED]: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/orders">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
            <p className="text-sm text-gray-600">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <Badge className={statusColor[order.status as OrderStatus]}>
          {ORDER_STATUS_LABELS[order.status as OrderStatus]}
        </Badge>
      </div>

      {/* Order Timeline */}
      {!isCancelled && !isRefunded && (
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Progress Bar */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${
                      (currentStatusIndex / (statusSteps.length - 1)) * 100
                    }%`,
                  }}
                />
              </div>

              {/* Steps */}
              <div className="relative grid grid-cols-4 gap-4">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;

                  return (
                    <div
                      key={step.status}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        } ${isCurrent ? "ring-4 ring-green-200" : ""}`}
                      >
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <p
                        className={`text-xs mt-2 text-center font-medium ${
                          isCompleted ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                      {isCompleted && (
                        <p className="text-xs text-gray-500 mt-1">
                          {index === 0 && order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : index === 1 && order.paidAt
                            ? new Date(order.paidAt).toLocaleDateString()
                            : index === 2 && order.shippedAt
                            ? new Date(order.shippedAt).toLocaleDateString()
                            : index === 3 && order.deliveredAt
                            ? new Date(order.deliveredAt).toLocaleDateString()
                            : ""}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items ({order.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <Link
                      href={`/products/${item.productId}`}
                      className="relative w-20 h-20 flex-shrink-0 bg-white rounded overflow-hidden group"
                    >
                      <Image
                        src={item.product.mainImage}
                        alt={item.product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.productId}`}
                        className="font-semibold hover:text-blue-600 line-clamp-2 transition-colors"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                        {item.variant?.color && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{
                                backgroundColor:
                                  item.variant.color.toLowerCase(),
                              }}
                            />
                            {item.variant.color}
                          </span>
                        )}
                        {item.variant?.size && (
                          <span className="bg-gray-200 px-2 py-0.5 rounded text-xs">
                            Size: {item.variant.size}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <div className="text-right">
                          <div className="font-semibold">
                            ${Number(item.price).toFixed(2)} each
                          </div>
                          <div className="text-sm text-gray-600">
                            Total: ${Number(item.total).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ${Number(order.subtotal).toFixed(2)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">
                    -${Number(order.discount).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  ${Number(order.tax).toFixed(2)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${Number(order.total).toFixed(2)}</span>
              </div>

              {order.paidAt && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Paid on{" "}
                  {new Date(order.paidAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-semibold">{order.address.fullName}</p>
                <p className="text-gray-600">{order.address.addressLine1}</p>
                {order.address.addressLine2 && (
                  <p className="text-gray-600">{order.address.addressLine2}</p>
                )}
                <p className="text-gray-600">
                  {order.address.city}
                  {order.address.state && `, ${order.address.state}`}{" "}
                  {order.address.postalCode}
                </p>
                <p className="text-gray-600">{order.address.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    CARD
                  </div>
                  <span className="text-gray-600">Card payment via Stripe</span>
                </div>
                {order.stripePaymentIntentId && (
                  <p className="text-xs text-gray-500 font-mono">
                    {order.stripePaymentIntentId}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>

            {order.status === OrderStatus.PENDING && (
              <Button variant="destructive" className="w-full">
                <X className="w-4 h-4 mr-2" />
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
