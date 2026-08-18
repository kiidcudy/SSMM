"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PAYMENT_METHODS,
  convertToUsd,
  currencyForLocale,
  type Locale,
  type PaymentSlug,
} from "@/lib/site";
import { BinancePayModal } from "@/components/BinancePayModal";

type Labels = {
  method: string;
  amount: string;
  note: string;
  submitFund: string;
  pay: string;
  submitting: string;
  contactToPay: string;
  openTicket: string;
  fundSubmitted: string;
  networkError: string;
  requestFailed: string;
  binanceTitle: string;
  binanceSendExact: string;
  binanceSendToId: string;
  binanceCopy: string;
  binanceCopied: string;
  binanceNickname: string;
  binanceScanQr: string;
  binanceStep1: string;
  binanceStep2: string;
  binanceNotify: string;
  binanceClose: string;
  binanceRef: string;
  binanceContinue: string;
};

export function AddFundsForm({
  locale,
  labels,
  username,
}: {
  locale: Locale;
  labels: Labels;
  username: string;
}) {
  const [method, setMethod] = useState<PaymentSlug>("cryptomus");
  const [amount, setAmount] = useState(10);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [binanceOpen, setBinanceOpen] = useState(false);
  const [binanceRef, setBinanceRef] = useState("");

  const currency = currencyForLocale(locale);
  const amountLabel = labels.amount.replace("{currency}", currency);
  const amountUsd = Math.round(convertToUsd(amount, locale) * 100) / 100;
  const isBinance = method === "binance-pay";
  const isCryptomus = method === "cryptomus";
  const isSelfServe = isBinance || isCryptomus;

  async function createFundRequest(extraNote = "") {
    const res = await fetch("/api/funds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method,
        amount: amountUsd,
        note: extraNote || note,
      }),
    });
    const data = (await res.json()) as { error?: string; id?: string };
    if (!res.ok) throw new Error(data.error || labels.requestFailed);
    return data.id || "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSelfServe) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      if (isBinance) {
        const id = await createFundRequest(`Binance Pay ${amountUsd} USDT`);
        setBinanceRef(id);
        setBinanceOpen(true);
        setMessage(labels.fundSubmitted.replace("{id}", id));
        return;
      }
      if (isCryptomus) {
        const res = await fetch("/api/funds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method,
            amount: amountUsd,
            note,
          }),
        });
        const data = (await res.json()) as {
          error?: string;
          id?: string;
          paymentUrl?: string;
        };
        if (!res.ok) throw new Error(data.error || labels.requestFailed);
        if (data.paymentUrl) {
          window.location.assign(data.paymentUrl);
          return;
        }
        setMessage(labels.fundSubmitted.replace("{id}", data.id || ""));
        setNote("");
        return;
      }
      const id = await createFundRequest();
      setMessage(labels.fundSubmitted.replace("{id}", id));
      setNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
              setBinanceOpen(false);
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
            {isCryptomus ? (
              <div>
                <label className="mb-1 block text-sm text-[#93a0b8]">{labels.note}</label>
                <textarea
                  className="input min-h-[100px]"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : null}
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading
                ? labels.submitting
                : isCryptomus
                  ? labels.pay
                  : isBinance
                    ? labels.binanceContinue
                    : labels.submitFund}
            </button>
          </>
        )}
      </form>

      <BinancePayModal
        open={binanceOpen}
        onClose={() => setBinanceOpen(false)}
        usdt={amountUsd}
        refId={binanceRef}
        username={username}
        labels={{
          title: labels.binanceTitle,
          sendExact: labels.binanceSendExact,
          sendToId: labels.binanceSendToId,
          copy: labels.binanceCopy,
          copied: labels.binanceCopied,
          nickname: labels.binanceNickname,
          scanQr: labels.binanceScanQr,
          step1: labels.binanceStep1,
          step2: labels.binanceStep2,
          notify: labels.binanceNotify,
          close: labels.binanceClose,
          ref: labels.binanceRef,
        }}
      />
    </>
  );
}
