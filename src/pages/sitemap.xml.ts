import type { APIRoute } from "astro";
import { absoluteUrl } from "@/lib/seo";
import { locales } from "@/i18n/routing";
import { services } from "@/content/services";
import { posts } from "@/content/blog";
import { industries } from "@/content/industries";
import { tools } from "@/content/tools";

const paths = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/projects",
  "/blog",
  ...posts.map((p) => `/blog/${p.slug}`),
  "/lublin",
  "/quote",
  "/solutions",
  ...industries.map((i) => `/solutions/${i.slug}`),
  "/tools",
  ...tools.map((t) => `/tools/${t.slug}`),
  "/about",
  "/contact",
];

// Real per-content dates where we have them (blog posts); everything else gets
// the build date.
const blogDates = new Map(posts.map((p) => [`/blog/${p.slug}`, p.updated ?? p.date]));

export const GET: APIRoute = () => {
  const now = new Date().toISOString();
  const urls = paths.flatMap((path) =>
    locales.map((locale) => {
      const last = blogDates.get(path);
      const alt = locales
        .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(l, path)}"/>`)
        .join("");
      return `<url><loc>${absoluteUrl(locale, path)}</loc>${alt}<lastmod>${last ? new Date(last).toISOString() : now}</lastmod><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`;
    })
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml" } });
};

