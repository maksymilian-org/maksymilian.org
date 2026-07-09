import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0d1117",
          color: "#e6edf3",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#9b87ff",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {t("eyebrow")}
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {t("title")}
        </div>
        <div style={{ marginTop: "auto", fontSize: 34, color: "#9498aa" }}>
          {site.brand}
        </div>
      </div>
    ),
    { ...size }
  );
}
