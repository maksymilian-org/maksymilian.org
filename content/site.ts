export const site = {
  name: "Maksymilian Furtak",
  brand: "maksymilian.org",
  url: "https://maksymilian.org",
  email: "furtak@maksymilian.org",
  phone: "+48785120693",
  phoneDisplay: "+48 785 120 693",
  nip: "7133092677",
  vatId: "PL7133092677",
  whatsapp: "https://wa.me/48785120693",
  reviewsUrl: "https://maps.app.goo.gl/Bje5WzEkJRge8LBV9",
  googleProfile: "https://maps.app.goo.gl/Bje5WzEkJRge8LBV9",
  location: {
    city: "Lublin",
    country: "Poland",
    countryPl: "Polska",
    region: "Lubelskie",
    geo: { lat: 51.2465, lng: 22.5684 },
    mapUrl: "https://www.google.com/maps?q=Lublin,Poland",
  },
  social: {
    github: "https://github.com/maksymilian-org",
    linkedin: "https://linkedin.com/in/maksymilian-furtak",
    messenger: "https://m.me/maksymilian.org",
  },
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;
