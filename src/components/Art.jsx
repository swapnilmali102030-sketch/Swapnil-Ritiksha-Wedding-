// Hand-built SVG illustrations. Pure SVG, no image files, so they load instantly.

export function Crest({ size = 150, animate = true }) {
  return (
    <svg
      className={`crest ${animate ? "draw" : ""}`}
      width={size}
      height={Math.round(size * 1.1)}
      viewBox="0 0 200 220"
      role="img"
      aria-label="S and R monogram"
    >
      <defs>
        <linearGradient id="crestGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecd493" />
          <stop offset=".5" stopColor="#b98a2e" />
          <stop offset="1" stopColor="#dcb968" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#crestGold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path pathLength="1" d="M100 28 C60 28 34 56 34 110 C34 164 62 190 100 200 C138 190 166 164 166 110 C166 56 140 28 100 28Z" />
        <path pathLength="1" opacity=".65" d="M100 40 C68 40 46 62 46 110 C46 156 68 178 100 188 C132 178 154 156 154 110 C154 62 132 40 100 40Z" />
        <path pathLength="1" d="M100 28 C92 14 76 10 68 18 C62 26 70 34 78 30" />
        <path pathLength="1" d="M100 28 C108 14 124 10 132 18 C138 26 130 34 122 30" />
        <path pathLength="1" d="M100 200 C92 212 78 214 70 208 C64 202 70 196 78 200" />
        <path pathLength="1" d="M100 200 C108 212 122 214 130 208 C136 202 130 196 122 200" />
        <path pathLength="1" d="M34 100 C22 94 18 82 22 74 C32 78 36 88 34 100Z" />
        <path pathLength="1" d="M166 100 C178 94 182 82 178 74 C168 78 164 88 166 100Z" />
        <path pathLength="1" d="M36 140 C24 142 16 152 18 160 C28 160 36 152 36 140Z" />
        <path pathLength="1" d="M164 140 C176 142 184 152 182 160 C172 160 164 152 164 140Z" />
      </g>
      <g className="crest-letters" fill="url(#crestGold)" fontFamily="'Cormorant Garamond', serif" textAnchor="middle">
        <text x="72" y="132" fontSize="66" fontWeight="500">S</text>
        <text x="100" y="112" fontSize="26" fontStyle="italic">&amp;</text>
        <text x="130" y="140" fontSize="66" fontWeight="500">R</text>
      </g>
    </svg>
  );
}

export function Sprig({ className = "" }) {
  const blossoms = [[34, 134], [62, 116], [90, 98], [118, 80], [146, 60], [172, 36], [52, 104], [104, 70], [158, 44]];
  const twigs = [
    "M44 130 C46 112 58 104 70 102",
    "M74 112 C80 96 92 90 104 90",
    "M104 94 C112 78 124 72 136 72",
    "M136 70 C146 56 158 52 168 52",
  ];
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 200 160" aria-hidden="true">
      <path className="br" d="M8 152 C60 122 112 92 192 18" />
      {twigs.map((d, i) => <path key={i} className="br" d={d} />)}
      {blossoms.map(([x, y], i) => (
        <g key={i}>
          <circle className="bl" cx={x} cy={y} r={i % 3 === 0 ? 6 : 4.5} />
          <circle cx={x} cy={y} r="1.4" fill="#c9a45a" />
        </g>
      ))}
      <path className="lf" d="M20 144 C14 132 18 122 26 118 C30 128 28 138 20 144Z" />
      <path className="lf" d="M84 108 C76 98 78 88 86 84 C90 94 90 102 84 108Z" />
      <path className="lf" d="M150 58 C142 48 144 38 152 34 C156 44 156 52 150 58Z" />
    </svg>
  );
}

