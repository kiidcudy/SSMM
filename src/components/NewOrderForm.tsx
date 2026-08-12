"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { PanelService } from "@/lib/data/catalog";
import { avgDeliveryMinutes, chargeFor } from "@/lib/data/catalog";
import { detectPlatform } from "@/lib/platforms";
import { PlatformIcon } from "@/components/PlatformIcon";
import { countLines, fieldsForService, type ExtraField } from "@/lib/provider/service-fields";

const EXTRA_LABELS: Record<ExtraField, string> = {
  comments: "Comments (one per line)",
  keywords: "Keywords (one per line)",
  usernames: "Usernames (one per line)",
  hashtags: "Hashtags (one per line)",
  hashtag: "Hashtag",
  username: "Username",
  media: "Media URL",
  groups: "Groups (one per line)",
  answer_number: "Poll answer number",
  country: "Country (US or United States)",
  device: "Device (1 Desktop · 2 Android · 3 iOS · 4 Mixed mobile · 5 Mixed)",
  type_of_traffic: "Traffic type (1 Google · 2 Custom referrer · 3 Blank)",
  google_keyword: "Google keyword",
  referring_url: "Referring URL",
  posts: "New posts limit (optional)",
  old_posts: "Old posts (optional)",
  delay: "Delay (minutes)",
  expiry: "Expiry (d/m/Y)",
  runs: "Drip-feed runs (optional)",
  interval: "Drip-feed interval minutes (optional)",
};

const TEXTAREA_FIELDS = new Set<ExtraField>([
  "comments",
  "keywords",
  "usernames",
  "hashtags",
  "groups",
]);

