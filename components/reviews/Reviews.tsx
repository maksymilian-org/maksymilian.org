import { ArrowRight, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";
import { reviews, reviewsSummary } from "@/content/reviews";
import type { Locale } from "@/i18n/routing";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            "h-4 w-4 " +
            (i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-border")
          }
        />
      ))}
    </div>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.3 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.6z" />
      <path fill="#FBBC05" d="M10.4 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C1 16.3 0 20 0 24s1 7.7 2.6 10.8l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.4 0-11.7-3.8-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export function Reviews() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  if (reviews.length === 0) return null;

  return (
    <Section className="bg-surface">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading title={t("reviewsHeading")} lead={t("reviewsLead")} />
        <a
          href={site.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
        >
          <GoogleG className="h-4 w-4" />
          {t("reviewsAllCta")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {reviewsSummary.count > 0 && (
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-bg px-4 py-2">
          <GoogleG className="h-5 w-5" />
          <span className="font-semibold">{reviewsSummary.rating.toFixed(1)}</span>
          <Stars rating={reviewsSummary.rating} />
          <span className="text-sm text-muted">
            {t("reviewsSource")}
          </span>
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 6).map((r, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-2xl border border-border bg-bg p-6"
          >
            <div className="flex items-center justify-between">
              <Stars rating={r.rating} />
              <GoogleG className="h-4 w-4 opacity-70" />
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed">
              “{r.text[locale] ?? r.text.pl}”
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold">
              {r.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
