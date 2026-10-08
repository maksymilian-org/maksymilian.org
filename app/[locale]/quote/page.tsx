import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/utils/seo";
import { quoteUi } from "@/content/quote";
import { Section } from "@/components/ui/Section";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

const META = {
  pl: {
    title: "Wycena online — ile kosztuje Twój projekt?",
    description:
      "Odpowiedz na kilka pytań i zobacz orientacyjne widełki ceny strony, sklepu, aplikacji lub automatyzacji. Dokładną wycenę odsyłam mailem — bez zobowiązań.",
  },
  en: {
    title: "Online quote — how much will your project cost?",
    description:
      "Answer a few questions and see an indicative price range for a website, store, app or automation. I email the exact quote — no commitment.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, ...META[locale], path: "/quote" });
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // ?service= (a pre-selected category) is read in the browser by the wizard,
  // which keeps this page static.
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
          {quoteUi.eyebrow[locale]}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {quoteUi.heading[locale]}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{quoteUi.lead[locale]}</p>
        <div className="mt-10">
          <QuoteWizard />
        </div>
      </div>
    </Section>
  );
}
