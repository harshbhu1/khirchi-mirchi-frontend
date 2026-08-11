import { useCallback, useMemo, useState } from "react";
import { WorkbookContext } from "./workbook-context";

/**
 * Holds the currently loaded spreadsheet so Upload, Reports, and the barcode
 * scanner all read/write the same data without prop-drilling through routes.
 */
export function WorkbookProvider({ children }) {
  const [workbook, setWorkbookState] = useState(null);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const setWorkbook = useCallback((next) => {
    setWorkbookState(next);
    setActiveSheetIndex(0);
  }, []);

  const clearWorkbook = useCallback(() => {
    setWorkbookState(null);
    setActiveSheetIndex(0);
  }, []);

  const updateCell = useCallback((sheetIndex, rowIndex, columnIndex, value) => {
    setWorkbookState((current) => {
      if (!current) return current;

      const sheets = current.sheets.map((sheet, index) => {
        if (index !== sheetIndex) return sheet;

        const rows = sheet.rows.map((row, r) =>
          r !== rowIndex ? row : row.map((cell, c) => (c === columnIndex ? value : cell)),
        );

        return { ...sheet, rows };
      });

      return { ...current, sheets };
    });
  }, []);

  /**
   * Appends a row to a sheet, padding/truncating to its column width.
   * When nothing has been uploaded yet, this creates a starter workbook —
   * used by the barcode scanner so scanning works before any file exists.
   */
  const addRow = useCallback((sheetIndex, values, options = {}) => {
    setWorkbookState((current) => {
      if (!current) {
        const labels = options.columns ?? ["Value"];
        const columns = labels.map((label, index) => ({ key: `${index}`, label }));
        const row = columns.map((_, index) => values[index] ?? "");

        return {
          fileName: options.fileName ?? "Scanned items.xlsx",
          fileSize: 0,
          sheets: [{ name: options.sheetName ?? "Scanned", columns, rows: [row] }],
        };
      }

      const sheets = current.sheets.map((sheet, index) => {
        if (index !== sheetIndex) return sheet;

        const row = sheet.columns.map((_, i) => values[i] ?? "");
        return { ...sheet, rows: [...sheet.rows, row] };
      });

      return { ...current, sheets };
    });
  }, []);

  const deleteRow = useCallback((sheetIndex, rowIndex) => {
    setWorkbookState((current) => {
      if (!current) return current;

      const sheets = current.sheets.map((sheet, index) =>
        index !== sheetIndex
          ? sheet
          : { ...sheet, rows: sheet.rows.filter((_, r) => r !== rowIndex) },
      );

      return { ...current, sheets };
    });
  }, []);

  const value = useMemo(
    () => ({
      workbook,
      activeSheetIndex,
      setActiveSheetIndex,
      setWorkbook,
      clearWorkbook,
      updateCell,
      addRow,
      deleteRow,
    }),
    [workbook, activeSheetIndex, setWorkbook, clearWorkbook, updateCell, addRow, deleteRow],
  );

  return <WorkbookContext.Provider value={value}>{children}</WorkbookContext.Provider>;
}

export default WorkbookProvider;
