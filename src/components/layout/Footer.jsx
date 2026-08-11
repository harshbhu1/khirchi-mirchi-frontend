import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Rocket, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

const CONTACT = {
  name: "Harsh Maurya",
  email: "harsh46785@gmail.com",
  phone: "+91 9598658319",
  location: "Noida, India",
  linkedin: "https://www.linkedin.com/in/harsh-maurya-139069237",
  github: "https://github.com/harshbhu1",
};

const MAILTO =
  `mailto:${CONTACT.email}` +
  `?subject=${encodeURIComponent("Let's build something together")}` +
  `&body=${encodeURIComponent("Hi Harsh,\n\nI have a business/idea I'd like your help building. Here's what I have in mind:\n\n")}`;

const LINKS = [
  { href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: Mail },
  { href: `tel:${CONTACT.phone.replace(/\s+/g, "")}`, label: CONTACT.phone, icon: Phone },
  { href: null, label: CONTACT.location, icon: MapPin },
  { href: CONTACT.github, label: "GitHub", icon: GithubIcon, external: true },
  { href: CONTACT.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
];

export default function Footer() {
  return (
    <footer className="mt-auto animate-fade-up border-t border-slate-200 dark:border-slate-800">
      {/* Hire-me CTA */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-brand-500/10 via-rose-500/5 to-transparent px-4 py-6 sm:px-6 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-rose-500 text-white shadow-lg shadow-brand-500/30"
              animate={{ y: [0, -5, 0], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket size={20} />
            </motion.span>

            <div>
              <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                Got a business or an idea?
                <Sparkles size={14} className="text-brand-500" />
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                I&apos;ll build it for you — the first consultation is completely free.
              </p>
            </div>
          </div>

          <motion.a
            href={MAILTO}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary shrink-0"
          >
            <Mail size={15} />
            Write to me
          </motion.a>
        </div>
      </div>

      {/* Contact strip */}
      <div className="px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Khirchi Mirchi
              <span className="ml-2 rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                Developer Zone
              </span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Built by {CONTACT.name} · © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {LINKS.map((link) => {
              const content = (
                <>
                  <link.icon size={13} />
                  <span>{link.label}</span>
                </>
              );

              const className =
                "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/50 dark:hover:text-brand-400";

              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <span key={link.label} className={className}>
                  {content}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
