import type { ScreenMock } from "@/content/projects";

// Stylised screens for projects that cannot be shown as screenshots (client
// apps behind logins, desktop lab software). Drawn in SVG with the theme
// tokens, so they match the site's illustration style in light and dark mode.

const brand = "rgb(var(--brand))";
const line = "rgb(var(--border))";
const fg = "rgb(var(--fg))";
const muted = "rgb(var(--muted))";
const surface = "rgb(var(--surface))";

function Tracking() {
  // Phone-shaped: a map with a trip, a vehicle pin, a geofence and a trip card.
  return (
    <svg viewBox="0 0 390 844" className="h-full w-full" role="img" aria-label="Vehicle map with a trip and a geofence">
      <rect width="390" height="844" fill={surface} />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={`h${i}`} x1="0" x2="390" y1={60 + i * 48} y2={40 + i * 52} stroke={line} strokeWidth="1.5" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} y1="0" y2="700" x1={20 + i * 48} x2={50 + i * 44} stroke={line} strokeWidth="1.5" />
      ))}
      <circle cx="250" cy="250" r="92" fill={brand} fillOpacity="0.08" stroke={brand} strokeDasharray="8 7" strokeWidth="2" />
      <path d="M60 560 C 110 520, 120 430, 170 410 S 240 360, 250 250" fill="none" stroke={brand} strokeWidth="6" strokeLinecap="round" />
      <circle cx="60" cy="560" r="9" fill={surface} stroke={brand} strokeWidth="4" />
      <circle cx="250" cy="250" r="22" fill={brand} />
      <path d="M241 252 l9 -12 l9 12 z" fill="#fff" />
      <rect x="0" y="0" width="390" height="92" fill={surface} fillOpacity="0.92" />
      <text x="24" y="70" fontSize="26" fontWeight="700" fill={fg} fontFamily="inherit">My fleet</text>
      <rect x="16" y="610" width="358" height="210" rx="26" fill={surface} stroke={line} strokeWidth="2" />
      <rect x="171" y="624" width="48" height="5" rx="3" fill={line} />
      <text x="40" y="668" fontSize="20" fontWeight="700" fill={fg} fontFamily="inherit">Van WX 4281</text>
      <text x="40" y="694" fontSize="15" fill={muted} fontFamily="inherit">Moving · 54 km/h</text>
      {[
        ["128 km", "today"],
        ["3 h 12 min", "drive time"],
        ["6", "stops"],
      ].map(([v, l], i) => (
        <g key={l} transform={`translate(${40 + i * 112} 740)`}>
          <text fontSize="19" fontWeight="700" fill={brand} fontFamily="inherit">{v}</text>
          <text y="24" fontSize="13" fill={muted} fontFamily="inherit">{l}</text>
        </g>
      ))}
    </svg>
  );
}

function Sensor() {
  // Desktop: a 16 x 8 channel heatmap, a live signal and register readouts.
  const cells = Array.from({ length: 128 }, (_, i) => {
    const x = i % 16;
    const y = Math.floor(i / 16);
    const v = 0.15 + 0.8 * Math.abs(Math.sin(x * 0.55 + y * 0.9) * Math.cos(y * 0.4 - x * 0.2));
    return { x, y, v };
  });
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Sensor channels heatmap and live signal">
      <rect width="800" height="500" fill={surface} />
      <rect x="0" y="0" width="150" height="500" fill={brand} fillOpacity="0.05" />
      {["Channels", "Registers", "Firmware", "Export"].map((t, i) => (
        <g key={t}>
          <rect x="16" y={28 + i * 44} width="118" height="30" rx="8" fill={i === 0 ? brand : "none"} fillOpacity="0.14" />
          <text x="30" y={48 + i * 44} fontSize="14" fill={i === 0 ? brand : muted} fontWeight={i === 0 ? 700 : 400} fontFamily="inherit">{t}</text>
        </g>
      ))}
      <text x="180" y="44" fontSize="18" fontWeight="700" fill={fg} fontFamily="inherit">128 channels · live</text>
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={180 + c.x * 37} y={64 + c.y * 22} width="33" height="18" rx="3" fill={brand} fillOpacity={c.v} />
      ))}
      <rect x="180" y="256" width="588" height="210" rx="12" fill="none" stroke={line} strokeWidth="2" />
      <polyline
        fill="none"
        stroke={brand}
        strokeWidth="3"
        points={Array.from({ length: 60 }, (_, i) => `${190 + i * 9.6},${360 - Math.sin(i * 0.35) * 55 - Math.sin(i * 1.3) * 14}`).join(" ")}
      />
      <line x1="190" x2="760" y1="360" y2="360" stroke={line} strokeDasharray="4 6" />
    </svg>
  );
}

