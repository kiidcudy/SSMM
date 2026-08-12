"use client";

import { useEffect, useState } from "react";
import { currencyForLocale, formatMoney, type Locale } from "@/lib/site";

type Fund = {
  id: string;
  method: string;
  amount: number;
  status: string;
  note: string;
  createdAt: string;
};

type Ledger = {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  note: string;
  createdAt: string;
};

type Labels = {
  depositRequests: string;
  transactionLedger: string;
  noDeposits: string;
  noLedger: string;
  method: string;
  amount: string;
  status: string;
  type: string;
  id: string;
  yourBalance: string;
  note: string;
};

export function DepositHistory({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [ledger, setLedger] = useState<Ledger[]>([]);
  const [error, setError] = useState("");
  const amountHeader = labels.amount.replace("{currency}", currencyForLocale(locale));

  useEffect(() => {
    fetch("/api/funds")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setFunds(data.funds || []);
        setLedger(data.ledger || []);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <p className="mt-6 text-sm text-red-300">{error}</p>;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">{labels.depositRequests}</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[#243049]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] text-xs uppercase text-[#93a0b8]">
              <tr>
                <th className="px-3 py-2">{labels.id}</th>
                <th className="px-3 py-2">{labels.method}</th>
                <th className="px-3 py-2">{amountHeader}</th>
                <th className="px-3 py-2">{labels.status}</th>
              </tr>
            </thead>
            <tbody>
              {funds.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-[#93a0b8]">
                    {labels.noDeposits}
                  </td>
                </tr>
              ) : (
                funds.map((f) => (
                  <tr key={f.id} className="border-t border-[#243049]">
                    <td className="px-3 py-2 font-mono text-cyan-300">{f.id}</td>
                    <td className="px-3 py-2">{f.method}</td>
                    <td className="px-3 py-2">{formatMoney(f.amount, locale, 2)}</td>
                    <td className="px-3 py-2 capitalize">{f.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">{labels.transactionLedger}</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[#243049]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] text-xs uppercase text-[#93a0b8]">
              <tr>
                <th className="px-3 py-2">{labels.type}</th>
                <th className="px-3 py-2">{amountHeader}</th>
                <th className="px-3 py-2">{labels.yourBalance}</th>
                <th className="px-3 py-2">{labels.note}</th>
              </tr>
            </thead>
            <tbody>
              {ledger.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-[#93a0b8]">
                    {labels.noLedger}
                  </td>
                </tr>
              ) : (
                ledger.slice(0, 40).map((e) => (
                  <tr key={e.id} className="border-t border-[#243049]">
                    <td className="px-3 py-2 capitalize">{e.type}</td>
                    <td className={`px-3 py-2 ${e.amount >= 0 ? "text-emerald-300" : "text-amber-200"}`}>
                      {e.amount >= 0 ? "+" : "−"}
                      {formatMoney(Math.abs(e.amount), locale, 4)}
                    </td>
                    <td className="px-3 py-2">{formatMoney(e.balanceAfter, locale)}</td>
                    <td className="max-w-[180px] truncate px-3 py-2 text-[#93a0b8]">{e.note}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
