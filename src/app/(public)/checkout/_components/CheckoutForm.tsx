// app/(public)/checkout/_components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Address } from "@/types";
import { SHIPPING_METHODS } from "@/types/contants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MapPin, Loader2 } from "lucide-react";
import AddressSelector from "./AddressSelector";
import AddAddressDialog from "./AddAddressDialog";

interface CheckoutFormProps {
  savedAddresses: Address[];
  cartItems: any[];
}

export default function CheckoutForm({ savedAddresses, cartItems }: CheckoutFormProps) {
  const { user } = useUser();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    savedAddresses.find((a) => a.isDefault) || null
  );
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  const handleCheckout = async () => {

    console.log("user" , user)
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addressId: selectedAddress.id,
          shippingMethod,
          items: cartItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Failed to proceed to payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={user?.primaryEmailAddress?.emailAddress || ""}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Delivery Address</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddAddress(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {savedAddresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 mb-4">No saved addresses yet</p>
              <Button onClick={() => setShowAddAddress(true)}>
                Add Your First Address
              </Button>
            </div>
          ) : (
            <AddressSelector
              addresses={savedAddresses}
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
            />
          )}
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
            <div className="space-y-3">
              {SHIPPING_METHODS.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    shippingMethod === method.id
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setShippingMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="cursor-pointer">
                      <div className="font-semibold">{method.name}</div>
                      <div className="text-sm text-gray-600">
                        Delivery in {method.days} business days
                      </div>
                    </Label>
                  </div>
                  <div className="font-bold">
                    ${method.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Proceed Button */}
      <Button
        onClick={handleCheckout}
        disabled={!selectedAddress || isProcessing}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Proceed to Payment"
        )}
      </Button>

      <AddAddressDialog
        open={showAddAddress}
        onOpenChange={setShowAddAddress}
      />
    </div>
  );
}