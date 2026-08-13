"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMenu, type ActionMenuItem } from "@/components/admin/ActionMenu";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";
import { SyncServicesButton } from "@/components/admin/SyncServicesButton";

export type AdminServiceRow = {
  id: number;
  category: string;
  name: string;
  type: string;
  rate: number;
  min: number;
  max: number;
  description: string;
  providerServiceId?: number;
  enabled: boolean;
  hidden: boolean;
  dripfeed?: boolean;
};

const PROVIDERS = ["smmflare.com", "smmcost.com", "aviralsmm.com", "smmzeus.com"];

type SortKey = "id" | "name" | "rate" | "min" | "max";

export function ServicesAdmin({
  services,
  providerConfigured,
}: {
  services: AdminServiceRow[];
  providerConfigured: boolean;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [importOpen, setImportOpen] = useState(false);
  const [provider, setProvider] = useState(PROVIDERS[0]);
  const [edit, setEdit] = useState<AdminServiceRow | null>(null);
  const [desc, setDesc] = useState<AdminServiceRow | null>(null);
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const [bulkRatesOpen, setBulkRatesOpen] = useState(false);
  const [bulkRateMode, setBulkRateMode] = useState<"set" | "percent">("percent");
  const [bulkRateValue, setBulkRateValue] = useState("");
  const [bulkNamesOpen, setBulkNamesOpen] = useState(false);
  const [bulkFind, setBulkFind] = useState("");
  const [bulkReplace, setBulkReplace] = useState("");
  const [bulkDesc, setBulkDesc] = useState("");
  const [bulkCategoryOpen, setBulkCategoryOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState("");
  const [bulkFxOpen, setBulkFxOpen] = useState(false);
  const [bulkFx, setBulkFx] = useState("1");

  const categories = useMemo(
    () => Array.from(new Set(services.map((s) => s.category))).sort((a, b) => a.localeCompare(b)),
    [services],
  );

  const byCat = useMemo(() => {
    const q = query.trim().toLowerCase();
    const map: Record<string, AdminServiceRow[]> = {};
    for (const s of services) {
      if (filter === "Enabled" && !s.enabled) continue;
      if (filter === "Disabled" && s.enabled) continue;
      if (filter === "Hidden" && !s.hidden) continue;
      if (q) {
        const idHit =
          String(s.id).includes(q) ||
          (s.providerServiceId != null && String(s.providerServiceId).includes(q));
        const textHit =
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.description || "").toLowerCase().includes(q) ||
          (s.type || "").toLowerCase().includes(q);
        if (!idHit && !textHit) continue;
      }
      (map[s.category] ??= []).push(s);
    }
    for (const rows of Object.values(map)) {
      rows.sort((a, b) => {
        if (sortKey === "name") return a.name.localeCompare(b.name);
        if (sortKey === "rate") return a.rate - b.rate;
        if (sortKey === "min") return a.min - b.min;
        if (sortKey === "max") return a.max - b.max;
        return a.id - b.id;
      });
    }
    return map;
  }, [services, filter, query, sortKey]);

  const visibleIds = useMemo(
    () => Object.values(byCat).flatMap((rows) => rows.map((s) => s.id)),
    [byCat],
  );

  const selectedCount = selected.size;
  const selectedIds = useMemo(() => [...selected], [selected]);

  function toggleOne(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCategory(rows: AdminServiceRow[]) {
    const ids = rows.map((r) => r.id);
    setSelected((prev) => {
      const next = new Set(prev);
      const allOn = ids.every((id) => next.has(id));
      if (allOn) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  }

  function toggleAllVisible() {
    setSelected((prev) => {
      const allOn = visibleIds.length > 0 && visibleIds.every((id) => prev.has(id));
      if (allOn) return new Set();
      return new Set(visibleIds);
    });
  }

  async function run(fn: () => Promise<unknown>) {
    setBusy(true);
    setErr("");
    try {
      await fn();
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function bulk(op: string, extra: Record<string, unknown> = {}) {
    if (!selectedIds.length) return;
    await run(async () => {
      await adminAction("services_bulk", { op, serviceIds: selectedIds, ...extra });
      setSelected(new Set());
    });
  }

  function copySelected(mode: "ids" | "names" | "full") {
    const rows = services.filter((s) => selected.has(s.id));
    let text = "";
    if (mode === "ids") text = rows.map((s) => String(s.id)).join("\n");
    else if (mode === "names") text = rows.map((s) => s.name).join("\n");
    else text = rows.map((s) => `${s.id}\t${s.name}\t${s.rate}\t${s.min}\t${s.max}`).join("\n");
    void navigator.clipboard.writeText(text);
  }

  const bulkMenuItems: ActionMenuItem[] = [
    { label: "Enable all", onClick: () => void bulk("enable") },
    { label: "Disable all", onClick: () => void bulk("disable") },
    { label: "Edit rates", onClick: () => setBulkRatesOpen(true) },
    { label: "Edit names and descriptions", onClick: () => setBulkNamesOpen(true) },
    {
      label: "Sort by",
      children: [
        { label: "ID", onClick: () => setSortKey("id") },
        { label: "Name", onClick: () => setSortKey("name") },
        { label: "Rate", onClick: () => setSortKey("rate") },
        { label: "Min", onClick: () => setSortKey("min") },
        { label: "Max", onClick: () => setSortKey("max") },
      ],
    },
    {
      label: "Assign category",
      onClick: () => {
        setBulkCategory(categories[0] || "");
        setBulkCategoryOpen(true);
      },
    },
    {
      label: "Update currency conversion rate",
      onClick: () => setBulkFxOpen(true),
    },
    {
      label: "Drip-feed",
      children: [
        { label: "Enable", onClick: () => void bulk("set_dripfeed", { dripfeed: true }) },
        { label: "Disable", onClick: () => void bulk("set_dripfeed", { dripfeed: false }) },
      ],
    },
    {
      label: "Deny link duplicates",
      children: [
        {
          label: "Enable",
          onClick: () => void bulk("set_deny_duplicates", { denyDuplicates: true }),
        },
        {
          label: "Disable",
          onClick: () => void bulk("set_deny_duplicates", { denyDuplicates: false }),
        },
      ],
    },
    { label: "Delete custom rates", onClick: () => void bulk("clear_custom_rates") },
    {
      label: "Copy to clipboard",
      children: [
        { label: "Service IDs", onClick: () => copySelected("ids") },
        { label: "Service names", onClick: () => copySelected("names") },
        { label: "ID, name, rate, min, max", onClick: () => copySelected("full") },
      ],
    },
    { label: "Make all visible", onClick: () => void bulk("unhide") },
    { label: "Hide all", onClick: () => void bulk("hide") },
    {
      label: "Delete all",
      danger: true,
      onClick: () => {
        if (confirm(`Delete ${selectedCount} selected service(s)?`)) {
          void bulk("delete");
        }
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            Add service
          </button>
          <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            Add subscription
          </button>
          <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            Create category
          </button>
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Import services
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or service ID…"
            className="w-64 rounded border border-gray-300 px-3 py-1.5 text-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1.5 text-sm"
          >
            <option>All</option>
            <option>Enabled</option>
            <option>Disabled</option>
            <option>Hidden</option>
          </select>
        </div>
      </div>

      <div className="mt-3">
        <SyncServicesButton />
        <p className="mt-1 text-xs text-gray-500">
          {providerConfigured
            ? "Live provider configured — Import / Sync pulls catalog from PROVIDER_API_*."
            : "Set PROVIDER_API_URL + PROVIDER_API_KEY to import from providers."}
        </p>
      </div>

      {selectedCount > 0 ? (
        <div className="sticky top-0 z-20 mt-3 flex flex-wrap items-center gap-3 rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={visibleIds.length > 0 && visibleIds.every((id) => selected.has(id))}
            onChange={toggleAllVisible}
            aria-label="Select all visible"
          />
          <span className="font-medium text-blue-900">
            {selectedCount} service{selectedCount === 1 ? "" : "s"} selected
          </span>
          <ActionMenu label="Actions" items={bulkMenuItems} />
          <button
            type="button"
            className="text-xs text-blue-700 hover:underline"
            onClick={() => setSelected(new Set())}
          >
            Clear selection
          </button>
        </div>
      ) : null}

      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}

      <div className="mt-4 space-y-3">
        {Object.keys(byCat).length === 0 ? (
          <div className="rounded border border-gray-200 bg-white px-4 py-10 text-center text-gray-500">
            {query.trim()
              ? "No services match this search."
              : "No services yet. Use Import services / Sync."}
          </div>
        ) : (
          Object.entries(byCat).map(([cat, rows]) => {
            const isCollapsed = collapsed[cat];
            const catAllSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
            return (
              <div key={cat} className="overflow-visible rounded border border-gray-200 bg-white">
                <div className="flex items-center justify-between bg-gray-100 px-3 py-2 text-sm">
                  <span className="font-medium">{cat}</span>
                  <div className="flex items-center gap-3">
                    <ActionMenu
                      label="Actions"
                      items={[
                        {
                          label: "Select all in category",
                          onClick: () =>
                            setSelected((prev) => {
                              const next = new Set(prev);
                              rows.forEach((r) => next.add(r.id));
                              return next;
                            }),
                        },
                        {
                          label: "Collapse / Expand",
                          onClick: () => setCollapsed((c) => ({ ...c, [cat]: !c[cat] })),
                        },
                      ]}
                    />
                    <button
                      type="button"
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => setCollapsed((c) => ({ ...c, [cat]: !c[cat] }))}
                    >
                      {isCollapsed ? `Expand (${rows.length})` : `Collapse (${rows.length})`}
                    </button>
                  </div>
                </div>
                {!isCollapsed ? (
                  <table className="table-admin">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            checked={catAllSelected}
                            onChange={() => toggleCategory(rows)}
                            aria-label={`Select ${cat}`}
                          />
                        </th>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Type</th>
                        <th>Provider</th>
                        <th>Rate</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((s) => (
                        <tr key={s.id} className={s.hidden ? "opacity-50" : undefined}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selected.has(s.id)}
                              onChange={() => toggleOne(s.id)}
                              aria-label={`Select ${s.id}`}
                            />
                          </td>
                          <td>{s.id}</td>
                          <td className="max-w-[280px] text-sm">{s.name}</td>
                          <td className="capitalize">{s.type || "Default"}</td>
                          <td>{s.providerServiceId ? "Auto" : "Manual"}</td>
                          <td>{s.rate.toFixed(2)}</td>
                          <td>{s.min}</td>
                          <td>{s.max}</td>
                          <td>
                            <span
                              className={`rounded px-1.5 py-0.5 text-xs ${
                                s.enabled ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {s.enabled ? "Enabled" : "Disabled"}
                            </span>
                          </td>
                          <td>
                            <ActionMenu
                              items={[
                                {
                                  label: "Edit service",
                                  onClick: () => {
                                    setEdit(s);
                                    setName(s.name);
                                    setRate(String(s.rate));
                                  },
                                },
                                {
                                  label: "Edit description",
                                  onClick: () => {
                                    setDesc(s);
                                    setDescription(s.description || "");
                                  },
                                },
                                {
                                  label: s.enabled ? "Disable service" : "Enable service",
                                  onClick: () =>
                                    run(() =>
                                      adminAction("service_override", {
                                        serviceId: s.id,
                                        enabled: !s.enabled,
                                      }),
                                    ),
                                },
                                {
                                  label: "Delete custom rates",
                                  onClick: () =>
                                    run(() =>
                                      adminAction("services_bulk", {
                                        op: "clear_custom_rates",
                                        serviceIds: [s.id],
                                      }),
                                    ),
                                },
                                {
                                  label: "Duplicate",
                                  onClick: () => run(() => adminAction("duplicate_service", { serviceId: s.id })),
                                },
                                {
                                  label: s.hidden ? "Unhide service" : "Hide service",
                                  onClick: () =>
                                    run(() =>
                                      adminAction("service_override", {
                                        serviceId: s.id,
                                        hidden: !s.hidden,
                                      }),
                                    ),
                                },
                                {
                                  label: "Delete service",
                                  danger: true,
                                  onClick: () => {
                                    if (confirm(`Delete service #${s.id}?`)) {
                                      run(() => adminAction("delete_service", { serviceId: s.id }));
                                    }
                                  },
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            );
          })
        )}
      </div>

      <Modal title="Import services" open={importOpen} onClose={() => setImportOpen(false)}>
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Provider</span>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-1.5"
            >
              {PROVIDERS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-gray-500">
            Import uses the configured PROVIDER_API_* credentials (recommended: smmflare.com). Other names are for
            reference when you switch env keys.
          </p>
          <div className="flex gap-2">
            <SyncServicesButton />
            <button type="button" className="rounded border px-3 py-1.5 text-sm" onClick={() => setImportOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal title="Edit service" open={!!edit} onClose={() => setEdit(null)}>
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-1.5" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Rate</span>
            <input value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded border px-3 py-1.5" />
          </label>
          <button
            type="button"
            disabled={busy}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              run(async () => {
                await adminAction("service_override", {
                  serviceId: edit!.id,
                  name,
                  rate: Number(rate),
                });
                setEdit(null);
              })
            }
          >
            Save
          </button>
        </div>
      </Modal>

      <Modal title="Edit description" open={!!desc} onClose={() => setDesc(null)}>
        <div className="space-y-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={14}
            className="w-full rounded border px-3 py-1.5 font-mono text-sm leading-relaxed whitespace-pre"
          />
          <button
            type="button"
            disabled={busy}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              run(async () => {
                await adminAction("service_override", {
                  serviceId: desc!.id,
                  description,
                });
                setDesc(null);
              })
            }
          >
            Save
          </button>
        </div>
      </Modal>

      <Modal title="Edit rates" open={bulkRatesOpen} onClose={() => setBulkRatesOpen(false)}>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{selectedCount} service(s) selected</p>
          <select
            value={bulkRateMode}
            onChange={(e) => setBulkRateMode(e.target.value as "set" | "percent")}
            className="w-full rounded border px-3 py-1.5 text-sm"
          >
            <option value="percent">Change by percent (e.g. 10 or -5)</option>
            <option value="set">Set absolute rate</option>
          </select>
          <input
            value={bulkRateValue}
            onChange={(e) => setBulkRateValue(e.target.value)}
            placeholder={bulkRateMode === "percent" ? "Percent" : "Rate"}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <button
            type="button"
            disabled={busy || !bulkRateValue}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            onClick={() =>
              run(async () => {
                const n = Number(bulkRateValue);
                if (!Number.isFinite(n)) throw new Error("Invalid number");
                if (bulkRateMode === "set") {
                  await adminAction("services_bulk", {
                    op: "set_rate",
                    serviceIds: selectedIds,
                    rate: n,
                  });
                } else {
                  await adminAction("services_bulk", {
                    op: "multiply_rate",
                    serviceIds: selectedIds,
                    factor: 1 + n / 100,
                  });
                }
                setBulkRatesOpen(false);
                setSelected(new Set());
              })
            }
          >
            Apply
          </button>
        </div>
      </Modal>

      <Modal title="Edit names and descriptions" open={bulkNamesOpen} onClose={() => setBulkNamesOpen(false)}>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{selectedCount} service(s) selected</p>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Find in name</span>
            <input
              value={bulkFind}
              onChange={(e) => setBulkFind(e.target.value)}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Replace with</span>
            <input
              value={bulkReplace}
              onChange={(e) => setBulkReplace(e.target.value)}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Set description (optional, same for all)</span>
            <textarea
              value={bulkDesc}
              onChange={(e) => setBulkDesc(e.target.value)}
              rows={6}
              className="w-full rounded border px-3 py-1.5 font-mono text-sm"
              placeholder="Leave empty to skip"
            />
          </label>
          <button
            type="button"
            disabled={busy || (!bulkFind && !bulkDesc.trim())}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            onClick={() =>
              run(async () => {
                if (bulkFind) {
                  await adminAction("services_bulk", {
                    op: "replace_name",
                    serviceIds: selectedIds,
                    find: bulkFind,
                    replace: bulkReplace,
                  });
                }
                if (bulkDesc.trim()) {
                  await adminAction("services_bulk", {
                    op: "set_description",
                    serviceIds: selectedIds,
                    description: bulkDesc,
                  });
                }
                setBulkNamesOpen(false);
                setBulkFind("");
                setBulkReplace("");
                setBulkDesc("");
                setSelected(new Set());
              })
            }
          >
            Apply
          </button>
        </div>
      </Modal>

      <Modal title="Assign category" open={bulkCategoryOpen} onClose={() => setBulkCategoryOpen(false)}>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{selectedCount} service(s) selected</p>
          <input
            list="admin-categories"
            value={bulkCategory}
            onChange={(e) => setBulkCategory(e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
            placeholder="Category name"
          />
          <datalist id="admin-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <button
            type="button"
            disabled={busy || !bulkCategory.trim()}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            onClick={() =>
              run(async () => {
                await adminAction("services_bulk", {
                  op: "set_category",
                  serviceIds: selectedIds,
                  category: bulkCategory.trim(),
                });
                setBulkCategoryOpen(false);
                setSelected(new Set());
              })
            }
          >
            Assign
          </button>
        </div>
      </Modal>

      <Modal title="Update currency conversion rate" open={bulkFxOpen} onClose={() => setBulkFxOpen(false)}>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Multiply selected rates by a factor (e.g. 1.1 = +10%, 0.9 = −10%).
          </p>
          <input
            value={bulkFx}
            onChange={(e) => setBulkFx(e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
            placeholder="Factor"
          />
          <button
            type="button"
            disabled={busy || !bulkFx}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            onClick={() =>
              run(async () => {
                const factor = Number(bulkFx);
                if (!Number.isFinite(factor) || factor <= 0) throw new Error("Invalid factor");
                await adminAction("services_bulk", {
                  op: "multiply_rate",
                  serviceIds: selectedIds,
                  factor,
                });
                setBulkFxOpen(false);
                setSelected(new Set());
              })
            }
          >
            Apply
          </button>
        </div>
      </Modal>
    </div>
  );
}
