import type { Metadata } from "next";
import { Mail, MapPin, Phone, ReceiptText } from "lucide-react";
import WhatsAppIcon from "@/components/social/icons/WhatsApp";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/utils/seo";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Social } from "@/components/social/Social";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "contact", path: "/contact" });
}

// Package keys that may arrive via ?package= from the pricing tiles.
const PACKAGE_KEYS = [
  "landing",
  "business",
  "store",
  "mobile",
  "automation",
  "custom",
] as const;

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Resolve the pricing package the visitor came from (if any) into its
  // localized display name, so the form can show it and include it in the email.
  const sp = await searchParams;
  const pkgKey = typeof sp.package === "string" ? sp.package : undefined;
  let packageLabel: string | undefined;
  if (pkgKey && (PACKAGE_KEYS as readonly string[]).includes(pkgKey)) {
    const tp = await getTranslations({ locale, namespace: "pricing" });
    packageLabel =
      pkgKey === "custom" ? tp("custom.title") : tp(`tiers.${pkgKey}.name`);
  }

  return <ContactContent packageLabel={packageLabel} />;
}

function ContactContent({ packageLabel }: { packageLabel?: string }) {
  const t = useTranslations("contact");

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted">{t("lead")}</p>

          <ul className="mt-8 space-y-4">
            <ContactRow icon={<Phone className="h-5 w-5" />} label={t("phoneLabel")}>
              <a href={`tel:${site.phone}`} className="hover:text-brand">
                {site.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="h-5 w-5" />} label={t("emailLabel")}>
              <a href={`mailto:${site.email}`} className="hover:text-brand">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow
              icon={
                <span className="[&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current">
                  <WhatsAppIcon />
                </span>
              }
              label="WhatsApp"
            >
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                {t("whatsapp")}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin className="h-5 w-5" />} label="">
              {site.location.city}, {site.location.country}
            </ContactRow>
            <ContactRow
              icon={<ReceiptText className="h-5 w-5" />}
              label={t("nipLabel")}
            >
              {site.nip}
            </ContactRow>
          </ul>

          <Social className="mt-8" />
          <p className="mt-8 text-sm text-muted">{t("responseNote")}</p>
        </div>

        <ContactForm packageLabel={packageLabel} />
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </span>
      <span>
        {label && (
          <span className="block text-xs uppercase tracking-widest text-muted">
            {label}
          </span>
        )}
        <span className="font-medium">{children}</span>
      </span>
    </li>
  );
}
