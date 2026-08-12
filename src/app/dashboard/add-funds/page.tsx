import { getDictionary } from "@/lib/i18n/get-dictionary";
import { readPreferredLocale } from "@/lib/i18n/locale-preference";
import { AddFundsForm } from "@/components/AddFundsForm";
import { DepositHistory } from "@/components/DepositHistory";

export default async function AddFundsPage() {
  const locale = await readPreferredLocale();
  const t = getDictionary(locale);
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.addFunds}</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#93a0b8]">{t.dash.addFundsIntro}</p>
      <div className="mt-6">
        <AddFundsForm
          locale={locale}
          labels={{
            method: t.dash.method,
            amount: t.dash.amount,
            note: t.dash.note,
            submitFund: t.dash.submitFund,
            submitting: t.dash.submitting,
            contactToPay: t.dash.contactToPay,
            openTicket: t.dash.openTicket,
            fundSubmitted: t.dash.fundSubmitted,
            networkError: t.dash.networkError,
            requestFailed: t.dash.requestFailed,
          }}
        />
      </div>
      <DepositHistory
        locale={locale}
        labels={{
          depositRequests: t.dash.depositRequests,
          transactionLedger: t.dash.transactionLedger,
          noDeposits: t.dash.noDeposits,
          noLedger: t.dash.noLedger,
          method: t.dash.method,
          amount: t.dash.amount,
          status: t.dash.status,
          type: t.dash.type,
          id: t.dash.id,
          yourBalance: t.dash.yourBalance,
          note: t.dash.note,
        }}
      />
    </div>
  );
}
