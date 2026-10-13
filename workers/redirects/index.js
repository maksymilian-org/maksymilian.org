// Host-level redirects that a static site cannot express in _redirects:
//   www.maksymilian.org  -> https://maksymilian.org (same path, 308, SEO canonical host)
//   marta.maksymilian.org -> shared Google Photos album (307)
const ALBUM = "https://photos.app.goo.gl/NzCeth3JGRvpDrZQ7";

export default {
  fetch(request) {
    const url = new URL(request.url);
    if (url.hostname === "marta.maksymilian.org") return Response.redirect(ALBUM, 307);
    if (url.hostname === "www.maksymilian.org") {
      return Response.redirect(`https://maksymilian.org${url.pathname}${url.search}`, 308);
    }
    return new Response("Not found", { status: 404 });
  },
};
