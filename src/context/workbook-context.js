import { createContext, useContext } from "react";

export const WorkbookContext = createContext(null);

export function useWorkbook() {
  const context = useContext(WorkbookContext);

  if (!context) {
    throw new Error("useWorkbook must be used inside a <WorkbookProvider>.");
  }

  return context;
}
