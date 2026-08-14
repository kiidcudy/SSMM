import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth/session";
import { createTicket, listTickets, replyTicket, setTicketStatus, getTicket } from "@/lib/store/db";

function zodMessage(e: z.ZodError): string {
  const issue = e.issues[0];
  if (!issue) return "Invalid input";
  const field = issue.path[0];
  if (field === "subject") {
    if (issue.code === "too_small") return "Subject must be at least 1 character";
    if (issue.code === "too_big") return "Subject is too long (max 160 characters)";
  }
  if (field === "body") {
    if (issue.code === "too_small") return "Message must be at least 1 character";
    if (issue.code === "too_big") return "Message is too long (max 5000 characters)";
  }
  return issue.message || "Invalid input";
}

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
          body: z.string().trim().min(1, "Reply cannot be empty").max(5000),
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

    if (body.action === "close") {
      const parsed = z.object({ ticketId: z.string().min(1) }).parse(body);
      const ticket = await getTicket(parsed.ticketId);
      if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });
      if (session.role !== "admin" && ticket.userId !== session.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const updated = await setTicketStatus(parsed.ticketId, "closed");
      return NextResponse.json({ ok: true, ticket: updated });
    }

    const parsed = z
      .object({
        subject: z
          .string()
          .trim()
          .min(1, "Subject is required")
          .max(160, "Subject is too long"),
        body: z
          .string()
          .trim()
          .min(1, "Message is required")
          .max(5000, "Message is too long"),
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
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: zodMessage(e) }, { status: 400 });
    }
    const message = e instanceof Error ? e.message : "Ticket failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
