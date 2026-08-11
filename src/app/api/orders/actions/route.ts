import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import {
  createRefill,
  getOrder,
  listServices,
  updateOrder,
} from "@/lib/store/db";
import {
  isProviderConfigured,
  providerCancel,
  providerRefill,
} from "@/lib/provider/perfectpanel";

const schema = z.object({
  action: z.enum(["refill", "cancel"]),
  orderId: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = schema.parse(await req.json());
    const order = await getOrder(body.orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    if (session.role !== "admin" && order.userId !== session.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const services = await listServices();
    const service = services.find((s) => s.id === order.serviceId);

    if (body.action === "refill") {
      if (!service?.refill) return NextResponse.json({ error: "Refill not available" }, { status: 400 });
      if (!order.providerOrderId || !isProviderConfigured()) {
        return NextResponse.json({ error: "Refill unavailable" }, { status: 400 });
      }
      const result = await providerRefill(order.providerOrderId);
      const refill = await createRefill({
        orderId: order.id,
        userId: order.userId,
        providerRefillId: String(result.refill),
        status: "pending",
      });
      return NextResponse.json({ ok: true, refill });
    }

    if (!service?.cancel) return NextResponse.json({ error: "Cancel not available" }, { status: 400 });
    if (order.providerOrderId && isProviderConfigured()) {
      try {
        await providerCancel([order.providerOrderId]);
      } catch {
        /* still mark local */
      }
    }
    await updateOrder(order.id, { status: "canceled" });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Action failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
