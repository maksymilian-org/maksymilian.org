import { locales, type Locale } from "@/i18n/routing";

// Every page exists once per locale: English at the root (lang is undefined),
// Polish under /pl. Used by getStaticPaths in src/pages/[...lang]/**.
export function langParam(locale: Locale): string | undefined {
  return locale === "en" ? undefined : locale;
}

export function localePaths(): { params: { lang: string | undefined }; props: { locale: Locale } }[] {
  return locales.map((locale) => ({ params: { lang: langParam(locale) }, props: { locale } }));
}

export function localePathsWith<T extends Record<string, string>, P extends object>(
  items: (locale: Locale) => { params: T; props?: P }[]
) {
  return locales.flatMap((locale) =>
    items(locale).map((i) => ({
      params: { lang: langParam(locale), ...i.params },
      props: { locale, ...(i.props ?? ({} as P)) },
    }))
  );
}
