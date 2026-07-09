# maksymilian.org

Personal site & service landing of Maksymilian Furtak — fullstack developer.

Built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS** and
**next-intl** (EN default, PL under `/pl`). Content lives in the repo
(`content/` + `messages/`) — no external CMS. Light/dark theme included.

## Development

```bash
yarn install
yarn dev      # http://localhost:3000
yarn build
yarn start
```

Optional env (`.env.local`): `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

## Structure

- `app/[locale]/` — localized pages (home, services, projects, about, contact)
- `components/` — UI, layout, theme, i18n, illustrations
- `content/` — site config, services and projects data
- `messages/` — `en.json` / `pl.json` translations
- `i18n/`, `middleware.ts` — routing & localization
- `app/sitemap.ts`, `app/robots.ts`, `app/[locale]/opengraph-image.tsx` — SEO

Deployed on Netlify (`netlify.toml`, `@netlify/plugin-nextjs`).
