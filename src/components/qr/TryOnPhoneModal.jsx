import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import TryOnPhoneCard from "./TryOnPhoneCard";

export default function TryOnPhoneModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Try it on your phone"
            onClick={(event) => event.stopPropagation()}
            className="card relative w-full max-w-xs overflow-hidden p-5"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>

            <TryOnPhoneCard />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