export function Marigold({ size = 60, tone = "#f5a91f", core = "#e07b0a" }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {petals.map((a) => (
        <ellipse key={a} cx="50" cy="20" rx="9" ry="20" fill={tone} transform={`rotate(${a} 50 50)`} />
      ))}
      {petals.map((a) => (
        <ellipse key={`i${a}`} cx="50" cy="30" rx="6" ry="13" fill={core} opacity=".85" transform={`rotate(${a + 11} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="9" fill="#a85408" />
    </svg>
  );
}

export function HaldiArt() {
  // Marigold garland along a curve, with a bowl of turmeric below.
  const pts = Array.from({ length: 9 }, (_, i) => {
    const t = 0.06 + i * 0.11;
    const x = (1 - t) * (1 - t) * 12 + 2 * (1 - t) * t * 150 + t * t * 288;
    const y = (1 - t) * (1 - t) * 14 + 2 * (1 - t) * t * 92 + t * t * 14;
    return [x, y];
  });
  return (
    <svg className="art" viewBox="0 0 300 170" aria-hidden="true">
      <path d="M12 14 Q150 92 288 14" fill="none" stroke="#3d7a4f" strokeWidth="2" />
      {pts.map(([x, y], i) => (
        <svg key={i} x={x - 15} y={y - 6} width="30" height="30" viewBox="0 0 100 100">
          {Array.from({ length: 12 }, (_, k) => (
            <ellipse key={k} cx="50" cy="22" rx="11" ry="22" fill={i % 2 ? "#f5a91f" : "#ffc933"} transform={`rotate(${k * 30} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="11" fill="#c06a08" />
        </svg>
      ))}
      <path d="M110 120 C110 156 190 156 190 120Z" fill="#c9962f" stroke="#8a6212" strokeWidth="1.5" />
      <ellipse cx="150" cy="120" rx="40" ry="9" fill="#f6c52a" stroke="#8a6212" strokeWidth="1.5" />
      <ellipse cx="150" cy="118" rx="30" ry="5.5" fill="#fbdc5a" />
      <path d="M96 128 C84 118 82 104 92 98 C100 106 102 118 96 128Z" fill="#3d7a4f" />
      <path d="M204 128 C216 118 218 104 208 98 C200 106 198 118 204 128Z" fill="#3d7a4f" />
    </svg>
  );
}

export function MandapArt() {
  const pillar = (x, w, y, h) => (
    <g key={x}>
      <rect x={x} y={y} width={w} height={h} fill="url(#mandapGold)" stroke="#a97c26" strokeWidth=".8" />
      <rect x={x - 2} y={y + h - 4} width={w + 4} height="6" rx="1" fill="#d9b565" stroke="#a97c26" strokeWidth=".8" />
      <rect x={x - 2} y={y - 3} width={w + 4} height="5" rx="1" fill="#d9b565" stroke="#a97c26" strokeWidth=".8" />
    </g>
  );
  return (
    <svg className="art" viewBox="0 0 300 200" aria-hidden="true">
      <defs>
        <linearGradient id="mandapGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e2b0" />
          <stop offset="1" stopColor="#c99a3b" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="96" rx="124" ry="84" fill="#fff6e0" opacity=".85" />
      <path d="M72 64 H228 L216 76 H84Z" fill="url(#mandapGold)" stroke="#a97c26" strokeWidth="1" />
      <path d="M104 64 C104 38 126 26 150 20 C174 26 196 38 196 64Z" fill="url(#mandapGold)" stroke="#a97c26" strokeWidth="1" />
      <path d="M150 6 V20" stroke="#a97c26" strokeWidth="2" />
      <circle cx="150" cy="6" r="3.2" fill="#c99a3b" />
      <path d="M76 64 C76 52 86 46 92 44 C98 46 108 52 108 64Z" fill="url(#mandapGold)" stroke="#a97c26" strokeWidth="1" />
      <path d="M192 64 C192 52 202 46 208 44 C214 46 224 52 224 64Z" fill="url(#mandapGold)" stroke="#a97c26" strokeWidth="1" />
      {pillar(84, 10, 76, 82)}
      {pillar(206, 10, 76, 82)}
      {pillar(118, 7, 76, 82)}
      {pillar(175, 7, 76, 82)}
      <path d="M125 76 Q150 100 175 76" fill="none" stroke="#a97c26" strokeWidth="1.2" />
      <path d="M96 76 Q107 90 118 76" fill="none" stroke="#a97c26" strokeWidth="1" />
      <path d="M182 76 Q194 90 206 76" fill="none" stroke="#a97c26" strokeWidth="1" />
      <path d="M150 76 V92" stroke="#a97c26" strokeWidth="1" />
      <path d="M142 92 H158 L162 106 H138Z" fill="#fff8e3" stroke="#a97c26" strokeWidth="1" />
      <path d="M146 106 V114 M150 106 V117 M154 106 V114" stroke="#a97c26" strokeWidth="1" />
      <rect x="70" y="156" width="160" height="14" fill="#f0cfa0" stroke="#a97c26" strokeWidth="1" />
      <rect x="60" y="170" width="180" height="8" fill="#e6c08b" stroke="#a97c26" strokeWidth="1" />
      <rect x="124" y="134" width="52" height="22" rx="8" fill="#fffaf0" stroke="#a97c26" strokeWidth="1" />
      <rect x="118" y="140" width="10" height="16" rx="4" fill="#fffaf0" stroke="#a97c26" strokeWidth="1" />
      <rect x="172" y="140" width="10" height="16" rx="4" fill="#fffaf0" stroke="#a97c26" strokeWidth="1" />
      {[[40, 168], [52, 158], [34, 154], [262, 168], [250, 158], [268, 154], [58, 172], [244, 172]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#fffaf0" stroke="#e5d3a8" strokeWidth="1" />
          <circle cx={x} cy={y} r="3" fill="#f3d9d6" />
        </g>
      ))}
      <path d="M30 176 C28 160 36 150 46 148" fill="none" stroke="#3d7a4f" strokeWidth="1.5" />
      <path d="M270 176 C272 160 264 150 254 148" fill="none" stroke="#3d7a4f" strokeWidth="1.5" />
    </svg>
  );
}
