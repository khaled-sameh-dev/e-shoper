import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-8">
          <div className="text-center space-y-6">
            {/* Cancel Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Checkout Cancelled
              </h1>
              <p className="text-gray-600">
                Your order was not completed. Your cart items are still saved.
              </p>
            </div>

            {/* Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-700">
                Don't worry! Your cart items are still saved and you can
                complete your purchase anytime.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Cart
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
