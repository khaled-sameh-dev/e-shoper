import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { UserRole } from "@/types";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  console.log("whebhook running");
  if (!WEBHOOK_SECRET) {
    return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
  }

  // 1️⃣ Get Svix headers
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // 2️⃣ Get raw body
  const payload = await req.text();

  // 3️⃣ Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // 4️⃣ Handle events
  switch (event.type) {
    case "user.created": {
      const user = event.data;
      console.log("user created", user);

      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.email_addresses[0].email_address,
          name: user.username || "New Customer",
          role: UserRole.CUSTOMER,
        },
      });
      break;
    }

    case "user.updated": {
      const user = event.data;

      await prisma.user.update({
        where: { clerkId: user.id },
        data: {
          email: user.email_addresses[0].email_address,
          firstName: user.first_name,
          lastName: user.last_name,
          image: user.image_url,
        },
      });
      break;
    }

    case "user.deleted": {
      const user = event.data;

      await prisma.user.delete({
        where: { clerkId: user.id },
      });
      break;
    }
  }

  return new Response("OK", { status: 200 });
}
