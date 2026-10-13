import { useLocale, usePathname, useTranslations } from "@/lib/i18n";
import { locales } from "@/i18n/routing";
import { localizedHref } from "@/i18n/navigation";

// Plain links to the same page in the other language (no JavaScript needed).
export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="inline-flex h-9 items-center rounded-lg border border-border p-1 text-xs font-medium"
      role="group"
      aria-label={t("language")}
    >
      {locales.map((l) => (
        <a
          key={l}
          href={localizedHref(l, pathname)}
          hrefLang={l}
          data-lang-link={l}
          aria-current={l === locale ? "true" : undefined}
          className={
            "flex h-full items-center rounded-md px-2 uppercase transition-colors " +
            (l === locale ? "bg-brand-solid text-white" : "text-muted hover:text-fg")
          }
        >
          {l}
        </a>
      ))}
    </div>
  );
}
