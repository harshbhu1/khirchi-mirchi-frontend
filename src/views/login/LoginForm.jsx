import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChartSpline, Eye, EyeOff, Lock, Mail } from "lucide-react";
import AnimatedVillageTruck from "../../components/decor/AnimatedVillageTruck";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/** A glass field — translucent enough to show the animated backdrop through it. */
const glassInput =
  "input border-white/40 bg-white/50 backdrop-blur-sm placeholder:text-slate-500 " +
  "dark:border-white/10 dark:bg-white/5 dark:placeholder:text-slate-500";

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 dark:bg-slate-950">
      {/* Faint data-grid texture behind everything */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,theme(colors.slate.400)_1px,transparent_0)] [background-size:28px_28px] dark:opacity-[0.15]"
      />

      {/* Animated gradient blobs — this is what the glass card shows through */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl dark:bg-brand-500/25"
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-rose-500/25 blur-3xl dark:bg-rose-500/20"
        animate={{ x: [0, -30, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/15"
        animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Indian village scene with a truck looping along the road */}
      <AnimatedVillageTruck />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/40 bg-white/30
                   p-8 shadow-2xl backdrop-blur-2xl
                   dark:border-white/10 dark:bg-white/[0.06]"
      >
        {/* Inner sheen for extra glass depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent dark:from-white/10"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <motion.div variants={fieldVariants} className="mb-7 text-center">
            <motion.span
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-rose-500 text-white shadow-lg shadow-brand-500/30"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChartSpline size={22} strokeWidth={2.5} />
            </motion.span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Sign in to your Khirchi Mirchi console
            </p>
          </motion.div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <motion.div variants={fieldVariants}>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`${glassInput} pl-9`}
                />
              </div>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`${glassInput} px-9`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={showPassword ? "eye-off" : "eye"}
                      initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                      transition={{ duration: 0.15 }}
                      className="flex"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary group w-full"
              >
                Sign in
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </motion.button>
            </motion.div>
          </form>

          <motion.p
            variants={fieldVariants}
            className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400"
          >
            Just exploring?{" "}
            <Link
              to="/upload"
              className="font-semibold text-brand-600 underline-offset-4 hover:underline dark:text-brand-400"
            >
              Open the workspace
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
