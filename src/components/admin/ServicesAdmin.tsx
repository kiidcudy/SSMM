"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMenu } from "@/components/admin/ActionMenu";
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
};

const PROVIDERS = ["smmflare.com", "smmcost.com", "aviralsmm.com", "smmzeus.com"];

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
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const byCat = useMemo(() => {
    const map: Record<string, AdminServiceRow[]> = {};
    for (const s of services) {
      if (filter === "Enabled" && !s.enabled) continue;
      if (filter === "Disabled" && s.enabled) continue;
      if (filter === "Hidden" && !s.hidden) continue;
      (map[s.category] ??= []).push(s);
    }
    return map;
  }, [services, filter]);

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

      <div className="mt-3">
        <SyncServicesButton />
        <p className="mt-1 text-xs text-gray-500">
          {providerConfigured
            ? "Live provider configured — Import / Sync pulls catalog from PROVIDER_API_*."
            : "Set PROVIDER_API_URL + PROVIDER_API_KEY to import from providers."}
        </p>
      </div>

      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}

      <div className="mt-4 space-y-3">
        {Object.keys(byCat).length === 0 ? (
          <div className="rounded border border-gray-200 bg-white px-4 py-10 text-center text-gray-500">
            No services yet. Use Import services / Sync.
          </div>
        ) : (
          Object.entries(byCat).map(([cat, rows]) => {
            const isCollapsed = collapsed[cat];
            return (
              <div key={cat} className="overflow-hidden rounded border border-gray-200 bg-white">
                <div className="flex items-center justify-between bg-gray-100 px-3 py-2 text-sm">
                  <span className="font-medium">{cat}</span>
                  <div className="flex items-center gap-3">
                    <ActionMenu
                      label="Actions"
                      items={[
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
                          <input type="checkbox" aria-label="Select" />
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
                            <input type="checkbox" aria-label={`Select ${s.id}`} />
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
                                  onClick: () => alert("User custom rates cleared for this service (global reset)."),
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
    </div>
  );
}
