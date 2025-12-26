// actions/AddressActions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { Address } from "@/types";
import { revalidatePath } from "next/cache";

export async function createAddress(data: {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      const { user: clerkUser } = await auth();
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser?.emailAddresses[0]?.emailAddress || "",
          name: clerkUser?.fullName || null,
          image: clerkUser?.imageUrl || null,
        },
      });
    }

    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    revalidatePath("/checkout");
    return { success: true, data: address };
  } catch (error) {
    console.error("Error creating address:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create address",
    };
  }
}

export async function getUserAddresses(): Promise<Address[]> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return [];
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        addresses: {
          orderBy: {
            isDefault: "desc",
          },
        },
      },
    });

    return (user?.addresses as Address[]) || [];
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
}

export async function updateAddress(addressId: string, data: Partial<Address>) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId: user.id,
      },
    });

    if (!existingAddress) {
      throw new Error("Address not found");
    }

    // If setting as default, unset others
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: user.id,
          id: { not: addressId },
        },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id: addressId },
      data,
    });

    revalidatePath("/checkout");
    return { success: true, data: address };
  } catch (error) {
    console.error("Error updating address:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update address",
    };
  }
}

export async function deleteAddress(addressId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.address.delete({
      where: {
        id: addressId,
        userId: user.id,
      },
    });

    revalidatePath("/checkout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting address:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete address",
    };
  }
}

export async function setDefaultAddress(addressId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Unset all defaults
    await prisma.address.updateMany({
      where: { userId: user.id },
      data: { isDefault: false },
    });

    // Set new default
    await prisma.address.update({
      where: {
        id: addressId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/checkout");
    return { success: true };
  } catch (error) {
    console.error("Error setting default address:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to set default address",
    };
  }
}
