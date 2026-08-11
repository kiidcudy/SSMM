import { NextResponse } from "next/server";
import { z } from "zod";
import { findUserByUsername, toSessionUser, touchAuth, verifyPassword } from "@/lib/store/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

const schema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const user = await findUserByUsername(body.username);
    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    if (user.status !== "active") {
      return NextResponse.json({ error: "Account suspended" }, { status: 403 });
    }
    await touchAuth(user.id);
    const sessionUser = toSessionUser(user);
    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);
    return NextResponse.json({ ok: true, user: sessionUser });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Login failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
