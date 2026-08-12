"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";

export type AdminTicketRow = {
  id: string;
  uid: number;
  userId: string;
  username: string;
  subject: string;
  status: string;
  assignee: string;
  unread: boolean;
  createdAt: string;
  updatedAt: string;
  lastMessage?: string;
};

export function TicketsAdmin({ tickets, staff }: { tickets: AdminTicketRow[]; staff: string[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [view, setView] = useState<AdminTicketRow | null>(null);
  const [reply, setReply] = useState("");
  const [form, setForm] = useState({ username: "", subject: "", body: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const list = useMemo(() => {
    let rows = tickets;
    if (unreadOnly) rows = rows.filter((t) => t.unread);
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      (t) =>
        String(t.uid).includes(s) ||
        t.username.toLowerCase().includes(s) ||
        t.subject.toLowerCase().includes(s),
    );
  }, [tickets, q, unreadOnly]);

  async function run(fn: () => Promise<unknown>) {
    setBusy(true);
    setErr("");
    try {
      await fn();
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Add ticket
        </button>
        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            className={`hover:underline ${unreadOnly ? "font-semibold text-blue-600" : "text-gray-500"}`}
            onClick={() => setUnreadOnly((v) => !v)}
          >
            Show unread
          </button>
          <select className="rounded border border-gray-300 px-2 py-1 text-xs">
            <option>Ticket ID</option>
            <option>User</option>
            <option>Subject</option>
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="rounded border border-gray-300 px-3 py-1.5"
          />
        </div>
      </div>
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="table-admin">
          <thead>
            <tr>
              <th>
                <input type="checkbox" aria-label="Select all" />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Created</th>
              <th>Last update</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => (
              <tr key={t.id} className={t.unread ? "bg-orange-50/40" : undefined}>
                <td>
                  <input type="checkbox" aria-label={`Select ${t.uid}`} />
                </td>
                <td>{t.uid}</td>
                <td>{t.username}</td>
                <td>
                  <button
                    type="button"
                    className="text-left text-blue-600 hover:underline"
                    onClick={() => {
                      setView(t);
                      run(() => adminAction("update_ticket", { ticketId: t.id, unread: false }));
                    }}
                  >
                    {t.subject}
                  </button>
                </td>
                <td>
                  <select
                    className="rounded border border-gray-200 px-1 py-0.5 text-xs capitalize"
                    value={t.status === "open" ? "pending" : t.status}
                    disabled={busy}
                    onChange={(e) =>
                      run(() => adminAction("update_ticket", { ticketId: t.id, status: e.target.value }))
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="answered">Answered</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td>
                  <select
                    className="rounded border border-gray-200 px-1 py-0.5 text-xs"
                    value={t.assignee}
                    disabled={busy}
                    onChange={(e) =>
                      run(() => adminAction("update_ticket", { ticketId: t.id, assignee: e.target.value }))
                    }
                  >
                    <option value="">—</option>
                    {staff.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="whitespace-nowrap text-xs">{fmt(t.createdAt)}</td>
                <td className="whitespace-nowrap text-xs">{fmt(t.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="Add ticket" open={addOpen} onClose={() => setAddOpen(false)}>
        <div className="space-y-3">
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <textarea
            placeholder="Message"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            rows={4}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <button
            type="button"
            disabled={busy}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              run(async () => {
                await adminAction("add_ticket", form);
                setAddOpen(false);
                setForm({ username: "", subject: "", body: "" });
              })
            }
          >
            Create
          </button>
        </div>
      </Modal>

      <Modal title={view ? `#${view.uid} ${view.subject}` : "Ticket"} open={!!view} onClose={() => setView(null)}>
        {view ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              {view.username} · {view.lastMessage || "Open to reply"}
            </p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder="Reply…"
              className="w-full rounded border px-3 py-1.5 text-sm"
            />
            <button
              type="button"
              disabled={busy || !reply.trim()}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
              onClick={() =>
                run(async () => {
                  await adminAction("reply_ticket", { ticketId: view.id, body: reply });
                  setReply("");
                  setView(null);
                })
              }
            >
              Send reply
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function fmt(iso: string) {
  try {
    const d = new Date(iso);
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  } catch {
    return iso;
  }
}
