"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";

export type AdminTicketMessage = {
  id: string;
  authorRole: string;
  body: string;
  createdAt: string;
};

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
  messages: AdminTicketMessage[];
};

export function TicketsAdmin({ tickets, staff }: { tickets: AdminTicketRow[]; staff: string[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);
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

  const view = viewId ? tickets.find((t) => t.id === viewId) || null : null;

  useEffect(() => {
    if (viewId && !tickets.some((t) => t.id === viewId)) setViewId(null);
  }, [tickets, viewId]);

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

  function openTicket(t: AdminTicketRow) {
    setViewId(t.id);
    setReply("");
    if (t.unread) {
      void run(() => adminAction("update_ticket", { ticketId: t.id, unread: false }));
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
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ID, user, subject…"
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
              <tr
                key={t.id}
                className={
                  t.unread
                    ? "bg-blue-900 text-white hover:bg-blue-800"
                    : "hover:bg-gray-50"
                }
              >
                <td>
                  <input type="checkbox" aria-label={`Select ${t.uid}`} />
                </td>
                <td>
                  <button
                    type="button"
                    className={`font-mono font-semibold hover:underline ${
                      t.unread ? "text-cyan-200" : "text-blue-600"
                    }`}
                    onClick={() => openTicket(t)}
                  >
                    #{t.uid}
                  </button>
                </td>
                <td className={t.unread ? "font-semibold" : undefined}>{t.username}</td>
                <td>
                  <button
                    type="button"
                    className={`text-left hover:underline ${
                      t.unread ? "font-semibold text-white" : "text-blue-600"
                    }`}
                    onClick={() => openTicket(t)}
                  >
                    {t.subject}
                  </button>
                </td>
                <td>
                  <select
                    className={`rounded border px-1 py-0.5 text-xs capitalize ${
                      t.unread ? "border-blue-700 bg-blue-950 text-white" : "border-gray-200"
                    }`}
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
                    className={`rounded border px-1 py-0.5 text-xs ${
                      t.unread ? "border-blue-700 bg-blue-950 text-white" : "border-gray-200"
                    }`}
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

      <Modal
        title={view ? `#${view.uid} — ${view.subject}` : "Ticket"}
        open={!!view}
        onClose={() => setViewId(null)}
      >
        {view ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              {view.username} · <span className="capitalize">{view.status}</span> ·{" "}
              {view.messages.length} message{view.messages.length === 1 ? "" : "s"}
            </p>

            <div className="max-h-[360px] space-y-2 overflow-y-auto rounded border border-gray-200 bg-gray-50 p-3">
              {view.messages.length === 0 ? (
                <p className="text-sm text-gray-500">No messages yet.</p>
              ) : (
                view.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      m.authorRole === "admin"
                        ? "border border-indigo-200 bg-indigo-50"
                        : "border border-gray-200 bg-white"
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                      {m.authorRole}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-gray-900">{m.body}</p>
                    <p className="mt-1 text-[11px] text-gray-400">{fmt(m.createdAt)}</p>
                  </div>
                ))
              )}
            </div>

            {view.status !== "closed" ? (
              <>
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
                    })
                  }
                >
                  Send reply
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-500">This ticket is closed.</p>
            )}
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
