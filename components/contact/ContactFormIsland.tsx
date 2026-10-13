import { I18nProvider } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { ContactForm } from "./ContactForm";

// Hydrated island: gets only the message namespaces it needs, as props.
export default function ContactFormIsland({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Record<string, unknown>;
}) {
  return (
    <I18nProvider locale={locale} messages={messages} pathname="/contact">
      <ContactForm />
    </I18nProvider>
  );
}
