// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { prisma } from "@/lib/db/prisma";
// import { headers } from "next/headers";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(req: NextRequest) {
//   console.log("sreipe webhook running");
//   try {
//     const body = await req.text();
//     const headersList = await headers();
//     const signature = headersList.get("stripe-signature");

//     if (!signature) {
//       return NextResponse.json(
//         { error: "No signature provided" },
//         { status: 400 }
//       );
//     }

//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
//     } catch (err) {
//       console.error("Webhook signature verification failed:", err);
//       return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     // Handle the event
//     switch (event.type) {
//       case "checkout.session.completed": {
//         const session = event.data.object as Stripe.Checkout.Session;
//         await handleCheckoutSessionCompleted(session);
//         break;
//       }

//       case "payment_intent.succeeded": {
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.log("PaymentIntent succeeded:", paymentIntent.id);
//         break;
//       }

//       case "payment_intent.payment_failed": {
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.error("PaymentIntent failed:", paymentIntent.id);
//         break;
//       }

//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return NextResponse.json(
//       { error: "Webhook handler failed" },
//       { status: 500 }
//     );
//   }
// }

// async function handleCheckoutSessionCompleted(
//   session: Stripe.Checkout.Session
// ) {
//   try {
//     const {
//       id: sessionId,
//       amount_total,
//       customer_email,
//       payment_intent,
//       metadata,
//     } = session;

//     if (!metadata) {
//       throw new Error("No metadata in session");
//     }

//     const { userId, addressId, shippingMethod, items } = metadata;

//     if (!userId || !addressId || !items) {
//       throw new Error("Missing required metadata");
//     }

//     const parsedItems = JSON.parse(items);

//     // Calculate subtotal and tax
//     const subtotal = (amount_total || 0) / 100; // Convert from cents
//     const tax = subtotal * 0.1; // 10% tax estimation

//     // Create order
//     const order = await prisma.order.create({
//       data: {
//         orderNumber: `ORD-${Date.now()}`,
//         userId,
//         addressId,
//         status: "PROCESSING",
//         subtotal,
//         discount: 0,
//         tax,
//         total: subtotal,
//         stripeSessionId: sessionId,
//         stripePaymentIntentId: payment_intent as string,
//         paidAt: new Date(),
//       },
//     });

//     // Create order items and update stock
//     for (const item of parsedItems) {
//       const product = await prisma.product.findUnique({
//         where: { id: item.productId },
//       });

//       if (!product) continue;

//       const variant = await prisma.productVariant.findUnique({
//         where: { id: item.variantId },
//       });

//       if (!variant) continue;

//       const finalPrice =
//         Number(product.price) - (Number(product.discountAmount) || 0);

//       // Create order item
//       await prisma.orderItem.create({
//         data: {
//           orderId: order.id,
//           productId: item.productId,
//           variantId: item.variantId,
//           quantity: item.quantity,
//           price: finalPrice,
//           total: finalPrice * item.quantity,
//         },
//       });

//       // Update variant stock
//       await prisma.productVariant.update({
//         where: { id: item.variantId },
//         data: {
//           stock: {
//             decrement: item.quantity,
//           },
//         },
//       });
//     }

//     console.log(`Order created successfully: ${order.orderNumber}`);
//   } catch (error) {
//     console.error("Error handling checkout session:", error);
//     throw error;
//   }
// }

// app/api/webhooks/stripe/route.ts (UPDATED)
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db/prisma";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("PaymentIntent succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("PaymentIntent failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    const {
      id: sessionId,
      amount_total,
      customer_email,
      payment_intent,
      metadata,
    } = session;

    if (!metadata) {
      throw new Error("No metadata in session");
    }

    const { userId, addressId, shippingMethod, items } = metadata;

    if (!userId || !addressId || !items) {
      throw new Error("Missing required metadata");
    }

    const parsedItems = JSON.parse(items);

    // Calculate totals
    const shippingCosts = {
      standard: 5.99,
      express: 12.99,
      overnight: 24.99,
    };
    const shippingCost =
      shippingCosts[shippingMethod as keyof typeof shippingCosts] || 5.99;

    const subtotal = ((amount_total || 0) - shippingCost * 100) / 100;
    const tax = subtotal * 0.1;

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const order = await tx.order.create({
        data: {
          orderNumber: `ORD-${Date.now()}`,
          userId,
          addressId,
          status: "PROCESSING",
          subtotal,
          discount: 0,
          tax,
          total: (amount_total || 0) / 100,
          stripeSessionId: sessionId,
          stripePaymentIntentId: payment_intent as string,
          paidAt: new Date(),
        },
      });

      // 2. Create order items and update stock
      for (const item of parsedItems) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
        });

        if (!variant) {
          throw new Error(`Variant ${item.variantId} not found`);
        }

        // Check stock availability
        if (variant.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}. Available: ${variant.stock}, Requested: ${item.quantity}`
          );
        }

        const finalPrice =
          Number(product.price) - (Number(product.discountAmount) || 0);

        // Create order item
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: finalPrice,
            total: finalPrice * item.quantity,
          },
        });

        // Update variant stock
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 3. Clear user's cart from database
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return order;
    });

    console.log(`Order created successfully: ${result.orderNumber}`);
    console.log(`Cart cleared for user: ${userId}`);
  } catch (error) {
    console.error("Error handling checkout session:", error);
    throw error;
  }
}
