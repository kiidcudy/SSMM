"use client";

import { useState } from "react";
import Link from "next/link";
import { PAYMENT_METHODS, convertToUsd, currencyForLocale, type Locale, type PaymentSlug } from "@/lib/site";

const SELF_SERVE_METHODS = new Set<PaymentSlug>(["cryptomus", "binance-pay"]);

type Labels = {
  method: string;
  amount: string;
  note: string;
  submitFund: string;
  submitting: string;
  contactToPay: string;
  openTicket: string;
  fundSubmitted: string;
  networkError: string;
  requestFailed: string;
};

export function AddFundsForm({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [method, setMethod] = useState<PaymentSlug>(PAYMENT_METHODS[0].slug);
  const [amount, setAmount] = useState(10);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isSelfServe = SELF_SERVE_METHODS.has(method);
  const currency = currencyForLocale(locale);
  const amountLabel = labels.amount.replace("{currency}", currency);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSelfServe) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const amountUsd = Math.round(convertToUsd(amount, locale) * 100) / 100;
      const res = await fetch("/api/funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, amount: amountUsd, note }),
      });
      const data = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) {
        setError(data.error || labels.requestFailed);
        return;
      }
      setMessage(labels.fundSubmitted.replace("{id}", data.id || ""));
      setNote("");
    } catch {
      setError(labels.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card max-w-lg space-y-4 p-6">
      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.method}</label>
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
          {labels.contactToPay}{" "}
          <Link href="/dashboard/tickets" className="underline hover:text-white">
            {labels.openTicket}
          </Link>
        </p>
      ) : (
        <>
          <div>
            <label className="mb-1 block text-sm text-[#93a0b8]">{amountLabel}</label>
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
            <label className="mb-1 block text-sm text-[#93a0b8]">{labels.note}</label>
            <textarea
              className="input min-h-[100px]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? labels.submitting : labels.submitFund}
          </button>
        </>
      )}
    </form>
  );
}
