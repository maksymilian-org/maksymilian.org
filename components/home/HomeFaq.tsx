import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";

// General, site-wide FAQ (cost, timeline, invoicing, IP, remote work). Renders
// the accessible details/summary list and emits a FAQPage schema for rich
// results.
export function HomeFaq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section>
      <JsonLd data={faqSchema} />
      <SectionHeading center title={t("heading")} lead={t("lead")} />
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
        {items.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {f.q}
              <ChevronRight className="h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-sm text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
