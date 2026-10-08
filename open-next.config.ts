import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is prerendered at build time and never revalidates. Serving those
// pages from the static-assets cache (instead of re-rendering them on every
// request) keeps CPU time per request far below the Workers Free 10 ms limit.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
