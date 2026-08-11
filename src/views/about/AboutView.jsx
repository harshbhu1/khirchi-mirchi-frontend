import { motion } from "framer-motion";
import {
  Award,
  Boxes,
  Languages as LanguagesIcon,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Sparkles,
  Terminal,
} from "lucide-react";
import ProfilePhoto from "../../components/about/ProfilePhoto";
import Timeline from "../../components/about/Timeline";
import { GithubIcon, LinkedinIcon } from "../../components/ui/BrandIcons";
import {
  CERTIFICATIONS,
  CODING_PROFILES,
  FRAMEWORKS,
  LANGUAGES,
  PROFILE,
  TECH_STACK,
} from "../../data/resume";
import cn from "../../utils/cn";

const MAILTO =
  `mailto:${PROFILE.email}` +
  `?subject=${encodeURIComponent("Let's build something together")}` +
  `&body=${encodeURIComponent("Hi Harsh,\n\n")}`;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

function ChipCloud({ items }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-wrap gap-2">
      {items.map((item) => (
        <motion.span
          key={item}
          variants={fadeUp}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600
                     transition-colors hover:border-brand-300 hover:text-brand-600
                     dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

function SectionCard({ icon: Icon, title, children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card p-5"
    >
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
        <Icon size={16} className="text-brand-500" />
        {title}
      </h3>
      {children}
    </motion.section>
  );
}

export default function AboutView() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Hero */}
      <div className="card overflow-hidden">
        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[280px_1fr] md:items-center">
          <ProfilePhoto />

          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400"
            >
              <Sparkles size={12} />
              About the developer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
            >
              {PROFILE.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400"
            >
              {PROFILE.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400"
            >
              {PROFILE.about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              {[
                { icon: Mail, label: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { icon: Phone, label: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s+/g, "")}` },
                { icon: MapPin, label: PROFILE.location, href: null },
                { icon: GithubIcon, label: "GitHub", href: PROFILE.github },
                { icon: LinkedinIcon, label: "LinkedIn", href: PROFILE.linkedin },
              ].map((item) => {
                const className = cn(
                  "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500",
                  "transition-colors hover:border-brand-300 hover:text-brand-600",
                  "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/50 dark:hover:text-brand-400",
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={className}
                  >
                    <item.icon size={13} />
                    {item.label}
                  </a>
                ) : (
                  <span key={item.label} className={className}>
                    <item.icon size={13} />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.a
              href={MAILTO}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary mt-6 inline-flex"
            >
              <Rocket size={15} />
              Let&apos;s build something
            </motion.a>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="grid gap-6 sm:grid-cols-2">
        <SectionCard icon={Terminal} title="Tech stack">
          <ChipCloud items={TECH_STACK} />
        </SectionCard>

        <SectionCard icon={Boxes} title="Frameworks & tools" delay={0.05}>
          <ChipCloud items={FRAMEWORKS} />
        </SectionCard>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <SectionCard icon={Award} title="Certifications">
          <ul className="space-y-2">
            {CERTIFICATIONS.map((cert) => (
              <li
                key={cert}
                className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {cert}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon={LanguagesIcon} title="Languages" delay={0.05}>
          <ul className="space-y-2">
            {LANGUAGES.map((lang) => (
              <li key={lang.name} className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-300">{lang.name}</span>
                <span className="text-slate-400">{lang.level}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon={Sparkles} title="Coding profiles" delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {CODING_PROFILES.map((profile) => (
              <span
                key={profile}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              >
                {profile}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="mb-4 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Journey so far
        </h2>
        <Timeline />
      </div>
    </div>
  );
}
