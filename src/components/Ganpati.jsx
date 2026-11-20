// Hand-built SVG illustration of Shri Ganesh with a glowing halo. Pure SVG, no image files.
export default function Ganpati({ size = 190 }) {
  return (
    <svg className="ganpati" width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="श्री गणेश">
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7dc8a" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#d9a93f" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d9a93f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6dd8c" />
          <stop offset="55%" stopColor="#c9962f" />
          <stop offset="100%" stopColor="#8a6217" />
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9893d" />
          <stop offset="100%" stopColor="#c9611f" />
        </linearGradient>
      </defs>

      <circle className="halo-pulse" cx="100" cy="100" r="96" fill="url(#halo)" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="url(#gold)" strokeWidth="1.5" strokeDasharray="2 5" />

      {/* ears */}
      <g className="ear-l">
        <path d="M62 78 C28 60 12 100 40 128 C56 140 70 122 72 104 Z" fill="#d97a2e" stroke="#7d2b0c" strokeWidth="1.5" />
        <path d="M60 86 C42 78 34 102 46 118 C54 124 62 114 64 104 Z" fill="#f2b36d" opacity=".7" />
      </g>
      <g className="ear-r">
        <path d="M138 78 C172 60 188 100 160 128 C144 140 130 122 128 104 Z" fill="#d97a2e" stroke="#7d2b0c" strokeWidth="1.5" />
        <path d="M140 86 C158 78 166 102 154 118 C146 124 138 114 136 104 Z" fill="#f2b36d" opacity=".7" />
      </g>

      {/* crown */}
      <path d="M68 62 L76 30 L90 48 L100 22 L110 48 L124 30 L132 62 Z" fill="url(#gold)" stroke="#6e4a0d" strokeWidth="1.5" />
      <circle cx="100" cy="40" r="5" fill="#a3122a" stroke="#f6dd8c" strokeWidth="1.5" />
      <circle cx="82" cy="50" r="3" fill="#1f6b43" />
      <circle cx="118" cy="50" r="3" fill="#1f6b43" />
      <rect x="66" y="60" width="68" height="9" rx="4" fill="url(#gold)" stroke="#6e4a0d" strokeWidth="1" />

      {/* face */}
      <ellipse cx="100" cy="100" rx="38" ry="40" fill="url(#skin)" stroke="#7d2b0c" strokeWidth="1.5" />
      {/* tilak */}
      <path d="M92 74 Q100 66 108 74 Q100 90 92 74Z" fill="#a3122a" />
      <path d="M86 70 Q100 60 114 70" stroke="#f6dd8c" strokeWidth="2" fill="none" />
      {/* eyes */}
      <path d="M78 94 Q86 88 94 94 Q86 98 78 94Z" fill="#fff" stroke="#3b1708" strokeWidth="1" />
      <path d="M106 94 Q114 88 122 94 Q114 98 106 94Z" fill="#fff" stroke="#3b1708" strokeWidth="1" />
      <circle cx="86" cy="93.5" r="2.4" fill="#2a0f05" />
      <circle cx="114" cy="93.5" r="2.4" fill="#2a0f05" />
      <path d="M76 88 Q86 82 96 88" stroke="#3b1708" strokeWidth="1.6" fill="none" />
      <path d="M104 88 Q114 82 124 88" stroke="#3b1708" strokeWidth="1.6" fill="none" />

      {/* trunk */}
      <g className="trunk">
        <path
          d="M94 100 C92 128 90 146 104 158 C116 168 130 160 128 148 C127 142 120 142 119 148 C118 152 112 152 110 146 C106 134 110 116 106 100 Z"
          fill="#e08a40"
          stroke="#7d2b0c"
          strokeWidth="1.5"
        />
        <path d="M97 112 Q96 130 98 142 M103 112 Q104 124 103 136" stroke="#b9591a" strokeWidth="1" fill="none" opacity=".7" />
      </g>

      {/* tusk */}
      <path d="M84 120 C74 130 72 144 80 150 C82 142 86 134 90 128 Z" fill="#fff6dc" stroke="#7d2b0c" strokeWidth="1" />

      {/* collar */}
      <path d="M62 150 Q100 176 138 150 Q130 186 100 188 Q70 186 62 150Z" fill="url(#gold)" stroke="#6e4a0d" strokeWidth="1.5" opacity=".95" />
      <circle cx="100" cy="170" r="4" fill="#a3122a" stroke="#f6dd8c" />
    </svg>
  );
}
