import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";

// Build a localized path: default locale (en) has no prefix, others do.
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? clean || "/" : `/${locale}${clean}`;
}

interface PageMetaOptions {
  locale: Locale;
  page: "home" | "services" | "projects" | "blog" | "lublin" | "about" | "contact";
  path: string;
}

// Generic builder: canonical + hreflang alternates + OpenGraph/Twitter for any
// title/description/path pair.
export function buildMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = `${site.url}${localizedPath(locale, path)}`;
  const languages: Record<string, string> = {
    en: `${site.url}${localizedPath("en", path)}`,
    pl: `${site.url}${localizedPath("pl", path)}`,
    "x-default": `${site.url}${localizedPath("en", path)}`,
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: site.brand,
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function buildPageMetadata({
  locale,
  page,
  path,
}: PageMetaOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  const canonical = `${site.url}${localizedPath(locale, path)}`;
  const languages: Record<string, string> = {
    en: `${site.url}${localizedPath("en", path)}`,
    pl: `${site.url}${localizedPath("pl", path)}`,
    "x-default": `${site.url}${localizedPath("en", path)}`,
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: site.brand,
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
