// app/api/checkout/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db/prisma";
import { getProductById } from "@/actions/ProductActions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { addressId, shippingMethod, items } = body;

    if (!addressId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify address belongs to user
    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId: user.id,
      },
    });

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    // Fetch product details and calculate totals
    let subtotal = 0;
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const product = await getProductById(item.productId);

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      const variant = product.variants?.find((v) => v.id === item.variantId);

      if (!variant || variant.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      const finalPrice = product.price - (product.discountAmount || 0);
      subtotal += finalPrice * item.quantity;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.mainImage],
            description: `${variant.color || ""} ${variant.size || ""}`.trim(),
          },
          unit_amount: Math.round(finalPrice * 100), // Convert to cents
        },
        quantity: item.quantity,
      });
    }

    // Add shipping
    const shippingCosts = {
      standard: 5.99,
      express: 12.99,
      overnight: 24.99,
    };
    const shippingCost =
      shippingCosts[shippingMethod as keyof typeof shippingCosts] || 5.99;

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping",
          description: shippingMethod,
        },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        addressId: address.id,
        shippingMethod,
        items: JSON.stringify(
          items.map((item: any) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
