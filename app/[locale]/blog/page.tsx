import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/utils/seo";
import { site } from "@/content/site";
import { sortedPosts } from "@/content/blog";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "blog", path: "/blog" });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.brand} — Blog`,
    url: `${site.url}${locale === "en" ? "" : "/pl"}/blog`,
    blogPost: sortedPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title[locale],
      description: p.excerpt[locale],
      datePublished: p.date,
      url: `${site.url}${locale === "en" ? "" : "/pl"}/blog/${p.slug}`,
      author: { "@type": "Person", name: site.name },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <BlogIndex />
    </>
  );
}

function BlogIndex() {
  const t = useTranslations("blog");
  return (
    <Section>
      <SectionHeading title={t("heading")} lead={t("lead")} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
