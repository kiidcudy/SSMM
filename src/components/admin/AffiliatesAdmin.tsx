"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";
import type { AffiliateRow } from "@/lib/store/db";

export function AffiliatesAdmin({ affiliates }: { affiliates: AffiliateRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ username: "", code: "", ratePercent: "5" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Affiliates</h1>
          <p className="text-sm text-gray-500">Referral codes and commission rates.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Add affiliate
        </button>
      </div>
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="table-admin">
          <thead>
            <tr>
              <th>User</th>
              <th>Code</th>
              <th>Rate %</th>
              <th>Clicks</th>
              <th>Signups</th>
              <th>Earned</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No affiliates yet.
                </td>
              </tr>
            ) : (
              affiliates.map((a) => (
                <tr key={a.id}>
                  <td>{a.username}</td>
                  <td className="font-mono text-xs">{a.code}</td>
                  <td>{a.ratePercent}%</td>
                  <td>{a.clicks}</td>
                  <td>{a.signups}</td>
                  <td>${a.earned.toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="text-xs capitalize text-blue-600 hover:underline"
                      disabled={busy}
                      onClick={async () => {
                        setBusy(true);
                        try {
                          await adminAction("upsert_affiliate", {
                            username: a.username,
                            status: a.status === "active" ? "disabled" : "active",
                          });
                          router.refresh();
                        } catch (e) {
                          setErr(e instanceof Error ? e.message : "Failed");
                        } finally {
                          setBusy(false);
                        }
                      }}
                    >
                      {a.status}
                    </button>
                  </td>
                  <td className="text-xs">{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Add affiliate" open={open} onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <input
            placeholder="Code (optional)"
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <input
            placeholder="Rate %"
            value={form.ratePercent}
            onChange={(e) => setForm((f) => ({ ...f, ratePercent: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <button
            type="button"
            disabled={busy}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={async () => {
              setBusy(true);
              setErr("");
              try {
                await adminAction("upsert_affiliate", {
                  username: form.username,
                  code: form.code || undefined,
                  ratePercent: Number(form.ratePercent) || 5,
                });
                setOpen(false);
                router.refresh();
              } catch (e) {
                setErr(e instanceof Error ? e.message : "Failed");
              } finally {
                setBusy(false);
              }
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
