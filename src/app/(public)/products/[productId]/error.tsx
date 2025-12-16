// app/products/[id]/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Oops! Something Went Wrong
            </h1>
            <p className="text-gray-600 mb-2">
              We couldn't load the product details.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              {error.message || "An unexpected error occurred"}
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={reset} className="w-full" size="lg">
              Try Again
            </Button>
            <Button
              onClick={() => router.push("/products")}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Browse All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}