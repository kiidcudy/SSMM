import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import { approveFund } from "@/lib/store/db";

const schema = z.object({
  id: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = schema.parse(await req.json());
    const fund = await approveFund(body.id);
    return NextResponse.json({ ok: true, fund });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Approve failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
