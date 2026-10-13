import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

// A tiny replacement for next-intl. Every statically rendered React tree and
// every hydrated island gets its own <I18nProvider>; hooks read from it.

type Messages = Record<string, unknown>;

interface Ctx {
  locale: Locale;
  messages: Messages;
  /** Current path without the locale prefix, e.g. "/blog/some-post". */
  pathname: string;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  locale,
  messages,
  pathname = "/",
  children,
}: {
  locale: Locale;
  messages: Messages;
  pathname?: string;
  children?: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, messages, pathname }}>
      {children}
    </I18nContext.Provider>
  );
}

function useCtx(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("Missing <I18nProvider>");
  return ctx;
}

export function useLocale(): Locale {
  return useCtx().locale;
}

export function usePathname(): string {
  return useCtx().pathname;
}

export interface Translator {
  (key: string): string;
  /** The raw value (array, object...) behind a key. */
  raw: (key: string) => unknown;
}

function walk(messages: Messages, path: string): unknown {
  let node: unknown = messages;
  for (const part of path.split(".")) {
    if (node && typeof node === "object" && part in (node as Messages)) {
      node = (node as Messages)[part];
    } else {
      return undefined;
    }
  }
  return node;
}

/** Plain function version, used by .astro files and server code. */
export function createTranslator(messages: Messages, namespace?: string): Translator {
  const full = (key: string) => (namespace ? `${namespace}.${key}` : key);
  const t = ((key: string) => {
    const value = walk(messages, full(key));
    if (typeof value === "string") return value;
    if (import.meta.env?.DEV) console.warn(`[i18n] missing message: ${full(key)}`);
    return full(key);
  }) as Translator;
  t.raw = (key: string) => walk(messages, full(key));
  return t;
}

export function useTranslations(namespace?: string): Translator {
  return createTranslator(useCtx().messages, namespace);
}
