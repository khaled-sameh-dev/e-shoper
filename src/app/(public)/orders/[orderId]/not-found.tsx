// app/(public)/orders/[orderId]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

export default function OrderNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <PackageX className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the order you're looking for.
        </p>
        <Button asChild>
          <Link href="/orders">Back to Orders</Link>
        </Button>
      </div>
    </div>
  );
}
