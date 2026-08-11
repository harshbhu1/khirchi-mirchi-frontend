import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside a <ThemeProvider>.");
  }

  return context;
}
