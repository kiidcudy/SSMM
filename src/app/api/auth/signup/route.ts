import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, toSessionUser, touchAuth } from "@/lib/store/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

const schema = z.object({
  username: z.string().trim().min(3).max(32),
  email: z.string().trim().email(),
  password: z.string().min(6).max(128),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const user = await createUser(body);
    await touchAuth(user.id);
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
