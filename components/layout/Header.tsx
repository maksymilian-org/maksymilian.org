"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import cn from "classnames";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, site } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-8 w-8 text-fg" />
          <span>{site.brand}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-brand"
                  : "text-muted hover:text-fg"
              )}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <CurrencySwitcher />
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink href="/contact" className="px-4 py-2">
            {t("common.getQuote")}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("common.toggleMenu")}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <nav className="container-page flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-2 py-3 text-base font-medium",
                  isActive(item.href) ? "text-brand" : "text-fg"
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-2">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <ButtonLink
                href="/contact"
                className="px-4 py-2"
                onClick={() => setOpen(false)}
              >
                {t("common.getQuote")}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
