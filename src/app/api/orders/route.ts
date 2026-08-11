import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import {
  adjustBalance,
  createOrder,
  findUserById,
  listOrders,
  listServices,
  updateOrder,
} from "@/lib/store/db";
import { chargeFor } from "@/lib/data/catalog";
import { isProviderConfigured, providerAdd } from "@/lib/provider/perfectpanel";

const createSchema = z.object({
  serviceId: z.coerce.number().int().positive(),
  link: z.string().trim().url().max(2048),
  quantity: z.coerce.number().int().positive(),
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
    if (body.quantity < service.min || body.quantity > service.max) {
      return NextResponse.json(
        { error: `Quantity must be between ${service.min} and ${service.max}` },
        { status: 400 },
      );
    }

    const user = await findUserById(session.id);
    if (!user || user.status !== "active") {
      return NextResponse.json({ error: "Account unavailable" }, { status: 403 });
    }

    const charge = chargeFor(service, body.quantity);
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
          link: body.link,
          quantity: body.quantity,
        });
        providerOrderId = String(result.order);
        status = "processing";
      } catch {
        // Keep local pending order; admin/cron can retry
        status = "pending";
      }
    }

    const order = await createOrder({
      userId: session.id,
      serviceId: service.id,
      serviceName: service.name,
      link: body.link,
      quantity: body.quantity,
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