export function NewOrderForm({
  services,
  labels,
  aside,
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
    avgDelivery: string;
  };
  aside?: ReactNode;
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
  const fields = fieldsForService({
    type: service?.type || "default",
    dripfeed: service?.dripfeed,
  });

  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(service?.min ?? 100);
  const [extras, setExtras] = useState<Partial<Record<ExtraField, string>>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catQuery, setCatQuery] = useState("");
  const [svcQuery, setSvcQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const catRef = useRef<HTMLDivElement>(null);
  const svcRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const commentLines = countLines(extras.comments || "");
  const billQty =
    fields.quantityFromComments && commentLines > 0
      ? commentLines
      : fields.needsQuantity
        ? quantity
        : Math.max(1, service?.min || 1);
  const charge = service ? chargeFor(service, billQty) : 0;
  const categoryPlatform = detectPlatform(category);
  const servicePlatform = detectPlatform(service?.category, service?.name);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return services
      .filter(
        (s) =>
          String(s.id).includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      )
      .slice(0, 40);
  }, [services, searchQuery]);

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
      if (!searchRef.current?.contains(t)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function selectService(s: PanelService) {
    setCategory(s.category);
    setServiceId(s.id);
    setQuantity(s.min);
    setExtras({});
    setCatOpen(false);
    setSvcOpen(false);
    setSearchOpen(false);
    setCatQuery("");
    setSvcQuery("");
    setSearchQuery("");
  }

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
      setExtras({});
    }
  }

  function onServiceChange(id: number) {
    const s = services.find((x) => x.id === id);
    if (s) selectService(s);
  }

  function setExtra(key: ExtraField, value: string) {
    setExtras((prev) => ({ ...prev, [key]: value }));
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
        body: JSON.stringify({
          serviceId: service.id,
          link,
          quantity: billQty,
          ...extras,
        }),
      });
      const data = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) {
        setError(data.error || "Order failed");
        return;
      }
      setMessage(`Order #${data.id} placed successfully.`);
      setLink("");
      setExtras({});
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] lg:items-start">
        <div className="order-1 space-y-4">
      <div ref={searchRef} className="relative z-40">
        <label className="mb-1 block text-sm text-[#93a0b8]">Search service</label>
        <input
          className="input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchOpen(true);
            setCatOpen(false);
            setSvcOpen(false);
          }}
          onFocus={() => {
            if (searchQuery.trim()) setSearchOpen(true);
          }}
          placeholder="Service ID or name… (e.g. 10038 or Instagram Likes)"
          autoComplete="off"
        />
        {searchOpen && searchQuery.trim() ? (
          <div className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden rounded-xl border border-[#243049] bg-[#0d1422] shadow-xl">
            <ul className="max-h-72 overflow-y-auto py-1">
              {searchResults.length === 0 ? (
                <li className="px-3 py-4 text-sm text-[#93a0b8]">No matching services</li>
              ) : (
                searchResults.map((s) => {
                  const platform = detectPlatform(s.category, s.name);
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => selectService(s)}
                        className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left text-sm text-[#e8eefc] hover:bg-[#182236]"
                      >
                        <PlatformIcon platform={platform} size="md" className="mt-0.5" />
                        <span className="min-w-0 flex-1 leading-snug">
                          <span className="text-cyan-300">{s.id}</span>
                          {" — "}
                          {s.name}
                          <span className="mt-0.5 block text-xs text-[#93a0b8]">
                            {s.category} · ${s.rate}/1K · {s.providerType}
                          </span>
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

      <div ref={catRef}>
        <label className="mb-1 block text-sm text-[#93a0b8]">{labels.category}</label>
        <button
          type="button"
          className="input flex w-full items-center gap-2.5 text-left"
          onClick={() => {
            setCatOpen((v) => !v);
            setSvcOpen(false);
            setSearchOpen(false);
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
            setSearchOpen(false);
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
          <div className="mt-3 space-y-1.5 leading-relaxed">
            {service.description.split(/\r?\n/).map((line, i) => {
              const text = line.trim();
              if (!text) return <div key={`sp-${i}`} className="h-1.5" />;
              return (
                <p
                  key={`d-${i}`}
                  className={
                    i === 0
                      ? "font-medium text-[#e8eefc]"
                      : text.startsWith("⚠")
                        ? "text-amber-200/90"
                        : "text-[#93a0b8]"
                  }
                >
                  {text}
                </p>
              );
            })}
          </div>
          <p className="mt-3 border-t border-[#243049] pt-2 text-xs text-[#6b778f]">
            Type: {service.providerType} · Min {service.min.toLocaleString("en-US")} · Max{" "}
            {service.max.toLocaleString("en-US")} · ${service.rate.toFixed(4)} / 1000
          </p>
        </div>
      ) : null}

      {fields.needsLink ? (
        <div>
          <label className="mb-1 block text-sm text-[#93a0b8]">{labels.link}</label>
          <input
            className="input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://"
            required
          />
          {service ? (
            <p className="mt-2 text-sm text-[#93a0b8]">
              {labels.avgDelivery.replace("{minutes}", String(avgDeliveryMinutes(service.id)))}
            </p>
          ) : null}
        </div>
      ) : null}

      {fields.extras.map((field) => {
        const required =
          field === "comments" ||
          field === "username" ||
          field === "keywords" ||
          field === "usernames" ||
          field === "hashtag" ||
          field === "media" ||
          field === "groups" ||
          field === "answer_number";
        if (TEXTAREA_FIELDS.has(field)) {
          return (
            <div key={field}>
              <label className="mb-1 block text-sm text-[#93a0b8]">{EXTRA_LABELS[field]}</label>
              <textarea
                className="input min-h-28 resize-y"
                value={extras[field] || ""}
                onChange={(e) => setExtra(field, e.target.value)}
                placeholder={field === "comments" ? "Great post!\nLove this\nNice shot" : undefined}
                required={required}
              />
              {field === "comments" && commentLines > 0 ? (
                <p className="mt-1 text-xs text-[#93a0b8]">{commentLines} comment line(s) → quantity</p>
              ) : null}
            </div>
          );
        }
        return (
          <div key={field}>
            <label className="mb-1 block text-sm text-[#93a0b8]">{EXTRA_LABELS[field]}</label>
            <input
              className="input"
              value={extras[field] || ""}
              onChange={(e) => setExtra(field, e.target.value)}
              required={required}
            />
          </div>
        );
      })}

      {fields.needsQuantity && !fields.quantityFromComments ? (
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
      ) : null}

      {fields.quantityFromComments ? (
        <div className="rounded-lg border border-[#243049] px-4 py-3 text-sm text-[#93a0b8]">
          Quantity from comments:{" "}
          <span className="font-semibold text-[#e8eefc]">{commentLines || 0}</span>
          {service ? ` (min ${service.min} · max ${service.max})` : null}
        </div>
      ) : null}

      <div className="rounded-lg border border-[#243049] px-4 py-3">
        <span className="text-sm text-[#93a0b8]">{labels.charge}</span>
        <p className="text-2xl font-bold text-cyan-300">${charge.toFixed(4)}</p>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}

      <button type="submit" className="btn-primary" disabled={loading || !service}>
        {loading ? "Placing…" : labels.placeOrder}
      </button>
        </div>

        {aside ? (
          <aside className="order-2 space-y-3 lg:sticky lg:top-4">{aside}</aside>
        ) : null}
      </div>
    </form>
  );
}
