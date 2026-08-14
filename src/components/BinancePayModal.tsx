"use client";

import { useState } from "react";
import { BINANCE_PAY, SITE } from "@/lib/site";

type Labels = {
  title: string;
  sendExact: string;
  sendToId: string;
  copy: string;
  copied: string;
  nickname: string;
  scanQr: string;
  step1: string;
  step2: string;
  notify: string;
  close: string;
  ref: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  usdt: number;
  refId: string;
  username: string;
  labels: Labels;
};

export function BinancePayModal({ open, onClose, usdt, refId, username, labels }: Props) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;

  const waText = encodeURIComponent(
    `Hi, I paid ${usdt} USDT via Binance Pay for SSMM deposit. Username: ${username}. Ref: ${refId}`,
  );
  const wa = `https://wa.me/${SITE.whatsapp}?text=${waText}`;

  function copyId() {
    try {
      void navigator.clipboard?.writeText(BINANCE_PAY.id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="my-6 w-full max-w-xl rounded-2xl border border-[#243049] bg-[#111827] p-6 text-[#e8eefc] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{labels.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="rounded-full px-2 py-1 text-[#93a0b8] hover:bg-[#1e293b] hover:text-white"
          >
            ✕
          </button>
        </div>

        <p className="mt-4 text-center text-4xl font-extrabold">
          {usdt} <span className="text-base font-semibold text-[#93a0b8]">USDT</span>
        </p>
        <p className="mt-1 text-center text-xs text-[#93a0b8]">{labels.sendExact}</p>

        <label className="mt-5 block text-sm text-[#93a0b8]">{labels.sendToId}</label>
        <div className="mt-1 flex gap-2">
          <input
            readOnly
            value={BINANCE_PAY.id}
            onFocus={(e) => e.currentTarget.select()}
            className="input w-full font-mono"
          />
          <button type="button" onClick={copyId} className="btn-primary shrink-0 px-4">
            {copied ? labels.copied : labels.copy}
          </button>
        </div>
        <p className="mt-1 text-xs text-[#93a0b8]">
          {labels.nickname}: <strong className="text-[#e8eefc]">{BINANCE_PAY.nickname}</strong>
        </p>

        <div className="mt-4 rounded-xl bg-[#0b1220] p-5 text-center">
          <p className="text-sm font-semibold text-[#93a0b8]">{labels.scanQr}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BINANCE_PAY.qr}
            alt="Binance Pay QR"
            width={420}
            height={420}
            className="mx-auto mt-4 h-80 w-80 rounded-xl bg-white object-contain p-3 sm:h-96 sm:w-96"
          />
          <p className="mt-3 text-sm text-[#93a0b8]">
            UID: <span className="font-mono font-semibold text-[#e8eefc]">{BINANCE_PAY.id}</span>
          </p>
        </div>

        <ol className="mt-4 space-y-1.5 text-sm text-[#cbd5e1]">
          <li>
            <strong>1.</strong> {labels.step1.replace("{usdt}", String(usdt))}
          </li>
          <li>
            <strong>2.</strong> {labels.step2}
          </li>
        </ol>

        <p className="mt-3 text-center text-xs text-[#93a0b8]">
          {labels.ref}: <span className="font-mono font-semibold text-[#e8eefc]">{refId}</span>
        </p>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4 flex w-full items-center justify-center py-3"
        >
          {labels.notify}
        </a>
      </div>
    </div>
  );
}
