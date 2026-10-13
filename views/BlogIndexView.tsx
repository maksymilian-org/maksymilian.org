import { useTranslations } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { sortedPosts } from "@/content/blog";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { Page } from "./Page";

export function BlogIndexView({ locale }: { locale: Locale }) {
  return (
    <Page locale={locale} pathname="/blog">
      <BlogIndex />
    </Page>
  );
}

function BlogIndex() {
  const t = useTranslations("blog");
  return (
    <Section>
      <SectionHeading as="h1" title={t("heading")} lead={t("lead")} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
