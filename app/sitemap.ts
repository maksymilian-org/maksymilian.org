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
  "/lublin",
  "/about",
  "/contact",
];

// Real per-content dates where we have them (blog posts) — better freshness
// signal than a single build timestamp for everything.
const blogDates = new Map(
  posts.map((p) => [`/blog/${p.slug}`, p.updated ?? p.date])
);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => {
      const postDate = blogDates.get(path);
      return {
        url: `${site.url}${localizedPath(locale, path)}`,
        lastModified: postDate ? new Date(postDate) : now,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${site.url}${localizedPath("en", path)}`,
            pl: `${site.url}${localizedPath("pl", path)}`,
          },
        },
      };
    })
  );
}
