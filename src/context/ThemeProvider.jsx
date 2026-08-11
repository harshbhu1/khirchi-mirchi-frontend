import useTheme from "../hooks/useTheme";
import { ThemeContext } from "./theme-context";

/**
 * A single shared theme instance — routes rendered outside DashboardLayout's
 * subtree (or components mounted independently, like chart color pickers)
 * still see live updates when the Topbar toggle flips the mode.
 */
export function ThemeProvider({ children }) {
  const value = useTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
