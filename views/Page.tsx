import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import type { Locale } from "@/i18n/routing";

// Every statically rendered view is its own React root and needs a provider.
export function Page({
  locale,
  pathname,
  children,
}: {
  locale: Locale;
  pathname: string;
  children: ReactNode;
}) {
  return (
    <I18nProvider locale={locale} messages={getMessages(locale)} pathname={pathname}>
      {children}
    </I18nProvider>
  );
}
