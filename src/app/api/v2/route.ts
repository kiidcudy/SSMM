import { NextResponse } from "next/server";
import { z } from "zod";
import {
  adjustBalance,
  createOrder,
  findUserByApiKey,
  getOrder,
  listServices,
} from "@/lib/store/db";
import { chargeFor } from "@/lib/data/catalog";
import { isProviderConfigured, providerAdd } from "@/lib/provider/perfectpanel";

async function readParams(req: Request): Promise<Record<string, string>> {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = (await req.json()) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(json)) out[k] = String(v ?? "");
    return out;
  }
  const form = await req.formData();
  const out: Record<string, string> = {};
  form.forEach((v, k) => {
    out[k] = String(v);
  });
  return out;
}

export async function POST(req: Request) {
  try {
    const params = await readParams(req);
    const key = params.key || "";
    const action = params.action || "";
    if (!key) return NextResponse.json({ error: "Incorrect API key" });

    const user = await findUserByApiKey(key);
    if (!user) return NextResponse.json({ error: "Incorrect API key" });

    if (action === "services") {
      const services = await listServices();
      return NextResponse.json(
        services.map((s) => ({
          service: s.id,
          name: s.name,
          type: s.type,
          category: s.category,
          rate: String(s.rate),
          min: String(s.min),
          max: String(s.max),
          refill: false,
          cancel: false,
        })),
      );
    }

    if (action === "balance") {
      return NextResponse.json({ balance: user.balance.toFixed(5), currency: "USD" });
    }

    if (action === "status") {
      const orderId = params.order;
      if (!orderId) return NextResponse.json({ error: "Incorrect order ID" });
      const order = await getOrder(orderId);
      if (!order || order.userId !== user.id) {
        return NextResponse.json({ error: "Incorrect order ID" });
      }
      return NextResponse.json({
        charge: order.charge.toFixed(5),
        start_count: String(order.startCount ?? 0),
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
        remains: String(order.remains ?? order.quantity),
        currency: "USD",
      });
    }

    if (action === "add") {
      const parsed = z
        .object({
          service: z.coerce.number().int().positive(),
          link: z.string().trim().min(1),
          quantity: z.coerce.number().int().positive(),
          comments: z.string().optional(),
        })
        .parse({
          service: params.service,
          link: params.link,
          quantity: params.quantity,
          comments: params.comments,
        });

      const services = await listServices();
      const service = services.find((s) => s.id === parsed.service);
      if (!service) return NextResponse.json({ error: "Incorrect service ID" });
      if (parsed.quantity < service.min || parsed.quantity > service.max) {
        return NextResponse.json({ error: "Quantity out of range" });
      }

      const charge = chargeFor(service, parsed.quantity);
      if (user.balance < charge) return NextResponse.json({ error: "Not enough funds" });

      await adjustBalance(user.id, -charge, charge);

      let providerOrderId: string | undefined;
      let status: "pending" | "processing" = "pending";
      if (isProviderConfigured()) {
        try {
          const result = await providerAdd({
            service: service.providerServiceId ?? service.id,
            link: parsed.link,
            quantity: parsed.quantity,
            comments: parsed.comments,
          });
          providerOrderId = String(result.order);
          status = "processing";
        } catch {
          status = "pending";
        }
      }

      const order = await createOrder({
        userId: user.id,
        serviceId: service.id,
        serviceName: service.name,
        link: parsed.link,
        quantity: parsed.quantity,
        charge,
        status,
        providerOrderId,
      });

      return NextResponse.json({ order: order.id });
    }

    return NextResponse.json({ error: "Incorrect request" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Incorrect request";
    return NextResponse.json({ error: message });
  }
}
