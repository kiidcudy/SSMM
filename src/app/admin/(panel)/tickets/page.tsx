import { listTickets, listUsers } from "@/lib/store/db";
import { TicketsAdmin } from "@/components/admin/TicketsAdmin";

export default async function AdminTicketsPage() {
  const [tickets, users] = await Promise.all([listTickets(), listUsers()]);
  const staff = users.filter((u) => u.role === "admin").map((u) => u.username);

  return (
    <TicketsAdmin
      staff={staff}
      tickets={tickets.map((t) => ({
        id: t.id,
        uid: t.uid,
        userId: t.userId,
        username: t.username,
        subject: t.subject,
        status: t.status,
        assignee: t.assignee || "",
        unread: Boolean(t.unread),
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        lastMessage: t.messages[t.messages.length - 1]?.body,
      }))}
    />
  );
}
