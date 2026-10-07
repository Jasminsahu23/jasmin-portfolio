// Illustrated concept previews for each project. Pure SVG, no images to load.
// They contain no invented metrics: bars and charts are abstract shapes.
const VB = '0 0 640 420'
const FONT = 'var(--sans)'

function Svg({ label, children }) {
  return (
    <svg
      className="pv"
      viewBox={VB}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

const T = ({ x, y, size = 11, fill = '#cfc8e6', weight = 500, anchor = 'start', children }) => (
  <text x={x} y={y} fontSize={size} fill={fill} fontWeight={weight} textAnchor={anchor} fontFamily={FONT}>
    {children}
  </text>
)

/* 01 — Surveillance: dark map with glowing hotspots */
export function SurveillanceVisual({ label }) {
  const spots = [
    { x: 215, y: 175, r: 52, c: '#f2a7cf', d: '0s' },
    { x: 385, y: 245, r: 70, c: '#8f74ff', d: '.7s' },
    { x: 475, y: 140, r: 38, c: '#5f8bff', d: '1.4s' },
    { x: 305, y: 108, r: 30, c: '#d8b4ff', d: '2.1s' },
    { x: 525, y: 305, r: 34, c: '#f2a7cf', d: '1s' },
  ]
  const dots = Array.from({ length: 48 }, (_, i) => ({
    x: 70 + ((i * 97) % 520),
    y: 55 + ((i * 53) % 320),
    r: 1 + (i % 3) * 0.6,
  }))
  return (
    <Svg label={label}>
      <defs>
        {spots.map((s, i) => (
          <radialGradient id={`sv-g${i}`} key={i}>
            <stop offset="0" stopColor={s.c} stopOpacity=".85" />
            <stop offset="1" stopColor={s.c} stopOpacity="0" />
          </radialGradient>
        ))}
        <linearGradient id="sv-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f74ff" stopOpacity=".12" />
          <stop offset="1" stopColor="#5f8bff" stopOpacity=".04" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="#0a0814" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2="420" stroke="#fff" strokeOpacity=".035" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 60} x2="640" y2={i * 60} stroke="#fff" strokeOpacity=".035" />
      ))}
      {Array.from({ length: 7 }, (_, k) => (
        <path
          key={k}
          d="M20 320 C110 250 170 300 250 245 S390 190 450 225 S590 160 625 100"
          fill="none"
          stroke="#a99bff"
          strokeOpacity={0.22 - k * 0.025}
          transform={`translate(0 ${k * 26 - 70})`}
        />
      ))}
      <path
        d="M110 130 L250 70 L405 92 L525 135 L565 245 L505 335 L360 358 L215 325 L125 255 Z"
        fill="url(#sv-fill)"
        stroke="#b9a9ff"
        strokeOpacity=".4"
        strokeDasharray="4 5"
      />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#d8cfff" opacity=".45" />
      ))}
      {spots.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill={`url(#sv-g${i})`} className="pulse" style={{ animationDelay: s.d }} />
          <circle cx={s.x} cy={s.y} r="4" fill="#fff" />
          <circle cx={s.x} cy={s.y} r="10" fill="none" stroke={s.c} strokeOpacity=".8" />
        </g>
      ))}
      <g transform="translate(24 24)">
        <rect width="196" height="108" rx="10" fill="#14101f" stroke="#fff" strokeOpacity=".12" />
        <T x={14} y={24} size={11} weight={600} fill="#f1edf9">Data layers</T>
        {[
          ['Water quality', '#5f8bff', 120],
          ['Mosquito hotspots', '#f2a7cf', 90],
          ['Symptom reports', '#8f74ff', 140],
        ].map(([name, c, w], i) => (
          <g key={name} transform={`translate(14 ${42 + i * 22})`}>
            <circle cx="4" cy="-3" r="3.5" fill={c} />
            <T x={14} y={0} size={10} fill="#a8a2bd">{name}</T>
            <rect x="110" y="-8" width="72" height="6" rx="3" fill="#fff" opacity=".07" />
            <rect x="110" y="-8" width={w * 0.5} height="6" rx="3" fill={c} opacity=".8" />
          </g>
        ))}
      </g>
      <g transform="translate(392 352)">
        <rect width="224" height="40" rx="10" fill="#14101f" stroke="#f2a7cf" strokeOpacity=".4" />
        <circle cx="18" cy="20" r="4" fill="#f2a7cf" className="pulse" />
        <T x={32} y={24} size={11} fill="#f1edf9">Alert sent to health officer</T>
      </g>
    </Svg>
  )
}

