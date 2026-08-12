import cn from "../../utils/cn";

const STARS = [
  { x: 4, y: 8 }, { x: 12, y: 18 }, { x: 22, y: 6 }, { x: 34, y: 14 },
  { x: 46, y: 5 }, { x: 58, y: 16 }, { x: 68, y: 8 }, { x: 90, y: 12 },
  { x: 96, y: 22 }, { x: 15, y: 28 }, { x: 40, y: 24 }, { x: 78, y: 20 },
];

const BIRDS = [
  { top: "14%", duration: 24, delay: 0 },
  { top: "22%", duration: 30, delay: 6 },
  { top: "10%", duration: 27, delay: 12 },
];

function Bird({ top, duration, delay }) {
  return (
    <svg
      viewBox="0 0 20 10"
      className="absolute h-2 w-4 animate-bird-fly fill-none stroke-slate-800/70 dark:stroke-slate-200/60"
      style={{ top, left: 0, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M0,5 Q5,-4 10,5 Q15,-4 20,5" />
    </svg>
  );
}

function Hut({ flip = false }) {
  return (
    <div className={cn("relative flex shrink-0 flex-col items-center", flip && "scale-x-[-1]")}>
      <div className="h-0 w-0 border-x-[15px] border-b-[13px] border-x-transparent border-b-orange-950/80" />
      <div className="h-6 w-8 rounded-[2px] border border-orange-900/40 bg-gradient-to-b from-amber-200 to-orange-300 dark:from-amber-800/70 dark:to-orange-950/60" />
    </div>
  );
}

function Tree({ small = false }) {
  return (
    <div className={cn("flex shrink-0 flex-col items-center", small && "scale-75")}>
      <div className="h-5 w-5 rounded-full bg-emerald-800/80 dark:bg-emerald-900/70" />
      <div className="h-3 w-1 bg-orange-950/70" />
    </div>
  );
}

/** A side-view, hand-painted Indian truck — TATA badge, floral trim and all. */
function Truck() {
  const wheelStyle = { transformBox: "fill-box", transformOrigin: "center" };

  return (
    <svg viewBox="0 0 132 66" className="h-16 w-32 drop-shadow-lg sm:h-20 sm:w-40" aria-hidden="true">
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7cc" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* cargo body */}
      <path d="M6,18 Q44,3 82,18 L82,42 L6,42 Z" className="fill-brand-500" />
      <rect x="6" y="34" width="76" height="8" className="fill-brand-700" />
      {/* tri-colour trim */}
      <rect x="6" y="26" width="76" height="2.5" className="fill-orange-200" />
      <rect x="6" y="29" width="76" height="2.5" className="fill-white" />
      <rect x="6" y="32" width="76" height="2.5" className="fill-emerald-500" />
      {/* floral dots */}
      {[14, 26, 38, 50, 62, 74].map((cx) => (
        <circle key={cx} cx={cx} cy="21" r="2" className="fill-amber-200" />
      ))}
      {/* TATA badge on the cargo nose */}
      <rect x="10" y="10" width="20" height="7" rx="1.5" className="fill-slate-900" />
      <text x="20" y="15.5" textAnchor="middle" className="fill-white text-[5px] font-bold">
        TATA
      </text>

      {/* cabin */}
      <path d="M82,42 L82,20 L100,20 L112,32 L112,42 Z" className="fill-rose-600" />
      <path d="M82,36 L112,36 L112,42 L82,42 Z" className="fill-rose-800" />
      <path d="M86,23 L98,23 L106,32 L86,32 Z" className="fill-sky-200" />
      <circle cx="92" cy="27.5" r="2" className="fill-slate-700/70" />
      <circle cx="96" cy="27.5" r="2" className="fill-slate-700/40" />
      {/* mirror */}
      <rect x="80.5" y="19" width="2" height="6" className="fill-slate-600" />
      <rect x="78.5" y="17.5" width="4" height="3" rx="1" className="fill-slate-500" />
      {/* headlight */}
      <circle cx="111" cy="38" r="6" fill="url(#lampGlow)" />
      <circle cx="111" cy="38" r="2.4" className="fill-amber-200" />

      {/* hanging tassels */}
      <g className="origin-top animate-tassel-sway" style={{ transformBox: "fill-box" }}>
        <rect x="8" y="42" width="2" height="6" className="fill-rose-500" />
        <rect x="13" y="42" width="2" height="7" className="fill-emerald-500" />
        <rect x="18" y="42" width="2" height="5" className="fill-amber-400" />
        <rect x="23" y="42" width="2" height="7" className="fill-sky-400" />
      </g>

      {/* mudguards + spinning wheels */}
      <circle cx="26" cy="48" r="10" className="fill-slate-900" />
      <circle cx="26" cy="48" r="4.5" className="fill-slate-300 animate-wheel-spin" style={wheelStyle} />
      <circle cx="26" cy="48" r="1.6" className="fill-slate-500 animate-wheel-spin" style={wheelStyle} />
      <circle cx="98" cy="48" r="10" className="fill-slate-900" />
      <circle cx="98" cy="48" r="4.5" className="fill-slate-300 animate-wheel-spin" style={wheelStyle} />
      <circle cx="98" cy="48" r="1.6" className="fill-slate-500 animate-wheel-spin" style={wheelStyle} />
    </svg>
  );
}

function DustPuff({ delay }) {
  return (
    <span
      className="absolute bottom-2 h-2 w-2 animate-dust-puff rounded-full bg-orange-900/40"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

/**
 * A dusk village scene — sunset sky, mosque and palms on the skyline, huts
 * along a dirt road, and a hand-painted truck that loops down it forever.
 * Purely cosmetic — aria-hidden and pointer-events-none throughout.
 *
 * `className` controls size/position so callers can use it as a small strip
 * (default) or stretch it into a full-page hero.
 */
export default function AnimatedVillageTruck({
  className = "absolute inset-x-0 bottom-0 h-32 sm:h-44",
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none z-0 overflow-hidden", className)}>
      {/* Sunset sky, stars, sun, mountains, mosque, palms */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vtSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c2255" />
            <stop offset="38%" stopColor="#7a3f68" />
            <stop offset="65%" stopColor="#e2743f" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <radialGradient id="vtSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff6cf" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1000" height="300" fill="url(#vtSky)" />

        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={(s.x / 100) * 1000}
            cy={(s.y / 100) * 300}
            r="1.6"
            className="animate-twinkle fill-white"
            style={{ animationDelay: `${(i % 5) * 0.4}s` }}
          />
        ))}

        <circle cx="800" cy="150" r="65" fill="url(#vtSun)" />
        <circle cx="800" cy="150" r="24" fill="#fde68a" />

        {/* far mountains */}
        <path
          d="M0,220 L0,165 Q120,120 240,168 Q360,208 480,150 Q600,100 720,160 Q850,208 1000,150 L1000,220 Z"
          className="fill-[#4c3a63]/50"
        />
        {/* near mountains */}
        <path
          d="M0,240 L0,195 Q150,155 300,198 Q430,230 560,182 Q700,132 850,192 Q930,220 1000,198 L1000,240 Z"
          className="fill-[#7a4a4f]/60"
        />

        {/* mosque silhouette */}
        <g className="fill-[#2b2140]">
          <rect x="130" y="205" width="9" height="30" />
          <circle cx="134.5" cy="200" r="3" />
          <rect x="160" y="188" width="36" height="47" />
          <path d="M160,188 Q178,158 196,188 Z" />
          <rect x="174" y="168" width="8" height="20" />
          <circle cx="178" cy="165" r="3" />
        </g>

        {/* palm trees */}
        <g className="fill-[#2b2140]">
          <path d="M60,236 C55,214 68,198 62,182 C71,193 80,180 87,188 C78,192 80,203 71,208 C78,211 82,222 75,226 C70,217 61,225 64,235 Z" />
          <rect x="58" y="235" width="3" height="26" />
        </g>
        <g className="fill-[#2b2140]">
          <path d="M930,238 C925,218 937,203 931,188 C939,198 947,187 953,194 C945,198 947,208 939,212 C945,215 949,225 942,229 C938,221 930,228 933,237 Z" />
          <rect x="928" y="237" width="3" height="24" />
        </g>
      </svg>

      {BIRDS.map((bird, i) => (
        <Bird key={i} {...bird} />
      ))}

      {/* Village row */}
      <div className="absolute inset-x-0 bottom-9 flex items-end justify-around px-4 sm:bottom-12">
        <Hut />
        <Tree />
        <Hut flip />
        <Tree small />
        <Hut />
        <Tree />
      </div>

      {/* Dirt road */}
      <div className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-b from-[#6b4226] to-[#442a16] sm:h-11">
        <div
          className="absolute inset-y-0 left-0 top-1/2 h-[3px] w-[calc(100%+48px)] -translate-y-1/2 animate-road-scroll"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #d9a86c 0, #d9a86c 20px, transparent 20px, transparent 48px)",
          }}
        />
      </div>

      {/* Truck, forever driving the length of the road, kicking up dust */}
      <div className="absolute bottom-1 animate-drive">
        <div className="animate-truck-bounce">
          <Truck />
        </div>
        <div className="absolute -left-2 bottom-2 sm:bottom-3">
          <DustPuff delay={0} />
          <DustPuff delay={0.3} />
          <DustPuff delay={0.6} />
        </div>
      </div>
    </div>
  );
}
