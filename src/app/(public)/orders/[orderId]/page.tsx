// app/(public)/orders/[orderId]/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getOrderById } from "@/actions/OrderActions";
import OrderDetailClient from "../_components/OrderDetailClient";


export default async function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/orders");
  }

  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <OrderDetailClient order={order} />
        </div>
      </div>
    </div>
  );
}

