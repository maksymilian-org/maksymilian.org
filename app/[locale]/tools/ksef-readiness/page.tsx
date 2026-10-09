import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/utils/seo";
import { getToolBySlug } from "@/content/tools";
import { ToolShell } from "@/components/tools/ToolShell";
import { KsefReadiness } from "@/components/tools/KsefReadiness";

const SLUG = "ksef-readiness";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tool = getToolBySlug(SLUG);
  if (!tool) return {};
  return buildMetadata({
    locale,
    title: tool.metaTitle[locale],
    description: tool.metaDescription[locale],
    path: `/tools/${SLUG}`,
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tool = getToolBySlug(SLUG);
  if (!tool) notFound();
  setRequestLocale(locale);
  return (
    <ToolShell tool={tool} locale={locale}>
      <KsefReadiness />
    </ToolShell>
  );
}
