import type { Locale } from "@/i18n/routing";
import { getToolBySlug } from "@/content/tools";
import { ToolShell } from "@/components/tools/ToolShell";
import { KsefReadiness } from "@/components/tools/KsefReadiness";
import { AutomationRoi } from "@/components/tools/AutomationRoi";
import { Page } from "./Page";

// The whole tool page is one hydrated island: the frame is server-rendered into
// the static HTML and the calculator on top of it becomes interactive.
export default function ToolView({ locale, slug }: { locale: Locale; slug: string }) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;
  return (
    <Page locale={locale} pathname={`/tools/${slug}`}>
      <ToolShell tool={tool} locale={locale}>
        {slug === "ksef-readiness" ? <KsefReadiness /> : <AutomationRoi />}
      </ToolShell>
    </Page>
  );
}
