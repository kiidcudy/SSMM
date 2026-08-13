"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ActionMenuItem = {
  label: string;
  onClick?: () => void;
  danger?: boolean;
  children?: ActionMenuItem[];
};

type Pos = { top: number; left: number; openUp: boolean };

export function ActionMenu({
  label = "Actions",
  items,
}: {
  label?: string;
  items: ActionMenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [pos, setPos] = useState<Pos | null>(null);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  function updatePos() {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const menuW = 240;
    const menuH = Math.min(420, items.length * 36 + 16);
    const spaceBelow = window.innerHeight - r.bottom;
    const openUp = spaceBelow < menuH && r.top > spaceBelow;
    let left = r.right - menuW;
    if (left < 8) left = 8;
    if (left + menuW > window.innerWidth - 8) left = window.innerWidth - menuW - 8;
    setPos({
      top: openUp ? r.top - 4 : r.bottom + 4,
      left,
      openUp,
    });
  }

  useLayoutEffect(() => {
    if (!open) return;
    updatePos();
    function onScroll() {
      updatePos();
    }
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, items.length]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
      setOpenSub(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenSub(null);
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menu =
    open && pos && mounted
      ? createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] min-w-[220px] rounded border border-gray-200 bg-white py-1 shadow-lg"
            style={{
              top: pos.openUp ? undefined : pos.top,
              bottom: pos.openUp ? window.innerHeight - pos.top : undefined,
              left: pos.left,
            }}
          >
            {items.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              return (
                <div key={item.label} className="relative">
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
                    <div className="absolute top-0 right-full z-[10000] mr-0.5 min-w-[160px] rounded border border-gray-200 bg-white py-1 shadow-lg">
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
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setOpenSub(null);
        }}
        className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        {label} ▾
      </button>
      {menu}
    </div>
  );
}
