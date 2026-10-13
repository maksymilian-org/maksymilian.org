import { site } from "@/content/site";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";

// Build a localized path: the default locale (en) has no prefix, others do.
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

/** Absolute URL; the English home page is the bare origin (no trailing slash). */
export function absoluteUrl(locale: Locale, path: string): string {
  const p = localizedPath(locale, path);
  return p === "/" ? site.url : `${site.url}${p}`;
}

// Static 1200x630 share images live in public/og (one per locale).
export function ogImage(locale: Locale) {
  return { url: `${site.url}/og/${locale}.png`, width: 1200, height: 630, alt: site.name };
}

export interface SeoInput {
  locale: Locale;
  /** Page title without the brand suffix, unless `fullTitle` is set. */
  title: string;
  description: string;
  /** Path without the locale prefix, e.g. "/blog/some-post". */
  path: string;
  /** The title already contains the brand (used by the home page). */
  fullTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}

export interface Seo {
  title: string;
  ogTitle: string;
  description: string;
  canonical: string;
  alternates: { hreflang: string; href: string }[];
  ogType: string;
  ogLocale: string;
  image: ReturnType<typeof ogImage>;
  publishedTime?: string;
  noindex: boolean;
}

export function buildSeo(i: SeoInput): Seo {
  return {
    title: i.fullTitle ? i.title : `${i.title} · ${site.brand}`,
    ogTitle: i.title,
    description: i.description,
    canonical: absoluteUrl(i.locale, i.path),
    alternates: [
      ...locales.map((l) => ({ hreflang: l, href: absoluteUrl(l, i.path) })),
      { hreflang: "x-default", href: absoluteUrl(defaultLocale, i.path) },
    ],
    ogType: i.type ?? "website",
    ogLocale: i.locale === "pl" ? "pl_PL" : "en_US",
    image: ogImage(i.locale),
    publishedTime: i.publishedTime,
    noindex: !!i.noindex,
  };
}
