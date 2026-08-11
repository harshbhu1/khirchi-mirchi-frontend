import { formatCompactNumber } from "../../utils/charts";

/** Shared tooltip shell so every Recharts chart matches the app's card styling. */
export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-soft backdrop-blur dark:border-slate-700 dark:bg-slate-800/95">
      {label ? (
        <p className="mb-1 font-semibold text-slate-700 dark:text-slate-200">{label}</p>
      ) : null}

      {payload.map((entry, index) => (
        <p key={index} className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color ?? entry.payload?.fill }}
          />
          {entry.name ? <span>{entry.name}:</span> : null}
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            {formatCompactNumber(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
}
