import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import { createTicket, listTickets, replyTicket, setTicketStatus, getTicket } from "@/lib/store/db";

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tickets =
    session.role === "admin" ? await listTickets() : await listTickets(session.id);
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    if (body.action === "reply") {
      const parsed = z
        .object({
          ticketId: z.string().min(1),
          body: z.string().trim().min(1).max(5000),
        })
        .parse(body);
      const ticket = await getTicket(parsed.ticketId);
      if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });
      if (session.role !== "admin" && ticket.userId !== session.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const updated = await replyTicket({
        ticketId: parsed.ticketId,
        authorId: session.id,
        authorRole: session.role === "admin" ? "admin" : "user",
        body: parsed.body,
      });
      return NextResponse.json({ ok: true, ticket: updated });
    }

    if (body.action === "close" && session.role === "admin") {
      const parsed = z.object({ ticketId: z.string().min(1) }).parse(body);
      const updated = await setTicketStatus(parsed.ticketId, "closed");
      return NextResponse.json({ ok: true, ticket: updated });
    }

    const parsed = z
      .object({
        subject: z.string().trim().min(3).max(160),
        body: z.string().trim().min(3).max(5000),
      })
      .parse(body);
    const ticket = await createTicket({
      userId: session.id,
      username: session.username,
      subject: parsed.subject,
      body: parsed.body,
    });
    return NextResponse.json({ ok: true, ticket });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Ticket failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
