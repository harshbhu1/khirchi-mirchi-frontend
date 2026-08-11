import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, CalendarDays, FolderGit2, GraduationCap, MapPin, Users } from "lucide-react";
import { TIMELINE } from "../../data/resume";
import cn from "../../utils/cn";

const CATEGORY_META = {
  education: { label: "Education", icon: GraduationCap, accent: "bg-blue-500" },
  experience: { label: "Experience", icon: Briefcase, accent: "bg-emerald-500" },
  projects: { label: "Projects", icon: FolderGit2, accent: "bg-violet-500" },
  "co-curricular": { label: "Co-curricular", icon: Users, accent: "bg-amber-500" },
};

const FILTERS = [
  { key: "all", label: "All" },
  ...Object.entries(CATEGORY_META).map(([key, meta]) => ({ key, label: meta.label })),
];

const SORTED_TIMELINE = [...TIMELINE].sort((a, b) => a.start - b.start);

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function Timeline() {
  const [filter, setFilter] = useState("all");

  const entries = useMemo(
    () =>
      filter === "all" ? SORTED_TIMELINE : SORTED_TIMELINE.filter((e) => e.category === filter),
    [filter],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
              filter === item.key
                ? "bg-white text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-400"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {entries.map((entry, index) => {
            const meta = CATEGORY_META[entry.category];
            const isLast = index === entries.length - 1;
            const Icon = meta.icon;

            return (
              <motion.li key={`${entry.title}-${entry.period}`} variants={itemVariants} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-md",
                      meta.accent,
                    )}
                  >
                    <Icon size={15} />
                  </span>
                  {!isLast ? (
                    <span className="mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-700" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1 pb-8">
                  <div className="card p-4 transition-transform duration-300 hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {entry.title}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {entry.org}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                          "bg-brand-500/10 text-brand-600 dark:text-brand-400",
                        )}
                      >
                        <CalendarDays size={11} />
                        {entry.period}
                      </span>
                    </div>

                    {entry.location ? (
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin size={11} />
                        {entry.location}
                      </p>
                    ) : null}

                    {entry.bullets.length > 0 ? (
                      <ul className="mt-2.5 space-y-1.5 border-t border-slate-100 pt-2.5 dark:border-slate-800">
                        {entry.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}
