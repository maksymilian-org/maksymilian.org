import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, site } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Social } from "@/components/social/Social";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-8 w-8 text-fg" />
              <span>{site.brand}</span>
            </Link>
            <p className="mt-3 text-sm text-muted">{t("footer.tagline")}</p>
            <Social className="mt-5" />
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="text-sm text-muted">
            <a
              href={`mailto:${site.email}`}
              className="block transition-colors hover:text-fg"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone}`}
              className="mt-2 block transition-colors hover:text-fg"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-2">
              {site.location.city}, {site.location.country}
            </p>
            <p className="mt-2">
              {t("contact.nipLabel")}: {site.nip}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {year} {site.name}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
