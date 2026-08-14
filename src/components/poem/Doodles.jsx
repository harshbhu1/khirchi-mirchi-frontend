/**
 * Hand-drawn decorations for the poem page, traced from the reference notebook
 * photo: a crescent moon and clouds top-right, hanging vines top-left, a blossom
 * tree and sunflower down the left, a signpost bottom-right, and a lilac
 * watercolour wash along the right edge.
 *
 * All inline SVG — no image files, so they scale cleanly and recolour with the
 * page. Every piece is aria-hidden; they carry no meaning for a screen reader.
 */

const INK = "#3b3555";

export function WatercolourEdge({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M120 0H62c8 40-14 52-6 92 9 44-16 60-4 104 11 42-18 58-6 100 13 44-14 62-2 104 12 42-16 58-4 100 12 44-14 60-2 102 10 38-8 56 2 92 4 16 12 30 22 46h58z"
        fill="#c4b5fd"
        opacity="0.55"
      />
      <path
        d="M120 40H86c6 46-12 56-4 100 9 46-14 62-3 106 12 44-16 60-4 102 12 42-12 60-2 100 9 36-6 54 3 88h44z"
        fill="#a78bfa"
        opacity="0.35"
      />
    </svg>
  );
}

export function MoonAndClouds({ className }) {
  return (
    <svg className={className} viewBox="0 0 190 150" fill="none" aria-hidden="true">
      {/* Crescent moon */}
      <path
        d="M150 18c-19 6-32 24-32 45s13 39 32 45c-6 2-13 3-20 3-27 0-48-21-48-48s21-48 48-48c7 0 14 1 20 3z"
        fill="#fde047"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
        transform="rotate(24 118 63)"
      />
      {/* Clouds */}
      <path
        d="M18 78c-8 0-14-6-14-13s6-13 14-13c2-9 10-15 19-15 11 0 20 8 21 18 8 1 14 7 14 15 0 8-7 14-15 14z"
        fill="#fff"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M104 128c-7 0-12-5-12-11s5-11 12-11c2-7 8-12 16-12 9 0 17 7 18 15 6 1 11 6 11 12 0 7-5 12-12 12z"
        fill="#fff"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Stars */}
      <Star x={22} y={22} size={9} fill="#fbbf24" />
      <Star x={66} y={110} size={7} fill="#fbbf24" />
      <Star x={168} y={104} size={6} fill="#f472b6" />
    </svg>
  );
}

function Star({ x, y, size, fill }) {
  const p = [];
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? size : size / 2.4;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    p.push(`${x + r * Math.cos(a)},${y + r * Math.sin(a)}`);
  }
  return <polygon points={p.join(" ")} fill={fill} stroke={INK} strokeWidth="1.4" />;
}

