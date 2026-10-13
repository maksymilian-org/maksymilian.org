import type { APIRoute } from "astro";
import { site } from "@/content/site";

export const GET: APIRoute = () =>
  new Response(`User-Agent: *\nAllow: /\nHost: ${site.url}\n\nSitemap: ${site.url}/sitemap.xml\n`, {
    headers: { "content-type": "text/plain" },
  });
