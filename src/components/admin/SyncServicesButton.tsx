"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SyncServicesButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function onSync() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/services/sync", { method: "POST" });
      const data = (await res.json()) as { error?: string; count?: number };
      if (!res.ok) {
        setMsg(data.error || "Sync failed");
        return;
      }
      setMsg(`Synced ${data.count ?? 0} services from SMMFlare`);
      router.refresh();
    } catch {
      setMsg("Sync failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onSync}
        disabled={loading}
        className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
      >
        {loading ? "Syncing…" : "Sync from SMMFlare"}
      </button>
      {msg ? <p className="text-sm text-gray-600">{msg}</p> : null}
    </div>
  );
}
