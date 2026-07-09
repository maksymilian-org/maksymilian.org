import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Defaults are fine for this mostly-static site. Incremental cache / queue /
  // tag cache can be wired to KV or D1 later if we start using ISR heavily.
});
