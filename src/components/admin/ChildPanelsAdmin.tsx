"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/Modal";
import { ActionMenu } from "@/components/admin/ActionMenu";
import { adminAction } from "@/components/admin/adminApi";
import type { ChildPanel } from "@/lib/store/db";

export function ChildPanelsAdmin({ panels }: { panels: ChildPanel[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ domain: "", ownerUsername: "", note: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Child panels</h1>
          <p className="text-sm text-gray-500">Reseller / white-label sub-panels.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Add child panel
        </button>
      </div>
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="table-admin">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Note</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {panels.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No child panels.
                </td>
              </tr>
            ) : (
              panels.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.domain}</td>
                  <td>{p.ownerUsername}</td>
                  <td className="capitalize">{p.status}</td>
                  <td className="max-w-[200px] truncate text-xs text-gray-500">{p.note || "—"}</td>
                  <td className="text-xs">{new Date(p.createdAt).toLocaleString()}</td>
                  <td>
                    <ActionMenu
                      items={[
                        {
                          label: "Activate",
                          onClick: () =>
                            run(() =>
                              adminAction("upsert_child_panel", {
                                id: p.id,
                                domain: p.domain,
                                ownerUsername: p.ownerUsername,
                                status: "active",
                              }),
                            ),
                        },
                        {
                          label: "Suspend",
                          onClick: () =>
                            run(() =>
                              adminAction("upsert_child_panel", {
                                id: p.id,
                                domain: p.domain,
                                ownerUsername: p.ownerUsername,
                                status: "suspended",
                              }),
                            ),
                        },
                        {
                          label: "Delete",
                          danger: true,
                          onClick: () => run(() => adminAction("delete_child_panel", { id: p.id })),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Add child panel" open={open} onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <input
            placeholder="Domain"
            value={form.domain}
            onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <input
            placeholder="Owner username"
            value={form.ownerUsername}
            onChange={(e) => setForm((f) => ({ ...f, ownerUsername: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <textarea
            placeholder="Note"
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            className="w-full rounded border px-3 py-1.5 text-sm"
            rows={3}
          />
          <button
            type="button"
            disabled={busy}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              run(async () => {
                await adminAction("upsert_child_panel", form);
                setOpen(false);
                setForm({ domain: "", ownerUsername: "", note: "" });
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
