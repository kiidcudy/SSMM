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
  providerHost?: string;
  enabled: boolean;
  hidden: boolean;
  dripfeed?: boolean;
};

type ProviderOption = { id: string; name: string; hasKey: boolean };

type CatalogService = {
  providerServiceId: number;
  name: string;
  category: string;
  rate: number;
  min: number;
  max: number;
};

type SortKey = "id" | "name" | "rate" | "min" | "max";

export function ServicesAdmin({
  services,
  providerConfigured,
  categories,
  providers,
}: {
  services: AdminServiceRow[];
  providerConfigured: boolean;
  categories: string[];
  providers: ProviderOption[];
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
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

  const [addOpen, setAddOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addRate, setAddRate] = useState("");
  const [addMin, setAddMin] = useState("1");
  const [addMax, setAddMax] = useState("1000");
  const [addDescription, setAddDescription] = useState("");

  const [catOpen, setCatOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const [catPosition, setCatPosition] = useState<"top" | "bottom">("bottom");

  const [importOpen, setImportOpen] = useState(false);
  const [importStep, setImportStep] = useState<1 | 2>(1);
  const [importProviderId, setImportProviderId] = useState("");
  const [catalog, setCatalog] = useState<CatalogService[]>([]);
  const [providerName, setProviderName] = useState("");
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [editingGroupCat, setEditingGroupCat] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [importSelected, setImportSelected] = useState<Set<number>>(new Set());
  const [copyDescriptions, setCopyDescriptions] = useState(true);
  const [hideAdded, setHideAdded] = useState(true);

  const sortedProviders = useMemo(() => {
    return [...providers].sort((a, b) => {
      if (a.hasKey !== b.hasKey) return a.hasKey ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [providers]);

  const selectedProvider = useMemo(
    () => sortedProviders.find((p) => p.id === importProviderId) || null,
    [sortedProviders, importProviderId],
  );

  const existingProviderIds = useMemo(() => {
    const set = new Set<number>();
    for (const s of services) {
      if (s.providerServiceId != null) set.add(s.providerServiceId);
    }
    return set;
  }, [services]);

  const filteredCatalog = useMemo(() => {
    if (!hideAdded) return catalog;
    return catalog.filter((s) => !existingProviderIds.has(s.providerServiceId));
  }, [catalog, hideAdded, existingProviderIds]);

  const catalogGroups = useMemo(() => {
    const map: Record<string, CatalogService[]> = {};
    for (const s of filteredCatalog) {
      const cat = s.category || "Other";
      (map[cat] ??= []).push(s);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredCatalog]);

  const importSelectedCount = importSelected.size;

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
          (s.type || "").toLowerCase().includes(q) ||
          (s.providerHost || "").toLowerCase().includes(q);
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

  function defaultLocalCategory(providerCategory: string) {
    if (categories.includes(providerCategory)) return providerCategory;
    if (providerCategory.trim()) return providerCategory;
    return categories[0] || providerCategory || "Other";
  }

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

  function resetImport() {
    setImportStep(1);
    setImportProviderId(sortedProviders.find((p) => p.hasKey)?.id || sortedProviders[0]?.id || "");
    setCatalog([]);
    setProviderName("");
    setCategoryMap({});
    setEditingGroupCat(null);
    setExpandedGroups({});
    setImportSelected(new Set());
    setCopyDescriptions(true);
    setHideAdded(true);
  }

  function openImport() {
    resetImport();
    setImportOpen(true);
  }

  function closeImport() {
    setImportOpen(false);
    resetImport();
  }

  async function loadCatalog() {
    if (!importProviderId) {
      setErr("Select a provider");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const data = (await adminAction("provider_services", { providerId: importProviderId })) as {
        services?: CatalogService[];
        providerName?: string;
      };
      const list = Array.isArray(data.services) ? data.services : [];
      const map: Record<string, string> = {};
      for (const s of list) {
        const cat = s.category || "Other";
        if (!(cat in map)) map[cat] = defaultLocalCategory(cat);
      }
      setCatalog(list);
      setProviderName(data.providerName || selectedProvider?.name || "");
      setCategoryMap(map);
      setImportSelected(new Set());
      setExpandedGroups({});
      setEditingGroupCat(null);
      setImportStep(2);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  function toggleImportService(id: number) {
    setImportSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleImportGroup(rows: CatalogService[]) {
    const ids = rows.map((r) => r.providerServiceId);
    setImportSelected((prev) => {
      const next = new Set(prev);
      const allOn = ids.every((id) => next.has(id));
      if (allOn) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  }

  async function doImport() {
    if (!importProviderId || !importSelectedCount) return;
    const byId = new Map(catalog.map((s) => [s.providerServiceId, s]));
    const items = [...importSelected].map((providerServiceId) => {
      const svc = byId.get(providerServiceId);
      const providerCat = svc?.category || "Other";
      return {
        providerServiceId,
        category: categoryMap[providerCat] || defaultLocalCategory(providerCat),
      };
    });
    await run(async () => {
      await adminAction("import_services", {
        providerId: importProviderId,
        copyDescriptions,
        items,
      });
      closeImport();
    });
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
          <button
            type="button"
            onClick={() => {
              setAddName("");
              setAddCategory(categories[0] || "");
              setAddRate("");
              setAddMin("1");
              setAddMax("1000");
              setAddDescription("");
              setAddOpen(true);
            }}
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Add service
          </button>
          <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            Add subscription
          </button>
          <button
            type="button"
            onClick={() => {
              setCatName("");
              setCatPosition("bottom");
              setCatOpen(true);
            }}
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Create category
          </button>
          <button
            type="button"
            onClick={openImport}
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
            ? "Providers with API keys are managed under Settings → Providers. Import uses those panels; Sync still falls back to PROVIDER_API_* env if no DB provider is set."
            : "Add a provider under Settings → Providers (API URL + key), or set PROVIDER_API_URL + PROVIDER_API_KEY for Sync fallback."}
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
                          <td>
                            {s.providerHost
                              ? s.providerHost
                              : s.providerServiceId
                                ? "Auto"
                                : "Manual"}
                          </td>
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

      <Modal title="Add service" open={addOpen} onClose={() => setAddOpen(false)}>
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Name</span>
            <input
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Category</span>
            <input
              list="add-service-categories"
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
              className="w-full rounded border px-3 py-1.5"
              placeholder="Select or type a category"
            />
            <datalist id="add-service-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Rate</span>
            <input
              value={addRate}
              onChange={(e) => setAddRate(e.target.value)}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="mb-1 block text-gray-600">Min</span>
              <input
                value={addMin}
                onChange={(e) => setAddMin(e.target.value)}
                className="w-full rounded border px-3 py-1.5"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-gray-600">Max</span>
              <input
                value={addMax}
                onChange={(e) => setAddMax(e.target.value)}
                className="w-full rounded border px-3 py-1.5"
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Description</span>
            <textarea
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
              rows={6}
              className="w-full rounded border px-3 py-1.5 font-mono text-sm"
            />
          </label>
          <button
            type="button"
            disabled={busy || !addName.trim() || !addCategory.trim()}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            onClick={() =>
              run(async () => {
                await adminAction("add_service", {
                  name: addName.trim(),
                  category: addCategory.trim(),
                  rate: Number(addRate) || 0,
                  min: Number(addMin) || 1,
                  max: Number(addMax) || 1,
                  description: addDescription,
                });
                setAddOpen(false);
              })
            }
          >
            Save
          </button>
        </div>
      </Modal>

      <Modal title="Create category" open={catOpen} onClose={() => setCatOpen(false)}>
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Category name</span>
            <input
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              className="w-full rounded border px-3 py-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Position</span>
            <select
              value={catPosition}
              onChange={(e) => setCatPosition(e.target.value as "top" | "bottom")}
              className="w-full rounded border px-3 py-1.5"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </label>
          <button
            type="button"
            disabled={busy || !catName.trim()}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            onClick={() =>
              run(async () => {
                await adminAction("create_category", { name: catName.trim(), position: catPosition });
                setCatOpen(false);
              })
            }
          >
            Save
          </button>
        </div>
      </Modal>

      <Modal
        title="Import services"
        open={importOpen}
        onClose={closeImport}
        wide
        headerRight={
          importStep === 2 ? (
            <label className="flex items-center gap-1.5 text-xs font-normal text-gray-600">
              <input
                type="checkbox"
                checked={hideAdded}
                onChange={(e) => setHideAdded(e.target.checked)}
              />
              Hide added
            </label>
          ) : null
        }
      >
        {importStep === 1 ? (
          <div className="space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block text-gray-600">Provider</span>
              <select
                value={importProviderId}
                onChange={(e) => setImportProviderId(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-1.5"
              >
                {sortedProviders.length === 0 ? (
                  <option value="">No providers configured</option>
                ) : (
                  sortedProviders.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                      {p.hasKey ? "" : " (no API key)"}
                    </option>
                  ))
                )}
              </select>
            </label>
            {selectedProvider && !selectedProvider.hasKey ? (
              <p className="text-xs text-amber-700">
                This provider has no API key. Add a key under Settings → Providers before importing.
              </p>
            ) : null}
            {sortedProviders.length === 0 ? (
              <p className="text-xs text-gray-500">
                Add providers under Settings → Providers, then return here to import.
              </p>
            ) : null}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={busy || !importProviderId || (selectedProvider != null && !selectedProvider.hasKey)}
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                onClick={() => void loadCatalog()}
              >
                Continue
              </button>
              <button type="button" className="rounded border px-3 py-1.5 text-sm" onClick={closeImport}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Catalog from <span className="font-medium">{providerName || selectedProvider?.name}</span>
              {" · "}
              {filteredCatalog.length} service{filteredCatalog.length === 1 ? "" : "s"}
              {hideAdded ? " (hiding already added)" : ""}
            </p>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={copyDescriptions}
                onChange={(e) => setCopyDescriptions(e.target.checked)}
              />
              Copy descriptions
            </label>

            <div className="max-h-[50vh] space-y-2 overflow-y-auto">
              {catalogGroups.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">
                  {hideAdded && catalog.length > 0
                    ? "All provider services are already imported. Uncheck Hide added to see them."
                    : "No services returned from this provider."}
                </p>
              ) : (
                catalogGroups.map(([groupCat, rows]) => {
                  const allOn = rows.length > 0 && rows.every((r) => importSelected.has(r.providerServiceId));
                  const mapped = categoryMap[groupCat] || defaultLocalCategory(groupCat);
                  const expanded = Boolean(expandedGroups[groupCat]);
                  return (
                    <div key={groupCat} className="rounded border border-gray-200">
                      <div className="flex flex-wrap items-center gap-2 bg-gray-50 px-3 py-2 text-sm">
                        <input
                          type="checkbox"
                          checked={allOn}
                          onChange={() => toggleImportGroup(rows)}
                          aria-label={`Select all ${groupCat}`}
                        />
                        <span className="font-medium">{groupCat}</span>
                        <span className="text-xs text-gray-500">({rows.length})</span>
                        <span className="text-xs text-gray-500">Assigned →</span>
                        {editingGroupCat === groupCat ? (
                          <input
                            list="import-local-categories"
                            autoFocus
                            value={mapped}
                            onChange={(e) =>
                              setCategoryMap((prev) => ({ ...prev, [groupCat]: e.target.value }))
                            }
                            onBlur={() => setEditingGroupCat(null)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") setEditingGroupCat(null);
                            }}
                            className="w-40 rounded border px-2 py-0.5 text-xs"
                          />
                        ) : (
                          <>
                            <span className="rounded bg-white px-1.5 py-0.5 text-xs font-medium text-gray-800">
                              {mapped}
                            </span>
                            <button
                              type="button"
                              className="text-xs text-blue-600 hover:underline"
                              onClick={() => setEditingGroupCat(groupCat)}
                            >
                              Change
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          className="ml-auto text-xs text-blue-600 hover:underline"
                          onClick={() =>
                            setExpandedGroups((prev) => ({ ...prev, [groupCat]: !prev[groupCat] }))
                          }
                        >
                          {expanded ? "Hide services" : `Show services (${rows.length})`}
                        </button>
                      </div>
                      {expanded ? (
                        <ul className="divide-y divide-gray-100">
                          {rows.map((s) => (
                            <li
                              key={s.providerServiceId}
                              className="flex items-center gap-3 px-3 py-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={importSelected.has(s.providerServiceId)}
                                onChange={() => toggleImportService(s.providerServiceId)}
                                aria-label={`Select ${s.name}`}
                              />
                              <span className="min-w-0 flex-1 truncate">{s.name}</span>
                              <span className="shrink-0 text-xs text-gray-500">#{s.providerServiceId}</span>
                              <span className="shrink-0 tabular-nums text-xs text-gray-700">
                                {Number(s.rate).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
            <datalist id="import-local-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>

            <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3">
              <button type="button" className="rounded border px-3 py-1.5 text-sm" onClick={closeImport}>
                Close
              </button>
              <button
                type="button"
                className="rounded border px-3 py-1.5 text-sm"
                onClick={() => {
                  setImportStep(1);
                  setCatalog([]);
                  setImportSelected(new Set());
                }}
              >
                Back
              </button>
              <span className="text-sm text-gray-600">
                {importSelectedCount} service{importSelectedCount === 1 ? "" : "s"} selected
              </span>
              <button
                type="button"
                disabled={busy || importSelectedCount === 0}
                className="ml-auto rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                onClick={() => void doImport()}
              >
                Import
              </button>
            </div>
          </div>
        )}
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
