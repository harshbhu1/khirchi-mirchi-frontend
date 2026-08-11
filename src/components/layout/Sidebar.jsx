import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ChartSpline, LogOut, PanelLeft, PanelLeftClose, X } from "lucide-react";
import { NAV_ITEMS } from "./navigation";
import Auth from "../../modules/Auth";
import cn from "../../utils/cn";

function NavItem({ item, collapsed, index, onNavigate }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          "group relative flex animate-fade-up items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium stagger",
          "transition-all duration-200 hover:translate-x-0.5",
          collapsed && "justify-center px-0",
          isActive
            ? "bg-brand-500/10 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-100",
        )
      }
      style={{ "--i": index }}
    >
      {({ isActive }) => (
        <>
          {/* Active marker slides/grows in rather than popping. */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-brand-500 transition-all duration-300",
              isActive ? "h-6 opacity-100" : "h-0 opacity-0",
            )}
          />

          <Icon
            size={19}
            strokeWidth={isActive ? 2.4 : 2}
            className="shrink-0 transition-transform duration-200 group-hover:scale-110"
          />

          {/* Label collapses by width so the transition stays smooth. */}
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-300",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
            )}
          >
            {item.label}
          </span>

          {collapsed ? (
            <span
              role="tooltip"
              className="pointer-events-none absolute left-full z-50 ml-3 origin-left scale-90 whitespace-nowrap
                         rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg
                         transition-all duration-200 group-hover:scale-100 group-hover:opacity-100
                         dark:bg-slate-700"
            >
              {item.label}
            </span>
          ) : null}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const user = Auth.getUserDetails();

  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={onCloseMobile}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white",
          "transition-[width,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
          "dark:border-slate-800 dark:bg-slate-900",
          collapsed ? "w-[76px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Brand */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800",
            collapsed && "justify-center px-0",
          )}
        >
          <motion.span
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-rose-500 text-white shadow-lg shadow-brand-500/30"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl bg-brand-500/40"
              animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <ChartSpline size={18} strokeWidth={2.5} />
          </motion.span>

          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-300",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
            )}
          >
            <span className="block text-sm font-bold leading-tight text-slate-900 dark:text-white">
              Khirchi Mirchi
            </span>
            <span className="block text-[11px] font-medium text-slate-400">Admin Console</span>
          </span>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-3">
          <p
            className={cn(
              "px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 transition-opacity duration-200",
              collapsed && "opacity-0",
            )}
          >
            Workspace
          </p>

          {NAV_ITEMS.map((item, index) => (
            <NavItem
              key={item.to}
              item={item}
              index={index}
              collapsed={collapsed}
              onNavigate={onCloseMobile}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800">
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl p-2",
              collapsed && "justify-center p-0",
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {(user?.name ?? user?.email ?? "KM").slice(0, 2)}
            </span>

            <span
              className={cn(
                "min-w-0 flex-1 overflow-hidden transition-all duration-300",
                collapsed ? "w-0 opacity-0" : "opacity-100",
              )}
            >
              <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                {user?.name ?? "Signed in"}
              </span>
              <span className="block truncate text-xs text-slate-400">
                {user?.email ?? "local session"}
              </span>
            </span>

            {!collapsed ? (
              <button
                type="button"
                onClick={() => {
                  Auth.logout();
                  window.location.assign("/login");
                }}
                aria-label="Sign out"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
              >
                <LogOut size={16} />
              </button>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              "mt-2 hidden w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500",
              "transition-colors hover:bg-slate-100 hover:text-slate-800 lg:flex",
              "dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
              collapsed && "justify-center px-0",
            )}
          >
            {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            {!collapsed ? <span>Collapse</span> : null}
          </button>
        </div>
      </aside>
    </>
  );
}
