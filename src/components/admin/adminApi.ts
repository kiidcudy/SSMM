"use client";

export async function adminAction(action: string, payload: Record<string, unknown> = {}) {
  const res = await fetch("/api/admin/manage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
