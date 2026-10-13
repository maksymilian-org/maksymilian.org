import { I18nProvider } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { QuoteWizard } from "./QuoteWizard";

export default function QuoteWizardIsland({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale} messages={{}} pathname="/quote">
      <QuoteWizard />
    </I18nProvider>
  );
}
