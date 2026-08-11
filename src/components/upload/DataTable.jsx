import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  Copy,
  Download,
  Inbox,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import useClipboard from "../../hooks/useClipboard";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { useToast } from "../ui/toast-context";
import { downloadCsv, toCsv } from "../../utils/excel";
import cn from "../../utils/cn";

const PAGE_SIZES = [25, 50, 100];
const COPIED_FEEDBACK_MS = 1000;

/** Sticky lives on the cells, not <thead> — better browser support. */
const STICKY_HEAD =
  "sticky top-0 z-10 border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800";

/** Sorts numerically when the whole column parses as numbers, else alphabetically. */
function compareValues(a, b) {
  const numberA = Number(String(a).replace(/[,\s]/g, ""));
  const numberB = Number(String(b).replace(/[,\s]/g, ""));

  const bothNumeric =
    a !== "" && b !== "" && !Number.isNaN(numberA) && !Number.isNaN(numberB);

  if (bothNumeric) return numberA - numberB;

  return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
}

export default function DataTable({ sheet, onCellEdit, onAddRow, onDeleteRow }) {
  const { copy } = useClipboard();
  const { notify } = useToast();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ index: null, direction: "asc" });
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [copiedCell, setCopiedCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null); // { rowIndex, columnIndex }
  const [draftValue, setDraftValue] = useState("");

  const copyTimer = useRef(null);
  const debouncedQuery = useDebouncedValue(query, 200);

  // A different sheet is effectively a different dataset — reset the view.
  useEffect(() => {
    setQuery("");
    setSort({ index: null, direction: "asc" });
    setPage(1);
    setEditingCell(null);
  }, [sheet.name]);

  useEffect(() => setPage(1), [debouncedQuery, pageSize]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // Original row indices travel alongside each row so edits/deletes target the
  // right record in the source sheet even after filtering, sorting, or paging.
  const indexedRows = useMemo(
    () => sheet.rows.map((row, rowIndex) => ({ row, rowIndex })),
    [sheet.rows],
  );

  const filteredRows = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();
    if (!term) return indexedRows;

    return indexedRows.filter(({ row }) => row.some((cell) => cell.toLowerCase().includes(term)));
  }, [indexedRows, debouncedQuery]);

  const sortedRows = useMemo(() => {
    if (sort.index === null) return filteredRows;

    const factor = sort.direction === "asc" ? 1 : -1;
    return [...filteredRows].sort(
      (a, b) => compareValues(a.row[sort.index], b.row[sort.index]) * factor,
    );
  }, [filteredRows, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const pageRows = sortedRows.slice(pageStart, pageStart + pageSize);

  const toggleSort = (index) => {
    setSort((current) => {
      if (current.index !== index) return { index, direction: "asc" };
      if (current.direction === "asc") return { index, direction: "desc" };
      return { index: null, direction: "asc" }; // third click clears sorting
    });
  };

  const canEdit = typeof onCellEdit === "function";

  const startEdit = (rowIndex, columnIndex, value) => {
    if (!canEdit) return;
    setEditingCell({ rowIndex, columnIndex });
    setDraftValue(value);
  };

  const commitEdit = () => {
    if (!editingCell) return;
    const { rowIndex, columnIndex } = editingCell;
    onCellEdit(rowIndex, columnIndex, draftValue);
    setEditingCell(null);
  };

  const cancelEdit = () => setEditingCell(null);

  /** The headline interaction: clicking any cell copies its value. */
  const copyCell = async (value, rowIndex, columnIndex, label) => {
    const ok = await copy(value);

    if (!ok) {
      notify({
        title: "Couldn't copy",
        description: "Your browser blocked clipboard access.",
        variant: "error",
      });
      return;
    }

    setCopiedCell(`${rowIndex}:${columnIndex}`);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopiedCell(null), COPIED_FEEDBACK_MS);

    notify({
      title: value === "" ? "Copied empty cell" : `Copied “${value}”`,
      description: label,
      variant: "success",
    });
  };

  const copyRow = async (row) => {
    // Tab-separated so it pastes straight back into Excel as separate columns.
    const ok = await copy(row.join("\t"));

    notify(
      ok
        ? { title: "Row copied", description: `${row.length} cells`, variant: "success" }
        : { title: "Couldn't copy", variant: "error" },
    );
  };

  const handleExport = () => {
    const name = `${sheet.name.replace(/[^\w.-]+/g, "_") || "sheet"}.csv`;
    downloadCsv(name, toCsv(sheet.columns, sortedRows.map(({ row }) => row)));
    notify({ title: "CSV downloaded", description: name, variant: "success" });
  };

  const handleAddRow = () => {
    onAddRow?.();
    setSort({ index: null, direction: "asc" });
    setPage(pageCount);
    notify({ title: "Row added", description: "Scroll down to fill it in", variant: "success" });
  };

  const handleDeleteRow = (rowIndex, displayNumber) => {
    onDeleteRow?.(rowIndex);
    notify({ title: `Row ${displayNumber} deleted`, variant: "success" });
  };

  return (
    <section className="card animate-fade-up overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center dark:border-slate-800">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search all cells…"
            aria-label="Search table"
            className="input pl-9 pr-9"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="hidden text-xs font-medium text-slate-400 sm:inline">
            {sortedRows.length.toLocaleString()} of {sheet.rows.length.toLocaleString()} rows
          </span>

          {onAddRow ? (
            <button type="button" onClick={handleAddRow} className="btn-ghost px-3 py-2 text-xs">
              <Plus size={14} />
              Add row
            </button>
          ) : null}

          <button type="button" onClick={handleExport} className="btn-ghost px-3 py-2 text-xs">
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className="flex items-center gap-2 border-b border-slate-200 bg-brand-500/5 px-4 py-2 text-xs text-brand-700 dark:border-slate-800 dark:text-brand-300">
        <Copy size={13} />
        Click a cell to copy it
        {canEdit ? (
          <>
            <span aria-hidden="true">·</span>
            <Pencil size={12} />
            Double-click to edit
          </>
        ) : null}
      </p>

      {/* Table */}
      <div className="max-h-[62vh] overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className={cn(STICKY_HEAD, "w-12 px-3 py-3 text-left text-xs font-semibold text-slate-400")}
              >
                #
              </th>

              {sheet.columns.map((column, index) => {
                const isSorted = sort.index === index;
                const SortIcon = !isSorted
                  ? ArrowUpDown
                  : sort.direction === "asc"
                    ? ArrowUp
                    : ArrowDown;

                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      isSorted
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className={cn(STICKY_HEAD, "p-0")}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(index)}
                      className={cn(
                        "flex w-full items-center gap-1.5 whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide",
                        "transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/60",
                        isSorted
                          ? "text-brand-600 dark:text-brand-400"
                          : "text-slate-500 dark:text-slate-300",
                      )}
                    >
                      {column.label}
                      <SortIcon
                        size={12}
                        className={cn(
                          "shrink-0 transition-opacity",
                          isSorted ? "opacity-100" : "opacity-40",
                        )}
                      />
                    </button>
                  </th>
                );
              })}

              <th scope="col" className={cn(STICKY_HEAD, "w-16")}>
                <span className="sr-only">Row actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {pageRows.map(({ row, rowIndex }, positionInPage) => {
              const displayNumber = pageStart + positionInPage + 1;

              return (
                <tr
                  key={rowIndex}
                  style={{ "--i": positionInPage }}
                  className="group animate-fade-in stagger border-b border-slate-100 transition-colors last:border-0
                             hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <td className="px-3 py-2 text-xs tabular-nums text-slate-400">{displayNumber}</td>

                  {row.map((value, columnIndex) => {
                    const isCopied = copiedCell === `${rowIndex}:${columnIndex}`;
                    const isEditing =
                      editingCell?.rowIndex === rowIndex && editingCell?.columnIndex === columnIndex;
                    const label = sheet.columns[columnIndex]?.label ?? "";

                    return (
                      <td key={columnIndex} className="p-0 align-top">
                        {isEditing ? (
                          <input
                            autoFocus
                            value={draftValue}
                            onChange={(event) => setDraftValue(event.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                commitEdit();
                              } else if (event.key === "Escape") {
                                event.preventDefault();
                                cancelEdit();
                              }
                            }}
                            aria-label={`Edit ${label}`}
                            className="w-full min-w-[8rem] max-w-[22rem] bg-white px-4 py-2.5 text-sm text-slate-800
                                       outline-none ring-2 ring-inset ring-brand-500/60
                                       dark:bg-slate-900 dark:text-slate-100"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => copyCell(value, rowIndex, columnIndex, label)}
                            onDoubleClick={() => startEdit(rowIndex, columnIndex, value)}
                            title={
                              canEdit
                                ? `${value || "(empty)"} — click to copy, double-click to edit`
                                : value || "(empty)"
                            }
                            aria-label={`${label}: ${value || "empty"}`}
                            className={cn(
                              "relative flex h-full w-full items-center gap-1.5 px-4 py-2.5 text-left",
                              "max-w-[22rem] truncate transition-colors duration-150",
                              "hover:bg-brand-500/10 hover:text-brand-700 dark:hover:text-brand-300",
                              isCopied
                                ? "animate-copy-flash font-medium text-brand-700 dark:text-brand-300"
                                : "text-slate-700 dark:text-slate-300",
                            )}
                          >
                            <span className="truncate">
                              {value || <span className="text-slate-300 dark:text-slate-600">—</span>}
                            </span>

                            {/* Copy/edit affordance: ghost on hover, check on success */}
                            <span
                              className={cn(
                                "ml-auto flex shrink-0 items-center gap-1 transition-all duration-200",
                                isCopied
                                  ? "scale-100 text-emerald-500 opacity-100"
                                  : "scale-75 opacity-0 group-hover:opacity-40",
                              )}
                            >
                              {isCopied ? (
                                <Check size={13} />
                              ) : (
                                <>
                                  {canEdit ? <Pencil size={11} /> : null}
                                  <Copy size={13} />
                                </>
                              )}
                            </span>
                          </button>
                        )}
                      </td>
                    );
                  })}

                  <td className="px-1">
                    <div className="flex items-center justify-end gap-0.5 opacity-0 transition-all focus-within:opacity-100 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => copyRow(row)}
                        aria-label={`Copy entire row ${displayNumber}`}
                        title="Copy entire row"
                        className="rounded-lg p-1.5 text-slate-300 hover:bg-brand-500/10 hover:text-brand-600 dark:text-slate-600"
                      >
                        <Copy size={14} />
                      </button>

                      {onDeleteRow ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(rowIndex, displayNumber)}
                          aria-label={`Delete row ${displayNumber}`}
                          title="Delete row"
                          className="rounded-lg p-1.5 text-slate-300 hover:bg-rose-500/10 hover:text-rose-500 dark:text-slate-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {pageRows.length === 0 ? (
          <div className="flex animate-fade-in flex-col items-center gap-2 py-16 text-center">
            <Inbox size={32} className="text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              No rows match “{debouncedQuery}”
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : null}
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-slate-200 p-3 sm:flex-row sm:items-center dark:border-slate-800">
        <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          Rows per page
          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium
                       dark:border-slate-700 dark:bg-slate-900"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Page {currentPage} of {pageCount}
          </span>

          <button
            type="button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage === 1}
            className="btn-ghost px-3 py-1.5 text-xs"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            disabled={currentPage === pageCount}
            className="btn-ghost px-3 py-1.5 text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
