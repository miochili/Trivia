"use client";
/**
 * Self-made characters (skribbl/Kahoot style): a round blob with swappable
 * eyes, mouth and hat, drawn as SVG so it works on tokens, pawns and the board.
 * Drawing box: x -6…106, y -8…104 (hats poke above the head).
 */
import { FACE_COLORS, parseFace, type Face } from "@/shared/avatar";

const INK = "#2b1c11";
const S = { stroke: INK, strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

function Eyes({ n }: { n: number }) {
  const L = 38;
  const R = 62;
  const Y = 52;
  const heart = (x: number) => `M${x} ${Y + 5} C${x - 9} ${Y - 2} ${x - 5} ${Y - 10} ${x} ${Y - 3} C${x + 5} ${Y - 10} ${x + 9} ${Y - 2} ${x} ${Y + 5} Z`;
  switch (n) {
    case 1: // big googly
      return (
        <g>
          {[L, R].map((x) => (
            <g key={x}>
              <circle cx={x} cy={Y} r={9} fill="#fff" stroke={INK} strokeWidth={2.5} />
              <circle cx={x + 2} cy={Y + 1} r={4.5} fill={INK} />
            </g>
          ))}
        </g>
      );
    case 2: // happy arcs
      return (
        <g {...S}>
          <path d={`M${L - 7} ${Y + 2} Q${L} ${Y - 7} ${L + 7} ${Y + 2}`} />
          <path d={`M${R - 7} ${Y + 2} Q${R} ${Y - 7} ${R + 7} ${Y + 2}`} />
        </g>
      );
    case 3: // wink
      return (
        <g>
          <circle cx={L} cy={Y} r={5} fill={INK} />
          <path d={`M${R - 7} ${Y} Q${R} ${Y + 6} ${R + 7} ${Y}`} {...S} />
        </g>
      );
    case 4: // sleepy
      return (
        <g {...S}>
          <path d={`M${L - 7} ${Y} H${L + 7}`} />
          <path d={`M${R - 7} ${Y} H${R + 7}`} />
          <path d={`M${L - 5} ${Y + 5} Q${L} ${Y + 8} ${L + 5} ${Y + 5}`} strokeWidth={2.5} />
          <path d={`M${R - 5} ${Y + 5} Q${R} ${Y + 8} ${R + 5} ${Y + 5}`} strokeWidth={2.5} />
        </g>
      );
    case 5: // grumpy brows
      return (
        <g>
          <circle cx={L} cy={Y + 2} r={4.5} fill={INK} />
          <circle cx={R} cy={Y + 2} r={4.5} fill={INK} />
          <g {...S}>
            <path d={`M${L - 8} ${Y - 9} L${L + 6} ${Y - 4}`} />
            <path d={`M${R + 8} ${Y - 9} L${R - 6} ${Y - 4}`} />
          </g>
        </g>
      );
    case 6: // cool shades
      return (
        <g>
          <path d={`M${L - 11} ${Y - 6} H${R + 11}`} stroke={INK} strokeWidth={3} />
          <rect x={L - 11} y={Y - 6} width={21} height={12} rx={5} fill={INK} />
          <rect x={R - 10} y={Y - 6} width={21} height={12} rx={5} fill={INK} />
          <path d={`M${L - 6} ${Y - 3} L${L - 1} ${Y - 3}`} stroke="#fff" strokeWidth={2} opacity={0.7} />
        </g>
      );
    case 7: // heart eyes
      return (
        <g fill="#d6334a" stroke={INK} strokeWidth={2}>
          <path d={heart(L)} />
          <path d={heart(R)} />
        </g>
      );
    default: // dots
      return (
        <g fill={INK}>
          <circle cx={L} cy={Y} r={5} />
          <circle cx={R} cy={Y} r={5} />
          <circle cx={L + 1.5} cy={Y - 1.5} r={1.5} fill="#fff" />
          <circle cx={R + 1.5} cy={Y - 1.5} r={1.5} fill="#fff" />
        </g>
      );
  }
}

function Mouth({ n }: { n: number }) {
  switch (n) {
    case 1: // big grin
      return <path d="M35 66 Q50 86 65 66 Z" fill="#fff" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />;
    case 2: // surprised
      return <ellipse cx={50} cy={72} rx={6} ry={8} fill={INK} />;
    case 3: // tongue out
      return (
        <g>
          <path d="M38 68 Q50 78 62 68" {...S} />
          <path d="M45 73 Q50 85 55 73 Z" fill="#e8708a" stroke={INK} strokeWidth={2.5} />
        </g>
      );
    case 4: // flat
      return <path d="M40 72 H60" {...S} />;
    case 5: // smirk
      return <path d="M40 73 Q53 77 62 66" {...S} />;
    case 6: // frown
      return <path d="M38 77 Q50 66 62 77" {...S} />;
    case 7: // cat :3
      return <path d="M38 69 Q44 76 50 69 Q56 76 62 69" {...S} />;
    default: // smile
      return <path d="M37 67 Q50 80 63 67" {...S} />;
  }
}

function Hat({ n }: { n: number }) {
  switch (n) {
    case 1: // crown
      return <path d="M30 28 L33 8 L42 18 L50 3 L58 18 L67 8 L70 28 Z" fill="#f2c94c" stroke={INK} strokeWidth={3} strokeLinejoin="round" />;
    case 2: // wizard
      return (
        <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
          <path d="M30 28 L52 -6 L70 28 Z" fill="#5b4ab8" />
          <ellipse cx={50} cy={28} rx={28} ry={6} fill="#4a3c99" />
          <path d="M52 8 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1 z" fill="#f2c94c" strokeWidth={1} />
        </g>
      );
    case 3: // top hat
      return (
        <g stroke={INK} strokeWidth={3}>
          <rect x={34} y={-2} width={32} height={26} rx={3} fill="#2a2a2a" />
          <rect x={24} y={22} width={52} height={7} rx={3} fill="#2a2a2a" />
          <rect x={34} y={15} width={32} height={5} fill="#b3402f" strokeWidth={0} />
        </g>
      );
    case 4: // beanie
      return (
        <g stroke={INK} strokeWidth={3}>
          <path d="M22 34 Q50 -4 78 34 Z" fill="#d9534f" />
          <rect x={20} y={28} width={60} height={9} rx={4} fill="#b83c38" />
          <circle cx={50} cy={4} r={7} fill="#fff" />
        </g>
      );
    case 5: // pirate
      return (
        <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
          <path d="M18 32 Q50 0 82 32 Q50 22 18 32 Z" fill="#2a2a2a" />
          <circle cx={50} cy={18} r={4} fill="#fff" strokeWidth={1.5} />
        </g>
      );
    case 6: // bow
      return (
        <g stroke={INK} strokeWidth={2.5} strokeLinejoin="round" fill="#ef6aa8">
          <path d="M66 20 L54 10 L56 30 Z" />
          <path d="M66 20 L80 10 L78 30 Z" />
          <circle cx={66} cy={20} r={4} fill="#d94b8c" />
        </g>
      );
    case 7: // little horns
      return (
        <g stroke={INK} strokeWidth={2.5} strokeLinejoin="round" fill="#c0392b">
          <path d="M28 32 Q22 14 32 8 Q32 20 40 26 Z" />
          <path d="M72 32 Q78 14 68 8 Q68 20 60 26 Z" />
        </g>
      );
    case 8: // flower
      return (
        <g stroke={INK} strokeWidth={2}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={30 + 8 * Math.cos((a * Math.PI) / 180)} cy={22 + 8 * Math.sin((a * Math.PI) / 180)} r={6} fill="#fff" />
          ))}
          <circle cx={30} cy={22} r={5} fill="#f2c94c" />
        </g>
      );
    default:
      return null;
  }
}

