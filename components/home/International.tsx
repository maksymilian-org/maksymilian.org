import { ArrowRight, Clock, Code2, FileCheck, UserCheck } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

const ICONS = [Clock, FileCheck, Code2, UserCheck];

// Reassurance block for visitors from abroad: the practical questions a foreign
// buyer asks before writing (time zone, invoice/VAT, code ownership, who they deal with).
export function International() {
  const t = useTranslations("international");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section className="bg-surface">
      <SectionHeading center title={t("heading")} lead={t("lead")} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <div key={item.title} className="rounded-2xl border border-border bg-bg p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <ButtonLink href="/hire-developer-poland" variant="secondary">
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}
