import { useMemo, useState } from "react";
import GALLERY_ITEMS, { FEATURED_GALLERY_ITEMS, GALLERY_CATEGORIES } from "../../data/gallery";
import GalleryCarousel from "../../components/gallery/GalleryCarousel";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";
import cn from "../../utils/cn";

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null); // { items, index, source } | null

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((photo) => photo.category === activeCategory),
    [activeCategory],
  );

  const handleNavigate = (delta) => {
    setLightbox((current) => {
      if (!current) return current;
      const nextIndex = (current.index + delta + current.items.length) % current.items.length;
      return { ...current, index: nextIndex };
    });
  };

  return (
    <div className="animate-fade-up space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Gallery</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          A look at Khirchi Mirchi — village, kitchen, and everything in between.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured</h3>
        <GalleryCarousel
          items={FEATURED_GALLERY_ITEMS}
          onOpen={(index) => setLightbox({ items: FEATURED_GALLERY_ITEMS, index, source: "carousel" })}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                activeCategory === category
                  ? "border-brand-500 bg-brand-500 text-white shadow-glow"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <GalleryGrid
          items={filtered}
          onOpen={(index) => setLightbox({ items: filtered, index, source: "grid" })}
        />
      </section>

      <GalleryLightbox
        items={lightbox?.items ?? []}
        index={lightbox?.index ?? null}
        source={lightbox?.source}
        onClose={() => setLightbox(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
