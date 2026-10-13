import { Moon, Sun } from "lucide-react";
import { useTranslations } from "@/lib/i18n";

// Static markup; src/scripts/ui.ts toggles data-theme and remembers the choice.
export function ThemeToggle() {
  const t = useTranslations("common");
  return (
    <button
      type="button"
      data-theme-toggle
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:border-brand hover:text-brand"
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
