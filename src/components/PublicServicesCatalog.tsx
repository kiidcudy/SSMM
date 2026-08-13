"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { avgDeliveryMinutes } from "@/lib/data/catalog";
import { detectPlatform } from "@/lib/platforms";
import { PlatformIcon } from "@/components/PlatformIcon";

export type PublicServiceItem = {
  id: number;
  name: string;
  category: string;
  rate: number;
  min: number;
  max: number;
  description: string;
  refill?: boolean;
  cancel?: boolean;
  dripfeed?: boolean;
};

type Labels = {
  search: string;
  category: string;
  advanced: string;
  allCategories: string;
  min: string;
  max: string;
  description: string;
  buyNow: string;
  close: string;
  noResults: string;
  refill: string;
  cancel: string;
  dripfeed: string;
  instant: string;
  clearFilters: string;
  results: string;
};

function fmtQty(n: number): string {
  return n.toLocaleString("fr-FR");
}

function fmtMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12.75a.75.75 0 00-1.5 0v4.5c0 .192.168.1.5.75h3.5a.75.75 0 000-1.5H10.75V5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 2c-4.418 0-8 2.91-8 6.5 0 1.63.76 3.12 2.02 4.25L3 17l4.12-1.65A9.3 9.3 0 0010 15.5c4.418 0 8-2.91 8-6.5S14.418 2 10 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M6 5a4 4 0 118 0v1h1.5A1.5 1.5 0 0117 7.5v8A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-8A1.5 1.5 0 014.5 6H6V5zm1.5 1h5V5a2.5 2.5 0 00-5 0v1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PublicServicesCatalog({
  services,
  labels,
  buyHref,
}: {
  services: PublicServiceItem[];
  labels: Labels;
  /** Path template with {id}, e.g. /dashboard/new-order?service={id} */
  buyHref: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [catOpen, setCatOpen] = useState(false);
  const [advOpen, setAdvOpen] = useState(false);
  const [onlyRefill, setOnlyRefill] = useState(false);
  const [onlyCancel, setOnlyCancel] = useState(false);
  const [onlyDrip, setOnlyDrip] = useState(false);
  const [onlyInstant, setOnlyInstant] = useState(false);
  const [descService, setDescService] = useState<PublicServiceItem | null>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const advRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => Array.from(new Set(services.map((s) => s.category))).sort((a, b) => a.localeCompare(b)),
    [services],
  );

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (!catRef.current?.contains(t)) setCatOpen(false);
      if (!advRef.current?.contains(t)) setAdvOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!descService) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDescService(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [descService]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (onlyRefill && !s.refill) return false;
      if (onlyCancel && !s.cancel) return false;
      if (onlyDrip && !s.dripfeed) return false;
      if (onlyInstant) {
        const blob = `${s.name} ${s.description}`.toLowerCase();
        if (!/instant/.test(blob)) return false;
      }
      if (!q) return true;
      return (
        String(s.id).includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
      );
    });
  }, [services, query, category, onlyRefill, onlyCancel, onlyDrip, onlyInstant]);

  const grouped = useMemo(() => {
    const map: Record<string, PublicServiceItem[]> = {};
    for (const s of filtered) (map[s.category] ??= []).push(s);
    return map;
  }, [filtered]);

  const activeAdv = [onlyRefill, onlyCancel, onlyDrip, onlyInstant].filter(Boolean).length;
  const categoryLabel = category === "all" ? labels.allCategories : category;

  function buyLink(id: number) {
    return buyHref.replace("{id}", String(id));
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-2 z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/95 p-2 shadow-lg backdrop-blur">
        <div className="relative" ref={catRef}>
          <button
            type="button"
            onClick={() => {
              setCatOpen((v) => !v);
              setAdvOpen(false);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2 text-sm font-medium hover:border-cyan-500/40"
          >
            <svg className="h-4 w-4 text-[var(--color-muted)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M3 4.75A.75.75 0 013.75 4h12.5a.75.75 0 01.53 1.28L12 10.06V15a.75.75 0 01-1.14.64l-2-1.25A.75.75 0 018.5 13.75v-3.69L3.22 5.28A.75.75 0 013 4.75z"
                clipRule="evenodd"
              />
            </svg>
            {labels.category}
            {category !== "all" ? (
              <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-xs text-cyan-200">1</span>
            ) : null}
          </button>
          {catOpen ? (
            <div className="absolute left-0 z-30 mt-1 max-h-80 w-72 overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] py-1 shadow-xl">
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => {
                  setCategory("all");
                  setCatOpen(false);
                }}
              >
                {labels.allCategories}
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/5"
                  onClick={() => {
                    setCategory(c);
                    setCatOpen(false);
                  }}
                >
                  <PlatformIcon platform={detectPlatform(c)} size="sm" />
                  <span className="truncate">{c}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative" ref={advRef}>
          <button
            type="button"
            onClick={() => {
              setAdvOpen((v) => !v);
              setCatOpen(false);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2 text-sm font-medium hover:border-cyan-500/40"
          >
            {labels.advanced}
            {activeAdv > 0 ? (
              <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-xs text-cyan-200">{activeAdv}</span>
            ) : null}
          </button>
          {advOpen ? (
            <div className="absolute left-0 z-30 mt-1 w-64 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 shadow-xl">
              <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                <input type="checkbox" checked={onlyRefill} onChange={(e) => setOnlyRefill(e.target.checked)} />
                {labels.refill}
              </label>
              <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                <input type="checkbox" checked={onlyCancel} onChange={(e) => setOnlyCancel(e.target.checked)} />
                {labels.cancel}
              </label>
              <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                <input type="checkbox" checked={onlyDrip} onChange={(e) => setOnlyDrip(e.target.checked)} />
                {labels.dripfeed}
              </label>
              <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                <input type="checkbox" checked={onlyInstant} onChange={(e) => setOnlyInstant(e.target.checked)} />
                {labels.instant}
              </label>
              {activeAdv > 0 ? (
                <button
                  type="button"
                  className="mt-2 text-xs text-cyan-300 hover:underline"
                  onClick={() => {
                    setOnlyRefill(false);
                    setOnlyCancel(false);
                    setOnlyDrip(false);
                    setOnlyInstant(false);
                  }}
                >
                  {labels.clearFilters}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="relative min-w-[220px] flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] py-2 pr-3 pl-9 text-sm outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      <p className="text-sm text-[var(--color-muted)]">
        {labels.results.replace("{count}", String(filtered.length))}
        {category !== "all" ? ` · ${categoryLabel}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-12 text-center text-[var(--color-muted)]">
          {labels.noResults}
        </div>
      ) : (
        Object.entries(grouped).map(([cat, rows]) => (
          <div key={cat} className="space-y-3">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold">
              <PlatformIcon platform={detectPlatform(cat)} size="md" />
              {cat}
              <span className="text-sm font-normal text-[var(--color-muted)]">({rows.length})</span>
            </h2>
            <div className="space-y-2">
              {rows.map((s) => {
                const mins = avgDeliveryMinutes(s.id);
                return (
                  <article
                    key={s.id}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-3 sm:px-4"
                  >
                    <div className="flex flex-wrap items-start gap-3">
                      <span className="shrink-0 rounded-full bg-cyan-400/15 px-2.5 py-1 text-xs font-semibold text-cyan-200">
                        ID: {s.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                          <PlatformIcon
                            platform={detectPlatform(s.category, s.name)}
                            size="sm"
                            className="mt-0.5 shrink-0"
                          />
                          <p className="text-sm font-medium leading-snug sm:text-[15px]">{s.name}</p>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
                          {s.refill ? (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
                              ♻️ {labels.refill}
                            </span>
                          ) : null}
                          {s.cancel ? (
                            <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-sky-300">
                              ✔️ {labels.cancel}
                            </span>
                          ) : null}
                          {s.dripfeed ? (
                            <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-indigo-200">
                              💧 {labels.dripfeed}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="ml-auto flex shrink-0 items-baseline gap-2 text-right">
                        <span className="text-base font-bold text-[var(--color-text)]">{fmtMoney(s.rate)}</span>
                        <span className="text-xs text-[var(--color-muted)]">1000</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--color-border)] pt-3">
                      <span className="text-sm text-[var(--color-muted)]">
                        {labels.min}:{" "}
                        <span className="font-medium text-[var(--color-text)]">{fmtQty(s.min)}</span>
                      </span>
                      <span className="text-sm text-[var(--color-muted)]">
                        {labels.max}:{" "}
                        <span className="font-medium text-[var(--color-text)]">{fmtQty(s.max)}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {mins} minutes
                      </span>
                      <div className="ml-auto flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setDescService(s)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1.5 text-sm font-medium hover:border-cyan-500/40"
                        >
                          <ChatIcon className="h-4 w-4 text-[var(--color-muted)]" />
                          {labels.description}
                        </button>
                        <Link
                          href={buyLink(s.id)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-3 py-1.5 text-sm font-bold text-[#041016] hover:brightness-105"
                        >
                          <BagIcon className="h-4 w-4" />
                          {labels.buyNow}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))
      )}

      {descService ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setDescService(null)}
        >
          <div
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-cyan-300">ID: {descService.id}</p>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug">
                  {descService.name}
                </h3>
              </div>
              <button
                type="button"
                className="rounded-lg border border-[var(--color-border)] px-2 py-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]"
                onClick={() => setDescService(null)}
              >
                {labels.close}
              </button>
            </div>
            <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
              {(descService.description || "—").split(/\r?\n/).map((line, i) => {
                const text = line.trim();
                if (!text) return <div key={i} className="h-1.5" />;
                return (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-medium text-[var(--color-text)]"
                        : text.startsWith("⚠")
                          ? "text-amber-200/90"
                          : undefined
                    }
                  >
                    {text}
                  </p>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-muted)]">
              <span>
                {labels.min}: {fmtQty(descService.min)}
              </span>
              <span>·</span>
              <span>
                {labels.max}: {fmtQty(descService.max)}
              </span>
              <span>·</span>
              <span>{fmtMoney(descService.rate)} / 1000</span>
            </div>
            <Link
              href={buyLink(descService.id)}
              className="btn-primary mt-4 w-full"
              onClick={() => setDescService(null)}
            >
              {labels.buyNow}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
