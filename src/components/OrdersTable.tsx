"use client";

import { useEffect, useState } from "react";

type OrderRow = {
  id: string;
  serviceId: number;
  serviceName: string;
  link: string;
  quantity: number;
  charge: number;
  status: string;
  createdAt: string;
};

export function OrdersTable() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setOrders(data.orders || []);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <p className="text-sm text-red-300">{error}</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-[#243049]">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="bg-[#111827] text-xs uppercase text-[#93a0b8]">
          <tr>
            <th className="px-3 py-3">ID</th>
            <th className="px-3 py-3">Service</th>
            <th className="px-3 py-3">Link</th>
            <th className="px-3 py-3">Qty</th>
            <th className="px-3 py-3">Charge</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-3 py-6 text-[#93a0b8]">
                No orders yet.
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id} className="border-t border-[#243049]">
                <td className="px-3 py-3 font-mono text-cyan-300">{o.id}</td>
                <td className="px-3 py-3">
                  {o.serviceId} — {o.serviceName}
                </td>
                <td className="max-w-[220px] truncate px-3 py-3">{o.link}</td>
                <td className="px-3 py-3">{o.quantity}</td>
                <td className="px-3 py-3">${o.charge.toFixed(4)}</td>
                <td className="px-3 py-3 capitalize">{o.status}</td>
                <td className="px-3 py-3">{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
