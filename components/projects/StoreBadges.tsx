import { useLocale } from "@/lib/i18n";
import type { StoreLinks } from "@/content/projects";

// Official-style App Store and Google Play badges (black, as on respondgrid.com),
// drawn in SVG so they stay sharp and need no image files.

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

function AppStoreBadge({ href, top }: { href: string; top: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${top} App Store`} className="inline-block transition-transform hover:-translate-y-0.5">
      <svg viewBox="0 0 156 44" width="141" height="40" role="img" aria-hidden="true" focusable="false">
        <rect x="0.5" y="0.5" width="155" height="43" rx="7.5" fill="#000" stroke="#a6a6a6" />
        <g transform="translate(10 7) scale(1.1)">
          <path
            fill="#fff"
            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
          />
        </g>
        <text x="42" y="16" fill="#fff" fontFamily={FONT} fontSize="9">{top}</text>
        <text x="42" y="34" fill="#fff" fontFamily={FONT} fontSize="21" fontWeight="600">App Store</text>
      </svg>
    </a>
  );
}

function GooglePlayBadge({ href, top }: { href: string; top: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${top} Google Play`} className="inline-block transition-transform hover:-translate-y-0.5">
      <svg viewBox="0 0 156 44" width="141" height="40" role="img" aria-hidden="true" focusable="false">
        <rect x="0.5" y="0.5" width="155" height="43" rx="7.5" fill="#000" stroke="#a6a6a6" />
        <g transform="translate(11 9)">
          <path d="M0 0 L0 22 L11 11 Z" fill="#00A0FF" />
          <path d="M0 0 L11 11 L15.5 6.6 Z" fill="#00E676" />
          <path d="M0 22 L11 11 L15.5 15.4 Z" fill="#FF3D50" />
          <path d="M15.5 6.6 L22 11 L15.5 15.4 L11 11 Z" fill="#FFD400" />
        </g>
        <text x="42" y="16" fill="#fff" fontFamily={FONT} fontSize="9" letterSpacing="0.6">{top}</text>
        <text x="42" y="34" fill="#fff" fontFamily={FONT} fontSize="20" fontWeight="600">Google Play</text>
      </svg>
    </a>
  );
}

export function StoreBadges({ stores }: { stores: StoreLinks[] }) {
  const locale = useLocale();
  const apple = locale === "pl" ? "Pobierz z" : "Download on the";
  const google = locale === "pl" ? "DOSTĘPNE W" : "GET IT ON";
  return (
    <div className="flex flex-col gap-3">
      {stores.map((s) => (
        <div key={(s.label ?? "") + (s.appStore ?? s.googlePlay)} className="flex flex-wrap items-center gap-2">
          {s.label && <span className="w-full text-xs font-semibold uppercase tracking-widest text-muted">{s.label}</span>}
          {s.appStore && <AppStoreBadge href={s.appStore} top={apple} />}
          {s.googlePlay && <GooglePlayBadge href={s.googlePlay} top={google} />}
        </div>
      ))}
    </div>
  );
}
