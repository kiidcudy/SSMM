import { NextResponse } from "next/server";

/** PerfectPanel-style /api docs entry — public docs live at /api-docs */
export async function GET() {
  return NextResponse.redirect(new URL("/api-docs", process.env.NEXT_PUBLIC_SITE_URL || "https://ssmmpanel.com"), 308);
}
