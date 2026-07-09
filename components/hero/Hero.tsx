import { ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("home");
  const c = useTranslations("common");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(var(--brand)/0.14),transparent_70%)]"
      />
      <div className="container-page py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <p className="mb-4 inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-brand">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            {t("lead")}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">
              {c("getQuote")}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              {c("seeServices")}
            </ButtonLink>
          </div>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-sm font-medium text-brand">
              <Zap className="h-4 w-4" />
              {t("fastBadge")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
