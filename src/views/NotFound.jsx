import { Link } from "react-router-dom";
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen animate-fade-up flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="bg-gradient-to-br from-brand-500 to-rose-500 bg-clip-text text-7xl font-black text-transparent">
        404
      </p>
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/upload" className="btn-primary mt-2">
        <House size={15} />
        Back to workspace
      </Link>
    </div>
  );
}
