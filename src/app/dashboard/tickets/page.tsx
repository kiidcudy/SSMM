import { getDictionary } from "@/lib/i18n/get-dictionary";
import { TicketsPanel } from "@/components/TicketsPanel";

export default function TicketsPage() {
  const t = getDictionary("en");
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.tickets}</h1>
      <p className="mt-2 text-sm text-[#93a0b8]">
        Open a ticket for order or payment issues. WhatsApp/Telegram still available on Contact.
      </p>
      <div className="mt-6">
        <TicketsPanel />
      </div>
    </div>
  );
}
