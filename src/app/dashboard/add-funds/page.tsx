import { getDictionary } from "@/lib/i18n/get-dictionary";
import { AddFundsForm } from "@/components/AddFundsForm";
import { DepositHistory } from "@/components/DepositHistory";

export default function AddFundsPage() {
  const t = getDictionary("en");
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.addFunds}</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#93a0b8]">
        Submit a top-up request, send the payment with your username in the note, then share proof on WhatsApp
        or tickets. Balance is credited after manual verification.
      </p>
      <div className="mt-6">
        <AddFundsForm />
      </div>
      <DepositHistory />
    </div>
  );
}
