"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  labels: {
    username: string;
    password: string;
    submit: string;
    error: string;
  };
  requireAdmin?: boolean;
  successHref?: string;
  /** When true, use light admin styling instead of marketing theme classes */
  variant?: "default" | "admin";
};

export function LoginForm({ labels, requireAdmin, successHref, variant = "default" }: Props) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isAdmin = variant === "admin" || requireAdmin;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, requireAdmin: !!requireAdmin }),
      });
      const data = (await res.json()) as { error?: string; user?: { role?: string } };
      if (!res.ok) {
        setError(data.error || labels.error);
        return;
      }
      const href =
        successHref || (data.user?.role === "admin" ? "/admin" : "/dashboard/new-order");
      router.push(href);
      router.refresh();
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  }

  if (isAdmin) {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-gray-600">{labels.username}</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">{labels.password}</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          disabled={loading}
        >
          {labels.submit}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div>
        <label className="mb-1 block text-sm text-[var(--color-muted)]">{labels.username}</label>
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--color-muted)]">{labels.password}</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {labels.submit}
      </button>
    </form>
  );
}
