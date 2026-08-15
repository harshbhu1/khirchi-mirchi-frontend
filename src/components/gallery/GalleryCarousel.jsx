import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cn from "../../utils/cn";

const AUTOPLAY_MS = 4000;

/** A wide, auto-advancing "featured" strip — deliberately not the grid below it. */
export default function GalleryCarousel({ items, onOpen }) {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const card = trackRef.current?.children[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const goTo = (delta) => {
    setActiveIndex((current) => {
      const next = (current + delta + items.length) % items.length;
      scrollToIndex(next);
      return next;
    });
  };

  useEffect(() => {
    if (items.length < 2) return undefined;

    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((current) => {
        const next = (current + 1) % items.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
      >
        {items.map((photo, index) => (
          <motion.button
            key={photo.id}
            type="button"
            layoutId={`gallery-carousel-${photo.id}`}
            onClick={() => onOpen(index)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-48 w-72 shrink-0 snap-start overflow-hidden rounded-2xl
                       border border-slate-200 shadow-soft dark:border-slate-800 sm:h-56 sm:w-80"
          >
            <img
              src={photo.thumb}
              alt={photo.caption}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-left">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-300">
                {photo.category}
              </p>
              <p className="text-base font-bold text-white">{photo.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Previous featured photo"
            className="absolute left-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2
                       text-slate-700 shadow-md backdrop-blur transition-colors hover:bg-white sm:flex
                       dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Next featured photo"
            className="absolute right-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2
                       text-slate-700 shadow-md backdrop-blur transition-colors hover:bg-white sm:flex
                       dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <ChevronRight size={18} />
          </button>

          <div className="mt-3 flex justify-center gap-1.5">
            {items.map((photo, index) => (
              <span
                key={photo.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-5 bg-brand-500" : "w-1.5 bg-slate-300 dark:bg-slate-700",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
