import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import { createFundRequest, listFundsForUser, listLedger } from "@/lib/store/db";
import { PAYMENT_METHODS } from "@/lib/site";

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
    const row = await createFundRequest({
      userId: session.id,
      username: session.username,
      method: body.method,
      amount: Math.round(body.amount * 100) / 100,
      note: body.note || "",
    });
    return NextResponse.json({ ok: true, id: row.id, fund: row });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Fund request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
