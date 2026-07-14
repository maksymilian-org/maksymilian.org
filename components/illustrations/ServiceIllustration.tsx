import type { ReactNode } from "react";
import type { IllustrationKey } from "@/content/services";

// Shared monoline style: single stroke width, rounded joins, a soft duotone
// accent drawn with the same colour at low opacity. Everything inherits the
// current text colour so it recolours automatically in light/dark themes.
function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full text-brand"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const soft = { fill: "currentColor", stroke: "none", opacity: 0.1 } as const;

const drawings: Record<IllustrationKey, ReactNode> = {
  websites: (
    <>
      <rect {...soft} x="14" y="20" width="68" height="56" rx="8" />
      <rect x="14" y="20" width="68" height="56" rx="8" />
      <path d="M14 34h68" />
      <circle cx="24" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="31" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <path d="M24 46h20v22H24zM52 46h20M52 56h20M52 66h14" />
    </>
  ),
  ecommerce: (
    <>
      <path {...soft} d="M26 34h44l-4 40H30z" />
      <path d="M26 34h44l-4 40H30z" />
      <path d="M38 34a10 10 0 0 1 20 0" />
      <path d="M40 50v6M56 50v6" />
    </>
  ),
  webapps: (
    <>
      <rect {...soft} x="12" y="18" width="72" height="52" rx="8" />
      <rect x="12" y="18" width="72" height="52" rx="8" />
      <path d="M12 32h72M24 46h16v16H24z" />
      <path d="M50 46h22M50 54h22M50 62h14" />
      <circle cx="66" cy="78" r="6" />
      <path d="M66 74v-2M66 84v-2M60 78h-2M74 78h-2" />
    </>
  ),
  mobile: (
    <>
      <rect {...soft} x="30" y="12" width="36" height="72" rx="9" />
      <rect x="30" y="12" width="36" height="72" rx="9" />
      <path d="M43 18h10" />
      <rect x="38" y="30" width="9" height="9" rx="2" />
      <rect x="49" y="30" width="9" height="9" rx="2" />
      <rect x="38" y="41" width="9" height="9" rx="2" />
      <rect x="49" y="41" width="9" height="9" rx="2" />
      <path d="M42 74h12" />
    </>
  ),
  integrations: (
    <>
      <circle {...soft} cx="24" cy="48" r="12" />
      <circle cx="24" cy="48" r="10" />
      <circle cx="72" cy="26" r="10" />
      <circle cx="72" cy="70" r="10" />
      <path d="M33 43l30-13M33 53l30 13" />
    </>
  ),
  ksef: (
    <>
      {/* invoice document */}
      <rect {...soft} x="24" y="14" width="48" height="68" rx="6" />
      <rect x="24" y="14" width="48" height="68" rx="6" />
      <path d="M34 30h28M34 40h28M34 50h20" />
      {/* validated e-invoice check badge */}
      <circle {...soft} cx="64" cy="64" r="14" />
      <circle cx="64" cy="64" r="12" />
      <path d="M58 64l4 4 8-8" />
    </>
  ),
  ai: (
    <>
      <rect {...soft} x="30" y="30" width="36" height="36" rx="8" />
      <rect x="30" y="30" width="36" height="36" rx="8" />
      <path d="M40 30v-8M56 30v-8M40 66v8M56 66v8M30 40h-8M30 56h-8M66 40h8M66 56h8" />
      <path d="M48 42l3 5 5 3-5 3-3 5-3-5-5-3 5-3z" fill="currentColor" stroke="none" opacity="0.55" />
    </>
  ),
  embedded: (
    <>
      {/* microcontroller chip (DIP style) */}
      <rect {...soft} x="28" y="46" width="40" height="26" rx="5" />
      <rect x="28" y="46" width="40" height="26" rx="5" />
      <rect x="40" y="54" width="16" height="10" rx="2" />
      {/* legs */}
      <path d="M28 54h-6M28 64h-6M68 54h6M68 64h6" />
      {/* wireless / IoT waves */}
      <circle cx="48" cy="40" r="1.8" fill="currentColor" stroke="none" />
      <path d="M41 37a10 10 0 0 1 14 0" />
      <path d="M36 32a17 17 0 0 1 24 0" />
    </>
  ),
  modernization: (
    <>
      <circle {...soft} cx="48" cy="48" r="26" />
      <path d="M70 38a26 26 0 1 0 3 18" />
      <path d="M72 26v14H58" />
      <path d="M44 40l8 8-8 8" />
    </>
  ),
  audit: (
    <>
      {/* rising performance bars */}
      <rect {...soft} x="16" y="52" width="10" height="24" rx="2" />
      <rect x="16" y="52" width="10" height="24" rx="2" />
      <rect x="32" y="40" width="10" height="36" rx="2" />
      <rect x="48" y="28" width="10" height="48" rx="2" />
      {/* magnifier auditing the results */}
      <circle {...soft} cx="62" cy="34" r="16" />
      <circle cx="62" cy="34" r="14" />
      <path d="M73 45l9 9" />
    </>
  ),
  maintenance: (
    <>
      <circle {...soft} cx="48" cy="48" r="28" />
      <path d="M58 30a12 12 0 0 0-16 15L26 61a5 5 0 0 0 7 7l16-16a12 12 0 0 0 15-16l-8 8-6-6z" />
    </>
  ),
  custom: (
    <>
      {/* lightbulb — your idea / anything else */}
      <path {...soft} d="M48 20a20 20 0 0 0-12 36c2.5 1.9 4 4.4 4 7.5h16c0-3.1 1.5-5.6 4-7.5a20 20 0 0 0-12-36z" />
      <path d="M48 20a20 20 0 0 0-12 36c2.5 1.9 4 4.4 4 7.5h16c0-3.1 1.5-5.6 4-7.5a20 20 0 0 0-12-36z" />
      <path d="M42 71h12M44 77h8" />
      <path d="M48 39v10M43 44h10" />
    </>
  ),
};

export function ServiceIllustration({ name }: { name: IllustrationKey }) {
  return <Frame>{drawings[name]}</Frame>;
}
