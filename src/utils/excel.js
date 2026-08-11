/*
 ** Excel / CSV parsing helpers built on SheetJS.
 ** Everything runs in the browser — no file ever leaves the client.
 */

import * as XLSX from "xlsx";

export const ACCEPTED_EXTENSIONS = [".xlsx", ".xlsm", ".xls", ".csv"];
export const ACCEPT_ATTR =
  ".xlsx,.xlsm,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";

/** 10 MB — large enough for real workbooks, small enough to parse quickly. */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function getExtension(name = "") {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

/**
 * @returns {string|null} an error message, or null when the file is usable.
 */
export function validateFile(file) {
  if (!file) return "No file selected.";

  if (!ACCEPTED_EXTENSIONS.includes(getExtension(file.name))) {
    return `Unsupported file type. Please upload ${ACCEPTED_EXTENSIONS.join(", ")}.`;
  }

  if (file.size > MAX_FILE_SIZE) {
    return `File is too large (${formatBytes(file.size)}). Maximum size is ${formatBytes(MAX_FILE_SIZE)}.`;
  }

  if (file.size === 0) return "The selected file is empty.";

  return null;
}

/** Cells arrive as strings, numbers, dates or undefined — display needs strings. */
function cellToString(value) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleDateString();
  return String(value);
}

/** Header labels must be unique so React keys and column lookups stay stable. */
function buildColumns(headerRow, width) {
  const used = new Map();

  return Array.from({ length: width }, (_, index) => {
    const label = cellToString(headerRow?.[index]).trim() || `Column ${index + 1}`;
    const count = used.get(label) ?? 0;
    used.set(label, count + 1);

    return {
      key: `${index}`,
      label: count === 0 ? label : `${label} (${count + 1})`,
    };
  });
}

/** Rows from SheetJS are ragged; pad them to a fixed width and drop empty ones. */
function normalizeSheet(matrix) {
  const width = matrix.reduce((max, row) => Math.max(max, row.length), 0);

  if (width === 0) return { columns: [], rows: [] };

  const [headerRow, ...bodyRows] = matrix;
  const columns = buildColumns(headerRow, width);

  const rows = bodyRows
    .map((row) => Array.from({ length: width }, (_, i) => cellToString(row[i])))
    .filter((row) => row.some((cell) => cell !== ""));

  return { columns, rows };
}

/**
 * Reads a spreadsheet file into plain, render-ready sheet objects.
 * @returns {Promise<{fileName: string, fileSize: number, sheets: Array}>}
 */
export async function parseSpreadsheet(file) {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
    cellDates: true,
    // Formulas and styles are irrelevant here and slow large files down.
    cellFormula: false,
    cellStyles: false,
  });

  if (!workbook.SheetNames.length) {
    throw new Error("This workbook does not contain any sheets.");
  }

  const sheets = workbook.SheetNames.map((name) => {
    const matrix = XLSX.utils.sheet_to_json(workbook.Sheets[name], {
      header: 1,
      defval: "",
      blankrows: false,
      raw: false, // use Excel's formatted text so dates/currency look right
    });

    const { columns, rows } = normalizeSheet(matrix);
    return { name, columns, rows };
  });

  if (sheets.every((sheet) => sheet.columns.length === 0)) {
    throw new Error("No readable data found in this file.");
  }

  return { fileName: file.name, fileSize: file.size, sheets };
}

/** Serialises rows back to CSV for the download button. */
export function toCsv(columns, rows) {
  const escape = (value) => {
    const text = cellToString(value);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  return [
    columns.map((column) => escape(column.label)).join(","),
    ...rows.map((row) => row.map(escape).join(",")),
  ].join("\r\n");
}

/** Byte-order mark — without it Excel mangles non-ASCII characters in CSV. */
const BOM = String.fromCharCode(0xfeff);

export function downloadCsv(fileName, csv) {
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
