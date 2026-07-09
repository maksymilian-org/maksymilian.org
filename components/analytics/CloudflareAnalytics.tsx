import Script from "next/script";

// Cloudflare Web Analytics: privacy-first, cookieless page analytics (no
// consent banner required). The beacon token is public and comes from the
// Cloudflare dashboard (Web Analytics -> the site -> JS snippet token).
export function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token) return null;

  return (
    <Script
      id="cf-web-analytics"
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
