"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReviewDisplay {
  id: string;
  author: string;
  authorImage?: string | null;
  rating: number;
  title?: string | null;
  comment: string;
  images: string[];
  isVerified: boolean;
  date: string;
}

interface ProductTabsProps {
  product: {
    description: string;
    category: { name: string };
    stock: number;
    sku: string | null;
    barcode: string | null;
    colors?: string[];
    sizes?: string[];
    tags?: string[];
    rating: number;
    reviewCount: number;
    reviews: ReviewDisplay[];
  };
}

export default function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger
          value="description"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3 font-semibold"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="additional"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3 font-semibold"
        >
          Additional Information
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3 font-semibold"
        >
          Reviews ({product.reviewCount})
        </TabsTrigger>
      </TabsList>

      {/* Description Tab */}
      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </TabsContent>

      {/* Additional Information Tab */}
      <TabsContent value="additional" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Product Details</h3>
            <dl className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-gray-600 font-medium">Category:</dt>
                <dd className="font-semibold">{product.category.name}</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-gray-600 font-medium">Stock:</dt>
                <dd className="font-semibold">{product.stock} units</dd>
              </div>
              {product.sku && (
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <dt className="text-gray-600 font-medium">SKU:</dt>
                  <dd className="font-mono font-semibold">{product.sku}</dd>
                </div>
              )}
              {product.barcode && (
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <dt className="text-gray-600 font-medium">Barcode:</dt>
                  <dd className="font-mono font-semibold">{product.barcode}</dd>
                </div>
              )}
              {product.colors && product.colors.length > 0 && (
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <dt className="text-gray-600 font-medium">Colors:</dt>
                  <dd className="font-semibold">{product.colors.join(", ")}</dd>
                </div>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <dt className="text-gray-600 font-medium">Sizes:</dt>
                  <dd className="font-semibold">{product.sizes.join(", ")}</dd>
                </div>
              )}
            </dl>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-8">
          {/* Review Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {product.rating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 mb-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {product.reviewCount}{" "}
                {product.reviewCount === 1 ? "review" : "reviews"}
              </div>
            </div>

            <div className="flex-1">
              <Button variant="outline" className="w-full sm:w-auto">
                Write a Review
              </Button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {product.reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">
                  No reviews yet. Be the first to review this product!
                </p>
                <Button variant="outline">Write the First Review</Button>
              </div>
            ) : (
              product.reviews.map((review) => (
                <Card key={review.id} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        {review.authorImage ? (
                          <Image
                            src={review.authorImage}
                            alt={review.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold">
                              {review.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{review.author}</p>
                            {review.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {review.title && (
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                    )}
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {review.comment}
                    </p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {review.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                          >
                            <Image
                              src={img}
                              alt={`Review image ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