/* 02 — Job portal UI */
export function JobPortalVisual({ label }) {
  const filters = [
    ['Remote work', true],
    ['Wheelchair accessible', true],
    ['Screen-reader friendly', false],
  ]
  return (
    <Svg label={label}>
      <rect width="640" height="420" fill="#0a0814" />
      <rect x="30" y="28" width="580" height="364" rx="14" fill="#0f0c1a" stroke="#fff" strokeOpacity=".12" />
      <circle cx="52" cy="50" r="4.5" fill="#f2a7cf" opacity=".8" />
      <circle cx="68" cy="50" r="4.5" fill="#d8b4ff" opacity=".8" />
      <circle cx="84" cy="50" r="4.5" fill="#5f8bff" opacity=".8" />
      <rect x="130" y="40" width="300" height="20" rx="10" fill="#fff" opacity=".05" />
      <rect x="494" y="38" width="100" height="24" rx="12" fill="none" stroke="#d8b4ff" strokeOpacity=".6" />
      <T x={544} y={54} size={10} anchor="middle" fill="#d8b4ff">High contrast</T>
      <line x1="30" y1="76" x2="610" y2="76" stroke="#fff" strokeOpacity=".08" />

      <g transform="translate(50 96)">
        <T x={0} y={10} size={12} weight={600} fill="#f1edf9">Filters</T>
        {filters.map(([name, on], i) => (
          <g key={name} transform={`translate(0 ${34 + i * 38})`}>
            <rect width="16" height="16" rx="4" fill={on ? '#8f74ff' : 'none'} stroke={on ? '#8f74ff' : '#fff'} strokeOpacity={on ? 1 : 0.3} />
            {on && <path d="M4 8.5 L7 11.5 L12.5 5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />}
            <T x={26} y={12} size={10.5} fill="#cfc8e6">{name}</T>
          </g>
        ))}
        <rect y="160" width="150" height="30" rx="8" fill="#fff" opacity=".05" />
        <rect y="204" width="110" height="8" rx="4" fill="#fff" opacity=".08" />
        <rect y="222" width="130" height="8" rx="4" fill="#fff" opacity=".05" />
      </g>

      <g transform="translate(236 94)">
        <rect width="356" height="32" rx="16" fill="#fff" opacity=".05" />
        <circle cx="18" cy="16" r="5" fill="none" stroke="#a8a2bd" />
        <rect x="32" y="12" width="110" height="8" rx="4" fill="#fff" opacity=".12" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${48 + i * 78})`}>
            <rect width="356" height="66" rx="10" fill="#17122a" stroke={i === 1 ? '#8f74ff' : '#fff'} strokeOpacity={i === 1 ? 0.9 : 0.08} strokeDasharray={i === 1 ? '4 3' : undefined} />
            <rect x="14" y="14" width="38" height="38" rx="9" fill={['#8f74ff', '#5f8bff', '#f2a7cf'][i]} opacity=".35" />
            <rect x="64" y="17" width={150 - i * 18} height="9" rx="4.5" fill="#fff" opacity=".6" />
            <rect x="64" y="35" width="104" height="7" rx="3.5" fill="#fff" opacity=".18" />
            <rect x="228" y="14" width="52" height="18" rx="9" fill="#5f8bff" opacity=".22" />
            <T x={254} y={26.5} size={9} anchor="middle" fill="#bcd0ff">Remote</T>
            <rect x="228" y="38" width="112" height="18" rx="9" fill="#f2a7cf" opacity=".2" />
            <T x={284} y={50.5} size={9} anchor="middle" fill="#f8c9e0">Wheelchair accessible</T>
          </g>
        ))}
      </g>
    </Svg>
  )
}

/* 03 — Flight routes + prediction */
export function FlightVisual({ label, motion }) {
  const routes = [
    'M90 290 Q165 110 250 140',
    'M250 140 Q380 50 565 105',
    'M90 290 Q250 385 425 245',
    'M425 245 Q520 150 565 105',
  ]
  const airports = [[90, 290], [250, 140], [425, 245], [565, 105]]
  const bars = [30, 44, 26, 52, 38, 62, 46, 70, 40, 58, 34, 48]
  return (
    <Svg label={label}>
      <defs>
        <linearGradient id="fl-route" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5f8bff" />
          <stop offset="1" stopColor="#d8b4ff" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="#0a0814" />
      {[60, 110, 160, 210, 260].map((r) => (
        <ellipse key={r} cx="320" cy="250" rx={r * 2.1} ry={r} fill="none" stroke="#fff" strokeOpacity=".04" />
      ))}
      {routes.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="url(#fl-route)" strokeOpacity=".25" strokeWidth="1.5" />
          <path d={d} fill="none" stroke="url(#fl-route)" strokeWidth="1.5" strokeDasharray="3 9" className={motion ? 'dash-flow' : ''} style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
      {airports.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" fill="#8f74ff" opacity=".12" />
          <circle cx={x} cy={y} r="4.5" fill="#fff" />
        </g>
      ))}
      <g>
        <path d="M0 -11 L4 -3 L15 2 L15 5 L4 3.5 L3 10 L7 12 L7 14.5 L0 12.5 L-7 14.5 L-7 12 L-3 10 L-4 3.5 L-15 5 L-15 2 L-4 -3 Z" transform="rotate(90)" fill="#f1edf9" />
        {motion ? (
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={routes[1]} />
        ) : (
          <animateTransform attributeName="transform" type="translate" values="320 85" dur="1s" fill="freeze" />
        )}
      </g>
      <g transform="translate(36 306)">
        <rect width="300" height="94" rx="12" fill="#14101f" stroke="#fff" strokeOpacity=".12" />
        <T x={16} y={24} size={11} weight={600} fill="#f1edf9">Delay prediction</T>
        {bars.map((h, i) => (
          <rect key={i} x={16 + i * 17} y={84 - h * 0.85} width="10" height={h * 0.85} rx="3" fill={i === 7 ? '#f2a7cf' : '#8f74ff'} opacity={i === 7 ? 0.95 : 0.5} />
        ))}
      </g>
      <g transform="translate(372 306)">
        <rect width="232" height="94" rx="12" fill="#14101f" stroke="#fff" strokeOpacity=".12" />
        <path d="M44 74 A 52 52 0 0 1 148 74" fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="9" strokeLinecap="round" />
        <path d="M44 74 A 52 52 0 0 1 126 33" fill="none" stroke="url(#fl-route)" strokeWidth="9" strokeLinecap="round" />
        <T x={96} y={70} size={11} anchor="middle" weight={600} fill="#f1edf9">Risk</T>
        <T x={196} y={32} size={10} anchor="middle" fill="#a8a2bd">Features</T>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="168" y={42 + i * 14} width={56 - i * 14} height="6" rx="3" fill="#5f8bff" opacity={0.7 - i * 0.18} />
        ))}
      </g>
    </Svg>
  )
}

/* 04 — Analytics dashboard */
export function HousingVisual({ label }) {
  return (
    <Svg label={label}>
      <defs>
        <linearGradient id="hs-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f74ff" stopOpacity=".5" />
          <stop offset="1" stopColor="#8f74ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="#0a0814" />
      <rect x="30" y="28" width="580" height="364" rx="14" fill="#0f0c1a" stroke="#fff" strokeOpacity=".12" />
      <rect x="30" y="28" width="56" height="364" rx="14" fill="#fff" opacity=".03" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="46" y={52 + i * 36} width="24" height="24" rx="7" fill={i === 0 ? '#8f74ff' : '#fff'} opacity={i === 0 ? 0.8 : 0.08} />
      ))}
      <T x={108} y={58} size={13} weight={600} fill="#f1edf9">Housing market dashboard</T>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${108 + i * 168} 74)`}>
          <rect width="156" height="58" rx="10" fill="#17122a" stroke="#fff" strokeOpacity=".08" />
          <rect x="14" y="14" width="56" height="7" rx="3.5" fill="#fff" opacity=".2" />
          <rect x="14" y="30" width={[88, 70, 104][i]} height="14" rx="5" fill={['#8f74ff', '#5f8bff', '#f2a7cf'][i]} opacity=".7" />
        </g>
      ))}
      <g transform="translate(108 148)">
        <rect width="300" height="220" rx="10" fill="#17122a" stroke="#fff" strokeOpacity=".08" />
        <T x={16} y={24} size={10.5} fill="#a8a2bd">Market trend</T>
        <path d="M16 180 C60 160 80 130 120 140 S180 90 220 100 S270 50 286 60 L286 200 L16 200 Z" fill="url(#hs-area)" />
        <path d="M16 180 C60 160 80 130 120 140 S180 90 220 100 S270 50 286 60" fill="none" stroke="#b9a9ff" strokeWidth="2.2" strokeLinecap="round" />
        {[16, 120, 220, 286].map((x, i) => (
          <circle key={x} cx={x} cy={[180, 140, 100, 60][i]} r="3.5" fill="#fff" />
        ))}
      </g>
      <g transform="translate(424 148)">
        <rect width="168" height="100" rx="10" fill="#17122a" stroke="#fff" strokeOpacity=".08" />
        <T x={14} y={22} size={10.5} fill="#a8a2bd">By area</T>
        {[44, 70, 36, 58, 82].map((h, i) => (
          <rect key={i} x={16 + i * 29} y={88 - h * 0.7} width="18" height={h * 0.7} rx="4" fill="#5f8bff" opacity={0.4 + i * 0.1} />
        ))}
      </g>
      <g transform="translate(424 260)">
        <rect width="168" height="108" rx="10" fill="#17122a" stroke="#fff" strokeOpacity=".08" />
        <T x={14} y={22} size={10.5} fill="#a8a2bd">Distribution</T>
        <g transform="rotate(-90 84 66)">
          <circle cx="84" cy="66" r="28" fill="none" stroke="#8f74ff" strokeWidth="12" strokeDasharray="90 176" />
          <circle cx="84" cy="66" r="28" fill="none" stroke="#5f8bff" strokeWidth="12" strokeDasharray="50 176" strokeDashoffset="-92" />
          <circle cx="84" cy="66" r="28" fill="none" stroke="#f2a7cf" strokeWidth="12" strokeDasharray="30 176" strokeDashoffset="-144" />
        </g>
      </g>
    </Svg>
  )
}

