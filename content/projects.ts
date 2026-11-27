import type { Locale } from "@/i18n/routing";

export interface Localized {
  en: string;
  pl: string;
}

export interface ProjectLink {
  url: string;
  title: string;
}

// How a project is shown visually. Screenshots live in public/projects and are
// produced by scripts/capture-screenshots.mjs; `mock` draws a stylised screen
// for work that cannot be screenshotted (client apps, desktop tools).
export type ProjectKind = "mobile" | "web" | "desktop";
export type ScreenMock = "tracking" | "sensor" | "audio" | "booking" | "process";

export interface GalleryShot {
  src: string;
  caption: Localized;
}

export interface ProjectMedia {
  kind: ProjectKind;
  /** Phone screenshots of a mobile app, best first. */
  screens?: string[];
  /** Width/height of those screenshots when not 390/844 (e.g. older iPhones). */
  phoneAspect?: string;
  /** Extra desktop screenshots shown on the case study page. */
  gallery?: GalleryShot[];
  desktop?: string;
  mobile?: string;
  /** Full-length page screenshot, scrolled on hover. */
  full?: string;
  mock?: ScreenMock;
  /** Address shown in the browser frame. */
  url?: string;
}

// The case study told in three steps; projects with a story get their own page
// at /projects/<id>.
export interface ProjectStory {
  challenge: Localized;
  solution: Localized;
  outcome: Localized;
}

export interface StoreLinks {
  /** Brand name, when one project ships several apps. */
  label?: string;
  appStore?: string;
  googlePlay?: string;
}

export interface Project {
  id: string;
  /** App store listings, shown as official-style badges. */
  stores?: StoreLinks[];
  story?: ProjectStory;
  /** Related service ids (content/services.ts), cross-linked both ways. */
  services?: string[];
  /** What the project gives its users, in plain language (for non-technical readers). */
  summary?: Localized;
  media?: ProjectMedia;
  platforms?: string[];
  title: Localized;
  description: Localized;
  time?: Localized;
  highlights?: { en: string[]; pl: string[] };
  technologies?: string;
  framework?: Localized;
  team?: Localized;
  links?: ProjectLink[];
}

export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}

