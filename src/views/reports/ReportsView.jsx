import { useEffect, useMemo, useRef, useState } from "react";
import { waitForStableTextCount } from "../../utils/waitForStableDom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import {
  ArrowDown,
  ArrowUp,
  ChartArea,
  ChartBar,
  ChartLine,
  ChartPie,
  ChartScatter,
  Gauge,
  Hash,
  ImageDown,
  Radar as RadarIcon,
  Sigma,
  Table2,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { useWorkbook } from "../../context/workbook-context";
import { useThemeContext } from "../../context/theme-context";
import { useToast } from "../../components/ui/toast-context";
import AnimatedNumber from "../../components/ui/AnimatedNumber";
import InsightChart from "../../components/reports/InsightChart";
import {
  aggregateByCategory,
  buildScatterPoints,
  buildSeries,
  detectNumericColumns,
  formatCompactNumber,
  listColumns,
  summarizeColumn,
} from "../../utils/charts";
import cn from "../../utils/cn";

const CHART_TYPES = [
  { key: "bar", label: "Bar", icon: ChartBar, needsTwoNumeric: false },
  { key: "line", label: "Line", icon: ChartLine, needsTwoNumeric: false },
  { key: "area", label: "Area", icon: ChartArea, needsTwoNumeric: false },
  { key: "pie", label: "Pie", icon: ChartPie, needsTwoNumeric: false },
  { key: "radar", label: "Radar", icon: RadarIcon, needsTwoNumeric: false },
  { key: "scatter", label: "Scatter", icon: ChartScatter, needsTwoNumeric: true },
];

function StatTile({ icon: Icon, label, value, formatter, index }) {
  return (
    <div
      style={{ "--i": index }}
      className="card stagger flex animate-fade-up items-center gap-3 p-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-lg font-bold tabular-nums text-slate-900 dark:text-white">
          <AnimatedNumber value={value} formatter={formatter} />
        </span>
        <span className="block truncate text-xs text-slate-400">{label}</span>
      </span>
    </div>
  );
}

