"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAction } from "@/components/admin/adminApi";
import type { PanelSettings } from "@/lib/store/db";

export function SettingsAdmin({
  settings,
  providerConfigured,
  orderIdStart,
}: {
  settings: PanelSettings;
  providerConfigured: boolean;
  orderIdStart: number;
}) {
  const router = useRouter();
  const [form, setForm] = useState(settings);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  return (
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
          {msg ? <p className="text-sm text-emerald-600">{msg}</p> : null}
          <button
            type="button"
            disabled={busy}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
            onClick={async () => {
              setBusy(true);
              setMsg("");
              try {
                await adminAction("update_settings", form as unknown as Record<string, unknown>);
                setMsg("Saved.");
                router.refresh();
              } catch (e) {
                setMsg(e instanceof Error ? e.message : "Failed");
              } finally {
                setBusy(false);
              }
            }}
          >
            Save settings
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Orders</h2>
          <p className="mt-2 text-sm text-gray-600">
            First order ID starts at <span className="font-mono font-semibold">{orderIdStart.toLocaleString("tr-TR")}</span>{" "}
            (3.157.895). New orders increment from there.
          </p>
        </div>
        <div className="rounded border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Provider</h2>
          <p className="mt-2 text-sm text-gray-600">
            Upstream: PerfectPanel / SMMFlare API via <code>PROVIDER_API_URL</code> + <code>PROVIDER_API_KEY</code>.
          </p>
          <p className={`mt-3 text-sm font-semibold ${providerConfigured ? "text-emerald-600" : "text-amber-600"}`}>
            Status: {providerConfigured ? "configured" : "missing API key"}
          </p>
        </div>
      </div>
    </div>
  );
}
