import pl from "@/messages/pl.json";
import en from "@/messages/en.json";
import type { Locale } from "@/i18n/routing";

const all = { pl, en } as const;

export type MessageTree = typeof pl;

export function getMessages(locale: Locale): Record<string, unknown> {
  return all[locale] as unknown as Record<string, unknown>;
}

/** Only the given top-level namespaces, so hydrated islands stay small. */
export function pickMessages(locale: Locale, namespaces: string[]): Record<string, unknown> {
  const full = getMessages(locale);
  return Object.fromEntries(namespaces.filter((n) => n in full).map((n) => [n, full[n]]));
}
