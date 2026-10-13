import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLocale, usePathname as useCtxPathname } from "@/lib/i18n";
import { defaultLocale, type Locale } from "./routing";

export { useCtxPathname as usePathname };

type Query = Record<string, string | number | undefined>;
export type Href = string | { pathname: string; query?: Query };

/** "/blog/x" + "pl" -> "/pl/blog/x"; the default locale has no prefix. */
export function localizedHref(locale: Locale, href: Href): string {
  const pathname = typeof href === "string" ? href : href.pathname;
  const query = typeof href === "string" ? undefined : href.query;
  const [path, existing] = pathname.split("?");
  const clean = path === "/" ? "" : path;
  const base = locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
  const params = new URLSearchParams(existing ?? "");
  for (const [k, v] of Object.entries(query ?? {})) if (v !== undefined) params.set(k, String(v));
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export function Link({
  href,
  children,
  ...rest
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Href;
  children?: ReactNode;
}) {
  const locale = useLocale();
  return (
    <a href={localizedHref(locale, href)} {...rest}>
      {children}
    </a>
  );
}
