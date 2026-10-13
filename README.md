# maksymilian.org

Personal site & service landing of Maksymilian Furtak — fullstack developer.

Static site built with **Astro** (React islands), **TypeScript** and **Tailwind CSS**.
English is the default (`/`), Polish lives under `/pl`. Content is in the repo
(`content/` + `messages/`) — no external CMS. Light/dark theme included.

Hosted on **Cloudflare Workers** with static assets: every page is prerendered,
and the Worker only runs for `/api/contact` and `/api/quote` (Resend + Turnstile).

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site + API Worker into dist/
npm run preview   # serve dist/ locally on workerd
npm run deploy    # build + wrangler deploy (production!)
```

Env (`.env.local`, build time): `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_GA_MEASUREMENT_ID`,
`PUBLIC_CF_BEACON_TOKEN`. Worker secrets (`wrangler secret put`): `RESEND_API_KEY`,
`TURNSTILE_SECRET_KEY`, `CONTACT_TO`, `CONTACT_FROM`.

## Structure

- `src/pages/[...lang]/` — every page exists once per locale (EN unprefixed, PL `/pl`)
- `src/pages/api/` — the only server code (contact and quote forms)
- `src/layouts/BaseLayout.astro` — head/SEO, analytics, static header/footer
- `src/scripts/ui.ts` — theme, mobile menu, currency, click tracking (vanilla JS)
- `views/` — static React views rendered by Astro; `components/` — UI, hydrated islands
- `content/` — site config, services, blog, industries, tools, quote pricing
- `messages/` — `en.json` / `pl.json`; `lib/i18n.tsx` is a small next-intl-like shim
- `workers/redirects/` — separate Worker for `www` → apex and `marta` → Google Photos
  (`npx wrangler deploy --config workers/redirects/wrangler.jsonc` from the root)
- `public/_redirects` — path redirects; `src/pages/sitemap.xml.ts`, `robots.txt.ts`

## SEO safety net

`npm run site:snapshot -- <origin> out.json` crawls the sitemap and records titles,
canonicals, hreflang, JSON-LD, links and redirect probes;
`npm run site:compare -- old.json new.json` lists differences between two snapshots.

## Preview and rollback

Preview without traffic: `wrangler versions upload`, then
`wrangler versions deploy <prod>@100 <new>@0` and request with the header
`Cloudflare-Workers-Version-Overrides: maksymilian-org="<new version id>"`.
Do not use `wrangler deploy --domain/--name` for previews (it can move the apex domain).
The last Next.js version is tagged `next-final`.
