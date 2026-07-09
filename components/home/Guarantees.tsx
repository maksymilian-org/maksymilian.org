import {
  BadgeCheck,
  FileText,
  Handshake,
  MessageCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";

// One icon per guarantee, in the same order as the message array.
const icons = [FileText, Handshake, ShieldCheck, BadgeCheck, Zap, MessageCircle];

export function Guarantees() {
  const t = useTranslations("guarantees");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section className="bg-surface">
      <SectionHeading center title={t("heading")} lead={t("lead")} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-border bg-bg p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
