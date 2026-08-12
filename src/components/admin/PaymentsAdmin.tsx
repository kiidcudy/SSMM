"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";
import { ApproveFundForm } from "@/components/ApproveFundForm";

export type AdminPaymentRow = {
  id: string;
  userId: string;
  username: string;
  balance: number;
  amount: number;
  method: string;
  note: string;
  status: string;
  mode: "auto" | "manual";
  createdAt: string;
  updatedAt: string;
};

export function PaymentsAdmin({ payments }: { payments: AdminPaymentRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ username: "", amount: "", method: "Bonus", memo: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return payments;
    return payments.filter(
      (p) =>
        p.username.toLowerCase().includes(s) ||
        p.id.includes(s) ||
        p.method.toLowerCase().includes(s) ||
        p.note.toLowerCase().includes(s),
    );
  }, [payments, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
        >
          Add payment
        </button>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">Export</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="rounded border border-gray-300 px-3 py-1.5"
          />
          <span className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600">User</span>
        </div>
      </div>
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Balance</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  No payments.
                </td>
              </tr>
            ) : (
              list.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.username}</td>
                  <td>{p.balance.toFixed(2)}</td>
                  <td>{p.amount.toFixed(2)}</td>
                  <td>
                    <div>{p.method}</div>
                    <div className="text-[11px] capitalize text-gray-500">{p.status}</div>
                    {p.note ? <div className="max-w-[220px] truncate text-[11px] text-gray-400">{p.note}</div> : null}
                  </td>
                  <td className="whitespace-nowrap text-xs">{fmt(p.createdAt)}</td>
                  <td className="whitespace-nowrap text-xs">{fmt(p.updatedAt)}</td>
                  <td className="capitalize">{p.mode}</td>
                  <td>
                    {p.status === "pending" ? <ApproveFundForm fundId={p.id} /> : <span className="text-gray-400">—</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Add payment" open={open} onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Username</span>
            <input
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Amount</span>
            <input
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Method</span>
            <select
              value={form.method}
              onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))}
              className="w-full rounded border px-3 py-1.5"
            >
              <option>Bonus</option>
              <option>Binance Pay Gateway</option>
              <option>Cryptomus</option>
              <option>Coinbase Commerce</option>
              <option>Manual</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Memo</span>
            <textarea
              value={form.memo}
              onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))}
              rows={3}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
              onClick={async () => {
                setBusy(true);
                setErr("");
                try {
                  await adminAction("add_payment", {
                    username: form.username,
                    amount: Number(form.amount),
                    method: form.method,
                    memo: form.memo,
                  });
                  setOpen(false);
                  setForm({ username: "", amount: "", method: "Bonus", memo: "" });
                  router.refresh();
                } catch (e) {
                  setErr(e instanceof Error ? e.message : "Failed");
                } finally {
                  setBusy(false);
                }
              }}
            >
              Add payment
            </button>
            <button type="button" className="rounded border px-3 py-1.5 text-sm" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
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
