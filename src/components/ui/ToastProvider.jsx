import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, CircleAlert, Info, X } from "lucide-react";
import { ToastContext } from "./toast-context";
import cn from "../../utils/cn";

const DEFAULT_DURATION = 2200;

const VARIANTS = {
  success: {
    icon: Check,
    accent: "bg-emerald-500",
    iconClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  error: {
    icon: CircleAlert,
    accent: "bg-rose-500",
    iconClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  },
  info: {
    icon: Info,
    accent: "bg-brand-500",
    iconClass: "bg-brand-500/15 text-brand-600 dark:text-brand-400",
  },
};

function Toast({ toast, onDismiss }) {
  const variant = VARIANTS[toast.variant] ?? VARIANTS.info;
  const Icon = variant.icon;

  return (
    <div
      role="status"
      className="pointer-events-auto relative flex w-80 max-w-[calc(100vw-2rem)] animate-slide-in-right
                 items-start gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-3 pl-4
                 shadow-soft backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
    >
      <span className={cn("absolute left-0 top-0 h-full w-1", variant.accent)} aria-hidden="true" />

      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          variant.iconClass,
        )}
      >
        <Icon size={16} strokeWidth={2.5} />
      </span>

      <div className="min-w-0 flex-1 pt-1">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
          {toast.title}
        </p>
        {toast.description ? (
          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
            {toast.description}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600
                   dark:hover:bg-slate-800 dark:hover:text-slate-200"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));

    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    ({ title, description, variant = "info", duration = DEFAULT_DURATION }) => {
      counter.current += 1;
      const id = counter.current;

      // Cap the stack so rapid-fire copies never bury the screen.
      setToasts((current) => [...current.slice(-2), { id, title, description, variant }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      );

      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2"
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
