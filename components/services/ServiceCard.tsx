import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import type { ServiceDef } from "@/content/services";

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: ServiceDef;
  detailed?: boolean;
}) {
  const t = useTranslations("services");
  const bullets = t.raw(`items.${service.id}.bullets`) as string[];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
    >
      <div className="mb-5 h-16 w-16 rounded-xl bg-brand/5 p-3 transition-colors group-hover:bg-brand/10">
        <ServiceIllustration name={service.illustration} />
      </div>
      <h3 className="text-lg font-semibold">{t(`items.${service.id}.title`)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {t(`items.${service.id}.description`)}
      </p>
      {detailed && (
        <ul className="mt-5 space-y-2 border-t border-border pt-5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        {t("detailsLink")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