export default function ReportsView() {
  const { workbook, activeSheetIndex, setActiveSheetIndex } = useWorkbook();
  const { theme } = useThemeContext();
  const { notify } = useToast();
  const chartRef = useRef(null);
  const currentChartKeyRef = useRef(null);

  const sheet = workbook?.sheets[activeSheetIndex];

  const numericColumns = useMemo(
    () => (sheet ? detectNumericColumns(sheet.columns, sheet.rows) : []),
    [sheet],
  );
  const allColumns = useMemo(() => (sheet ? listColumns(sheet.columns) : []), [sheet]);

  const [chartType, setChartType] = useState("bar");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [valueIndex, setValueIndex] = useState(0);
  const [scatterYIndex, setScatterYIndex] = useState(0);
  const [chartReady, setChartReady] = useState(false);
  const chartKey = `${chartType}-${categoryIndex}-${valueIndex}-${scatterYIndex}`;

  // Exporting mid-animation can rasterize a frame where bars/slices/labels
  // haven't finished appearing — chartReady flips true from Recharts' own
  // onAnimationEnd (via InsightChart's onSettled prop), not a guessed delay,
  // since the wrapper transition and the chart's reveal don't run in lockstep.
  // The timer here is only a safety net in case that event is ever missed.
  //
  // currentChartKeyRef guards against a subtler race: if the user switches
  // charts again before the previous one's animation finishes, that old
  // chart is still mounted mid-exit and its animationEnd can fire after the
  // switch — the ref (updated per render, so effectively immediately on
  // switch) lets the handler tell "my chart" apart from "the one before it".
  useEffect(() => {
    currentChartKeyRef.current = chartKey;
    setChartReady(false);
    const safetyNet = setTimeout(() => setChartReady(true), 3000);
    return () => clearTimeout(safetyNet);
  }, [chartKey]);

  // Re-pick sensible defaults only when a genuinely different sheet loads —
  // sheet.columns keeps its identity across cell edits/add/delete-row, so
  // this doesn't reset the user's chosen columns while they're editing data.
  useEffect(() => {
    if (!sheet) return;

    const numeric = detectNumericColumns(sheet.columns, sheet.rows);
    const firstNumericIndex = numeric[0]?.index ?? 0;
    const secondNumericIndex = numeric[1]?.index ?? firstNumericIndex;
    const numericIndexSet = new Set(numeric.map((c) => c.index));
    const firstTextIndex = sheet.columns.findIndex((_, i) => !numericIndexSet.has(i));

    setCategoryIndex(firstTextIndex !== -1 ? firstTextIndex : 0);
    setValueIndex(firstNumericIndex);
    setScatterYIndex(secondNumericIndex);
    setChartType("bar");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheet?.columns]);

  const categoryLabel = allColumns[categoryIndex]?.label ?? "Category";
  const valueLabel = numericColumns.find((c) => c.index === valueIndex)?.label ?? "Value";
  const scatterYLabel = numericColumns.find((c) => c.index === scatterYIndex)?.label ?? "Value";

  const summary = useMemo(
    () => (sheet ? summarizeColumn(sheet.rows, valueIndex) : null),
    [sheet, valueIndex],
  );

  const chartData = useMemo(() => {
    if (!sheet) return { data: [], truncated: false };

    if (chartType === "bar" || chartType === "radar") {
      return aggregateByCategory(sheet.rows, categoryIndex, valueIndex, chartType === "radar" ? 8 : 10);
    }
    if (chartType === "pie") {
      return aggregateByCategory(sheet.rows, categoryIndex, valueIndex, 5);
    }
    if (chartType === "line" || chartType === "area") {
      return buildSeries(sheet.rows, categoryIndex, valueIndex, 60);
    }
    if (chartType === "scatter") {
      return { data: buildScatterPoints(sheet.rows, valueIndex, scatterYIndex, categoryIndex, 200), truncated: false };
    }
    return { data: [], truncated: false };
  }, [sheet, chartType, categoryIndex, valueIndex, scatterYIndex]);

  const handleExportImage = async () => {
    if (!chartRef.current || !chartReady) return;

    try {
      const dataUrl = await toPng(chartRef.current, {
        backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
        pixelRatio: 2,
        // The Google Fonts stylesheet is cross-origin without CORS headers on
        // the <link> itself, so reading its cssRules to embed @font-face
        // throws; skipping font embedding avoids that noise entirely — the
        // exported chart still rasterizes with whatever font is on screen.
        skipFonts: true,
      });

      const fileName =
        `${chartType}-${valueLabel}-by-${categoryLabel}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-+|-+$)/g, "") + ".png";

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.click();

      notify({ title: "Chart exported", description: fileName, variant: "success" });
    } catch (exportError) {
      notify({
        title: "Export failed",
        description: exportError?.message || "Couldn't render this chart to an image.",
        variant: "error",
      });
    }
  };

  if (!workbook || !sheet) {
    return (
      <div className="mx-auto flex max-w-2xl animate-fade-up flex-col items-center py-16 text-center">
        <span className="mb-5 flex h-16 w-16 animate-float items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <ChartBar size={28} />
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          No data to chart yet
        </h2>
        <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          Upload a spreadsheet and Reports will automatically chart it — bar, line, area, pie,
          radar, and scatter, switchable in one click.
        </p>
        <Link to="/upload" className="btn-primary mt-6">
          <Upload size={15} />
          Go to Upload
        </Link>
      </div>
    );
  }

  if (numericColumns.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl animate-fade-up flex-col items-center py-16 text-center">
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <TriangleAlert size={28} />
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          No numeric columns found
        </h2>
        <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          “{sheet.name}” doesn&apos;t have a column that looks like numbers, so there&apos;s
          nothing to chart yet. Add a numeric column, or switch sheets below.
        </p>
      </div>
    );
  }

  const activeChartType = CHART_TYPES.find((c) => c.key === chartType) ?? CHART_TYPES[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Reports
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Automatic insights from your uploaded data — pick a chart type and the columns to
            plot.
          </p>
        </div>

        <Link
          to="/upload"
          className="btn-ghost animate-fade-in"
        >
          <Table2 size={15} />
          View raw data
        </Link>
      </div>

      {workbook.sheets.length > 1 ? (
        <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          {workbook.sheets.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveSheetIndex(index)}
              className={cn(
                "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                index === activeSheetIndex
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}

      {/* Stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Hash} label="Data points" value={summary.count} index={0} />
        <StatTile
          icon={Sigma}
          label={`Sum of ${valueLabel}`}
          value={summary.sum}
          formatter={formatCompactNumber}
          index={1}
        />
        <StatTile
          icon={Gauge}
          label="Average"
          value={summary.average}
          formatter={formatCompactNumber}
          index={2}
        />
        <StatTile
          icon={summary.max >= 0 ? ArrowUp : ArrowDown}
          label="Highest value"
          value={summary.max}
          formatter={formatCompactNumber}
          index={3}
        />
      </div>

      {/* Controls */}
      <div className="card animate-fade-up p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 flex-wrap gap-3">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              Group by
              <select
                value={categoryIndex}
                onChange={(event) => setCategoryIndex(Number(event.target.value))}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {allColumns.map((column) => (
                  <option key={column.index} value={column.index}>
                    {column.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              {chartType === "scatter" ? "X value" : "Value"}
              <select
                value={valueIndex}
                onChange={(event) => setValueIndex(Number(event.target.value))}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {numericColumns.map((column) => (
                  <option key={column.index} value={column.index}>
                    {column.label}
                  </option>
                ))}
              </select>
            </label>

            {chartType === "scatter" ? (
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                Y value
                <select
                  value={scatterYIndex}
                  onChange={(event) => setScatterYIndex(Number(event.target.value))}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  {numericColumns.map((column) => (
                    <option key={column.index} value={column.index}>
                      {column.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            {CHART_TYPES.map((item) => {
              const disabled = item.needsTwoNumeric && numericColumns.length < 2;

              return (
                <button
                  key={item.key}
                  type="button"
                  disabled={disabled}
                  title={disabled ? "Needs at least two numeric columns" : undefined}
                  onClick={() => setChartType(item.key)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                    disabled && "cursor-not-allowed opacity-40",
                    !disabled && chartType === item.key
                      ? "bg-white text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-400"
                      : !disabled && "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100",
                  )}
                >
                  <item.icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card animate-fade-up overflow-hidden p-4 sm:p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <activeChartType.icon size={15} className="text-brand-500" />
            {chartType === "scatter"
              ? `${valueLabel} vs ${scatterYLabel}`
              : `${valueLabel} by ${categoryLabel}`}
          </h3>

          <div className="flex items-center gap-3">
            {chartData.truncated ? (
              <span className="text-[11px] font-medium text-slate-400">
                showing top results, rest folded into “Other”
              </span>
            ) : null}

            <button
              type="button"
              onClick={handleExportImage}
              disabled={chartData.data.length === 0 || !chartReady}
              title={!chartReady ? "Rendering…" : undefined}
              className="btn-ghost px-3 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ImageDown size={13} />
              Export image
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={chartKey}
            ref={chartRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {chartData.data.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-20 text-center text-sm text-slate-400">
                <ChartBar size={28} className="text-slate-300 dark:text-slate-600" />
                No numeric values found for this combination.
              </div>
            ) : (
              <InsightChart
                type={chartType}
                data={chartData.data}
                theme={theme}
                categoryLabel={categoryLabel}
                valueLabel={valueLabel}
                scatterYLabel={scatterYLabel}
                onSettled={() => {
                  // Recharts' onAnimationEnd fires when the sectors/bars/line
                  // finish, but Pie's direct percent labels land in the DOM
                  // in a separate, later pass (observed ~0.3-1s afterwards) —
                  // rather than guess that gap, poll the real DOM until its
                  // text-node count stops changing, then it's actually done.
                  const container = chartRef.current;
                  // eslint-disable-next-line no-console
                  console.log("[onSettled] fired for", chartKey, "container=", !!container);
                  if (!container) return;

                  waitForStableTextCount(container).then(() => {
                    // eslint-disable-next-line no-console
                    console.log("[onSettled] resolved for", chartKey, "matches current=", currentChartKeyRef.current === chartKey);
                    if (currentChartKeyRef.current === chartKey) setChartReady(true);
                  });
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
