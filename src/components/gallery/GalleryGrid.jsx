import { useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import cn from "../../utils/cn";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

function GalleryTile({ photo, onOpen }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      variants={item}
      layoutId={`gallery-grid-${photo.id}`}
      onClick={onOpen}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="group relative block aspect-square w-full overflow-hidden rounded-2xl border
                 border-slate-200 bg-slate-100 shadow-soft dark:border-slate-800 dark:bg-slate-900"
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle size={18} className="animate-spin text-slate-300 dark:text-slate-700" />
        </div>
      )}

      <img
        src={photo.thumb}
        alt={photo.caption}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-500 group-hover:scale-110",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0
                   opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <p className="p-3 text-left text-xs font-semibold text-white">{photo.caption}</p>
      </div>
    </motion.button>
  );
}

export default function GalleryGrid({ items, onOpen }) {
  return (
    <motion.div
      key={items.map((photo) => photo.id).join("-")}
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      {items.map((photo, index) => (
        <GalleryTile key={photo.id} photo={photo} onOpen={() => onOpen(index)} />
      ))}
    </motion.div>
  );
}
