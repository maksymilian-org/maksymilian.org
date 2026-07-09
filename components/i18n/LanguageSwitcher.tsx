"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      // Keep the current path and dynamic params, only swap the locale.
      router.replace(
        // @ts-expect-error -- pathname/params are compatible at runtime
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div
      className="inline-flex h-9 items-center rounded-lg border border-border p-1 text-xs font-medium"
      role="group"
      aria-label={t("language")}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => change(l)}
          disabled={isPending}
          aria-current={l === locale ? "true" : undefined}
          className={
            "flex h-full items-center rounded-md px-2 uppercase transition-colors " +
            (l === locale
              ? "bg-brand text-white"
              : "text-muted hover:text-fg")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
