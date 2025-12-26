// actions/CartActions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { CartItem } from "@/types";
import { revalidatePath } from "next/cache";

export async function syncCartToDatabase(items: CartItem[]) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Delete existing cart items for user
    await prisma.cartItem.deleteMany({
      where: { userId: user.id },
    });

    // Create new cart items
    if (items.length > 0) {
      await prisma.cartItem.createMany({
        data: items.map((item) => ({
          userId: user.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      });
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error syncing cart:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sync cart",
    };
  }
}

export async function getCartFromDatabase() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, items: [] };
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!user) {
      return { success: false, items: [] };
    }

    const cartItems: CartItem[] = user.cartItems.map((item) => ({
      id: `${item.productId}:${item.variantId}`,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      attributes: {
        color: item.variant?.color || null,
        size: item.variant?.size || null,
      },
    }));

    return { success: true, items: cartItems };
  } catch (error) {
    console.error("Error fetching cart from database:", error);
    return { success: false, items: [] };
  }
}

export async function clearCartInDatabase() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.cartItem.deleteMany({
      where: { userId: user.id },
    });

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to clear cart",
    };
  }
}

export async function mergeCartOnLogin(localCartItems: CartItem[]) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        cartItems: true,
      },
    });

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Merge local cart with database cart
    const dbCartMap = new Map(
      user.cartItems.map((item) => [
        `${item.productId}:${item.variantId}`,
        item,
      ])
    );

    for (const localItem of localCartItems) {
      const key = `${localItem.productId}:${localItem.variantId}`;
      const dbItem = dbCartMap.get(key);

      if (dbItem) {
        // Update quantity (sum of local and db)
        await prisma.cartItem.update({
          where: { id: dbItem.id },
          data: { quantity: dbItem.quantity + localItem.quantity },
        });
      } else {
        // Add new item
        await prisma.cartItem.create({
          data: {
            userId: user.id,
            productId: localItem.productId,
            variantId: localItem.variantId,
            quantity: localItem.quantity,
          },
        });
      }
    }

    // Get merged cart
    const mergedCart = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        variant: true,
      },
    });

    const cartItems: CartItem[] = mergedCart.map((item) => ({
      id: `${item.productId}:${item.variantId}`,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      attributes: {
        color: item.variant?.color || null,
        size: item.variant?.size || null,
      },
    }));

    revalidatePath("/cart");
    return { success: true, items: cartItems };
  } catch (error) {
    console.error("Error merging cart:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to merge cart",
      items: [],
    };
  }
}
