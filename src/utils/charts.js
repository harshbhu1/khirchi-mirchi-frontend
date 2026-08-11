/*
 ** Turns arbitrary spreadsheet rows into chart-ready series.
 ** Everything here is pure/derived — no state, safe to call from useMemo.
 */

const OTHER_LABEL = "Other";

const FORMATTING_CHARS = /[$€₹£¥,\s%]/g;

/**
 * Strips currency symbols, thousands separators, and percent signs, then
 * requires what's left to be a plain number — unlike a blanket
 * digits-dot-hyphen strip, this rejects codes like "KM-1001" instead of
 * quietly reading them as -1001 (the hyphen would otherwise read as a sign).
 */
export function parseNumeric(value) {
  if (value === "" || value === null || value === undefined) return NaN;

  let text = String(value).trim();

  // Accounting-style negatives: "(1,234.56)" -> -1234.56
  const isParenNegative = /^\(.*\)$/.test(text);
  if (isParenNegative) text = text.slice(1, -1);

  const cleaned = text.replace(FORMATTING_CHARS, "");
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return NaN;

  const number = Number(cleaned);
  return isParenNegative ? -Math.abs(number) : number;
}

/** A column counts as numeric when most of its non-empty values parse as numbers. */
export function detectNumericColumns(columns, rows) {
  return columns
    .map((column, index) => {
      const values = rows.map((row) => row[index]).filter((value) => value !== "");
      if (values.length === 0) return null;

      const numericCount = values.filter((value) => !Number.isNaN(parseNumeric(value))).length;
      const ratio = numericCount / values.length;

      return ratio >= 0.6 ? { index, label: column.label } : null;
    })
    .filter(Boolean);
}

/** Every column is fair game as a category axis — categorical or numeric alike. */
export function listColumns(columns) {
  return columns.map((column, index) => ({ index, label: column.label }));
}

/**
 * Sums `valueIndex` grouped by the label in `categoryIndex`, sorted descending,
 * folding anything past `topN` into a single "Other" bucket so pies/bars/radars
 * stay readable regardless of how many distinct categories the sheet has.
 */
export function aggregateByCategory(rows, categoryIndex, valueIndex, topN = 8) {
  const totals = new Map();

  for (const row of rows) {
    const label = row[categoryIndex]?.trim() || "(blank)";
    const amount = parseNumeric(row[valueIndex]);
    if (Number.isNaN(amount)) continue;

    totals.set(label, (totals.get(label) ?? 0) + amount);
  }

  const sorted = [...totals.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (sorted.length <= topN) return { data: sorted, truncated: false };

  const head = sorted.slice(0, topN);
  const otherTotal = sorted.slice(topN).reduce((sum, item) => sum + item.value, 0);

  return { data: [...head, { name: OTHER_LABEL, value: otherTotal }], truncated: true };
}

/**
 * Row-ordered {name, value} pairs for trend charts (Line/Area) — no aggregation,
 * because the point of a trend is the sequence, not the total.
 */
export function buildSeries(rows, labelIndex, valueIndex, limit = 60) {
  const points = [];

  for (let i = 0; i < rows.length && points.length < limit; i += 1) {
    const value = parseNumeric(rows[i][valueIndex]);
    if (Number.isNaN(value)) continue;

    points.push({
      name: rows[i][labelIndex]?.trim() || `Row ${i + 1}`,
      value,
      row: i + 1,
    });
  }

  return { data: points, truncated: points.length < rows.length && rows.length > limit };
}

/** Two numeric columns plotted against each other, for correlation/scatter views. */
export function buildScatterPoints(rows, xIndex, yIndex, labelIndex, limit = 200) {
  const points = [];

  for (let i = 0; i < rows.length && points.length < limit; i += 1) {
    const x = parseNumeric(rows[i][xIndex]);
    const y = parseNumeric(rows[i][yIndex]);
    if (Number.isNaN(x) || Number.isNaN(y)) continue;

    points.push({ x, y, name: rows[i][labelIndex]?.trim() || `Row ${i + 1}` });
  }

  return points;
}

export function summarizeColumn(rows, valueIndex) {
  const values = rows.map((row) => parseNumeric(row[valueIndex])).filter((n) => !Number.isNaN(n));

  if (values.length === 0) {
    return { count: 0, sum: 0, average: 0, min: 0, max: 0 };
  }

  const sum = values.reduce((total, value) => total + value, 0);

  return {
    count: values.length,
    sum,
    average: sum / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

export function formatCompactNumber(value) {
  if (!Number.isFinite(value)) return "0";

  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
