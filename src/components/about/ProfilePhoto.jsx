import { motion, useMotionValue, useTransform } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import photo from "../../assets/harsh-photo.jpg";

/**
 * Framed, glowing, gently-tilting portrait — a front-end presentation layer
 * (crop, glow, motion) rather than AI-edited pixels; no such tool is wired up.
 */
export default function ProfilePhoto() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[280px]"
      style={{ perspective: 1000 }}
    >
      {/* Rotating conic glow behind the frame */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_0deg,theme(colors.brand.500),theme(colors.rose.500),theme(colors.sky.400),theme(colors.brand.500))] opacity-70 blur-2xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl dark:border-slate-900"
      >
        <img
          src={photo}
          alt="Harsh Maurya"
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 18%" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
      </motion.div>

      {/* Floating availability badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.4 },
          y: { delay: 0.9, duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap
                   rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700
                   shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        <BadgeCheck size={14} className="text-emerald-500" />
        Open to opportunities
      </motion.div>
    </motion.div>
  );
}
