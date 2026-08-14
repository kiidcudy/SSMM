import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import { createFundRequest, listFundsForUser, listLedger } from "@/lib/store/db";
import { PAYMENT_METHODS, SITE } from "@/lib/site";
import { createCryptomusInvoice, isCryptomusConfigured } from "@/lib/payments/cryptomus";

const methodSlugs = new Set(PAYMENT_METHODS.map((m) => m.slug));

const schema = z.object({
  method: z.string().refine((v) => methodSlugs.has(v as (typeof PAYMENT_METHODS)[number]["slug"]), {
    message: "Invalid payment method",
  }),
  amount: z.coerce.number().positive().max(100000),
  note: z.string().trim().max(500).optional().default(""),
});

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const funds = await listFundsForUser(session.id);
  const ledger = await listLedger(session.id);
  return NextResponse.json({ funds, ledger });
}

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = schema.parse(await req.json());
    if (body.method !== "cryptomus" && body.method !== "binance-pay") {
      return NextResponse.json(
        { error: "Please contact us to pay with this method." },
        { status: 400 },
      );
    }

    const amount = Math.round(body.amount * 100) / 100;

    if (body.method === "cryptomus") {
      if (!isCryptomusConfigured()) {
        return NextResponse.json(
          { error: "Cryptomus is not configured yet. Please try Binance Pay or contact support." },
          { status: 503 },
        );
      }
      const row = await createFundRequest({
        userId: session.id,
        username: session.username,
        method: "cryptomus",
        amount,
        note: body.note || "",
        mode: "auto",
      });
      const base = SITE.url.replace(/\/$/, "");
      const invoice = await createCryptomusInvoice({
        amountUsd: amount,
        orderId: row.id,
        urlReturn: `${base}/dashboard/add-funds`,
        urlSuccess: `${base}/dashboard/add-funds?paid=1`,
        urlCallback: `${base}/api/webhooks/cryptomus`,
      });
      return NextResponse.json({
        ok: true,
        id: row.id,
        fund: row,
        paymentUrl: invoice.url,
        uuid: invoice.uuid,
      });
    }

    const row = await createFundRequest({
      userId: session.id,
      username: session.username,
      method: body.method,
      amount,
      note: body.note || "",
    });
    return NextResponse.json({ ok: true, id: row.id, fund: row });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Fund request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
