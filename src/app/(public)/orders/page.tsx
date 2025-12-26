import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/actions/OrderActions";
import OrdersList from "./_components/OrdersList";


export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/orders");
  }

  const orders = await getUserOrders();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          <OrdersList orders={orders} />
        </div>
      </div>
    </div>
  );
}
