"use client";

export function Modal({
  title,
  open,
  onClose,
  children,
  wide,
  headerRight,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
  headerRight?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`w-full rounded-lg border border-gray-200 bg-white shadow-xl ${
          wide ? "max-w-3xl" : "max-w-md"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-base font-semibold">{title}</h2>
          <div className="flex items-center gap-3">
            {headerRight}
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