// Products the owner conceived, designed, built and runs alone (idea to server
// and app stores). Facts come from each project's own repository session;
// nothing is published that those notes marked as uncertain or restricted.
export const productProjects: Project[] = [
  {
    id: "respondgrid",
    story: {
      challenge: {
        pl: "W ochotniczych strażach alarmy, listy ratowników, terminy badań i przeglądy sprzętu żyją w telefonach, zeszytach i arkuszach, a dowódca w pierwszych minutach nie wie, ilu ludzi dojedzie. Jednostek jest kilkanaście tysięcy i żadna nie ma własnego działu IT.",
        en: "In volunteer fire brigades, alerts, rosters, medical deadlines and equipment checks live in phones, notebooks and spreadsheets, and in the first minutes the commander does not know how many people will make it. There are well over ten thousand units and none has its own IT department.",
      },
      solution: {
        pl: "Publiczny portal z mapą ponad 16 tys. jednostek OSP, panel jednostki oraz aplikacje na Androida i iOS. Alarm pojawia się nawet na zablokowanym i wyciszonym telefonie, odpowiedź to jedno dotknięcie, a tablica w remizie i tryb wozu pokazują na żywo, kto jedzie.",
        en: "A public portal with a map of 16,000+ volunteer brigades, a unit panel, and Android and iOS apps. The alert shows up even on a locked, silenced phone, answering is one tap, and the station board and vehicle mode show live who is coming.",
      },
      outcome: {
        pl: "Jedno miejsce zamiast kilku narzędzi: alarm, dyspozycyjność, sprzęt z terminami, ogłoszenia i statystyki wyjazdów. Aplikacje są w sklepach Google Play i App Store, a panel jednostki jest bezpłatny bez limitu czasu.",
        en: "One place instead of several tools: alerts, availability, equipment with deadlines, a bulletin board and callout statistics. The apps are on Google Play and the App Store, and the unit panel is free with no time limit.",
      },
    },
    services: ["mobile", "webapps"],
    summary: {
      pl: "Gdy przychodzi wezwanie, telefony całej jednostki straży dostają alarm, a dowódca od razu widzi, kto jedzie i za ile minut. Do tego publiczna mapa straży pożarnych.",
      en: "When a call comes in, the whole fire brigade's phones get the alert and the commander instantly sees who is coming and in how many minutes. Plus a public map of fire brigades.",
    },
    media: {
      kind: "mobile",
      screens: ["/projects/respondgrid-01-mobile.webp", "/projects/respondgrid-03-mobile.webp", "/projects/respondgrid-05-mobile.webp", "/projects/respondgrid-04-mobile.webp"],
      url: "respondgrid.com",
      gallery: [
        { src: "/projects/respondgrid-02-desktop.webp", caption: { pl: "Tablica w remizie: trwający alarm, kto jedzie i stan wozów", en: "Station board: the live alarm, who is coming and vehicle status" } },
        { src: "/projects/respondgrid-06-desktop.webp", caption: { pl: "Publiczna mapa jednostek z opisem aplikacji", en: "The public map of units with the app overview" } },
      ],
    },
    platforms: ["Web", "iOS", "Android"],
    title: {
      pl: "RespondGrid — alarmowanie i mapa straży pożarnych",
      en: "RespondGrid — alerting and a map of fire brigades",
    },
    description: {
      pl: "System alarmowania dla ochotniczych straży pożarnych z publiczną mapą jednostek, panelem jednostki i aplikacjami na Androida i iOS.",
      en: "An alerting system for volunteer fire brigades with a public map of units, a unit panel and Android and iOS apps.",
    },
    highlights: {
      pl: [
        "Pomysł, projekt produktu i architektura całości: portal, panel, aplikacje, serwer",
        "Portal i panel web, aplikacje na Androida (Kotlin) i iOS (SwiftUI), integracje z systemami dyspozytorskimi",
        "Serwer, baza danych, kopie zapasowe i publikacja w Google Play oraz App Store",
        "Import rejestrów jednostek, zgody i prywatność danych ratowników",
      ],
      en: [
        "Idea, product design and architecture of the whole system: portal, panel, apps, server",
        "Web portal and panel, Android (Kotlin) and iOS (SwiftUI) apps, integrations with dispatch systems",
        "Server, database, backups and publishing to Google Play and the App Store",
        "Unit-registry imports, consents and privacy of firefighters' data",
      ],
    },
    technologies: "Next.js, React, Node.js, PostgreSQL, MapLibre, Swift, SwiftUI, Kotlin, Jetpack Compose, FCM, APNs, Cloudflare",
    team: { pl: "1 osoba: autor i jedyny deweloper", en: "1 person: founder and sole developer" },
    stores: [
      {
        appStore: "https://apps.apple.com/app/respondgrid/id6823593557",
        googlePlay: "https://play.google.com/store/apps/details?id=com.respondgrid.app",
      },
    ],
    links: [{ url: "https://respondgrid.com", title: "respondgrid.com" }],
  },
  {
    id: "office",
    story: {
      challenge: {
        pl: "Księgowość jednoosobowej firmy przez lata żyła w arkuszu Google ze skryptami: faktury, koszty, KPiR, VAT i ZUS w 22 zakładkach. Od 2026 r. faktury idą przez KSeF, a tokeny KSeF przestają działać z końcem roku — arkusz nie miał szans nadążyć.",
        en: "For years the books of a one-person business lived in a Google Sheet with scripts: invoices, costs, the revenue ledger, VAT and social security across 22 tabs. From 2026 invoices go through KSeF, the national e-invoicing system, and KSeF tokens stop working at the end of the year — the sheet could not keep up.",
      },
      solution: {
        pl: "Aplikacja webowa projektowana od telefonu: faktury wysyłane do KSeF certyfikatem, koszty pobierane z KSeF i księgowane według edytowalnych reguł, KPiR i rejestry VAT liczone z dokumentów, JPK_V7M walidowany i wysyłany do bramki Ministerstwa Finansów, zaliczki PIT z progiem 32%, składki ZUS z plikiem do ePłatnika i kody QR do przelewów.",
        en: "A phone-first web app: invoices sent to KSeF with a certificate, purchase invoices pulled from KSeF and booked by editable rules, the revenue ledger and VAT registers computed from documents, the JPK_V7M VAT file validated and sent to the Ministry of Finance gateway, income tax advances with the 32% bracket, social security contributions with a file for ePłatnik, and QR codes for bank transfers.",
      },
      outcome: {
        pl: "Cały miesięczny cykl rozliczeń w jednym miejscu, także z telefonu: pulpit pokazuje, co i do kiedy zapłacić, a historia od 2016 r. została zaimportowana i porównana z dawnymi zestawieniami.",
        en: "The whole monthly cycle in one place, phone included: the dashboard shows what to pay and by when, and the history since 2016 was imported and compared with the old statements.",
      },
    },
    services: ["ksef", "webapps", "integrations"],
    summary: {
      pl: "Księgowość jednoosobowej firmy w telefonie: wystawiasz fakturę do KSeF, koszty same przychodzą z KSeF, a aplikacja liczy VAT, PIT i ZUS i podsuwa kod QR do przelewu.",
      en: "Bookkeeping for a one-person business on your phone: issue an invoice to KSeF, purchase invoices arrive from KSeF on their own, and the app works out VAT, income tax and social security and hands you a QR code for the transfer.",
    },
    media: {
      kind: "web",
      desktop: "/projects/office-dashboard-light-desktop.webp",
      mobile: "/projects/office-hero-dark-mobile.webp",
      screens: ["/projects/office-hero-light-mobile.webp", "/projects/office-qr-light-mobile.webp", "/projects/office-invoices-dark-mobile.webp", "/projects/office-settlements-light-mobile.webp"],
      gallery: [
        { src: "/projects/office-dashboard-dark-desktop.webp", caption: { pl: "Pulpit w ciemnym motywie: dochód roku, terminy i kwoty do zapłaty", en: "The dashboard in the dark theme: the year's income, deadlines and amounts due" } },
        { src: "/projects/office-settlements-light-desktop.webp", caption: { pl: "Rozliczenia miesięcy: VAT-7, zaliczka PIT i ZUS", en: "Monthly settlements: VAT return, income tax advance and social security" } },
        { src: "/projects/office-statistics-dark-desktop.webp", caption: { pl: "Statystyki: ile z przychodu zostaje „na rękę”", en: "Statistics: how much of the revenue is left after costs and taxes" } },
      ],
    },
    platforms: ["Web", "PWA"],
    title: {
      pl: "Office — księgowość jednoosobowej firmy z KSeF",
      en: "Office — bookkeeping for a one-person business with KSeF",
    },
    description: {
      pl: "Aplikacja do prowadzenia księgowości JDG: faktury w KSeF, koszty, KPiR, VAT i JPK_V7M, PIT i ZUS, w motywie jasnym i ciemnym, na telefonie i komputerze.",
      en: "An app that keeps the books of a Polish sole proprietorship: KSeF invoices, costs, the revenue ledger, VAT and the JPK_V7M file, income tax and social security, in light and dark themes, on phone and desktop.",
    },
    highlights: {
      pl: [
        "Pomysł, projekt interfejsu i architektura: aplikacja web, API, baza, wdrożenie",
        "KSeF: logowanie certyfikatem, wysyłka faktur FA(3), UPO, pobieranie faktur zakupowych",
        "JPK_V7M(3) z walidacją XSD, wysyłka przez bramkę MF i korekty",
        "Import historii 2016–2026 z arkuszy i porównanie wyliczeń z dawnymi zestawieniami",
      ],
      en: [
        "Idea, interface design and architecture: web app, API, database, deployment",
        "KSeF: certificate sign-in, sending FA(3) invoices, UPO receipts, fetching purchase invoices",
        "JPK_V7M(3) VAT file with XSD validation, sending through the Ministry of Finance gateway, corrections",
        "Import of the 2016–2026 history from spreadsheets, compared with the old statements",
      ],
    },
    technologies: "React, TypeScript, Vite, TanStack, Tailwind CSS, Hono, Node.js, PostgreSQL, Drizzle, Docker, Cloudflare",
    team: { pl: "1 osoba: autor i jedyny deweloper", en: "1 person: founder and sole developer" },
  },
  {
    id: "etabus",
    story: {
      challenge: {
        pl: "Małe i regionalne linie autobusowe często nie mają rozkładów w żadnej wygodnej aplikacji, a pasażer nie wie, czy autobus już jedzie. Duże aplikacje skupiają się na miastach.",
        en: "Small regional bus lines are often missing from convenient apps, and passengers cannot tell whether the bus is already on its way. The big apps focus on cities.",
      },
      solution: {
        pl: "Jedna platforma (strona oraz aplikacje na iOS i Androida) z wyszukiwarką połączeń, przystankami, trasami i mapą na żywo. Pozycję autobusu przekazuje telefon kierowcy, więc przewoźnik nie potrzebuje dodatkowego sprzętu, a rozkłady prowadzi sam w panelu.",
        en: "One platform (a website plus iOS and Android apps) with connection search, stops, routes and a live map. The bus position comes from the driver's phone, so a carrier needs no extra hardware, and carriers maintain their timetables themselves in a panel.",
      },
      outcome: {
        pl: "Platforma działa produkcyjnie pod etabus.com z rozkładami przewoźników z regionu lubelskiego, zaimportowanymi z publicznych źródeł. Aplikacje natywne są gotowe do testów i przygotowane do publikacji.",
        en: "The platform runs in production at etabus.com with timetables of carriers in the Lublin region imported from public sources. The native apps are ready for testing and prepared for publication.",
      },
    },
    services: ["mobile", "webapps"],
    summary: {
      pl: "Rozkłady jazdy autobusów razem z pozycją autobusu na żywo na mapie, a dla przewoźników bezpłatny panel do prowadzenia własnych rozkładów.",
      en: "Bus timetables together with the live position of the bus on a map, and a free panel for carriers to run their own timetables.",
    },
    media: {
      kind: "mobile",
      screens: ["/projects/etabus-01-mobile.webp", "/projects/etabus-02-mobile.webp", "/projects/etabus-03-mobile.webp"],
      url: "etabus.com",
      gallery: [
        { src: "/projects/etabus-web-desktop.webp", caption: { pl: "Strona etabus.com z wyszukiwarką połączeń", en: "The etabus.com website with connection search" } },
      ],
    },
    platforms: ["Web", "iOS", "Android"],
    title: {
      pl: "etabus — rozkłady autobusów i mapa na żywo",
      en: "etabus — bus timetables with a live map",
    },
    description: {
      pl: "Platforma rozkładów jazdy dla przewoźników regionalnych z mapą pojazdów na żywo, panelem przewoźnika i aplikacjami mobilnymi.",
      en: "A timetable platform for regional carriers with a live vehicle map, a carrier panel and mobile apps.",
    },
    highlights: {
      pl: [
        "Projekt produktu i architektura: panel przewoźnika, aplikacja pasażera i tryb kierowcy",
        "Backend i web: API, baza danych, czas rzeczywisty, importy rozkładów, strona po polsku i angielsku",
        "Natywne aplikacje iOS (SwiftUI) i Android (Kotlin, Jetpack Compose), logowanie Google i Apple",
        "Wdrożenie i bezpieczeństwo: serwer, szyfrowane kopie zapasowe, monitoring błędów, audyt",
      ],
      en: [
        "Product design and architecture: carrier panel, passenger app and driver mode",
        "Backend and web: API, database, real time, timetable importers, a bilingual site",
        "Native iOS (SwiftUI) and Android (Kotlin, Jetpack Compose) apps, Google and Apple sign-in",
        "Deployment and security: server, encrypted backups, error monitoring, security audit",
      ],
    },
    technologies: "TypeScript, NestJS, Fastify, Prisma, PostgreSQL, Redis, Socket.io, Next.js, Tailwind CSS, SwiftUI, Kotlin, Jetpack Compose, Leaflet, Docker",
    team: { pl: "1 osoba: autor i jedyny deweloper", en: "1 person: founder and sole developer" },
    links: [{ url: "https://etabus.com", title: "etabus.com" }],
  },
  {
    id: "dutyshifts",
    story: {
      challenge: {
        pl: "Parafie, grupy wolontariuszy, przychodnie i brygady zmianowe układają dyżury w arkuszach i na komunikatorach. Grafik szybko się dezaktualizuje, nie wiadomo, kogo brakuje, a każda zamiana to seria wiadomości.",
        en: "Parishes, volunteer groups, clinics and shift crews plan duties in spreadsheets and chat threads. The roster goes stale quickly, nobody knows which slots are short-staffed, and every swap takes a string of messages.",
      },
      solution: {
        pl: "Aplikacja w przeglądarce i na telefonie (PWA) z dyżurami jednorazowymi i cyklicznymi, gotowymi systemami zmianowymi (np. 24/48), zapisami, rotacją, zastępstwami, przypomnieniami push, grafikiem do druku oraz synchronizacją z kalendarzami Google, Apple i Outlook.",
        en: "A web and phone app (PWA) with one-off and recurring duties, ready-made shift systems (such as 24/48), sign-ups, rotation, substitutions, push reminders, a printable roster and sync with Google, Apple and Outlook calendars.",
      },
      outcome: {
        pl: "Aplikacja działa publicznie pod dutyshifts.com w 15 językach, w tym w arabskim i hebrajskim pisanych od prawej do lewej. Jest darmowa i bez limitu osób, a obsada liczy się sama z reguł.",
        en: "The app is live at dutyshifts.com in 15 languages, including right-to-left Arabic and Hebrew. It is free with no limit on team size, and staffing is computed from rules.",
      },
    },
    services: ["webapps"],
    summary: {
      pl: "Wspólny grafik dyżurów dla zespołu: każdy widzi, kiedy ma dyżur, a organizator nie musi już rozsyłać tabelek i przypominać ludziom.",
      en: "A shared duty roster for teams: everyone sees when they're on duty, and the organiser no longer has to send spreadsheets around and chase people.",
    },
    media: {
      kind: "web",
      desktop: "/projects/dutyshifts-03-desktop.webp",
      mobile: "/projects/dutyshifts-02-mobile.webp",
      url: "dutyshifts.com",
      screens: ["/projects/dutyshifts-02-mobile.webp", "/projects/dutyshifts-06-mobile.webp", "/projects/dutyshifts-05-mobile.webp"],
      gallery: [
        { src: "/projects/dutyshifts-01-desktop.webp", caption: { pl: "Kalendarz systemu zmianowego 24/48 z pełną obsadą", en: "A 24/48 shift calendar with every duty fully staffed" } },
        { src: "/projects/dutyshifts-04-desktop.webp", caption: { pl: "Grafik do druku z filtrami, PDF i WhatsAppem", en: "A printable roster with filters, PDF and WhatsApp" } },
        { src: "/projects/dutyshifts-03-desktop.webp", caption: { pl: "Strona startowa", en: "The landing page" } },
      ],
    },
    platforms: ["Web", "PWA"],
    title: {
      pl: "DutyShifts — grafik dyżurów dla zespołów",
      en: "DutyShifts — duty rosters for teams",
    },
    description: {
      pl: "Aplikacja do planowania dyżurów i zmian z rotacją, zastępstwami, przypomnieniami i kalendarzami.",
      en: "An app for planning duties and shifts with rotation, substitutions, reminders and calendars.",
    },
    highlights: {
      pl: [
        "Pomysł, analiza domeny i projekt produktu: model dyżurów, rotacji, zastępstw i stref czasowych",
        "Projekt UI/UX mobile-first, 15 języków z obsługą pisma od prawej do lewej, jasny i ciemny motyw",
        "Full-stack: Next.js, PostgreSQL, logowanie, powiadomienia push, kalendarze (ICS), PDF",
        "Wdrożenie i utrzymanie na własnym serwerze, testy automatyczne (unit i e2e)",
      ],
      en: [
        "Idea, domain analysis and product design: duty, rotation, substitution and time-zone model",
        "Mobile-first UI/UX, 15 languages with right-to-left support, light and dark themes",
        "Full stack: Next.js, PostgreSQL, authentication, push notifications, calendar feeds (ICS), PDF",
        "Deployment and operations on a self-managed server, automated unit and e2e tests",
      ],
    },
    technologies: "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, PostgreSQL, Drizzle ORM, Better Auth, FullCalendar, Web Push, Vitest, Playwright, Docker",
    team: { pl: "1 osoba: autor i jedyny deweloper", en: "1 person: founder and sole developer" },
    links: [{ url: "https://dutyshifts.com", title: "dutyshifts.com" }],
  },
];

