"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PanelService } from "@/lib/data/catalog";
import { chargeFor } from "@/lib/data/catalog";
import { detectPlatform } from "@/lib/platforms";
import { PlatformIcon } from "@/components/PlatformIcon";

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
  const filtered = useMemo(
    () => services.filter((s) => s.category === category),
    [services, category],
  );
  const [serviceId, setServiceId] = useState(filtered[0]?.id ?? 0);
  const service = services.find((s) => s.id === serviceId) ?? filtered[0];
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(service?.min ?? 100);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const charge = service ? chargeFor(service, quantity) : 0;
  const servicePlatform = detectPlatform(service?.category, service?.name);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filtered;
    return filtered.filter(
      (s) =>
        String(s.id).includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q),
    );
  }, [filtered, query]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onCategoryChange(next: string) {
    setCategory(next);
    setOpen(false);
    setQuery("");
    const first = services.find((s) => s.category === next);
    if (first) {
      setServiceId(first.id);
      setQuantity(first.min);
    }
  }

  function onServiceChange(id: number) {
    setServiceId(id);
    setOpen(false);
    setQuery("");
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
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <PlatformIcon platform={detectPlatform(category)} size="sm" />
          </span>
          <select
            className="input pl-10"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div ref={boxRef}>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.service}</label>
        <button
          type="button"
          className="input flex w-full items-center gap-2 text-left"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {service ? (
            <>
              <PlatformIcon platform={servicePlatform} size="sm" />
              <span className="min-w-0 flex-1 truncate">
                {service.id} — {service.name} — ${service.rate}/1K
              </span>
            </>
          ) : (
            <span className="text-[#93a0b8]">Select service</span>
          )}
          <span className="ml-auto text-[#93a0b8]">{open ? "▴" : "▾"}</span>
        </button>

        {open ? (
          <div className="relative z-20 mt-1 overflow-hidden rounded-xl border border-[#243049] bg-[#0d1422] shadow-xl">
            <div className="border-b border-[#243049] p-2">
              <input
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search service…"
                autoFocus
              />
            </div>
            <ul className="max-h-72 overflow-y-auto py-1">
              {visible.length === 0 ? (
                <li className="px-3 py-4 text-sm text-[#93a0b8]">No services</li>
              ) : (
                visible.map((s) => {
                  const platform = detectPlatform(s.category, s.name);
                  const active = s.id === service?.id;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => onServiceChange(s.id)}
                        className={`flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm hover:bg-[#182236] ${
                          active ? "bg-cyan-500/10 text-cyan-100" : "text-[#e8eefc]"
                        }`}
                      >
                        <PlatformIcon platform={platform} size="md" className="mt-0.5" />
                        <span className="min-w-0 flex-1 leading-snug">
                          <span className="text-cyan-300">{s.id}</span>
                          {" — "}
                          {s.name}
                          {" — "}
                          <span className="text-[#93a0b8]">${s.rate}/1K</span>
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ) : null}
      </div>

      {service ? (
        <div className="rounded-lg border border-[#243049] bg-[#121a2b] p-4 text-sm text-[#93a0b8]">
          <div className="flex items-center gap-2">
            <PlatformIcon platform={servicePlatform} size="md" />
            <p className="font-semibold text-[#e8eefc]">{labels.description}</p>
          </div>
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
