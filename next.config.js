const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Canonical host: send www.* to the apex (SEO — avoids duplicate content).
  async redirects() {
    return [
      // Root separately from deeper paths: an empty ":path*" is not
      // interpolated for "/", which would emit a literal "/:path*".
      {
        source: "/",
        has: [{ type: "host", value: "www.maksymilian.org" }],
        destination: "https://maksymilian.org/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.maksymilian.org" }],
        destination: "https://maksymilian.org/:path+",
        permanent: true,
      },
      // marta.* is a friendly shortcut to a shared Google Photos album.
      {
        source: "/:path*",
        has: [{ type: "host", value: "marta.maksymilian.org" }],
        destination: "https://photos.app.goo.gl/NzCeth3JGRvpDrZQ7",
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

// Enable Cloudflare bindings during `next dev` when running under OpenNext.
if (process.env.NODE_ENV === "development") {
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}
