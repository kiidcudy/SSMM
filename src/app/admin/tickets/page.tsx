import { TicketsPanel } from "@/components/TicketsPanel";

export default function AdminTicketsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tickets</h1>
      <p className="mt-1 text-sm text-gray-500">Reply to user support tickets.</p>
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <TicketsPanel isAdmin />
      </div>
    </div>
  );
}
