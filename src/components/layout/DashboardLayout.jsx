import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { useThemeContext } from "../../context/theme-context";
import cn from "../../utils/cn";

const COLLAPSE_KEY = "sidebar:collapsed";

export default function DashboardLayout() {
  const { theme, toggleTheme } = useThemeContext();
  const { pathname } = useLocation();
  const isMusicRoute = pathname === "/music";

  /**
   * Routes that supply their own full-page presentation: the zoo is a complete
   * site with its own header and footer, and the poem book needs the whole
   * viewport height so the page is visible in one piece. Both keep the sidebar
   * for navigation but drop the dashboard's topbar, footer and padding.
   */
  const isChromelessRoute = ["/zoo", "/poem"].some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSE_KEY) === "true",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, String(collapsed));
  }, [collapsed]);

  // The drawer should never survive a route change or an Escape press.
  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          "flex flex-col transition-[padding] duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
          collapsed ? "lg:pl-[76px]" : "lg:pl-64",
          isMusicRoute ? "h-screen overflow-hidden" : "min-h-screen",
        )}
      >
        {isChromelessRoute ? (
          /* These routes hide the topbar, which is where the drawer trigger
             lives. Below lg the sidebar is a drawer, so it still needs one. */
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="fixed left-3 top-3 z-30 rounded-xl border border-slate-300 bg-white/90 p-2
                       text-slate-600 shadow-lg backdrop-blur transition-colors hover:bg-white
                       lg:hidden dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300"
          >
            <Menu size={18} />
          </button>
        ) : (
          <Topbar
            onOpenMobile={() => setMobileOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}

        {/* key forces the enter animation to replay on every route change */}
        <main
          key={pathname}
          className={cn(
            "flex-1 animate-fade-up",
            !isChromelessRoute && "p-4 sm:p-6",
            isMusicRoute && "min-h-0 overflow-hidden",
          )}
        >
          <Outlet />
        </main>

        {!isMusicRoute && !isChromelessRoute && <Footer />}
      </div>
    </div>
  );
}
