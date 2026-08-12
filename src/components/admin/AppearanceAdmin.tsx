"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAction } from "@/components/admin/adminApi";
import type { AppearanceSettings } from "@/lib/store/db";

export function AppearanceAdmin({ appearance }: { appearance: AppearanceSettings }) {
  const router = useRouter();
  const [form, setForm] = useState(appearance);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <div className="max-w-2xl rounded border border-gray-200 bg-white p-5 shadow-sm">
      <h1 className="text-lg font-semibold">Appearance</h1>
      <p className="mt-1 text-sm text-gray-500">Theme, logo and custom CSS for the public panel.</p>
      <div className="mt-5 space-y-4">
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Primary color</span>
          <input
            type="color"
            value={form.primaryColor || "#2563eb"}
            onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))}
            className="h-10 w-20 cursor-pointer rounded border"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Logo URL</span>
          <input
            value={form.logoUrl}
            onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))}
            className="w-full rounded border px-3 py-1.5"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Favicon URL</span>
          <input
            value={form.faviconUrl}
            onChange={(e) => setForm((f) => ({ ...f, faviconUrl: e.target.value }))}
            className="w-full rounded border px-3 py-1.5"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Custom CSS</span>
          <textarea
            value={form.customCss}
            onChange={(e) => setForm((f) => ({ ...f, customCss: e.target.value }))}
            rows={6}
            className="w-full rounded border px-3 py-1.5 font-mono text-xs"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Homepage HTML</span>
          <textarea
            value={form.homepageHtml}
            onChange={(e) => setForm((f) => ({ ...f, homepageHtml: e.target.value }))}
            rows={6}
            className="w-full rounded border px-3 py-1.5 font-mono text-xs"
          />
        </label>
        {msg ? <p className="text-sm text-emerald-600">{msg}</p> : null}
        <button
          type="button"
          disabled={busy}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
          onClick={async () => {
            setBusy(true);
            setMsg("");
            try {
              await adminAction("update_appearance", form as unknown as Record<string, unknown>);
              setMsg("Saved.");
              router.refresh();
            } catch (e) {
              setMsg(e instanceof Error ? e.message : "Failed");
            } finally {
              setBusy(false);
            }
          }}
        >
          Save appearance
        </button>
      </div>
    </div>
  );
}
