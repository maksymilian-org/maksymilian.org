export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Default locale (en) has no prefix, others (pl) are prefixed: /pl/...
export const routing = { locales, defaultLocale } as const;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
