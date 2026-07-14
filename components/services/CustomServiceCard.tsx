import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";

// Catch-all tile shown after the concrete services: for any project that
// doesn't fit the other cards. Links straight to contact instead of a detail
// page, and is visually set apart with a dashed, tinted style.
export function CustomServiceCard() {
  const t = useTranslations("services.custom");
  const c = useTranslations("common");

  return (
    <Link
      href="/contact"
      className="group flex flex-col rounded-2xl border border-dashed border-brand/40 bg-brand/5 p-6 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg"
    >
      <div className="mb-5 h-16 w-16 rounded-xl bg-brand/10 p-3 transition-colors group-hover:bg-brand/15">
        <ServiceIllustration name="custom" />
      </div>
      <h3 className="text-lg font-semibold">{t("title")}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {t("description")}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        {c("letsTalk")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
