import { I18nProvider } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/contact/WhatsAppFab";

// Static site chrome. Each is its own React root, so each needs its provider.
interface Props {
  locale: Locale;
  /** Current path without the locale prefix. */
  pathname: string;
}

export function SiteHeader({ locale, pathname }: Props) {
  return (
    <I18nProvider locale={locale} messages={getMessages(locale)} pathname={pathname}>
      <Header />
    </I18nProvider>
  );
}

export function SiteFooter({ locale, pathname }: Props) {
  return (
    <I18nProvider locale={locale} messages={getMessages(locale)} pathname={pathname}>
      <Footer />
    </I18nProvider>
  );
}

export function SiteFab({ locale, pathname }: Props) {
  return (
    <I18nProvider locale={locale} messages={getMessages(locale)} pathname={pathname}>
      <WhatsAppFab />
    </I18nProvider>
  );
}
