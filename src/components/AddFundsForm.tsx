"use client";

import { useState } from "react";
import Link from "next/link";
import { PAYMENT_METHODS, type PaymentSlug } from "@/lib/site";

const SELF_SERVE_METHODS = new Set<PaymentSlug>(["cryptomus", "binance-pay"]);

export function AddFundsForm() {
  const [method, setMethod] = useState<PaymentSlug>(PAYMENT_METHODS[0].slug);
  const [amount, setAmount] = useState(10);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isSelfServe = SELF_SERVE_METHODS.has(method);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSelfServe) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, amount, note }),
      });
      const data = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setMessage(`Fund request #${data.id} submitted. Send payment proof via WhatsApp or ticket.`);
      setNote("");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card max-w-lg space-y-4 p-6">
      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">Method</label>
        <select
          className="input"
          value={method}
          onChange={(e) => {
            setMethod(e.target.value as PaymentSlug);
            setError("");
            setMessage("");
          }}
        >
          {PAYMENT_METHODS.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {!isSelfServe ? (
        <p className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-3 text-sm text-amber-100">
          Bu yöntemle ödeme yapmak için lütfen bizimle iletişime geçin.{" "}
          <Link href="/dashboard/tickets" className="underline hover:text-white">
            Ticket aç
          </Link>
        </p>
      ) : (
        <>
          <div>
            <label className="mb-1 block text-sm text-[#93a0b8]">Amount (USD)</label>
            <input
              className="input"
              type="number"
              min={1}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#93a0b8]">Note / TXID</label>
            <textarea
              className="input min-h-[100px]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional payment reference"
            />
          </div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Submitting…" : "Submit fund request"}
          </button>
        </>
      )}
    </form>
  );
}
