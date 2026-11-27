import type { ReactNode } from "react";
import cn from "classnames";

// Device frames drawn in CSS (sharp at any size, no image files): a browser
// window, a phone and a desktop-app window. Each takes either a screenshot
// (`src`) or any drawn content (`children`).

interface ScreenProps {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}

export function BrowserFrame({
  src,
  alt = "",
  url,
  scrollSrc,
  children,
  className,
}: ScreenProps & { url?: string; scrollSrc?: string }) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_60px_-28px_rgb(var(--brand)/0.45)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-bg/70 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        {url && (
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-surface px-3 py-0.5 text-[11px] text-muted">
            {url}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-bg">
        {scrollSrc ? (
          // The whole page scrolls past slowly on hover (static for reduced motion).
          <div
            role="img"
            aria-label={alt}
            className="screen-scroll absolute inset-0"
            style={{ backgroundImage: `url(${scrollSrc})` }}
          />
        ) : src ? (
          <img
            src={src}
            alt={alt}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          children
        )}
      </div>
    </figure>
  );
}

// `compact` is for small phones (under ~120 px wide) next to a browser window:
// the same radius would turn them into pills, so corners and bezel shrink.
export function PhoneFrame({ src, alt = "", children, className, compact }: ScreenProps & { compact?: boolean }) {
  return (
    <figure
      className={cn(
        "bg-[#15121d] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)] ring-1 ring-white/10",
        compact ? "rounded-[0.85rem] p-[3px]" : "rounded-[2.1rem] p-[7px]",
        className
      )}
    >
      <div className={cn("relative aspect-[390/844] overflow-hidden bg-bg", compact ? "rounded-[0.65rem]" : "rounded-[1.7rem]")}>
        <span
          aria-hidden
          className="absolute left-1/2 top-[6px] z-10 h-[7%] max-h-[15px] w-[30%] -translate-x-1/2 rounded-full bg-[#15121d]"
        />
        {src ? (
          <img
            src={src}
            alt={alt}
            width={780}
            height={1688}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          children
        )}
      </div>
    </figure>
  );
}

export function DesktopFrame({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_60px_-28px_rgb(var(--brand)/0.45)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-bg/70 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate text-[11px] font-medium text-muted">{title}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-bg">{children}</div>
    </figure>
  );
}
