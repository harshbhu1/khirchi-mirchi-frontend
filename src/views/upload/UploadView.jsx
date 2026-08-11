import { useCallback, useMemo, useState } from "react";
import {
  Barcode,
  CircleAlert,
  Columns3,
  FileSpreadsheet,
  Layers,
  MousePointerClick,
  PencilLine,
  Rows3,
  Trash2,
  Upload,
} from "lucide-react";
import FileDropzone from "../../components/upload/FileDropzone";
import DataTable from "../../components/upload/DataTable";
import BarcodeScanModal from "../../components/upload/BarcodeScanModal";
import { useToast } from "../../components/ui/toast-context";
import { useWorkbook } from "../../context/workbook-context";
import { formatBytes, parseSpreadsheet, validateFile } from "../../utils/excel";
import cn from "../../utils/cn";

function StatCard({ icon: Icon, label, value, index }) {
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
          {value}
        </span>
        <span className="block truncate text-xs text-slate-400">{label}</span>
      </span>
    </div>
  );
}

export default function UploadView() {
  const { notify } = useToast();
  const {
    workbook,
    activeSheetIndex,
    setActiveSheetIndex,
    setWorkbook,
    clearWorkbook,
    updateCell,
    addRow,
    deleteRow,
  } = useWorkbook();

  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleFile = useCallback(
    async (file) => {
      setError(null);

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        notify({ title: "Upload failed", description: validationError, variant: "error" });
        return;
      }

      setIsParsing(true);

      try {
        const parsed = await parseSpreadsheet(file);
        setWorkbook(parsed);

        const totalRows = parsed.sheets.reduce((sum, sheet) => sum + sheet.rows.length, 0);
        notify({
          title: "Spreadsheet loaded",
          description: `${totalRows.toLocaleString()} rows across ${parsed.sheets.length} sheet(s)`,
          variant: "success",
        });
      } catch (parseError) {
        const message = parseError?.message || "We couldn't read that file.";
        setError(message);
        notify({ title: "Could not read file", description: message, variant: "error" });
      } finally {
        setIsParsing(false);
      }
    },
    [notify, setWorkbook],
  );

  const handleClear = () => {
    clearWorkbook();
    setError(null);
  };

  const sheet = workbook?.sheets[activeSheetIndex];

  const stats = useMemo(() => {
    if (!sheet) return [];

    return [
      { icon: Rows3, label: "Rows", value: sheet.rows.length.toLocaleString() },
      { icon: Columns3, label: "Columns", value: sheet.columns.length.toLocaleString() },
      { icon: Layers, label: "Sheets", value: workbook.sheets.length.toLocaleString() },
      { icon: FileSpreadsheet, label: "File size", value: formatBytes(workbook.fileSize) },
    ];
  }, [sheet, workbook]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Upload spreadsheet
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Import an Excel or CSV file, preview it as a table, edit any cell, and copy values
            with a single click.
          </p>
        </div>

        <div className="flex animate-fade-in gap-2">
          <button type="button" onClick={() => setScannerOpen(true)} className="btn-ghost">
            <Barcode size={15} />
            Scan barcode
          </button>

          {workbook ? (
            <>
              <label className="btn-primary cursor-pointer">
                <Upload size={15} />
                Replace file
                <input
                  type="file"
                  className="sr-only"
                  accept=".xlsx,.xlsm,.xls,.csv"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleFile(file);
                    event.target.value = "";
                  }}
                />
              </label>

              <button type="button" onClick={handleClear} className="btn-ghost">
                <Trash2 size={15} />
                Clear
              </button>
            </>
          ) : null}
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="flex animate-scale-in items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4
                     text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
        >
          <CircleAlert size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      {!workbook ? (
        <>
          <FileDropzone onFileSelected={handleFile} isLoading={isParsing} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FileSpreadsheet,
                title: "Every sheet, parsed",
                body: "Multi-sheet workbooks are split into tabs so you can switch between them.",
              },
              {
                icon: MousePointerClick,
                title: "Click to copy",
                body: "Any cell copies to your clipboard instantly, with a confirmation toast.",
              },
              {
                icon: PencilLine,
                title: "Edit inline",
                body: "Double-click a cell to fix a typo, or add/delete rows on the fly.",
              },
              {
                icon: Barcode,
                title: "Scan to add",
                body: "Photograph a barcode and its value drops straight into a new row.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                style={{ "--i": index + 1 }}
                className="card stagger animate-fade-up p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <feature.icon size={17} />
                </span>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* File summary */}
          <div className="card flex animate-fade-up flex-wrap items-center gap-4 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                {workbook.fileName}
              </span>
              <span className="block text-xs text-slate-400">
                {formatBytes(workbook.fileSize)} · loaded successfully
              </span>
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} index={index} {...stat} />
            ))}
          </div>

          {/* Sheet tabs */}
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
                  <span className="ml-2 text-[11px] opacity-70">{item.rows.length}</span>
                </button>
              ))}
            </div>
          ) : null}

          {sheet && sheet.columns.length > 0 ? (
            <DataTable
              key={`${workbook.fileName}-${activeSheetIndex}`}
              sheet={sheet}
              onCellEdit={(rowIndex, columnIndex, value) =>
                updateCell(activeSheetIndex, rowIndex, columnIndex, value)
              }
              onAddRow={() => addRow(activeSheetIndex, [])}
              onDeleteRow={(rowIndex) => deleteRow(activeSheetIndex, rowIndex)}
            />
          ) : (
            <div className="card animate-fade-in p-12 text-center text-sm text-slate-500">
              This sheet is empty.
            </div>
          )}
        </>
      )}

      <BarcodeScanModal open={scannerOpen} onClose={() => setScannerOpen(false)} />
    </div>
  );
}