export const commercialProjects: Project[] = [
  {
    id: "iduv",
    story: {
      challenge: {
        pl: "Właściciele pojazdów z modułem GPS I-DUV potrzebowali prostego sposobu, żeby w każdej chwili wiedzieć, gdzie są ich auta i co się z nimi dzieje.",
        en: "Owners of vehicles fitted with the I-DUV GPS module needed a simple way to know at any moment where their vehicles are and what is happening to them.",
      },
      solution: {
        pl: "Aplikacja React Native (Expo) na iOS i Androida z mapą na żywo, historią tras, statystykami czasu i dystansu, strefami (geofence) i alertami. Pracowałem też przy backendzie w Laravel.",
        en: "A React Native (Expo) app for iOS and Android with a live map, trip history, time and distance stats, geofences and alerts. I also worked on the Laravel backend.",
      },
      outcome: {
        pl: "Aplikacja jest dostępna w App Store i Google Play, a rozwijałem ją w ośmioosobowym zespole.",
        en: "The app is live on the App Store and Google Play, and I developed it in a team of eight.",
      },
    },
    services: ["mobile", "integrations"],
    summary: {
      en: "Owners of cars, trucks and motorcycles see on their phone where each vehicle is, where it has been and how far it has travelled, and get an alert when it leaves a set area.",
      pl: "Właściciele aut, ciężarówek i motocykli widzą w telefonie, gdzie jest każdy pojazd, dokąd jechał i ile przejechał, a gdy opuści wyznaczony obszar, dostają powiadomienie.",
    },
    media: { kind: "mobile", url: "i-duv.com", gallery: [{ src: "/projects/iduv-web-desktop.webp", caption: { pl: "Strona i-duv.com, którą współtworzyłem", en: "The i-duv.com website I co-built" } }], screens: ["/projects/iduv-1.webp", "/projects/iduv-3.webp", "/projects/iduv-4.webp", "/projects/iduv-2.webp", "/projects/iduv-5.webp", "/projects/iduv-6.webp"] },
    platforms: ["iOS", "Android", "Web"],
    title: {
      en: "I-DUV — vehicle tracking mobile app",
      pl: "I-DUV — aplikacja mobilna do lokalizacji pojazdów",
    },
    description: {
      en: "A mobile app that lets owners of I-DUV-equipped vehicles locate their car, truck or motorcycle in real time, review trip history and manage their fleet.",
      pl: "Aplikacja mobilna pozwalająca właścicielom pojazdów z modułem I-DUV lokalizować w czasie rzeczywistym samochód, ciężarówkę lub motocykl, przeglądać historię tras i zarządzać flotą.",
    },
    highlights: {
      en: [
        "Building the React Native (Expo) app for iOS and Android",
        "Real-time vehicle location, trip history and time/distance stats",
        "Creating geofences and assigning them to vehicles",
        "Backend work in PHP / Laravel with MySQL",
        "Co-building the i-duv.com web app",
      ],
      pl: [
        "Budowa aplikacji React Native (Expo) na iOS i Android",
        "Lokalizacja pojazdów w czasie rzeczywistym, historia tras i statystyki czasu/dystansu",
        "Tworzenie geofence'ów i przypisywanie ich do pojazdów",
        "Praca przy backendzie w PHP / Laravel z MySQL",
        "Współtworzenie aplikacji webowej i-duv.com",
      ],
    },
    technologies: "React Native, Expo, TypeScript, PHP, Laravel, MySQL",
    team: {
      en: "8 people: 4× BE, 2× FE, PO, QA",
      pl: "8 osób: 4× BE, 2× FE, PO, QA",
    },
    stores: [
      {
        appStore: "https://apps.apple.com/app/i-duv/id6503607752",
        googlePlay: "https://play.google.com/store/apps/details?id=com.guidepoint.iduv",
      },
    ],
    links: [{ url: "https://www.i-duv.com/eu/#/en", title: "i-duv.com" }],
  },
  {
    id: "crewops",
    story: {
      challenge: {
        pl: "Imbastaff Sp. z o.o., firma obsługująca wydarzenia i obsadę personelu z podmiotami w Polsce, Szwajcarii, Arabii Saudyjskiej i ZEA, planowała ekipę w zewnętrznym narzędziu, a wycena, obsada, godziny, koszty w kilku walutach i rozliczenia z klientem wymagały osobnych arkuszy i ręcznej pracy.",
        en: "Imbastaff Sp. z o.o., an events and staffing company with entities in Poland, Switzerland, Saudi Arabia and the UAE, planned its crew in an external tool, while quotes, staffing, hours, multi-currency costs and client settlement needed separate spreadsheets and manual work.",
      },
      solution: {
        pl: "Aplikacja webowa z dwoma widokami: biuro (projekty, klienci, ekipa, siatki wyceny i obsady, godziny, koszty, rozliczenie) i portal ekipy na telefonie (zmiany, godziny, wydatki, dokumenty). Dostęp zależy od pięciu ról, a dane chronią reguły na poziomie bazy.",
        en: "A web application with two views: the office (projects, clients, crew, quote and staffing grids, hours, costs, settlement) and a crew portal on the phone (shifts, hours, expenses, documents). Access depends on five roles, and data is protected by database-level rules.",
      },
      outcome: {
        pl: "System działa produkcyjnie: wycena, obsada, ewidencja czasu i koszty w kilku walutach prowadzą wprost do rozliczenia projektu z wyliczoną marżą, a ekipa zgłasza godziny i wydatki z telefonu.",
        en: "The system runs in production: quotes, staffing, time records and multi-currency costs lead straight to the project settlement with its margin, and the crew reports hours and expenses from their phones.",
      },
    },
    services: ["webapps", "integrations"],
    summary: {
      pl: "Firma obsługująca wydarzenia planuje ekipę, rozlicza godziny i koszty projektu oraz widzi, ile zostaje marży, a pracownicy sprawdzają swoje zmiany i zgłaszają godziny i wydatki z telefonu.",
      en: "An events company plans its crew, settles hours and costs per project and sees how much margin is left, while crew members check their shifts and report hours and expenses from their phones.",
    },
    media: {
      kind: "web",
      desktop: "/projects/crewops-02-desktop.webp",
      mobile: "/projects/crewops-05-mobile.webp",
      url: "CrewOps",
      screens: ["/projects/crewops-05-mobile.webp", "/projects/crewops-06-mobile.webp"],
      gallery: [
        { src: "/projects/crewops-02-desktop.webp", caption: { pl: "Rozliczenie projektu: przychód, koszty i marża (dane przykładowe)", en: "Project settlement: revenue, costs and margin (sample data)" } },
        { src: "/projects/crewops-01-desktop.webp", caption: { pl: "Siatka wyceny ze stawkami i obsadą na dni (dane przykładowe)", en: "Quote grid with rates and staffing per day (sample data)" } },
        { src: "/projects/crewops-03-desktop.webp", caption: { pl: "Ewidencja godzin z zatwierdzaniem i nadgodzinami (dane przykładowe)", en: "Timesheets with approval and overtime (sample data)" } },
        { src: "/projects/crewops-04-desktop.webp", caption: { pl: "Planer obsady z wolnymi miejscami (dane przykładowe)", en: "Staffing planner with open slots (sample data)" } },
      ],
    },
    platforms: ["Web"],
    title: {
      pl: "CrewOps — planowanie ekipy i rozliczenia projektów",
      en: "CrewOps — crew planning and project settlement",
    },
    description: {
      pl: "System do wyceny, obsady, ewidencji czasu, kosztów i rozliczeń projektów eventowych z portalem dla ekipy.",
      en: "A system for quoting, staffing, time tracking, costs and settlement of event projects, with a crew portal.",
    },
    highlights: {
      pl: [
        "Frontend w React i TypeScript: siatki wyceny i obsady, planer, ewidencja czasu, rozliczenia",
        "Schemat bazy i migracje w Supabase (PostgreSQL) z regułami dostępu dla pięciu ról",
        "Funkcje serwerowe i integracje z narzędziem do grafików i księgowością (n8n)",
        "Testy jednostkowe i E2E oraz system projektowy z katalogiem komponentów",
      ],
      en: [
        "React and TypeScript frontend: quote and staffing grids, planner, time tracking, settlement",
        "Database schema and migrations in Supabase (PostgreSQL) with access rules for five roles",
        "Server functions and integrations with the scheduling tool and accounting (n8n)",
        "Unit and E2E tests and a design system with a component catalogue",
      ],
    },
    technologies: "React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Supabase, PostgreSQL, n8n, Sentry, Vitest, Playwright, Storybook",
    team: { pl: "Główny deweloper: w zespole z innymi programistami i testerami", en: "Lead developer: in a team with other developers and testers" },
  },
  {
    id: "modpady",
    story: {
      challenge: {
        pl: "T-Master, dostawca oprogramowania do gospodarki odpadami dla gmin, potrzebował, żeby istniejąca aplikacja mOdpady obsłużyła drugą, anglojęzyczną markę LessWaste i kolejne języki interfejsu, bez utrzymywania dwóch repozytoriów i dwóch linii wydań.",
        en: "T-Master, a provider of municipal waste-management software, needed its existing mOdpady app to serve a second, English-language brand, LessWaste, and more interface languages without maintaining two codebases or two release lines.",
      },
      solution: {
        pl: "Jedna baza kodu React Native z przełącznikiem marki: osobne identyfikatory, ikony, klucze podpisu i listy języków, wspólny backend oraz wybór języka pobierany z API. Do tego zautomatyzowane buildy i nowe funkcje, m.in. ekrany punktów selektywnej zbiórki (ePSZOK).",
        en: "A single React Native codebase with a brand switch: separate app ids, icons, signing keys and language lists, a shared backend and a language picker fed by the API. Plus automated builds and new features such as the recycling-point (ePSZOK) screens.",
      },
      outcome: {
        pl: "Obie marki wychodzą z jednej gałęzi i są w App Store oraz Google Play. Nowe funkcje powstają raz dla obu, a zimny build Androida skrócił się z ponad godziny do kilkunastu minut. Aplikacje działają bez reklam i bez narzędzi analitycznych.",
        en: "Both brands ship from one branch and are on the App Store and Google Play. New features are built once for both, and a cold Android build dropped from over an hour to under twenty minutes. The apps run without ads or analytics tools.",
      },
    },
    services: ["mobile"],
    summary: {
      pl: "Aplikacje, które pomagają mieszkańcom w gospodarce odpadami: segregować poprawnie, sprawdzać harmonogramy i historię wyrzuceń oraz korzystać z punktów selektywnej zbiórki z telefonu.",
      en: "Apps that help residents manage household waste: sort it correctly, see collection schedules and their disposal history, and use municipal recycling points from the phone.",
    },
    media: {
      kind: "mobile",
      screens: ["/projects/modpady-lesswaste-1.webp", "/projects/modpady-lesswaste-2.webp"],
      phoneAspect: "780/1387",
    },
    platforms: ["iOS", "Android"],
    title: {
      pl: "mOdpady i LessWaste — aplikacje do gospodarki odpadami",
      en: "mOdpady and LessWaste — waste-management apps",
    },
    description: {
      pl: "Rodzina aplikacji mobilnych dla mieszkańców z jednej bazy kodu: segregacja, harmonogramy, historia wyrzuceń i punkty selektywnej zbiórki.",
      en: "A family of mobile apps for residents from one codebase: sorting, collection schedules, disposal history and recycling points.",
    },
    highlights: {
      pl: [
        "Rozwój aplikacji React Native na iOS i Androida",
        "Wielomarkowość: mOdpady i LessWaste z jednej bazy kodu, kolejne języki interfejsu",
        "Nowe funkcje, m.in. ekrany ePSZOK i wyniki kontroli w historii",
        "Automatyzacja buildów i audyt bezpieczeństwa",
      ],
      en: [
        "React Native app development for iOS and Android",
        "Multi-brand: mOdpady and LessWaste from one codebase, more interface languages",
        "New features such as the ePSZOK screens and inspection results in the history",
        "Build automation and a security audit",
      ],
    },
    technologies: "React Native, TypeScript, Redux Toolkit, RTK Query, NativeWind, gluestack-ui, i18next, react-hook-form, Leaflet, MMKV",
    team: { pl: "Deweloper: w kilkuosobowym zespole", en: "Developer: in a team of several developers" },
    stores: [
      {
        label: "mOdpady",
        appStore: "https://apps.apple.com/pl/app/modpady/id1607090814",
        googlePlay: "https://play.google.com/store/apps/details?id=pl.tmaster.modpady",
      },
      {
        label: "LessWaste",
        appStore: "https://apps.apple.com/pl/app/less-waste-by-t-master/id6497228235",
        googlePlay: "https://play.google.com/store/apps/details?id=pl.tmaster.lesswaste",
      },
    ],
  },
  {
    id: "geoservice",
    story: {
      challenge: {
        pl: "Biblioteka map, na której opiera się geoserwis, miała ponad 10 lat i była napisana w czystym JavaScript, przez co każda zmiana była ryzykowna.",
        en: "The map library behind the geoservice was over ten years old and written in plain JavaScript, so every change was risky.",
      },
      solution: {
        pl: "Migracja do TypeScript, wydzielenie komponentów (kontrolki, panele map i widoków), testy jednostkowe i integracyjne oraz dokumentacja w TypeDoc.",
        en: "Migration to TypeScript, extracting components (controls, map and view panels), unit and integration tests, and TypeDoc documentation.",
      },
      outcome: {
        pl: "Kod stał się przewidywalny i łatwiejszy do rozwijania, a testy wychwytują błędy przed wdrożeniem. Usługa pokazuje w przeglądarce mapy, zdjęcia ukośne, widoki 360° i dane LiDAR.",
        en: "The code became predictable and easier to extend, and tests catch bugs before release. The service shows maps, oblique imagery, 360° views and LiDAR data in the browser.",
      },
    },
    services: ["webapps", "modernization"],
    summary: {
      en: "Maps and spatial data in the browser. I modernised a ten-year-old codebase so the service can grow faster and more safely, with tests guarding every change.",
      pl: "Mapy i dane przestrzenne w przeglądarce. Unowocześniłem dziesięcioletni kod, żeby usługę dało się rozwijać szybciej i bezpieczniej, a każdą zmianę pilnują testy.",
    },
    media: {
      kind: "web",
      desktop: "/projects/geoservice-multiview-desktop.webp",
      mobile: "/projects/geoservice-mobile.webp",
      url: "your.mapspace.com",
      gallery: [
        { src: "/projects/geoservice-multiview-desktop.webp", caption: { pl: "Kilka widoków naraz: zdjęcie 360° z ulicy, chmura punktów LiDAR i mapa", en: "Several views at once: 360° street photo, LiDAR point cloud and map" } },
        { src: "/projects/geoservice-oblique-desktop.webp", caption: { pl: "Zdjęcia ukośne tego samego miejsca w dwóch widokach", en: "Oblique imagery of the same place in two views" } },
        { src: "/projects/geoservice-3d-desktop.webp", caption: { pl: "Skan laserowy 3D ulicy w przeglądarce", en: "A 3D laser scan of a street in the browser" } },
        { src: "/projects/geoservice-desktop.webp", caption: { pl: "Strona produktu Mapspace", en: "The Mapspace product page" } },
      ],
    },
    platforms: ["Web"],
    title: {
      en: "Online geoservice exploration application",
      pl: "Aplikacja webowa do eksploracji geoserwisu",
    },
    description: {
      en: "An application that lets users explore and use the full range of capabilities offered by a geoservice.",
      pl: "Aplikacja pozwalająca użytkownikom w pełni wykorzystać możliwości i potencjał geoserwisu.",
    },
    highlights: {
      en: [
        "Migration of a 10+ year old JavaScript library to TypeScript",
        "Unit and integration tests",
        "Extracting components from the legacy library (controls, buttons, map/view panels)",
        "API communication, views, bug fixing, code review",
      ],
      pl: [
        "Migracja 10-letniej biblioteki z JavaScript do TypeScript",
        "Testy jednostkowe i integracyjne",
        "Wydzielanie komponentów ze starej biblioteki (kontrolki, przyciski, panele map/widoków)",
        "Komunikacja z API, widoki, naprawa błędów, code review",
      ],
    },
    technologies:
      "TypeScript, OpenLayers, Vite, Vitest, Cypress, TypeDoc, Node.js, GitLab",
    framework: { en: "Scrum, 2-week sprints", pl: "Scrum, 2-tygodniowe sprinty" },
    team: {
      en: "6 people: PO, 3× FE, 2× BE",
      pl: "6 osób: PO, 3× FE, 2× BE",
    },
    links: [{ url: "https://mapspace.com/", title: "mapspace.com" }],
  },
  {
    id: "surveys",
    story: {
      challenge: {
        pl: "Platforma ankiet i rekomendacji działała na współdzielonej aplikacji React, którą trzeba było unowocześnić i rozbudować o kolejne formularze.",
        en: "The survey and recommendation platform ran on a shared React app that needed modernising and extending with more forms.",
      },
      solution: {
        pl: "Migracja do Next.js, rozbudowane formularze z regułami walidacji, własne kontrolki i obsługa API, z testami jednostkowymi.",
        en: "Migration to Next.js, comprehensive forms with validation rules, custom controls and API work, with unit tests.",
      },
      outcome: {
        pl: "CareerTest by Universum prowadzi kandydatów przez pytania i podsuwa dopasowane ścieżki kariery. Projekt rozwijałem w ośmioosobowym zespole.",
        en: "CareerTest by Universum guides candidates through the questions and suggests matching career paths. I worked on it in a team of eight.",
      },
    },
    services: ["webapps"],
    summary: {
      en: "A career test used by candidates in many countries: it guides them through the questions and immediately suggests matching career paths and employers.",
      pl: "Test kariery, z którego korzystają kandydaci w wielu krajach: prowadzi przez pytania i od razu podsuwa dopasowane ścieżki kariery i pracodawców.",
    },
    media: {
      kind: "web",
      desktop: "/projects/surveys-desktop.webp",
      full: "/projects/surveys-full.webp",
      mobile: "/projects/surveys-test-mobile.webp",
      url: "careertest.universumglobal.com",
      gallery: [
        { src: "/projects/surveys-desktop.webp", caption: { pl: "Strona startowa testu z wyborem kraju", en: "The test's start page with country selection" } },
        { src: "/projects/surveys-test-desktop.webp", caption: { pl: "Pierwsze pytanie testu", en: "The first question of the test" } },
      ],
    },
    platforms: ["Web"],
    title: {
      en: "Survey & recommendation platform",
      pl: "Platforma ankiet i rekomendacji",
    },
    description: {
      en: "Client applications for preparing surveys and fetching recommendations, with all the necessary CRUDs and related entities.",
      pl: "Aplikacje klienckie do tworzenia ankiet i pobierania rekomendacji, z pełnym CRUD i powiązanymi encjami.",
    },
    highlights: {
      en: [
        "Migrating a shared React app to Next.js",
        "Comprehensive forms with validation rules",
        "Custom controls and UI elements",
        "API communication, views, unit tests, bug fixing",
      ],
      pl: [
        "Migracja współdzielonej aplikacji React do Next.js",
        "Rozbudowane formularze z regułami walidacji",
        "Własne kontrolki i elementy UI",
        "Komunikacja z API, widoki, testy jednostkowe, naprawa błędów",
      ],
    },
    technologies:
      "Next.js, React, TypeScript, Redux, RTK Query, SCSS, AWS, Jira",
    framework: { en: "Scrum, 2-week sprints", pl: "Scrum, 2-tygodniowe sprinty" },
    team: {
      en: "8 people: PO, 2× FE, 2× BE, 2× QA, Designer",
      pl: "8 osób: PO, 2× FE, 2× BE, 2× QA, Projektant",
    },
    links: [
      {
        url: "https://careertest.universumglobal.com/",
        title: "careertest.universumglobal.com",
      },
    ],
  },
  {
    id: "ct-sensor",
    story: {
      challenge: {
        pl: "Producent czujników potrzebował aplikacji, w której inżynierowie ocenią parametry 128-kanałowego sensora obrazu razem z zestawem ewaluacyjnym.",
        en: "A sensor maker needed an application in which engineers can assess a 128-channel image sensor together with its evaluation kit.",
      },
      solution: {
        pl: "Aplikacja desktopowa (Electron, Angular) z podglądem rejestrów na żywo, logiką aktualizacji firmware i optymalizacją szybkości działania.",
        en: "A desktop application (Electron, Angular) with live register monitoring, firmware update logic and speed optimisation.",
      },
      outcome: {
        pl: "Oprogramowanie towarzyszy zestawowi ewaluacyjnemu AS5951 firmy ams, z którego korzystają inżynierowie oceniający czujnik.",
        en: "The software accompanies ams's AS5951 evaluation kit used by engineers assessing the sensor.",
      },
    },
    services: ["embedded"],
    summary: {
      en: "Engineers check on their computer how a new image sensor performs, live and channel by channel, before it goes into devices.",
      pl: "Inżynierowie sprawdzają na komputerze, jak działa nowy czujnik obrazu, na żywo i kanał po kanale, zanim trafi do urządzeń.",
    },
    media: { kind: "desktop", mock: "sensor" },
    platforms: ["Desktop"],
    title: {
      en: "Evaluation software for a CT sensor device",
      pl: "Oprogramowanie ewaluacyjne dla czujnika CT",
    },
    description: {
      en: "Software for a 128-channel ADC sensor with integrated photodiodes, working with the evaluation kit to assess image sensor performance.",
      pl: "Oprogramowanie dla czujnika 128-kanałowego ADC ze zintegrowanymi fotodiodami, współpracujące z zestawem ewaluacyjnym do oceny parametrów sensora.",
    },
    highlights: {
      en: [
        "Application speed optimization",
        "Firmware update logic",
        "Real-time observation of register values",
        "Custom controls and UI elements, bug fixing",
      ],
      pl: [
        "Optymalizacja szybkości aplikacji",
        "Logika aktualizacji firmware",
        "Podgląd wartości rejestrów w czasie rzeczywistym",
        "Własne kontrolki i elementy UI, naprawa błędów",
      ],
    },
    technologies:
      "Electron, Node.js, RxJS, TypeScript, Angular, Python, WebSockets, GitLab",
    framework: { en: "Scrum", pl: "Scrum" },
    team: {
      en: "4 people: PO, FE, BE, Embedded",
      pl: "4 osoby: PO, FE, BE, Embedded",
    },
    links: [{ url: "https://ams.com/as5951-eval-kit", title: "ams.com" }],
  },
  {
    id: "housing",
    story: {
      challenge: {
        pl: "Zarządca zakwaterowania potrzebował jednego miejsca do rezerwacji pokoi i budowania społeczności mieszkańców.",
        en: "An accommodation operator needed one place for room bookings and building a resident community.",
      },
      solution: {
        pl: "Rozwój aplikacji w Vue współpracującej z backendem Django: komunikacja z API, refaktoryzacja, logowanie nieaktywnych użytkowników i rozbudowa edytora galerii.",
        en: "Work on the Vue app backed by Django: API communication, refactoring, login for inactive users and extensions to the gallery editor.",
      },
      outcome: {
        pl: "Mieszkańcy rezerwują pokoje online, a wbudowane algorytmy dopasowują ich do siebie. Projekt rozwijałem w czteroosobowym zespole.",
        en: "Residents book rooms online and built-in algorithms match them with each other. I worked on it in a team of four.",
      },
    },
    services: ["webapps"],
    summary: {
      en: "Residents book rooms online and find flatmates matched to them by an algorithm, while the operator manages the whole community in one place.",
      pl: "Mieszkańcy rezerwują pokoje online i znajdują współlokatorów dopasowanych przez algorytm, a zarządca obsługuje całą społeczność w jednym miejscu.",
    },
    media: { kind: "web", mock: "booking" },
    platforms: ["Web"],
    title: {
      en: "Accommodation & community management app",
      pl: "Aplikacja do zarządzania zakwaterowaniem i społecznością",
    },
    description: {
      en: "A Django + Vue application that lets users make reservations and match with others through built-in algorithms.",
      pl: "Aplikacja Django + Vue pozwalająca na rezerwacje i dopasowywanie użytkowników za pomocą wbudowanych algorytmów.",
    },
    highlights: {
      en: [
        "API communication and code refactoring",
        "Login flow for inactive users",
        "Gallery editor extensions",
        "Custom controls and UI elements, bug fixing",
      ],
      pl: [
        "Komunikacja z API i refaktoryzacja kodu",
        "Obsługa logowania nieaktywnych użytkowników",
        "Rozbudowa edytora galerii",
        "Własne kontrolki i elementy UI, naprawa błędów",
      ],
    },
    technologies: "Vue.js, JavaScript, Quill.js, Docker, GitHub, Asana",
    framework: { en: "Scrum", pl: "Scrum" },
    team: {
      en: "4 people: PO, FE, BE, DevOps",
      pl: "4 osoby: PO, FE, BE, DevOps",
    },
  },
  {
    id: "audio",
    story: {
      challenge: {
        pl: "Producent układów audio potrzebował narzędzia do strojenia aktywnej redukcji szumów (ANC) w różnych topologiach.",
        en: "An audio chip maker needed a tool for tuning active noise cancelling (ANC) across different topologies.",
      },
      solution: {
        pl: "Aplikacja desktopowa (Electron, Angular, RxJS) ze zmienną liczbą filtrów dźwięku, podglądem rejestrów na żywo i konwerterem starszych wersji projektów.",
        en: "A desktop application (Electron, Angular, RxJS) with a variable number of sound filters, live register monitoring and a converter for older project versions.",
      },
      outcome: {
        pl: "Obsługa ANC typu feedforward, feedback i hybrydowej, a dzięki automatycznej kompensacji nieszczelności hybrydowe ANC działa nawet w luźnych słuchawkach dousznych (układ AS3460).",
        en: "Support for feedforward, feedback and hybrid ANC, and thanks to automatic leakage compensation hybrid ANC works even in loose-fit earbuds (AS3460 chip).",
      },
    },
    services: ["embedded"],
    summary: {
      en: "Headphone makers tune active noise cancelling in a desktop app, including hybrid ANC that works even in loose-fitting earbuds.",
      pl: "Producenci słuchawek dostrajają aktywną redukcję szumów w aplikacji na komputer, także hybrydową, która działa nawet w luźno dopasowanych słuchawkach dousznych.",
    },
    media: { kind: "desktop", mock: "audio" },
    platforms: ["Desktop"],
    title: {
      en: "Evaluation software for an audio ANC device",
      pl: "Oprogramowanie ewaluacyjne dla urządzenia audio ANC",
    },
    description: {
      en: "Software supporting feedforward, feedback and hybrid ANC topologies, with Automatic Leakage Compensation enabling hybrid ANC in loose-fit earbuds.",
      pl: "Oprogramowanie wspierające topologie ANC feedforward, feedback i hybrydowe, z algorytmem ALC umożliwiającym hybrydowe ANC w luźnych słuchawkach.",
    },
    highlights: {
      en: [
        "Code refactoring and optimization",
        "Variable number of sound filters",
        "Project converter for legacy versions",
        "Real-time register observation, custom UI, code review",
      ],
      pl: [
        "Refaktoryzacja i optymalizacja kodu",
        "Zmienna liczba filtrów dźwięku",
        "Konwerter starszych wersji projektów",
        "Podgląd rejestrów w czasie rzeczywistym, własne UI, code review",
      ],
    },
    technologies: "Electron, Angular, TypeScript, Node.js, RxJS, WebSockets",
    framework: { en: "Scrum, 1-week sprints", pl: "Scrum, 1-tygodniowe sprinty" },
    team: { en: "8 people: PO, 4× FE, 3× QA", pl: "8 osób: PO, 4× FE, 3× QA" },
    links: [{ url: "https://ams.com/as3460", title: "ams.com" }],
  },
  {
    id: "process-control",
    story: {
      challenge: {
        pl: "Firma potrzebowała systemu, który na bieżąco kontroluje procesy biznesowe, porównuje ich parametry z historią zdarzeń i reaguje automatycznie.",
        en: "A company needed a system that controls business processes in real time, compares their parameters with event history and reacts automatically.",
      },
      solution: {
        pl: "Responsywny dashboard ze skalowalnymi kafelkami przeciąganymi myszą, wykresy, tabele i grafy 3D, nowe funkcje oraz utrzymanie i code review.",
        en: "A responsive dashboard with scalable drag-and-drop tiles, charts, tables and 3D graphs, new features, plus maintenance and code review.",
      },
      outcome: {
        pl: "Model procesów odzwierciedla ich zachowanie na żywo, a odchylenia od normy są wychwytywane automatycznie. Rozwijałem go w sześcioosobowym zespole.",
        en: "The process model reflects their behaviour live and deviations from the norm are caught automatically. I worked on it in a team of six.",
      },
    },
    services: ["webapps", "integrations"],
    summary: {
      en: "The system watches business processes in real time, catches deviations from the norm on its own and shows them on a live model.",
      pl: "System na bieżąco pilnuje procesów w firmie, sam wychwytuje odchylenia od normy i pokazuje je na żywym modelu.",
    },
    media: {
      kind: "web",
      desktop: "/projects/process-control-app-desktop.webp",
      url: "inTrack",
      gallery: [
        { src: "/projects/process-control-app-desktop.webp", caption: { pl: "Dashboard aplikacji: kafelki, wskaźniki i wykresy", en: "The app dashboard: tiles, gauges and charts" } },
        { src: "/projects/process-control-desktop.webp", caption: { pl: "Strona produktu inTrack", en: "The inTrack product page" } },
      ],
    },
    platforms: ["Web"],
    title: {
      en: "Business process control web app",
      pl: "Aplikacja webowa do kontroli procesów biznesowych",
    },
    description: {
      en: "An app that controls process behaviours through algorithms and automation, reflecting them in a model and validating parameters against business event history.",
      pl: "Aplikacja kontrolująca zachowania procesów za pomocą algorytmów i automatyzacji, odwzorowując je w modelu i weryfikując parametry na podstawie historii zdarzeń biznesowych.",
    },
    highlights: {
      en: [
        "Responsive dashboard with scalable drag & drop tiles",
        "Charts, tables, 3D graphs and dialogs",
        "API communication, custom UI, new features",
        "Maintenance, bug fixing, code review",
      ],
      pl: [
        "Responsywny dashboard ze skalowalnymi kafelkami drag & drop",
        "Wykresy, tabele, grafy 3D i okna dialogowe",
        "Komunikacja z API, własne UI, nowe funkcjonalności",
        "Utrzymanie, naprawa błędów, code review",
      ],
    },
    technologies:
      "React, Redux, TypeScript, Highcharts, D3.js, PostgreSQL, GitLab",
    framework: { en: "Scrum", pl: "Scrum" },
    team: {
      en: "6 people: PO, 3× FE, BE, QA",
      pl: "6 osób: PO, 3× FE, BE, QA",
    },
    links: [
      { url: "https://intrack.eu/", title: "intrack.eu" },
      { url: "https://ingrifo.com/", title: "ingrifo.com" },
    ],
  },
];

