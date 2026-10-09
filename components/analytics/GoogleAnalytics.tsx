"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/utils/analytics";

// Contact links are the real conversions on a site with few forms: a visitor
// who taps the phone number or WhatsApp never touches the contact form.
function classify(href: string): { event: string; channel: string } | null {
  if (href.startsWith("tel:")) return { event: "click_phone", channel: "phone" };
  if (href.startsWith("mailto:")) return { event: "click_email", channel: "email" };
  if (href.includes("wa.me/")) return { event: "click_whatsapp", channel: "whatsapp" };
  if (href.includes("m.me/")) return { event: "click_messenger", channel: "messenger" };
  return null;
}

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const hit = classify(href);
      if (hit) {
        trackEvent(hit.event, { channel: hit.channel, page: window.location.pathname });
      } else if (/(^|\/)quote(\?|$)/.test(href.replace(/^https?:\/\/[^/]+/, ""))) {
        trackEvent("cta_quote", { page: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [id]);

  if (!id) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
