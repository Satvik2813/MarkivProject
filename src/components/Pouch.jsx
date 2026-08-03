// Branded kraft stand-up pouch rendered as inline SVG — matches the product mockups.
export default function Pouch({ name = "Millet", grain = "#8a6b3f", size = 240 }) {
  const [l1, l2] = splitName(name);
  const uid = "p" + hash(name);
  return (
    <svg viewBox="0 0 280 330" width={size} height={(size * 330) / 280} role="img" aria-label={name} className="pouch-svg">
      <defs>
        <linearGradient id={uid + "k"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9d7b3" />
          <stop offset="0.45" stopColor="#dcc59c" />
          <stop offset="1" stopColor="#c9ad82" />
        </linearGradient>
        <linearGradient id={uid + "top"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdb082" />
          <stop offset="1" stopColor="#be9d6c" />
        </linearGradient>
        <linearGradient id={uid + "win"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={grain} stopOpacity="0.9" />
          <stop offset="1" stopColor={grain} />
        </linearGradient>
        <radialGradient id={uid + "sh"} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6b5836" stopOpacity="0.32" />
          <stop offset="1" stopColor="#6b5836" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="140" cy="312" rx="96" ry="16" fill={`url(#${uid}sh)`} />

      {/* pouch body with soft top corners + subtle gusset */}
      <path d="M56 44
               C 56 33 64 28 74 27
               L 206 27
               C 216 28 224 33 224 44
               L 224 286
               C 224 298 214 306 202 306
               L 78 306
               C 66 306 56 298 56 286 Z"
            fill={`url(#${uid}k)`} stroke="#b1946a" strokeWidth="1.4" />

      {/* left highlight */}
      <path d="M56 44 C56 33 64 28 74 27 L92 27 L92 306 L78 306 C66 306 56 298 56 286 Z" fill="#fff" opacity="0.10" />
      {/* right shade */}
      <path d="M208 27 L206 27 C216 28 224 33 224 44 L224 286 C224 298 214 306 202 306 L196 306 Z" fill="#7d6238" opacity="0.12" />

      {/* top zip seal */}
      <rect x="56" y="27" width="168" height="22" fill={`url(#${uid}top)`} />
      <g stroke="#a98a5c" strokeWidth="1.4">
        <line x1="64" y1="38" x2="216" y2="38" strokeDasharray="3 3" />
      </g>
      <rect x="56" y="49" width="168" height="3" fill="#a98a5c" opacity="0.5" />

      {/* leaf logo */}
      <g transform="translate(140 78)">
        <path d="M0 -3 C 9 -16 24 -16 28 -4 C 24 3 9 3 0 -3 Z" fill="#3a7d44" />
        <path d="M0 -3 C -9 -16 -24 -16 -28 -4 C -24 3 -9 3 0 -3 Z" fill="#4a8f52" />
        <path d="M0 -5 C 3 -18 -3 -18 0 -5 Z" fill="#2f6b3a" />
      </g>

      {/* veg mark */}
      <g transform="translate(196 66)">
        <rect x="0" y="0" width="14" height="14" rx="2" fill="none" stroke="#2f6b3a" strokeWidth="1.6" />
        <circle cx="7" cy="7" r="4" fill="#2f6b3a" />
      </g>

      {/* product name */}
      <text x="140" y="118" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="21" fontWeight="700" fill="#4a3a24">{l1}</text>
      {l2 && <text x="140" y="142" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="21" fontWeight="700" fill="#4a3a24">{l2}</text>}

      {/* badges */}
      <g fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700">
        <rect x={l2 ? 66 : 66} y="156" width="70" height="18" rx="9" fill="#b9532b" />
        <text x="101" y="168.5" textAnchor="middle" fill="#fff">STONE GROUND</text>
        <rect x="144" y="156" width="70" height="18" rx="9" fill="#3a7d44" />
        <text x="179" y="168.5" textAnchor="middle" fill="#fff">100% NATURAL</text>
      </g>

      {/* powder window */}
      <rect x="72" y="190" width="136" height="86" rx="10" fill={`url(#${uid}win)`} />
      <rect x="72" y="190" width="136" height="86" rx="10" fill="none" stroke="#00000022" />
      <g opacity="0.28" fill="#000">
        {Array.from({ length: 48 }).map((_, i) => (
          <circle key={i} cx={82 + (i % 12) * 11} cy={202 + Math.floor(i / 12) * 18} r="1.5" />
        ))}
      </g>
      {/* window gloss */}
      <path d="M72 190 h136 v14 a70 8 0 0 1 -136 0 Z" fill="#fff" opacity="0.14" />

      {/* net weight strip */}
      <text x="140" y="292" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8.5" fill="#6b5a3c" letterSpacing="1">SHUDDHA MILLETS · NET 500g</text>
    </svg>
  );
}

function splitName(name) {
  const words = name.split(" ");
  if (words.length <= 2) return [name, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}
