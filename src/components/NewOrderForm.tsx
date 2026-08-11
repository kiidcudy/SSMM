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
  const [catOpen, setCatOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [catQuery, setCatQuery] = useState("");
  const [svcQuery, setSvcQuery] = useState("");
  const catRef = useRef<HTMLDivElement>(null);
  const svcRef = useRef<HTMLDivElement>(null);

  const charge = service ? chargeFor(service, quantity) : 0;
  const categoryPlatform = detectPlatform(category);
  const servicePlatform = detectPlatform(service?.category, service?.name);

  const visibleCategories = useMemo(() => {
    const q = catQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.toLowerCase().includes(q));
  }, [categories, catQuery]);

  const visibleServices = useMemo(() => {
    const q = svcQuery.trim().toLowerCase();
    if (!q) return filtered;
    return filtered.filter(
      (s) =>
        String(s.id).includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q),
    );
  }, [filtered, svcQuery]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (!catRef.current?.contains(t)) setCatOpen(false);
      if (!svcRef.current?.contains(t)) setSvcOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onCategoryChange(next: string) {
    setCategory(next);
    setCatOpen(false);
    setCatQuery("");
    setSvcOpen(false);
    setSvcQuery("");
    const first = services.find((s) => s.category === next);
    if (first) {
      setServiceId(first.id);
      setQuantity(first.min);
    }
  }

  function onServiceChange(id: number) {
    setServiceId(id);
    setSvcOpen(false);
    setSvcQuery("");
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

      <div ref={catRef}>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.category}</label>
        <button
          type="button"
          className="input flex w-full items-center gap-2.5 text-left"
          onClick={() => {
            setCatOpen((v) => !v);
            setSvcOpen(false);
          }}
          aria-expanded={catOpen}
        >
          {category ? (
            <>
              <PlatformIcon platform={categoryPlatform} size="sm" />
              <span className="min-w-0 flex-1 truncate">{category}</span>
            </>
          ) : (
            <span className="text-[#93a0b8]">Select category</span>
          )}
          <span className="shrink-0 text-[#93a0b8]">{catOpen ? "▴" : "▾"}</span>
        </button>

        {catOpen ? (
          <div className="relative z-30 mt-1 overflow-hidden rounded-xl border border-[#243049] bg-[#0d1422] shadow-xl">
            <div className="border-b border-[#243049] p-2">
              <input
                className="input"
                value={catQuery}
                onChange={(e) => setCatQuery(e.target.value)}
                placeholder="Search category…"
                autoFocus
              />
            </div>
            <ul className="max-h-72 overflow-y-auto py-1">
              {visibleCategories.length === 0 ? (
                <li className="px-3 py-4 text-sm text-[#93a0b8]">No categories</li>
              ) : (
                visibleCategories.map((c) => {
                  const platform = detectPlatform(c);
                  const active = c === category;
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => onCategoryChange(c)}
                        className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm hover:bg-[#182236] ${
                          active ? "bg-cyan-500/10 text-cyan-100" : "text-[#e8eefc]"
                        }`}
                      >
                        <PlatformIcon platform={platform} size="md" />
                        <span className="min-w-0 flex-1 truncate">{c}</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ) : null}
      </div>

      <div ref={svcRef}>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.service}</label>
        <button
          type="button"
          className="input flex w-full items-center gap-2.5 text-left"
          onClick={() => {
            setSvcOpen((v) => !v);
            setCatOpen(false);
          }}
          aria-expanded={svcOpen}
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
          <span className="shrink-0 text-[#93a0b8]">{svcOpen ? "▴" : "▾"}</span>
        </button>

        {svcOpen ? (
          <div className="relative z-20 mt-1 overflow-hidden rounded-xl border border-[#243049] bg-[#0d1422] shadow-xl">
            <div className="border-b border-[#243049] p-2">
              <input
                className="input"
                value={svcQuery}
                onChange={(e) => setSvcQuery(e.target.value)}
                placeholder="Search service…"
                autoFocus
              />
            </div>
            <ul className="max-h-72 overflow-y-auto py-1">
              {visibleServices.length === 0 ? (
                <li className="px-3 py-4 text-sm text-[#93a0b8]">No services</li>
              ) : (
                visibleServices.map((s) => {
                  const platform = detectPlatform(s.category, s.name);
                  const active = s.id === service?.id;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => onServiceChange(s.id)}
                        className={`flex w-full items-start gap-2.5 px-3 py-2.5 text-left text-sm hover:bg-[#182236] ${
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
          <div className="flex items-center gap-2.5">
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