/* 05 — Multi-agent network */
export function CampusVisual({ label, motion }) {
  const cx = 320
  const cy = 205
  const names = ['Attendance', 'Fees', 'Exams', 'Library', 'Timetable', 'Placements', 'Support', 'Faculty']
  const nodes = names.map((name, i) => {
    const a = (Math.PI * 2 * i) / names.length - Math.PI / 2 + Math.PI / 8
    return { name, x: cx + Math.cos(a) * 210, y: cy + Math.sin(a) * 138 }
  })
  return (
    <Svg label={label}>
      <defs>
        <radialGradient id="cn-core">
          <stop offset="0" stopColor="#8f74ff" stopOpacity=".55" />
          <stop offset="1" stopColor="#8f74ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="420" fill="#0a0814" />
      <circle cx={cx} cy={cy} r="130" fill="url(#cn-core)" />
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length]
        return (
          <line key={`r${i}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#fff" strokeOpacity=".07" strokeDasharray="2 5" />
        )
      })}
      {nodes.map((n, i) => (
        <g key={n.name}>
          <line x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="#b9a9ff" strokeOpacity=".35" />
          {motion && (
            <circle r="3" fill="#fff">
              <animateMotion dur={`${3.2 + (i % 4) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={`M${cx} ${cy} L${n.x} ${n.y}`} />
            </circle>
          )}
          <circle cx={n.x} cy={n.y} r="22" fill="#17122a" stroke={['#8f74ff', '#5f8bff', '#f2a7cf', '#d8b4ff'][i % 4]} strokeOpacity=".8" />
          <circle cx={n.x} cy={n.y} r="5" fill={['#8f74ff', '#5f8bff', '#f2a7cf', '#d8b4ff'][i % 4]} />
          <T x={n.x} y={n.y + 38} size={10.5} anchor="middle" fill="#cfc8e6">{n.name}</T>
        </g>
      ))}
      <circle cx={cx} cy={cy} r="46" fill="#14101f" stroke="#b9a9ff" strokeOpacity=".7" />
      <T x={cx} y={cy - 2} size={12} weight={600} anchor="middle" fill="#f1edf9">Agent</T>
      <T x={cx} y={cy + 13} size={12} weight={600} anchor="middle" fill="#f1edf9">orchestrator</T>
      <T x={cx} y={cy + 30} size={9} anchor="middle" fill="#a8a2bd">GenAI + RAG</T>
    </Svg>
  )
}

export const VISUALS = {
  surveillance: SurveillanceVisual,
  'job-portal': JobPortalVisual,
  'flight-delay': FlightVisual,
  housing: HousingVisual,
  campusnexus: CampusVisual,
}
