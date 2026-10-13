// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// Pages are prerendered to plain files and served by Cloudflare's static-assets
// layer without invoking the Worker. Only /api/* runs code (the Worker), so a
// page view never pays a cold start. URLs are unchanged from the Next.js site:
// English at /, Polish under /pl, no trailing slashes.
export default defineConfig({
  site: "https://maksymilian.org",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [react()],
  adapter: cloudflare({ imageService: "compile" }),
  session: false,
  devToolbar: { enabled: false },
  vite: {
    // The code base uses "@/..." imports from the project root.
    resolve: { alias: { "@": new URL(".", import.meta.url).pathname.replace(/\/$/, "") } },
  },
});
