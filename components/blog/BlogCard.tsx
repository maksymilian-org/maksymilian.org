import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import type { BlogPost } from "@/content/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("blog");
  const c = useTranslations("common");
  const tags = post.tags[locale] ?? post.tags.pl;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
    >
      <div className="mb-5 h-14 w-14 rounded-xl bg-brand/5 p-3 transition-colors group-hover:bg-brand/10">
        <ServiceIllustration name={post.illustration} />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(
            locale === "pl" ? "pl-PL" : "en-GB",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </time>
        <span aria-hidden>·</span>
        <span>
          {post.readingMinutes} {t("minRead")}
        </span>
      </div>
      <h2 className="mt-2 text-lg font-semibold">{post.title[locale]}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {post.excerpt[locale]}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        {c("readMore")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
