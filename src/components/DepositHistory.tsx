"use client";

import { useEffect, useState } from "react";

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

export function DepositHistory() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [ledger, setLedger] = useState<Ledger[]>([]);
  const [error, setError] = useState("");

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
        <h2 className="text-lg font-semibold">Deposit requests</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[#243049]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] text-xs uppercase text-[#93a0b8]">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Method</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {funds.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-[#93a0b8]">
                    No deposit requests yet.
                  </td>
                </tr>
              ) : (
                funds.map((f) => (
                  <tr key={f.id} className="border-t border-[#243049]">
                    <td className="px-3 py-2 font-mono text-cyan-300">{f.id}</td>
                    <td className="px-3 py-2">{f.method}</td>
                    <td className="px-3 py-2">${f.amount.toFixed(2)}</td>
                    <td className="px-3 py-2 capitalize">{f.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Transaction ledger</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[#243049]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] text-xs uppercase text-[#93a0b8]">
              <tr>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Balance</th>
                <th className="px-3 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {ledger.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-[#93a0b8]">
                    No ledger entries yet.
                  </td>
                </tr>
              ) : (
                ledger.slice(0, 40).map((e) => (
                  <tr key={e.id} className="border-t border-[#243049]">
                    <td className="px-3 py-2 capitalize">{e.type}</td>
                    <td className={`px-3 py-2 ${e.amount >= 0 ? "text-emerald-300" : "text-amber-200"}`}>
                      {e.amount >= 0 ? "+" : ""}
                      {e.amount.toFixed(4)}
                    </td>
                    <td className="px-3 py-2">${e.balanceAfter.toFixed(4)}</td>
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
