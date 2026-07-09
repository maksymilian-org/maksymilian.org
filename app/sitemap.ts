import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { localizedPath } from "@/utils/seo";
import { locales } from "@/i18n/routing";
import { services } from "@/content/services";
import { posts } from "@/content/blog";

const paths = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/projects",
  "/blog",
  ...posts.map((p) => `/blog/${p.slug}`),
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}${localizedPath(locale, path)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${site.url}${localizedPath("en", path)}`,
          pl: `${site.url}${localizedPath("pl", path)}`,
        },
      },
    }))
  );
}