export const ownProjects: Project[] = [
  {
    id: "website-checker",
    title: { en: "Website checker", pl: "Website checker" },
    description: {
      en: "A Node.js app that checks the content of any website on a schedule or on demand — I use it to catch new firefighting trainings for my brigade.",
      pl: "Aplikacja Node.js sprawdzająca treść dowolnej strony cyklicznie lub na żądanie — używam jej, by wychwytywać nowe szkolenia pożarnicze dla mojej jednostki.",
    },
    technologies: "Node.js, Express, Cron, Nodemailer, Puppeteer",
    links: [
      {
        url: "https://github.com/maksymilian-org/website-checker",
        title: "github.com",
      },
    ],
  },
  {
    id: "food-idea",
    title: { en: "Food idea", pl: "Food idea" },
    description: {
      en: "Sometimes it's hard to decide what to cook with what's in the fridge, so I built an app to solve exactly that.",
      pl: "Czasem trudno zdecydować, co ugotować z tego, co jest w lodówce — napisałem aplikację, która rozwiązuje ten problem.",
    },
    technologies: "Vue.js 3, Vuex",
    links: [
      {
        url: "https://food-idea-maksymilian-org.netlify.app/",
        title: "netlify.app",
      },
      { url: "https://github.com/maksymilian-org/food-idea", title: "github.com" },
    ],
  },
  {
    id: "tictactoe",
    media: { kind: "web", desktop: "/projects/tictactoe-desktop.webp", url: "tictactoe.onrender.com" },
    title: { en: "WebSocket TicTacToe", pl: "TicTacToe na WebSocket" },
    description: {
      en: "I wanted to show my girlfriend (now my wife) that I'm a 'real programmer', so I built a TicTacToe game with React and WebSocket — and she beat me.",
      pl: "Chciałem pokazać dziewczynie (dziś żonie), że jestem „prawdziwym programistą”, więc zrobiłem grę TicTacToe w React i WebSocket — a ona mnie ograła.",
    },
    technologies: "React, TypeScript, Node.js, Socket.IO",
    links: [
      { url: "https://tictactoe-lmp6.onrender.com", title: "render.com" },
      { url: "https://github.com/maksymilian-org/tictactoe", title: "github.com" },
    ],
  },
  {
    id: "pokedex",
    media: { kind: "web", desktop: "/projects/pokedex-desktop.webp", mobile: "/projects/pokedex-mobile.webp", url: "pokedex.netlify.app" },
    title: { en: "Pokedex browser", pl: "Przeglądarka Pokedex" },
    description: {
      en: "A company wanted to check my Angular skills and asked me to build a Pokémon browser. I got the job, so I keep it here as a memento.",
      pl: "Firma chciała sprawdzić moje umiejętności w Angularze i poprosiła o zbudowanie przeglądarki Pokémonów. Dostałem tę pracę, więc trzymam ją tu na pamiątkę.",
    },
    technologies: "Angular",
    links: [
      { url: "https://pokedex-maksymilian-org.netlify.app/", title: "netlify.app" },
    ],
  },
  {
    id: "memory",
    title: { en: "Memory game", pl: "Gra Memory" },
    description: {
      en: "One of my favourite childhood games turned out to be a great foundation for learning Vue.",
      pl: "Jedna z moich ulubionych gier z dzieciństwa okazała się świetną podstawą do nauki Vue.",
    },
    technologies: "Vue.js 2",
    links: [
      { url: "https://memory-maksymilian-org.netlify.app/", title: "netlify.app" },
      { url: "https://github.com/maksymilian-org/memory", title: "github.com" },
    ],
  },
  {
    id: "this-website",
    media: { kind: "web", desktop: "/projects/this-website-desktop.webp", mobile: "/projects/this-website-mobile.webp", full: "/projects/this-website-full.webp", url: "maksymilian.org" },
    title: { en: "This website", pl: "Ta strona" },
    description: {
      en: "Curious how this site is built? The full source code is on GitHub.",
      pl: "Ciekawi Cię, jak zbudowana jest ta strona? Pełny kod źródłowy jest na GitHubie.",
    },
    technologies: "React, Next.js, TypeScript, Tailwind CSS",
    links: [
      {
        url: "https://github.com/maksymilian-org/maksymilian.org",
        title: "github.com",
      },
    ],
  },
];

