import { useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { NAV_ITEMS } from "./navigation";
import cn from "../../utils/cn";

export default function Topbar({ onOpenMobile, theme, onToggleTheme }) {
  const { pathname } = useLocation();
  const active = NAV_ITEMS.find((item) => pathname.startsWith(item.to));

  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80
                 px-4 backdrop-blur-xl sm:px-6 dark:border-slate-800 dark:bg-slate-950/80"
    >
      <button
        type="button"
        onClick={onOpenMobile}
        aria-label="Open menu"
        className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800
                   lg:hidden dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <Menu size={20} />
      </button>

      <div className="min-w-0 animate-fade-in" key={pathname}>
        <h1 className="truncate text-base font-bold text-slate-900 dark:text-white">
          {active?.label ?? "Khirchi Mirchi"}
        </h1>
        <p className="truncate text-xs text-slate-400">
          {active?.description ?? "Admin console"}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 text-slate-500
                     transition-colors hover:bg-slate-100 hover:text-slate-800
                     dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          {/* Both icons stay mounted so the swap can animate. */}
          <Sun
            size={17}
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
              theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
            )}
          />
          <Moon
            size={17}
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
              theme === "dark" ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
            )}
          />
        </button>
      </div>
    </header>
  );
}
