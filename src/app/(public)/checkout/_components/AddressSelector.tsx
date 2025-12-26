"use client";

import { Address } from "@/types";
import { Check, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
}

export default function AddressSelector({
  addresses,
  selectedAddress,
  onSelectAddress,
}: AddressSelectorProps) {
  return (
    <div className="space-y-3">
      {addresses.map((address) => {
        const isSelected = selectedAddress?.id === address.id;

        return (
          <Card
            key={address.id}
            className={`cursor-pointer transition-all ${
              isSelected
                ? "border-2 border-black bg-gray-50"
                : "border border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onSelectAddress(address)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected ? "border-black bg-black" : "border-gray-300"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">{address.fullName}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>
                      {address.city}
                      {address.state && `, ${address.state}`}{" "}
                      {address.postalCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
