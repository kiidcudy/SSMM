import { NextResponse } from "next/server";
import { approveFund, listFunds, rejectFund } from "@/lib/store/db";
import { cryptomusApiKey, verifyCryptomusWebhook } from "@/lib/payments/cryptomus";

export async function POST(req: Request) {
  const apiKey = cryptomusApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: "Cryptomus not configured" }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!verifyCryptomusWebhook(payload, apiKey)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const orderId = String(payload.order_id || "");
  const status = String(payload.status || "");
  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  const funds = await listFunds();
  const fund = funds.find((f) => f.id === orderId);
  if (!fund) {
    return NextResponse.json({ error: "Fund not found" }, { status: 404 });
  }

  if (fund.status === "completed") {
    return NextResponse.json({ ok: true, already: true });
  }

  if (status === "paid" || status === "paid_over") {
    if (fund.status === "pending") {
      await approveFund(fund.id);
    }
    return NextResponse.json({ ok: true });
  }

  if (status === "cancel" || status === "fail" || status === "system_fail") {
    if (fund.status === "pending") {
      try {
        await rejectFund(fund.id);
      } catch {
        /* ignore */
      }
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true, ignored: status });
}
