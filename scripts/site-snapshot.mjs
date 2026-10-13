#!/usr/bin/env node
// Crawls every URL of a sitemap and records what matters for SEO, so two
// versions of the site can be compared (see scripts/site-compare.mjs).
//
// Usage: node scripts/site-snapshot.mjs <origin> <out.json>
//   e.g. node scripts/site-snapshot.mjs https://maksymilian.org baseline.json

import { writeFileSync } from "node:fs";

const [origin, out] = process.argv.slice(2);
if (!origin || !out) {
  console.error("Usage: node scripts/site-snapshot.mjs <origin> <out.json>");
  process.exit(1);
}

const get = async (url) => {
  const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "site-snapshot/1.0" } });
  return { status: res.status, location: res.headers.get("location"), type: res.headers.get("content-type") ?? "", text: await res.text() };
};

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const first = (html, re) => (html.match(re)?.[1] ?? "").trim();

function analyse(url, res) {
  const html = res.text;
  const jsonld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => {
    try { return JSON.parse(m[1]); } catch { return null; }
  }).filter(Boolean);
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  const links = [...html.matchAll(/<a [^>]*href="([^"#]+)"/g)].map((m) => m[1]).filter((h) => h.startsWith("/") && !h.startsWith("//"));
  return {
    url,
    status: res.status,
    title: decode(first(html, /<title>([\s\S]*?)<\/title>/)),
    description: decode(first(html, /<meta name="description" content="([^"]*)"/)),
    canonical: first(html, /<link rel="canonical" href="([^"]*)"/),
    robots: first(html, /<meta name="robots" content="([^"]*)"/),
    hreflang: [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => `${m[1]}=${m[2]}`).sort(),
    ogImage: first(html, /<meta property="og:image" content="([^"]*)"/),
    ogTitle: decode(first(html, /<meta property="og:title" content="([^"]*)"/)),
    htmlLang: first(html, /<html[^>]*lang="([^"]*)"/),
    h1: decode(first(html, /<h1[^>]*>([\s\S]*?)<\/h1>/).replace(/<[^>]+>/g, "")),
    h2count: (html.match(/<h2[ >]/g) ?? []).length,
    jsonldTypes: jsonld.flatMap((j) => (Array.isArray(j["@graph"]) ? j["@graph"] : [j]).map((n) => n["@type"])).sort(),
    words: text.split(/\s+/).filter(Boolean).length,
    internalLinks: [...new Set(links.map((l) => l.split("?")[0]))].sort(),
  };
}

const sitemap = await get(`${origin}/sitemap.xml`);
const urls = [...new Set([...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];
console.log(`sitemap: ${urls.length} URLs`);

const pages = [];
for (const url of urls) {
  const path = url.replace(/^https?:\/\/[^/]+/, "") || "/";
  const res = await get(`${origin}${path}`);
  pages.push(analyse(path, res));
}

// Redirects and special files that must keep working after the migration.
const probes = ["/en", "/en/blog", "/opengraph-image", "/pl/opengraph-image", "/pl/twitter-image", "/favicon.ico", "/robots.txt", "/manifest.json", "/og/pl.png", "/og/en.png", "/pl/contact?package=store", "/does-not-exist"];
const specials = [];
for (const p of probes) {
  const r = await get(`${origin}${p}`);
  specials.push({ path: p, status: r.status, location: r.location, type: r.type.split(";")[0] });
}

writeFileSync(out, JSON.stringify({ origin, takenAt: new Date().toISOString(), pages, specials }, null, 2));
console.log(`saved ${pages.length} pages and ${specials.length} probes to ${out}`);