function Audio() {
  // Desktop: feedforward / feedback toggles, a noise spectrum and the ANC curve.
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Noise cancelling tuning screen">
      <rect width="800" height="500" fill={surface} />
      <text x="32" y="50" fontSize="18" fontWeight="700" fill={fg} fontFamily="inherit">ANC tuning · hybrid</text>
      {["Feedforward", "Feedback", "Leakage comp."].map((t, i) => (
        <g key={t} transform={`translate(${32 + i * 190} 76)`}>
          <rect width="174" height="40" rx="10" fill={brand} fillOpacity={i === 2 ? 0.16 : 0.07} stroke={brand} strokeOpacity="0.4" />
          <rect x="128" y="11" width="32" height="18" rx="9" fill={brand} />
          <circle cx="151" cy="20" r="6" fill="#fff" />
          <text x="14" y="25" fontSize="13" fill={fg} fontFamily="inherit">{t}</text>
        </g>
      ))}
      <rect x="32" y="140" width="736" height="320" rx="14" fill="none" stroke={line} strokeWidth="2" />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1="32" x2="768" y1={190 + i * 56} y2={190 + i * 56} stroke={line} strokeDasharray="3 7" />
      ))}
      <path
        d={`M40 ${300} ${Array.from({ length: 72 }, (_, i) => `L${40 + i * 10} ${300 - Math.sin(i * 0.5) * 30 - Math.sin(i * 1.7) * 18}`).join(" ")}`}
        fill="none"
        stroke={muted}
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <path d="M40 260 C 160 250, 220 420, 360 420 S 600 270, 760 250" fill="none" stroke={brand} strokeWidth="5" strokeLinecap="round" />
      <text x="560" y="440" fontSize="14" fill={brand} fontWeight="700" fontFamily="inherit">−32 dB at 200 Hz</text>
    </svg>
  );
}

function Booking() {
  // Web: a room calendar and suggested flatmates with match scores.
  const busy = new Set([3, 4, 9, 10, 11, 17, 22, 23, 24, 30]);
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Room booking calendar and flatmate matches">
      <rect width="800" height="500" fill={surface} />
      <text x="32" y="50" fontSize="18" fontWeight="700" fill={fg} fontFamily="inherit">Room 204 · availability</text>
      {Array.from({ length: 35 }, (_, i) => (
        <g key={i}>
          <rect x={32 + (i % 7) * 66} y={74 + Math.floor(i / 7) * 66} width="58" height="58" rx="10" fill={busy.has(i) ? brand : "none"} fillOpacity={busy.has(i) ? 0.85 : 1} stroke={line} strokeWidth="1.5" />
          <text x={42 + (i % 7) * 66} y={96 + Math.floor(i / 7) * 66} fontSize="13" fill={busy.has(i) ? "#fff" : muted} fontFamily="inherit">{i + 1 <= 30 ? i + 1 : ""}</text>
        </g>
      ))}
      <text x="540" y="50" fontSize="16" fontWeight="700" fill={fg} fontFamily="inherit">Best matches</text>
      {[96, 91, 87, 82].map((m, i) => (
        <g key={m} transform={`translate(540 ${74 + i * 92})`}>
          <rect width="228" height="78" rx="14" fill="none" stroke={line} strokeWidth="1.5" />
          <circle cx="40" cy="39" r="22" fill={brand} fillOpacity={0.25 + i * 0.12} />
          <rect x="74" y="26" width="90" height="9" rx="4" fill={fg} fillOpacity="0.7" />
          <rect x="74" y="44" width="60" height="8" rx="4" fill={muted} fillOpacity="0.5" />
          <text x="176" y="45" fontSize="16" fontWeight="700" fill={brand} fontFamily="inherit">{m}%</text>
        </g>
      ))}
    </svg>
  );
}

function Process() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Live process model">
      <rect width="800" height="500" fill={surface} />
      {[
        [120, 250],
        [300, 140],
        [300, 360],
        [500, 250],
        [680, 250],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="34" fill={brand} fillOpacity={i === 3 ? 0.9 : 0.15} stroke={brand} strokeWidth="2" />
        </g>
      ))}
      <path d="M154 250 L266 150 M154 250 L266 350 M334 140 L466 240 M334 360 L466 260 M534 250 L646 250" stroke={brand} strokeWidth="3" />
    </svg>
  );
}

export function ScreenMockView({ name }: { name: ScreenMock }) {
  switch (name) {
    case "tracking":
      return <Tracking />;
    case "sensor":
      return <Sensor />;
    case "audio":
      return <Audio />;
    case "booking":
      return <Booking />;
    case "process":
      return <Process />;
  }
}
