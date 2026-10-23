# Gmail signature

Source of the e-mail signature used with furtak@maksymilian.org.

- `build.mjs`: the template, texts and colours (contact data comes from `content/site.ts`)
- `signature.en.html`, `signature.pl.html`: generated, plain table markup with inline styles
- `preview.html`: generated preview with a "Copy signature" button (open it in a browser)

Change it:

1. Edit `build.mjs` (the `TEXT` and `STYLE` constants at the top).
2. Run `npm run signature:build`.
3. Open `email-signature/preview.html`, click "Copy signature", then paste it in
   Gmail: Settings > See all settings > General > Signature.

Notes: Gmail cannot embed local images, so the logo is loaded from
`https://maksymilian.org/favicon/apple-icon-180x180.png` (it must stay public).
Links carry `utm_source=email&utm_medium=signature`, so visits from the signature
show up in GA4 as a separate source.
