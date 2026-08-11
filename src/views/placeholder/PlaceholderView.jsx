import { Link } from "react-router-dom";
import { Construction, Upload } from "lucide-react";

/** Shared shell for nav tabs that aren't built out yet. */
export default function PlaceholderView({ title, description }) {
  return (
    <div className="mx-auto flex max-w-2xl animate-fade-up flex-col items-center py-16 text-center">
      <span className="mb-5 flex h-16 w-16 animate-float items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
        <Construction size={28} />
      </span>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>

      <Link to="/upload" className="btn-primary mt-6">
        <Upload size={15} />
        Go to Upload
      </Link>
    </div>
  );
}
