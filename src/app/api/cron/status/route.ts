import { NextResponse } from "next/server";
import { listOrders, updateOrder } from "@/lib/store/db";
import { isProviderConfigured, providerStatus } from "@/lib/provider/perfectpanel";

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

  if (!isProviderConfigured()) {
    return NextResponse.json({ ok: true, updated: 0, note: "Provider not configured" });
  }

  const orders = await listOrders();
  const pending = orders.filter(
    (o) => o.providerOrderId && (o.status === "pending" || o.status === "processing"),
  );

  let updated = 0;
  for (const order of pending) {
    try {
      const st = await providerStatus(order.providerOrderId!);
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

  return NextResponse.json({ ok: true, checked: pending.length, updated });
}

export async function POST(req: Request) {
  return GET(req);
}
