/**
 * Author : Harsh Maurya
 * Date: 12-06-2026
 */

import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import DashboardLayout from "./components/layout/DashboardLayout";
import PlaceholderView from "./views/placeholder/PlaceholderView";
import NotFound from "./views/NotFound";
import LoginForm from "./views/login/LoginForm";

// Upload pulls in the spreadsheet parser and barcode scanner, Reports pulls in
// the chart library — both stay out of the initial bundle.
const UploadView = lazy(() => import("./views/upload/UploadView"));
const ReportsView = lazy(() => import("./views/reports/ReportsView"));
const AboutView = lazy(() => import("./views/about/AboutView"));
const MusicView = lazy(() => import("./views/music/MusicView"));
// The poem book pulls in framer-motion and its own stylesheet — keep it lazy.
const PoemView = lazy(() => import("./views/poem/PoemView"));

// The zoo is a mini-site with its own chrome — one lazy chunk per page, plus the
// shared layout, so visiting /zoo doesn't pull in all seven pages at once.
const ZooLayout = lazy(() => import("./components/zoo/ZooLayout"));
const ZooHome = lazy(() => import("./views/zoo/ZooHome"));
const TheZoo = lazy(() => import("./views/zoo/TheZoo"));
const VisitorsInfo = lazy(() => import("./views/zoo/VisitorsInfo"));
const Tickets = lazy(() => import("./views/zoo/Tickets"));
const ZooEvents = lazy(() => import("./views/zoo/Events"));
const ZooGallery = lazy(() => import("./views/zoo/Gallery"));
const ZooContact = lazy(() => import("./views/zoo/Contact"));

function RouteFallback() {
  return (
    <div className="flex animate-fade-in items-center justify-center py-24 text-slate-400">
      <LoaderCircle size={26} className="animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />

      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="/upload" replace />} />

        <Route
          path="/upload"
          element={
            <Suspense fallback={<RouteFallback />}>
              <UploadView />
            </Suspense>
          }
        />

        <Route
          path="/data"
          element={
            <PlaceholderView
              title="Data"
              description="Saved records will live here once the backend endpoints are connected."
            />
          }
        />

        <Route
          path="/reports"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ReportsView />
            </Suspense>
          }
        />

        <Route
          path="/settings"
          element={
            <PlaceholderView
              title="Settings"
              description="Workspace preferences, team members, and API configuration."
            />
          }
        />


        {/* Zoo mini-site. Nested inside the dashboard so the sidebar stays
            available, and nested internally so ZooLayout's own header, nav
            and footer persist while only the inner content swaps. */}
        <Route
          path="/zoo"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ZooLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<RouteFallback />}>
                <ZooHome />
              </Suspense>
            }
          />
          <Route
            path="the-zoo"
            element={
              <Suspense fallback={<RouteFallback />}>
                <TheZoo />
              </Suspense>
            }
          />
          <Route
            path="visitors-info"
            element={
              <Suspense fallback={<RouteFallback />}>
                <VisitorsInfo />
              </Suspense>
            }
          />
          <Route
            path="tickets"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Tickets />
              </Suspense>
            }
          />
          <Route
            path="events"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ZooEvents />
              </Suspense>
            }
          />
          <Route
            path="gallery"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ZooGallery />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ZooContact />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/poem"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PoemView />
            </Suspense>
          }
        />

        <Route
          path="/music"
          element={
            <Suspense fallback={<RouteFallback />}>
              <MusicView />
            </Suspense>
          }
        />

        <Route
          path="/about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutView />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
