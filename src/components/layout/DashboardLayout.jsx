import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { useThemeContext } from "../../context/theme-context";
import cn from "../../utils/cn";

// Pulls in the qrcode library — kept out of the initial bundle.
const TryOnPhoneButton = lazy(() => import("../qr/TryOnPhoneButton"));

const COLLAPSE_KEY = "sidebar:collapsed";

export default function DashboardLayout() {
  const { theme, toggleTheme } = useThemeContext();
  const { pathname } = useLocation();
  const isMusicRoute = pathname === "/music";

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
        <Topbar
          onOpenMobile={() => setMobileOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* key forces the enter animation to replay on every route change */}
        <main
          key={pathname}
          className={cn(
            "flex-1 animate-fade-up p-4 sm:p-6",
            isMusicRoute && "min-h-0 overflow-hidden",
          )}
        >
          <Outlet />
        </main>

        {!isMusicRoute && <Footer />}
      </div>

      {!isMusicRoute && (
        <Suspense fallback={null}>
          <TryOnPhoneButton />
        </Suspense>
      )}
    </div>
  );
}
