import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryLightbox({ items, index, source, onClose, onNavigate }) {
  const photo = index != null ? items[index] : null;

  useEffect(() => {
    if (index == null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate(1);
      if (event.key === "ArrowLeft") onNavigate(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {photo ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onNavigate(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white
                           transition-colors hover:bg-white/20 sm:left-4"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onNavigate(1);
                }}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white
                           transition-colors hover:bg-white/20 sm:right-4"
              >
                <ChevronRight size={22} />
              </button>
            </>
          ) : null}

          <motion.div
            layoutId={`gallery-${source}-${photo.id}`}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[80vh] max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
          >
            <img
              src={photo.full}
              alt={photo.caption}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm font-semibold text-white">{photo.caption}</p>
              <p className="text-xs text-white/60">{photo.category}</p>
            </div>
          </motion.div>

          {items.length > 1 ? (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/70">
              {index + 1} / {items.length}
            </p>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
