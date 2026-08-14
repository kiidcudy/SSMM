"use client";

import { useCallback, useEffect, useState } from "react";

type Ticket = {
  id: string;
  uid?: number;
  subject: string;
  status: string;
  username?: string;
  updatedAt: string;
  messages: Array<{ id: string; authorRole: string; body: string; createdAt: string }>;
};

function ticketNo(t: Ticket): string {
  return t.uid != null ? String(t.uid) : t.id.slice(0, 8);
}

export function TicketsPanel({ isAdmin = false }: { isAdmin?: boolean }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Failed to load tickets");
      setTickets(Array.isArray(data.tickets) ? data.tickets : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tickets");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const active = tickets.find((t) => t.id === selected) || null;

  async function createTicket(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");
    setBusy(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not open ticket");
        return;
      }
      const ticket = data.ticket as Ticket;
      setSubject("");
      setBody("");
      setMsg(`Ticket #${ticketNo(ticket)} opened`);
      setSelected(ticket.id);
      setTickets((prev) => [ticket, ...prev.filter((t) => t.id !== ticket.id)]);
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!active) return;
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reply", ticketId: active.id, body: reply }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Reply failed");
        return;
      }
      setReply("");
      const updated = data.ticket as Ticket;
      setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  async function closeTicket() {
    if (!active) return;
    setBusy(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "close", ticketId: active.id }),
      });
      const data = await res.json();
      if (res.ok && data.ticket) {
        const updated = data.ticket as Ticket;
        setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-3">
        {!isAdmin ? (
          <form onSubmit={createTicket} className="space-y-2 rounded-xl border border-[#243049] p-4">
            <p className="text-sm font-semibold">New ticket</p>
            <input
              className="input"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={160}
              required
            />
            <textarea
              className="input min-h-24"
              placeholder="Describe your issue"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={5000}
              required
            />
            <button type="submit" className="btn-primary w-full py-2 text-sm" disabled={busy}>
              {busy ? "Opening…" : "Open ticket"}
            </button>
          </form>
        ) : null}
        <div className="rounded-xl border border-[#243049]">
          {tickets.length === 0 ? (
            <p className="p-4 text-sm text-[#93a0b8]">No tickets yet.</p>
          ) : (
            <ul className="max-h-[420px] overflow-y-auto">
              {tickets.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(t.id);
                      setError("");
                      setMsg("");
                    }}
                    className={`block w-full border-b border-[#243049] px-3 py-3 text-left text-sm hover:bg-[#121a2b] ${
                      selected === t.id ? "bg-cyan-500/10" : ""
                    }`}
                  >
                    <span className="font-mono text-xs text-cyan-300">#{ticketNo(t)}</span>
                    <span className="mt-0.5 block font-medium">{t.subject}</span>
                    <span className="mt-1 block text-xs capitalize text-[#93a0b8]">
                      {isAdmin && t.username ? `${t.username} · ` : ""}
                      {t.status} · {new Date(t.updatedAt).toLocaleString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-[#243049] p-4">
        {error ? <p className="mb-2 text-sm text-red-300">{error}</p> : null}
        {msg ? <p className="mb-2 text-sm text-emerald-300">{msg}</p> : null}
        {!active ? (
          <p className="text-sm text-[#93a0b8]">Select a ticket to view the conversation.</p>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold">{active.subject}</h2>
                <p className="text-xs text-[#93a0b8]">
                  Ticket #{ticketNo(active)} · <span className="capitalize">{active.status}</span>
                </p>
              </div>
              {active.status !== "closed" ? (
                <button
                  type="button"
                  onClick={() => void closeTicket()}
                  disabled={busy}
                  className="rounded border border-[#243049] px-3 py-1 text-xs hover:bg-[#121a2b]"
                >
                  Close
                </button>
              ) : null}
            </div>
            <div className="mb-4 max-h-[360px] space-y-3 overflow-y-auto">
              {(active.messages || []).map((m) => (
                <div
                  key={m.id}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    m.authorRole === "admin" ? "bg-indigo-500/10" : "bg-[#121a2b]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide text-[#93a0b8]">{m.authorRole}</p>
                  <p className="mt-1 whitespace-pre-wrap">{m.body}</p>
                  <p className="mt-1 text-[11px] text-[#93a0b8]">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            {active.status !== "closed" ? (
              <form onSubmit={sendReply} className="space-y-2">
                <textarea
                  className="input min-h-20"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply…"
                  required
                />
                <button type="submit" className="btn-primary px-4 py-2 text-sm" disabled={busy}>
                  Send reply
                </button>
              </form>
            ) : (
              <p className="text-sm text-[#93a0b8]">This ticket is closed.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
