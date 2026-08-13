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
const TryPhoneView = lazy(() => import("./views/tryphone/TryPhoneView"));
const QrGeneratorView = lazy(() => import("./views/qrgenerator/QrGeneratorView"));

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

        <Route
          path="/music"
          element={
            <Suspense fallback={<RouteFallback />}>
              <MusicView />
            </Suspense>
          }
        />

        <Route
          path="/qr-generator"
          element={
            <Suspense fallback={<RouteFallback />}>
              <QrGeneratorView />
            </Suspense>
          }
        />

        <Route
          path="/try-phone"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TryPhoneView />
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