export interface WebsiteShowcase extends ProjectLink {
  id: string;
}

// Sites built for local businesses. Only sites that are still online are listed
// (checked 2026-11-27; four domains had expired and two returned 404).
export const websites: WebsiteShowcase[] = [
  { id: "site-ospkonopnica", url: "https://ospkonopnica.pl/", title: "ospkonopnica.pl" },
  { id: "site-pielgrzymka", url: "https://pielgrzymkatradycji.pl/", title: "pielgrzymkatradycji.pl" },
  { id: "site-hotelmlyn", url: "https://hotel-mlyn.lublin.pl/", title: "hotel-mlyn.lublin.pl" },
  { id: "site-introibo", url: "https://introibo.pl/", title: "introibo.pl" },
  { id: "site-polityka", url: "https://polityka-narodowa.pl/", title: "polityka-narodowa.pl" },
  { id: "site-rajskiewrota", url: "https://www.rajskiewrota.pl/", title: "rajskiewrota.pl" },
  { id: "site-baccarat", url: "https://drukarnia-baccarat.pl/", title: "drukarnia-baccarat.pl" },
  { id: "site-meapharma", url: "https://meapharma.pl/", title: "meapharma.pl" },
  { id: "site-metaloplastyka", url: "https://www.metaloplastyka.pl/", title: "metaloplastyka.pl" },
  { id: "site-mielecserwis", url: "https://mielecserwis.pl/", title: "mielecserwis.pl" },
  { id: "site-sansol", url: "https://www.sansol.com.pl/", title: "sansol.com.pl" },
  { id: "site-royalbotanic", url: "https://hotel-royalbotanic.pl/", title: "hotel-royalbotanic.pl" },
  { id: "site-civitas", url: "https://fundacja.civitaschristiana.pl/", title: "fundacja.civitaschristiana.pl" },
  { id: "site-ecotechnika", url: "https://www.ecotechnika.pl/", title: "ecotechnika.pl" },
  { id: "site-ksiegowy", url: "http://ksiegowy.plus/", title: "ksiegowy.plus" },
];

/** Own products and commercial projects that have a case study page. */
export const caseStudies = [...productProjects, ...commercialProjects].filter((p) => p.story);

export function getProject(id: string): Project | undefined {
  return caseStudies.find((p) => p.id === id);
}

export function projectsForService(serviceId: string): Project[] {
  return caseStudies.filter((p) => p.services?.includes(serviceId));
}
