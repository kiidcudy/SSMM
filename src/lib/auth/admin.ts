import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";

export async function requireAdmin() {
  const session = await readSession();
  if (!session || session.role !== "admin") {
    return { session: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session, error: null };
}
