"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";

export type AdminTicketMessage = {
  id: string;
  authorRole: string;
  authorName: string;
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
  const [searchBy, setSearchBy] = useState<"id" | "user" | "subject">("id");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [form, setForm] = useState({ username: "", subject: "", body: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const list = useMemo(() => {
    let rows = tickets;
    if (unreadOnly) rows = rows.filter((t) => t.unread);
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((t) => {
      if (searchBy === "id") return String(t.uid ?? "").includes(s);
      if (searchBy === "user") return (t.username || "").toLowerCase().includes(s);
      return (t.subject || "").toLowerCase().includes(s);
    });
  }, [tickets, q, unreadOnly, searchBy]);

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
    setErr("");
    if (t.unread) {
      void run(() => adminAction("update_ticket", { ticketId: t.id, unread: false }));
    }
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(list.map((t) => t.id)) : new Set());
  }

  function toggleOne(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function statusLabel(status: string | undefined) {
    const s = status || "pending";
    if (s === "open") return "Pending";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  if (view) {
    const thread = [...(view.messages || [])].reverse();
    return (
      <div>
        <button
          type="button"
          onClick={() => setViewId(null)}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          &lt; Back
        </button>
        {err ? <p className="mb-3 text-sm text-red-600">{err}</p> : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
          <div>
            <div className="mb-4 flex items-start justify-between gap-4 border-b border-gray-200 pb-3">
              <h1 className="text-xl font-semibold text-gray-900">{view.subject}</h1>
              <p className="shrink-0 text-sm text-gray-500">ID: {view.uid}</p>
            </div>

            {view.status !== "closed" ? (
              <div className="mb-6 rounded border border-gray-200 bg-white">
                <div className="flex items-center gap-1 border-b border-gray-100 px-2 py-1.5 text-gray-500">
                  <ToolbarBtn label="B" title="Bold" />
                  <ToolbarBtn label="I" title="Italic" italic />
                  <ToolbarBtn label="“" title="Quote" />
                  <ToolbarBtn label="•" title="List" />
                  <ToolbarBtn label="1." title="Numbered" />
                  <span className="ml-auto text-xs text-blue-600">Insert saved reply</span>
                </div>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={6}
                  placeholder="Write a reply…"
                  className="w-full resize-y border-0 px-3 py-2 text-sm outline-none focus:ring-0"
                />
                <div className="border-t border-gray-100 px-3 py-2 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <span aria-hidden>📎</span> Attach files
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 px-3 py-3">
                  <button
                    type="button"
                    disabled={busy || !reply.trim()}
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    onClick={() =>
                      run(async () => {
                        await adminAction("reply_ticket", { ticketId: view.id, body: reply });
                        setReply("");
                      })
                    }
                  >
                    Submit reply
                  </button>
                  <div className="inline-flex overflow-hidden rounded border border-gray-300">
                    <button
                      type="button"
                      disabled={busy}
                      className="bg-white px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                      onClick={() =>
                        run(() => adminAction("update_ticket", { ticketId: view.id, status: "closed" }))
                      }
                    >
                      Close ticket
                    </button>
                    <select
                      className="border-l border-gray-300 bg-white px-1 text-sm outline-none"
                      disabled={busy}
                      value={view.status === "open" ? "pending" : view.status}
                      onChange={(e) =>
                        run(() =>
                          adminAction("update_ticket", { ticketId: view.id, status: e.target.value }),
                        )
                      }
                      aria-label="Change status"
                    >
                      <option value="pending">Pending</option>
                      <option value="answered">Answered</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                This ticket is closed.{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  disabled={busy}
                  onClick={() =>
                    run(() => adminAction("update_ticket", { ticketId: view.id, status: "pending" }))
                  }
                >
                  Reopen
                </button>
              </div>
            )}

            <div className="space-y-5">
              {thread.length === 0 ? (
                <p className="text-sm text-gray-500">No messages yet.</p>
              ) : (
                thread.map((m) => {
                  const isAdmin = m.authorRole === "admin";
                  return (
                    <div key={m.id}>
                      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-medium text-gray-800">{m.authorName}</span>
                        <span className="text-xs text-gray-400">{fmt(m.createdAt)}</span>
                      </div>
                      <div className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`relative max-w-[92%] rounded px-3 py-2 text-sm leading-relaxed text-gray-900 ${
                            isAdmin ? "bg-[#d4edda]" : "bg-[#cce5ff]"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{m.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <aside className="space-y-2 text-sm">
            <Link
              href={`/admin/users?q=${encodeURIComponent(view.username)}`}
              className="font-medium text-blue-600 underline"
            >
              {view.username}
            </Link>
            <div>
              <Link href="/admin/orders" className="text-blue-600 hover:underline">
                Orders
              </Link>
            </div>
            <div>
              <Link href="/admin/payments" className="text-blue-600 hover:underline">
                Payments
              </Link>
            </div>
            <div className="pt-3 text-xs text-gray-500">
              <p>
                Status: <span className="capitalize text-gray-700">{statusLabel(view.status)}</span>
              </p>
              <p className="mt-1">
                Assignee:{" "}
                <select
                  className="mt-0.5 w-full rounded border border-gray-200 px-1 py-0.5 text-xs"
                  value={view.assignee}
                  disabled={busy}
                  onChange={(e) =>
                    run(() =>
                      adminAction("update_ticket", { ticketId: view.id, assignee: e.target.value }),
                    )
                  }
                >
                  <option value="">—</option>
                  {staff.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
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
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button
            type="button"
            className={`hover:underline ${unreadOnly ? "font-semibold text-blue-600" : "text-gray-500"}`}
            onClick={() => setUnreadOnly((v) => !v)}
          >
            Show unread
          </button>
          <div className="flex overflow-hidden rounded border border-gray-300 bg-white">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-40 border-0 px-3 py-1.5 text-sm outline-none sm:w-52"
            />
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value as typeof searchBy)}
              className="border-l border-gray-300 bg-gray-50 px-2 text-xs text-gray-600 outline-none"
            >
              <option value="id">Ticket ID</option>
              <option value="user">User</option>
              <option value="subject">Subject</option>
            </select>
          </div>
        </div>
      </div>
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="table-admin">
          <thead>
            <tr className="bg-gray-50">
              <th>
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={list.length > 0 && list.every((t) => selected.has(t.id))}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
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
            {list.map((t, i) => (
              <tr
                key={t.id}
                role="button"
                tabIndex={0}
                onClick={() => openTicket(t)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openTicket(t);
                  }
                }}
                className={`cursor-pointer ${
                  t.unread
                    ? "bg-blue-900 text-white hover:bg-blue-800"
                    : i % 2 === 1
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "hover:bg-gray-50"
                }`}
              >
                <td
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    aria-label={`Select ${t.uid}`}
                    checked={selected.has(t.id)}
                    onChange={(e) => toggleOne(t.id, e.target.checked)}
                  />
                </td>
                <td className="font-mono">{t.uid}</td>
                <td className={t.unread ? "font-semibold" : undefined}>{t.username}</td>
                <td
                  className={
                    t.unread ? "font-semibold text-cyan-100" : "font-medium text-blue-600"
                  }
                >
                  {t.subject}
                </td>
                <td>
                  <span className="capitalize">{statusLabel(t.status)}</span>
                </td>
                <td>{t.assignee || ""}</td>
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
    </div>
  );
}

function ToolbarBtn({ label, title, italic }: { label: string; title: string; italic?: boolean }) {
  return (
    <button
      type="button"
      title={title}
      className={`rounded px-2 py-0.5 text-xs font-semibold hover:bg-gray-100 ${italic ? "italic" : ""}`}
      onClick={(e) => e.preventDefault()}
    >
      {label}
    </button>
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
