import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { readPreferredLocale } from "@/lib/i18n/locale-preference";
import { readSession } from "@/lib/auth/session";
import { AddFundsForm } from "@/components/AddFundsForm";
import { DepositHistory } from "@/components/DepositHistory";

export default async function AddFundsPage() {
  const session = await readSession();
  if (!session) redirect("/login");
  const locale = await readPreferredLocale();
  const t = getDictionary(locale);
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.addFunds}</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#93a0b8]">{t.dash.addFundsIntro}</p>
      <div className="mt-6">
        <AddFundsForm
          locale={locale}
          username={session.username}
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
            binanceTitle: t.dash.binanceTitle,
            binanceSendExact: t.dash.binanceSendExact,
            binanceSendToId: t.dash.binanceSendToId,
            binanceCopy: t.dash.binanceCopy,
            binanceCopied: t.dash.binanceCopied,
            binanceNickname: t.dash.binanceNickname,
            binanceScanQr: t.dash.binanceScanQr,
            binanceStep1: t.dash.binanceStep1,
            binanceStep2: t.dash.binanceStep2,
            binanceNotify: t.dash.binanceNotify,
            binanceClose: t.dash.binanceClose,
            binanceRef: t.dash.binanceRef,
            binanceContinue: t.dash.binanceContinue,
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
