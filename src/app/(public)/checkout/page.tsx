import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserAddresses } from "@/actions/AddressActions";
import CheckoutClient from "./_components/CheckoutClient";

export default async function CheckoutPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/checkout");
  }

  const addresses = await getUserAddresses();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <CheckoutClient savedAddresses={addresses} />
        </div>
      </div>
    </div>
  );
}
