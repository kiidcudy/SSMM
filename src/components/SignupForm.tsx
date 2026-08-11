"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  labels: {
    username: string;
    email: string;
    password: string;
    submit: string;
    error: string;
  };
};

export function SignupForm({ labels }: Props) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || labels.error);
        return;
      }
      router.push("/dashboard/new-order");
      router.refresh();
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
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
          minLength={3}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--color-muted)]">{labels.email}</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
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
          autoComplete="new-password"
          required
          minLength={6}
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {labels.submit}
      </button>
    </form>
  );
}
