import PoemBook from "../../components/poem/PoemBook";

/**
 * Route wrapper for the poem book. No max-width or padding here — the book
 * sizes itself against the viewport so a whole page is visible at once.
 */
export default function PoemView() {
  return (
    <div className="animate-fade-up bg-gradient-to-b from-amber-50 to-orange-100/60 dark:from-slate-900 dark:to-slate-950">
      <PoemBook />
    </div>
  );
}
