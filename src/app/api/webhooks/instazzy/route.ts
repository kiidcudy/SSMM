import { NextResponse } from "next/server";
import { approveFund, listFunds, rejectFund } from "@/lib/store/db";
import { verifyInstazzyCallback } from "@/lib/payments/instazzy-partner";

/**
 * Instazzy partner payment callback (HMAC-signed). On success the matching
 * fund request is approved and the user's balance is credited — idempotent.
 */
export async function POST(req: Request) {
  const rawBody = await req.text();
  const auth = verifyInstazzyCallback(req, rawBody);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { payload } = auth;
  const funds = await listFunds();
  const fund = funds.find((f) => f.id === payload.partnerOrderId);
  if (!fund) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  if (fund.status === "completed") {
    return NextResponse.json({ ok: true, already: true });
  }

  if (payload.status === "success") {
    if (fund.status === "pending") {
      await approveFund(fund.id);
    }
    return NextResponse.json({ ok: true });
  }

  if (fund.status === "pending") {
    try {
      await rejectFund(fund.id);
    } catch {
      /* ignore */
    }
  }
  return NextResponse.json({ ok: true });
}
