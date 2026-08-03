// Branded kraft stand-up pouch (SVG). The see-through window shows the
// product's REAL grain/powder photo clipped in, for a realistic package shot.
export default function Pouch({ name = "Millet", grain = "#8a6b3f", photo, size = 240 }) {
  const [l1, l2] = splitName(name);
  const uid = "p" + hash(name);
  return (
    <svg viewBox="0 0 280 340" width={size} height={(size * 340) / 280} role="img" aria-label={name} className="pouch-svg">
      <defs>
        <linearGradient id={uid + "k"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecdbb8" />
          <stop offset="0.42" stopColor="#ddc79e" />
          <stop offset="1" stopColor="#c6aa7e" />
        </linearGradient>
        <linearGradient id={uid + "sheen"} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={uid + "top"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d0b384" />
          <stop offset="1" stopColor="#bd9c6a" />
        </linearGradient>
        <linearGradient id={uid + "panel"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf4e4" />
          <stop offset="1" stopColor="#f2e7cf" />
        </linearGradient>
        <clipPath id={uid + "win"}>
          <rect x="70" y="196" width="140" height="88" rx="12" />
        </clipPath>
        <radialGradient id={uid + "sh"} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#5f4d2e" stopOpacity="0.34" />
          <stop offset="1" stopColor="#5f4d2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={uid + "gloss"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.30" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="140" cy="320" rx="100" ry="15" fill={`url(#${uid}sh)`} />

      {/* pouch body */}
      <path d="M54 46 C54 34 62 29 73 28 L207 28 C218 29 226 34 226 46 L226 292 C226 305 215 313 202 313 L78 313 C65 313 54 305 54 292 Z"
            fill={`url(#${uid}k)`} stroke="#ac8f64" strokeWidth="1.4" />
      {/* light sheen */}
      <path d="M54 46 C54 34 62 29 73 28 L207 28 C218 29 226 34 226 46 L226 292 C226 305 215 313 202 313 L78 313 C65 313 54 305 54 292 Z"
            fill={`url(#${uid}sheen)`} />
      {/* right edge shade */}
      <path d="M206 28 C218 29 226 34 226 46 L226 292 C226 305 215 313 202 313 L192 313 L192 28 Z" fill="#7a5f36" opacity="0.10" />

      {/* crimped top seal */}
      <rect x="54" y="28" width="172" height="20" fill={`url(#${uid}top)`} />
      <g stroke="#a4855a" strokeWidth="1.2" opacity="0.8">
        {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={58 + i * 8.5} y1="30" x2={58 + i * 8.5} y2="46" />)}
      </g>
      <rect x="54" y="48" width="172" height="3" fill="#9c7f52" opacity="0.5" />

      {/* leaf logo in ring */}
      <g transform="translate(140 80)">
        <circle r="20" fill="#fbf4e4" stroke="#cdb98c" strokeWidth="1.2" />
        <g transform="scale(0.62)">
          <path d="M0 -3 C 9 -16 24 -16 28 -4 C 24 3 9 3 0 -3 Z" fill="#3a7d44" />
          <path d="M0 -3 C -9 -16 -24 -16 -28 -4 C -24 3 -9 3 0 -3 Z" fill="#4a8f52" />
          <path d="M0 -5 C 3 -18 -3 -18 0 -5 Z" fill="#2f6b3a" />
        </g>
      </g>

      {/* veg mark */}
      <g transform="translate(198 62)">
        <rect x="0" y="0" width="13" height="13" rx="2" fill="#fff" stroke="#2f6b3a" strokeWidth="1.5" />
        <circle cx="6.5" cy="6.5" r="3.4" fill="#2f6b3a" />
      </g>

      {/* product name */}
      <text x="140" y="126" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="21" fontWeight="700" fill="#463824">{l1}</text>
      {l2 && <text x="140" y="150" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="21" fontWeight="700" fill="#463824">{l2}</text>}

      {/* badges */}
      <g fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700">
        <rect x="64" y="164" width="72" height="18" rx="9" fill="#b9532b" />
        <text x="100" y="176.5" textAnchor="middle" fill="#fff">STONE GROUND</text>
        <rect x="144" y="164" width="72" height="18" rx="9" fill="#3a7d44" />
        <text x="180" y="176.5" textAnchor="middle" fill="#fff">100% NATURAL</text>
      </g>

      {/* see-through window: real product photo clipped in */}
      <g clipPath={`url(#${uid}win)`}>
        {photo
          ? <image href={photo} x="70" y="196" width="140" height="88" preserveAspectRatio="xMidYMid slice" />
          : <rect x="70" y="196" width="140" height="88" fill={grain} />}
        <rect x="70" y="196" width="140" height="88" fill={`url(#${uid}gloss)`} />
      </g>
      <rect x="70" y="196" width="140" height="88" rx="12" fill="none" stroke="#8a6f45" strokeWidth="2.5" />
      <rect x="72.5" y="198.5" width="135" height="83" rx="10" fill="none" stroke="#00000018" />

      {/* net weight */}
      <text x="140" y="301" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8.5" fill="#6b5a3c" letterSpacing="1.5">SHUDDHA MILLETS  ·  NET 500g</text>
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
