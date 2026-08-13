import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import {
  adjustBalance,
  createOrder,
  findUserById,
  getServiceOverrides,
  listOrders,
  listServices,
  updateOrder,
} from "@/lib/store/db";
import { chargeFor } from "@/lib/data/catalog";
import { isProviderConfigured, providerAdd } from "@/lib/provider/perfectpanel";
import { countLines, fieldsForService } from "@/lib/provider/service-fields";

const createSchema = z.object({
  serviceId: z.coerce.number().int().positive(),
  link: z.string().trim().max(2048).optional().default(""),
  quantity: z.coerce.number().int().positive().optional(),
  comments: z.string().optional(),
  keywords: z.string().optional(),
  usernames: z.string().optional(),
  hashtags: z.string().optional(),
  hashtag: z.string().optional(),
  username: z.string().optional(),
  media: z.string().optional(),
  groups: z.string().optional(),
  answer_number: z.union([z.string(), z.number()]).optional(),
  country: z.string().optional(),
  device: z.union([z.string(), z.number()]).optional(),
  type_of_traffic: z.union([z.string(), z.number()]).optional(),
  google_keyword: z.string().optional(),
  referring_url: z.string().optional(),
  posts: z.union([z.string(), z.number()]).optional(),
  old_posts: z.union([z.string(), z.number()]).optional(),
  delay: z.union([z.string(), z.number()]).optional(),
  expiry: z.string().optional(),
  runs: z.union([z.string(), z.number()]).optional(),
  interval: z.union([z.string(), z.number()]).optional(),
});

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = await listOrders(session.id);
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = createSchema.parse(await req.json());
    const services = await listServices();
    const service = services.find((s) => s.id === body.serviceId);
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    const overrides = await getServiceOverrides();
    const denyDup = Boolean(overrides[String(service.id)]?.denyDuplicates);
    if (denyDup && body.link?.trim()) {
      const open = (await listOrders(session.id)).some(
        (o) =>
          o.serviceId === service.id &&
          o.link.trim().toLowerCase() === body.link!.trim().toLowerCase() &&
          !["completed", "canceled", "partial", "refunded"].includes(o.status),
      );
      if (open) {
        return NextResponse.json(
          { error: "Duplicate link not allowed while another order is still open for this service" },
          { status: 400 },
        );
      }
    }

    const fields = fieldsForService(service);
    let quantity = body.quantity ?? service.min;

    if (fields.quantityFromComments) {
      const lines = countLines(body.comments || "");
      if (lines < 1) {
        return NextResponse.json({ error: "Enter at least one comment (one per line)" }, { status: 400 });
      }
      quantity = lines;
    }

    if (fields.needsLink && !body.link) {
      return NextResponse.json({ error: "Link is required" }, { status: 400 });
    }
    if (fields.needsLink && body.link) {
      try {
        // allow non-http usernames for rare cases; prefer URL when looks like URL
        if (body.link.includes("://") || body.link.startsWith("www.")) {
          new URL(body.link.startsWith("www.") ? `https://${body.link}` : body.link);
        }
      } catch {
        return NextResponse.json({ error: "Invalid link" }, { status: 400 });
      }
    }

    if (fields.needsQuantity || fields.quantityFromComments) {
      if (quantity < service.min || quantity > service.max) {
        return NextResponse.json(
          { error: `Quantity must be between ${service.min} and ${service.max}` },
          { status: 400 },
        );
      }
    } else {
      quantity = Math.max(1, service.min || 1);
    }

    if (fields.extras.includes("comments") && !countLines(body.comments || "")) {
      return NextResponse.json({ error: "Comments are required" }, { status: 400 });
    }
    if (fields.extras.includes("username") && !body.username?.trim()) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
    if (fields.extras.includes("keywords") && !body.keywords?.trim()) {
      return NextResponse.json({ error: "Keywords are required" }, { status: 400 });
    }
    if (fields.extras.includes("usernames") && !body.usernames?.trim()) {
      return NextResponse.json({ error: "Usernames are required" }, { status: 400 });
    }
    if (fields.extras.includes("hashtag") && !body.hashtag?.trim()) {
      return NextResponse.json({ error: "Hashtag is required" }, { status: 400 });
    }
    if (fields.extras.includes("media") && !body.media?.trim()) {
      return NextResponse.json({ error: "Media URL is required" }, { status: 400 });
    }
    if (fields.extras.includes("groups") && !body.groups?.trim()) {
      return NextResponse.json({ error: "Groups are required" }, { status: 400 });
    }
    if (fields.extras.includes("answer_number") && (body.answer_number === undefined || body.answer_number === "")) {
      return NextResponse.json({ error: "Poll answer number is required" }, { status: 400 });
    }

    const user = await findUserById(session.id);
    if (!user || user.status !== "active") {
      return NextResponse.json({ error: "Account unavailable" }, { status: 403 });
    }

    const charge = chargeFor(service, quantity);
    if (user.balance < charge) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 402 });
    }

    await adjustBalance(session.id, -charge, charge);

    let providerOrderId: string | undefined;
    let status: "pending" | "processing" = "pending";

    if (isProviderConfigured()) {
      try {
        const providerServiceId = service.providerServiceId ?? service.id;
        const result = await providerAdd({
          service: providerServiceId,
          link: body.link || undefined,
          quantity: fields.needsQuantity || fields.quantityFromComments ? quantity : undefined,
          comments: body.comments,
          keywords: body.keywords,
          usernames: body.usernames,
          hashtags: body.hashtags,
          hashtag: body.hashtag,
          username: body.username,
          media: body.media,
          groups: body.groups,
          answer_number: body.answer_number,
          country: body.country,
          device: body.device,
          type_of_traffic: body.type_of_traffic,
          google_keyword: body.google_keyword,
          referring_url: body.referring_url,
          posts: body.posts,
          old_posts: body.old_posts,
          delay: body.delay ?? (service.type === "subscriptions" ? 0 : undefined),
          expiry: body.expiry,
          runs: body.runs,
          interval: body.interval,
          min: service.type === "subscriptions" ? service.min : undefined,
          max: service.type === "subscriptions" ? service.max : undefined,
        });
        providerOrderId = String(result.order);
        status = "processing";
      } catch {
        status = "pending";
      }
    }

    const order = await createOrder({
      userId: session.id,
      serviceId: service.id,
      serviceName: service.name,
      link: body.link || body.username || "",
      quantity,
      charge,
      status,
      providerOrderId,
    });

    if (providerOrderId) {
      await updateOrder(order.id, { providerOrderId, status });
    }

    return NextResponse.json({ ok: true, id: order.id, order });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Order failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
