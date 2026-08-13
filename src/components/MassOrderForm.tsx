"use client";

import { useMemo, useState } from "react";
import type { PanelService } from "@/lib/data/catalog";
import { chargeFor } from "@/lib/data/catalog";

export function MassOrderForm({ services }: { services: PanelService[] }) {
  const defaults = useMemo(
    () => services.filter((s) => s.type === "default").slice(0, 400),
    [services],
  );
  const [serviceId, setServiceId] = useState(defaults[0]?.id ?? 0);
  const [quantity, setQuantity] = useState(defaults[0]?.min ?? 100);
  const [linksText, setLinksText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const service = services.find((s) => s.id === serviceId) || defaults[0];
  const links = linksText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const est = service ? chargeFor(service, quantity) * links.length : 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !links.length) return;
    if (quantity < service.min || quantity > service.max) {
      setError(
        `Quantity must be between ${service.min.toLocaleString("en-US")} and ${service.max.toLocaleString("en-US")}`,
      );
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);
    const out: string[] = [];
    for (const link of links) {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceId: service.id, link, quantity }),
        });
        const data = await res.json();
        if (!res.ok) out.push(`${link} → ${data.error || "failed"}`);
        else out.push(`${link} → order #${data.id}`);
      } catch {
        out.push(`${link} → network error`);
      }
    }
    setResults(out);
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
      <p className="text-sm text-[#93a0b8]">
        One link per line. Same service + quantity for each line. Max 50 links per submit.
      </p>
      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">Service ID</label>
        <input
          className="input"
          type="number"
          value={serviceId || ""}
          onChange={(e) => {
            const id = Number(e.target.value);
            setServiceId(id);
            const s = services.find((x) => x.id === id);
            if (s) setQuantity(s.min);
          }}
          required
        />
        {service ? (
          <p className="mt-1 text-xs text-[#93a0b8]">
            {service.name} · ${service.rate}/1K · min {service.min}
          </p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">Quantity</label>
        <input
          className="input"
          type="number"
          value={quantity}
          min={service?.min}
          max={service?.max}
          step={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        {service ? (
          <p className="mt-1.5 text-sm text-[#93a0b8]">
            Min:{" "}
            <span className="font-medium text-[#e8eefc]">
              {service.min.toLocaleString("en-US")}
            </span>
            {" · "}
            Max:{" "}
            <span className="font-medium text-[#e8eefc]">
              {service.max.toLocaleString("en-US")}
            </span>
          </p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm text-[#93a0b8]">Links</label>
        <textarea
          className="input min-h-40"
          value={linksText}
          onChange={(e) => setLinksText(e.target.value)}
          placeholder={"https://instagram.com/p/...\nhttps://tiktok.com/@..."}
          required
        />
        <p className="mt-1 text-xs text-[#93a0b8]">
          {Math.min(links.length, 50)} links · est. ${est.toFixed(4)}
        </p>
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        className="btn-primary"
        disabled={loading || !service || links.length === 0 || links.length > 50}
      >
        {loading ? "Placing…" : "Place mass orders"}
      </button>
      {results.length ? (
        <ul className="rounded-xl border border-[#243049] p-3 text-xs text-[#93a0b8]">
          {results.map((r) => (
            <li key={r} className="border-b border-[#243049]/60 py-1 last:border-0">
              {r}
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
