import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { replaceServices, clearServicesCache } from "@/lib/store/db";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { fetchMappedProviderServices } from "@/lib/provider/sync-services";

export async function POST() {
  const session = await readSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!isProviderConfigured()) {
    return NextResponse.json(
      { error: "Set PROVIDER_API_URL and PROVIDER_API_KEY (SMMFlare) first" },
      { status: 400 },
    );
  }
  try {
    clearServicesCache();
    const services = await fetchMappedProviderServices();
    await replaceServices(services);
    return NextResponse.json({ ok: true, count: services.length });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Sync failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
