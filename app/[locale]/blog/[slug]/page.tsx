import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/utils/seo";
import { site } from "@/content/site";
import { getPostBySlug, posts, sortedPosts, type BlogPost } from "@/content/blog";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { PostBody } from "@/components/blog/PostBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { JsonLd } from "@/components/seo/JsonLd";

interface Params {
  locale: Locale;
  slug: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const base = buildMetadata({
    locale,
    title: post.title[locale],
    description: post.excerpt[locale],
    path: `/blog/${slug}`,
  });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  setRequestLocale(locale);
  const n = await getTranslations("nav");

  const url = `${site.url}${locale === "en" ? "" : "/pl"}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    inLanguage: locale,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    keywords: (post.tags[locale] ?? post.tags.pl).join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.brand, item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: n("blog"),
        item: `${site.url}${locale === "en" ? "" : "/pl"}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title[locale] },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Article post={post} />
    </>
  );
}

function Article({ post }: { post: BlogPost }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("blog");
  const c = useTranslations("common");
  const n = useTranslations("nav");
  const tags = post.tags[locale] ?? post.tags.pl;
  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Section>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-muted"
      >
        <Link href="/" className="hover:text-fg">
          {n("home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-fg">
          {n("blog")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-fg">{post.title[locale]}</span>
      </nav>

      {/* Header */}
      <article className="mt-8">
        <div className="mb-6 h-16 w-16 rounded-2xl bg-brand/5 p-3.5">
          <ServiceIllustration name={post.illustration} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>{t("publishedOn")}</span>
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
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title[locale]}
        </h1>
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

        <PostBody blocks={post.body[locale]} />
      </article>

      {/* CTA */}
      <div className="mt-14 overflow-hidden rounded-3xl bg-brand px-6 py-12 text-center text-white sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("ctaHeading")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">{t("ctaLead")}</p>
        <div className="mt-7">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {c("getQuote")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Related */}
      <div className="mt-16 border-t border-border pt-10">
        <h2 className="text-2xl font-bold tracking-tight">
          {t("relatedHeading")}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
          >
            {t("backToBlog")}
          </Link>
        </div>
      </div>
    </Section>
  );
}
