import { Component } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";

/** Keeps a render error from blanking the whole app in production. */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Swap for your error reporter (Sentry, etc.) when one is wired up.
    console.error("Unhandled UI error:", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
          <TriangleAlert size={26} />
        </span>

        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Something went wrong</h1>
        <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
          {this.state.error?.message || "An unexpected error occurred."}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-primary mt-2"
        >
          <RotateCcw size={15} />
          Reload the app
        </button>
      </div>
    );
  }
}
