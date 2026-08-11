"use client";

import { useMemo, useState } from "react";
import type { PanelService } from "@/lib/data/catalog";
import { chargeFor } from "@/lib/data/catalog";

export function NewOrderForm({
  services,
  labels,
}: {
  services: PanelService[];
  labels: {
    category: string;
    service: string;
    description: string;
    link: string;
    quantity: string;
    charge: string;
    placeOrder: string;
    orderWarning: string;
  };
}) {
  const categories = useMemo(
    () => Array.from(new Set(services.map((s) => s.category))),
    [services],
  );
  const [category, setCategory] = useState(categories[0] || "");
  const filtered = services.filter((s) => s.category === category);
  const [serviceId, setServiceId] = useState(filtered[0]?.id ?? 0);
  const service = services.find((s) => s.id === serviceId) ?? filtered[0];
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(service?.min ?? 100);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const charge = service ? chargeFor(service, quantity) : 0;

  function onCategoryChange(next: string) {
    setCategory(next);
    const first = services.find((s) => s.category === next);
    if (first) {
      setServiceId(first.id);
      setQuantity(first.min);
    }
  }

  function onServiceChange(id: number) {
    setServiceId(id);
    const s = services.find((x) => x.id === id);
    if (s) setQuantity(s.min);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: service.id, link, quantity }),
      });
      const data = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) {
        setError(data.error || "Order failed");
        return;
      }
      setMessage(`Order #${data.id} placed successfully.`);
      setLink("");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
        {labels.orderWarning}
      </div>

      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.category}</label>
        <select className="input" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.service}</label>
        <select
          className="input"
          value={service?.id ?? ""}
          onChange={(e) => onServiceChange(Number(e.target.value))}
        >
          {filtered.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id} — {s.name} — ${s.rate}/1K
            </option>
          ))}
        </select>
      </div>

      {service ? (
        <div className="rounded-lg border border-[#243049] bg-[#121a2b] p-4 text-sm text-[#93a0b8]">
          <p className="font-semibold text-[#e8eefc]">{labels.description}</p>
          <p className="mt-2">{service.description}</p>
          <p className="mt-2">
            Min {service.min} · Max {service.max} · ${service.rate.toFixed(4)} / 1000
          </p>
        </div>
      ) : null}

      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.link}</label>
        <input
          className="input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.quantity}</label>
        <input
          className="input"
          type="number"
          value={quantity}
          min={service?.min}
          max={service?.max}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>

      <div className="rounded-lg border border-[#243049] px-4 py-3">
        <span className="text-sm text-[#93a0b8]">{labels.charge}</span>
        <p className="text-2xl font-bold text-cyan-300">${charge.toFixed(4)}</p>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}

      <button type="submit" className="btn-primary" disabled={loading || !service}>
        {loading ? "Placing…" : labels.placeOrder}
      </button>
    </form>
  );
}