export function HangingVines({ className }) {
  const strands = [
    { x: 20, len: 150, leaves: 7 },
    { x: 58, len: 200, leaves: 9 },
    { x: 96, len: 120, leaves: 6 },
    { x: 132, len: 170, leaves: 8 },
  ];

  return (
    <svg className={className} viewBox="0 0 160 230" fill="none" aria-hidden="true">
      {strands.map((strand) => (
        <g key={strand.x}>
          <path
            d={`M${strand.x} 0 q6 ${strand.len / 2} 0 ${strand.len}`}
            stroke="#4d7c0f"
            strokeWidth="1.8"
            fill="none"
          />
          {Array.from({ length: strand.leaves }, (_, i) => {
            const t = (i + 1) / (strand.leaves + 1);
            const y = strand.len * t;
            const side = i % 2 === 0 ? 1 : -1;
            return (
              <ellipse
                key={i}
                cx={strand.x + side * 7}
                cy={y}
                rx="7"
                ry="4"
                fill="#84cc16"
                stroke="#3f6212"
                strokeWidth="1.1"
                transform={`rotate(${side * 28} ${strand.x + side * 7} ${y})`}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export function BlossomTree({ className }) {
  return (
    <svg className={className} viewBox="0 0 170 250" fill="none" aria-hidden="true">
      <path
        d="M78 250c2-52 4-92 2-118-2-22-10-40-22-58"
        stroke="#7c4a24"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M80 150c14-16 26-26 44-34" stroke="#7c4a24" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M74 118c-14-12-24-20-34-38" stroke="#7c4a24" strokeWidth="4" strokeLinecap="round" />
      <path d="M82 100c12-14 22-22 38-28" stroke="#7c4a24" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M70 78c-10-10-16-18-22-32" stroke="#7c4a24" strokeWidth="3" strokeLinecap="round" />

      {[
        [40, 30], [58, 18], [76, 10], [96, 16], [118, 26], [136, 42],
        [30, 52], [50, 44], [70, 36], [92, 40], [112, 52], [130, 68],
        [36, 76], [56, 66], [78, 62], [100, 70], [122, 84],
        [46, 100], [66, 92], [88, 96], [110, 106],
        [58, 122], [80, 128], [102, 132], [124, 118],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 5 : 3.6}
          fill={i % 4 === 0 ? "#f472b6" : "#ec4899"}
          opacity={0.9}
        />
      ))}

      {[[24, 150], [48, 168], [96, 158], [130, 150], [64, 190], [110, 186]].map(
        ([cx, cy], i) => (
          <circle key={`fall-${i}`} cx={cx} cy={cy} r="2.6" fill="#f9a8d4" />
        ),
      )}
    </svg>
  );
}

export function Sunflower({ className }) {
  return (
    <svg className={className} viewBox="0 0 150 190" fill="none" aria-hidden="true">
      <path d="M74 190c-2-46-2-76 0-104" stroke="#4d7c0f" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M74 146c-18-2-30-12-34-28 18-2 30 8 34 28z"
        fill="#65a30d"
        stroke="#3f6212"
        strokeWidth="1.8"
      />
      <path
        d="M74 122c18-4 32-16 36-34-20 0-32 12-36 34z"
        fill="#65a30d"
        stroke="#3f6212"
        strokeWidth="1.8"
      />
      {Array.from({ length: 14 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 14;
        return (
          <ellipse
            key={i}
            cx={74 + Math.cos(a) * 30}
            cy={62 + Math.sin(a) * 30}
            rx="15"
            ry="8"
            fill="#facc15"
            stroke="#a16207"
            strokeWidth="1.6"
            transform={`rotate(${(a * 180) / Math.PI} ${74 + Math.cos(a) * 30} ${
              62 + Math.sin(a) * 30
            })`}
          />
        );
      })}
      <circle cx="74" cy="62" r="19" fill="#78350f" stroke="#451a03" strokeWidth="2" />
      <circle cx="74" cy="62" r="12" fill="#92400e" opacity="0.6" />
    </svg>
  );
}

export function Signpost({ className, top = "स्वप्न", bottom = "विश्वास" }) {
  return (
    <svg className={className} viewBox="0 0 210 175" fill="none" aria-hidden="true">
      <rect x="94" y="18" width="15" height="140" rx="3" fill="#c8a06a" stroke={INK} strokeWidth="2.2" />

      <path
        d="M18 44h150l22 21-22 21H18z"
        fill="#e2c290"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text
        x="94"
        y="72"
        textAnchor="middle"
        fontSize="26"
        fill={INK}
        fontFamily="Kalam, cursive"
      >
        {top}
      </text>

      <path
        d="M192 100H42l-22 21 22 21h150z"
        fill="#e2c290"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text
        x="112"
        y="128"
        textAnchor="middle"
        fontSize="26"
        fill={INK}
        fontFamily="Kalam, cursive"
      >
        {bottom}
      </text>

      <path d="M60 172q46-14 96 0" stroke="#65a30d" strokeWidth="3" fill="none" />
    </svg>
  );
}

/** The wavy pink rule under the title. */
export function TitleRule({ className }) {
  return (
    <svg className={className} viewBox="0 0 420 22" fill="none" aria-hidden="true">
      <path
        d="M6 12q26-9 52 0t52 0q26-9 52 0"
        stroke="#ec4899"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M254 12q26-9 52 0t52 0q26-9 52 0"
        stroke="#ec4899"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M210 4c4-5 12-5 12 2 0 5-7 9-12 14-5-5-12-9-12-14 0-7 8-7 12-2z"
        fill="#ec4899"
      />
      {[40, 90, 140, 280, 330, 380].map((x) => (
        <circle key={x} cx={x} cy="12" r="2.6" fill="#db2777" />
      ))}
    </svg>
  );
}

/** The dotted divider with a small heart, used between stanzas. */
export function StanzaDivider({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 16" fill="none" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={`l${i}`} cx={8 + i * 14} cy="8" r="2" fill="#7c3aed" />
      ))}
      <path
        d="M150 3c3-4 9-4 9 2 0 4-6 7-9 10-3-3-9-6-9-10 0-6 6-6 9-2z"
        fill="#7c3aed"
      />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={`r${i}`} cx={168 + i * 14} cy="8" r="2" fill="#7c3aed" />
      ))}
    </svg>
  );
}
