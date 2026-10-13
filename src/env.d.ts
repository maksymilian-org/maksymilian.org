/// <reference path="../.astro/types.d.ts" />

// Bindings and secrets of the Worker (set with `wrangler secret put`).
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}
