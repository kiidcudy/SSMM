import { NextResponse } from "next/server";
import { listOrders, listServices, updateOrder } from "@/lib/store/db";
import { providerStatus } from "@/lib/provider/perfectpanel";
import {
  resolveProviderCredentialsForOrder,
  submitOrderToProvider,
} from "@/lib/provider/submit-order";

function mapStatus(raw: string): "pending" | "processing" | "completed" | "partial" | "canceled" | "refunded" {
  const s = raw.toLowerCase();
  if (s.includes("complete")) return "completed";
  if (s.includes("partial")) return "partial";
  if (s.includes("cancel")) return "canceled";
  if (s.includes("refund")) return "refunded";
  if (s.includes("process") || s.includes("in progress") || s.includes("progress")) return "processing";
  return "pending";
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || req.headers.get("x-cron-secret") || "";
  const token = header.replace(/^Bearer\s+/i, "");
  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [orders, services] = await Promise.all([listOrders(), listServices()]);
  const pending = orders.filter(
    (o) => o.providerOrderId && (o.status === "pending" || o.status === "processing"),
  );
  const unsubmitted = orders.filter(
    (o) =>
      !o.providerOrderId &&
      o.status === "pending" &&
      !["canceled", "refunded", "completed", "partial"].includes(o.status),
  );

  let updated = 0;
  let submitted = 0;

  for (const order of pending) {
    try {
      const creds = await resolveProviderCredentialsForOrder(order, services);
      if (!creds) continue;
      const st = await providerStatus(order.providerOrderId!, creds);
      await updateOrder(order.id, {
        status: mapStatus(st.status),
        remains: Number(st.remains),
        startCount: Number(st.start_count),
      });
      updated += 1;
    } catch {
      // skip failed poll
    }
  }

  for (const order of unsubmitted) {
    const service = services.find((s) => s.id === order.serviceId);
    if (!service) continue;
    const result = await submitOrderToProvider(service, {
      link: order.link,
      quantity: order.quantity,
      comments: order.comments,
    });
    if (result.ok) {
      await updateOrder(order.id, {
        providerOrderId: result.providerOrderId,
        status: "processing",
        mode: "auto",
        providerError: undefined,
      });
      submitted += 1;
    } else {
      await updateOrder(order.id, { providerError: result.error });
    }
  }

  return NextResponse.json({
    ok: true,
    checked: pending.length,
    updated,
    resubmitChecked: unsubmitted.length,
    resubmitted: submitted,
  });
}

export async function POST(req: Request) {
  return GET(req);
}
