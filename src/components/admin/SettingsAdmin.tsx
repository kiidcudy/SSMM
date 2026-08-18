"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";
import type { PanelSettings } from "@/lib/store/db";

export type AdminProviderRow = {
  id: string;
  name: string;
  url: string;
  apiUrl: string;
  alias: string;
  hasKey: boolean;
  balance?: string;
};

export function SettingsAdmin({
  settings,
  providerConfigured,
  orderIdStart,
  providers,
}: {
  settings: PanelSettings;
  providerConfigured: boolean;
  orderIdStart: number;
  providers: AdminProviderRow[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"general" | "providers">("general");
  const [form, setForm] = useState(settings);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [edit, setEdit] = useState<AdminProviderRow | null>(null);
  const [providerUrl, setProviderUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [q, setQ] = useState("");

  const filtered = providers.filter(
    (p) =>
      !q.trim() ||
      p.name.toLowerCase().includes(q.trim().toLowerCase()) ||
      p.url.toLowerCase().includes(q.trim().toLowerCase()),
  );

  async function run(fn: () => Promise<unknown>) {
    setBusy(true);
    setErr("");
    setMsg("");
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
      <div className="mb-4 flex gap-2 border-b border-gray-200 text-sm">
        <button
          type="button"
          className={`px-3 py-2 ${tab === "general" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
          onClick={() => setTab("general")}
        >
          General
        </button>
        <button
          type="button"
          className={`px-3 py-2 ${tab === "providers" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
          onClick={() => setTab("providers")}
        >
          Providers
        </button>
      </div>

      {err ? <p className="mb-3 text-sm text-red-600">{err}</p> : null}
      {msg ? <p className="mb-3 text-sm text-emerald-600">{msg}</p> : null}

      {tab === "general" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded border border-gray-200 bg-white p-5 shadow-sm">
            <h1 className="text-lg font-semibold">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Panel configuration.</p>
            <div className="mt-5 space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Site name</span>
                <input
                  value={form.siteName}
                  onChange={(e) => setForm((f) => ({ ...f, siteName: e.target.value }))}
                  className="w-full rounded border px-3 py-1.5"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Currency</span>
                <input
                  value={form.currency}
                  onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                  className="w-full rounded border px-3 py-1.5"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Support email</span>
                <input
                  value={form.supportEmail}
                  onChange={(e) => setForm((f) => ({ ...f, supportEmail: e.target.value }))}
                  className="w-full rounded border px-3 py-1.5"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Min deposit</span>
                <input
                  type="number"
                  value={form.minDeposit}
                  onChange={(e) => setForm((f) => ({ ...f, minDeposit: Number(e.target.value) || 0 }))}
                  className="w-full rounded border px-3 py-1.5"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Signup bonus</span>
                <input
                  type="number"
                  value={form.signupBonus}
                  onChange={(e) => setForm((f) => ({ ...f, signupBonus: Number(e.target.value) || 0 }))}
                  className="w-full rounded border px-3 py-1.5"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.maintenanceMode}
                  onChange={(e) => setForm((f) => ({ ...f, maintenanceMode: e.target.checked }))}
                />
                Maintenance mode
              </label>
              <button
                type="button"
                disabled={busy}
                className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
                onClick={() =>
                  run(async () => {
                    await adminAction("update_settings", form as unknown as Record<string, unknown>);
                    setMsg("Saved.");
                  })
                }
              >
                Save settings
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold">Orders</h2>
              <p className="mt-2 text-sm text-gray-600">
                First order ID starts at{" "}
                <span className="font-mono font-semibold">{orderIdStart.toLocaleString("tr-TR")}</span>.
              </p>
            </div>
            <div className="rounded border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold">Env fallback provider</h2>
              <p className="mt-2 text-sm text-gray-600">
                Optional default: <code>PROVIDER_API_URL</code> + <code>PROVIDER_API_KEY</code> (Sync button).
              </p>
              <p
                className={`mt-3 text-sm font-semibold ${
                  providerConfigured ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                Status: {providerConfigured ? "configured" : "missing API key"}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Prefer adding panels under the Providers tab for selective Import services.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setProviderUrl("");
                setAddOpen(true);
              }}
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Add provider
            </button>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="rounded border border-gray-300 px-3 py-1.5 text-sm"
            />
          </div>

          <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
            <table className="table-admin">
              <thead>
                <tr className="bg-gray-50">
                  <th>Provider</th>
                  <th>Alias</th>
                  <th>API key</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No providers yet. Add a panel URL, then set its API key.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="font-medium">{p.name}</td>
                      <td className="text-sm text-gray-500">{p.alias || "—"}</td>
                      <td className="text-sm">{p.hasKey ? "Saved" : "Missing"}</td>
                      <td className="text-right">
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => {
                            setEdit(p);
                            setApiKey("");
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal title="Add provider" open={addOpen} onClose={() => setAddOpen(false)}>
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Provider URL</span>
            <input
              value={providerUrl}
              onChange={(e) => setProviderUrl(e.target.value)}
              placeholder="smmflare.com"
              className="w-full rounded border px-3 py-1.5 text-sm"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy || !providerUrl.trim()}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
              onClick={() =>
                run(async () => {
                  await adminAction("add_provider", { url: providerUrl.trim() });
                  setAddOpen(false);
                  setMsg("Provider added. Open Edit to paste the API key.");
                  setTab("providers");
                })
              }
            >
              Add provider
            </button>
            <button
              type="button"
              className="rounded border px-3 py-1.5 text-sm"
              onClick={() => setAddOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal title="Edit provider" open={!!edit} onClose={() => setEdit(null)}>
        {edit ? (
          <div className="space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block text-gray-600">Provider</span>
              <input value={edit.name} readOnly className="w-full rounded border bg-gray-50 px-3 py-1.5 text-sm" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-gray-600">API key</span>
              <input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={edit.hasKey ? "•••••••• (leave blank to keep)" : "Paste API key"}
                className="w-full rounded border px-3 py-1.5 text-sm"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={busy}
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                onClick={() =>
                  run(async () => {
                    await adminAction("update_provider", {
                      providerId: edit.id,
                      ...(apiKey.trim() ? { apiKey: apiKey.trim() } : {}),
                    });
                    setEdit(null);
                    setMsg("Provider saved.");
                  })
                }
              >
                Save changes
              </button>
              <button
                type="button"
                className="rounded border px-3 py-1.5 text-sm"
                onClick={() => setEdit(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                className="ml-auto text-sm text-red-600 hover:underline"
                onClick={() => {
                  if (!confirm(`Delete provider ${edit.name}?`)) return;
                  void run(async () => {
                    await adminAction("delete_provider", { providerId: edit.id });
                    setEdit(null);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
