import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, toSessionUser, touchAuth } from "@/lib/store/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { getRequestCountryCode } from "@/lib/geo-country";

const schema = z.object({
  username: z.string().trim().min(3).max(32),
  email: z.string().trim().email(),
  password: z.string().min(6).max(128),
});

function requestIp(headers: Headers): string | undefined {
  const xff = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (xff) return xff;
  return headers.get("x-real-ip")?.trim() || undefined;
}

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const countryCode = getRequestCountryCode(req.headers);
    const lastIp = requestIp(req.headers);
    const user = await createUser({ ...body, countryCode, lastIp });
    await touchAuth(user.id, { countryCode, lastIp });
    const sessionUser = toSessionUser(user);
    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);
    return NextResponse.json({ ok: true, user: sessionUser });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Signup failed";
    const status = message.includes("taken") ? 409 : message.includes("Invalid") || message.includes("expected") ? 400 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