/** The face as an SVG group in the -6…106 × -8…104 box. */
export function FaceGroup({ face }: { face: Face }) {
  const color = FACE_COLORS[face.color];
  return (
    <g>
      <circle cx={50} cy={56} r={36} fill={color} stroke={INK} strokeWidth={3.5} />
      <ellipse cx={38} cy={38} rx={11} ry={6} fill="#fff" opacity={0.3} transform="rotate(-25 38 38)" />
      <circle cx={30} cy={64} r={5} fill="#ff8a8a" opacity={0.35} />
      <circle cx={70} cy={64} r={5} fill="#ff8a8a" opacity={0.35} />
      <Eyes n={face.eyes} />
      <Mouth n={face.mouth} />
      <Hat n={face.hat} />
    </g>
  );
}

/** Standalone SVG of a self-made face (for HTML contexts). */
export function FaceSvg({ face, size }: { face: Face; size: number }) {
  return (
    <svg viewBox="-6 -8 112 112" width={size} height={size} aria-hidden>
      <FaceGroup face={face} />
    </svg>
  );
}

/** Any avatar (emoji or self-made) inside an SVG, centred at 0,0 with the given width. */
export function AvatarInSvg({ avatar, size }: { avatar: string; size: number }) {
  const face = parseFace(avatar);
  if (face) {
    return (
      <g transform={`translate(${-size / 2} ${-size / 2}) scale(${size / 112}) translate(6 8)`}>
        <FaceGroup face={face} />
      </g>
    );
  }
  return (
    <text y={size * 0.33} textAnchor="middle" fontSize={size * 0.9}>
      {avatar}
    </text>
  );
}
