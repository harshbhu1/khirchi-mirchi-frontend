import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/**
 * Full-screen viewer for a gallery photograph.
 *
 * Navigation is index-based against the *filtered* list the grid is showing, so
 * arrowing through never jumps to an item hidden by the active category.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const open = index !== null && index >= 0 && index < items.length;
  const item = open ? items[index] : null;

  const goNext = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate],
  );

  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, goNext, goPrev]);

  // The page behind must not scroll while the overlay is up.
  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the dialog so Escape and arrow keys work without a click.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} — image ${index + 1} of ${items.length}`}
      onClick={onClose}
      className="zoo-lightbox fixed inset-0 z-50 flex animate-fade-in flex-col items-center
                 justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={22} />
      </button>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2.5 text-slate-300
                       transition-colors hover:bg-white/10 hover:text-white sm:left-6"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2.5 text-slate-300
                       transition-colors hover:bg-white/10 hover:text-white sm:right-6"
          >
            <ChevronRight size={26} />
          </button>
        </>
      ) : null}

      {/* key restarts the enter animation on every navigation */}
      <figure
        key={item.id}
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-2xl animate-scale-in flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl"
      >
        <img
          src={item.image}
          alt={item.name}
          className="max-h-[60vh] w-full bg-slate-950 object-contain"
        />

        <figcaption className="flex items-start gap-4 p-5">
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-black uppercase tracking-wide text-lime-300">
              {item.name}
            </span>
            <span className="mt-0.5 block text-sm text-slate-400">{item.caption}</span>
            <span className="mt-1 block text-xs text-slate-500">{item.habitat}</span>
          </span>

          <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>

      <p className="mt-4 hidden text-xs text-slate-500 sm:block">
        ← → to browse · Esc to close
      </p>
    </div>
  );
}
