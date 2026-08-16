import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import TryOnPhoneModal from "./TryOnPhoneModal";

/** Desktop-only floating CTA — small screens get a sidebar tab instead (see navigation.js). */
export default function TryOnPhoneButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-gradient-to-br
                   from-brand-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-lg
                   shadow-brand-500/30 lg:flex"
      >
        <Smartphone size={17} />
        Try in your phone
      </motion.button>

      <TryOnPhoneModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
