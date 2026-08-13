"use client";

import { useEffect, useRef, useState } from "react";

export type ActionMenuItem = {
  label: string;
  onClick?: () => void;
  danger?: boolean;
  children?: ActionMenuItem[];
};

export function ActionMenu({
  label = "Actions",
  items,
}: {
  label?: string;
  items: ActionMenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
        setOpenSub(null);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setOpenSub(null);
        }}
        className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        {label} ▾
      </button>
      {open ? (
        <div className="absolute right-0 z-40 mt-1 min-w-[220px] rounded border border-gray-200 bg-white py-1 shadow-lg">
          {items.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasChildren && setOpenSub(item.label)}
              >
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
                    item.danger ? "text-red-600" : "text-gray-800"
                  }`}
                  onClick={() => {
                    if (hasChildren) {
                      setOpenSub((v) => (v === item.label ? null : item.label));
                      return;
                    }
                    setOpen(false);
                    setOpenSub(null);
                    item.onClick?.();
                  }}
                >
                  <span>{item.label}</span>
                  {hasChildren ? <span className="text-gray-400">›</span> : null}
                </button>
                {hasChildren && openSub === item.label ? (
                  <div className="absolute top-0 right-full z-50 mr-0.5 min-w-[160px] rounded border border-gray-200 bg-white py-1 shadow-lg">
                    {item.children!.map((child) => (
                      <button
                        key={child.label}
                        type="button"
                        className={`block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
                          child.danger ? "text-red-600" : "text-gray-800"
                        }`}
                        onClick={() => {
                          setOpen(false);
                          setOpenSub(null);
                          child.onClick?.();
                        }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
