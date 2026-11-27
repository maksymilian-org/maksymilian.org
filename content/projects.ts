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

export interface Project {
  id: string;
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
        pl: "Aplikacja jest dostępna w App Store i Google Play, a rozwijałem ją przez ponad dwa lata w ośmioosobowym zespole.",
        en: "The app is live on the App Store and Google Play, and I developed it for over two years in a team of eight.",
      },
    },
    services: ["mobile", "integrations"],
    summary: {
      en: "Owners of cars, trucks and motorcycles see on their phone where each vehicle is, where it has been and how far it has travelled, and get an alert when it leaves a set area.",
      pl: "Właściciele aut, ciężarówek i motocykli widzą w telefonie, gdzie jest każdy pojazd, dokąd jechał i ile przejechał, a gdy opuści wyznaczony obszar, dostają powiadomienie.",
    },
    media: { kind: "mobile", screens: ["/projects/iduv-1.webp", "/projects/iduv-3.webp", "/projects/iduv-4.webp", "/projects/iduv-2.webp", "/projects/iduv-5.webp", "/projects/iduv-6.webp"] },
    platforms: ["iOS", "Android"],
    title: {
      en: "I-DUV — vehicle tracking mobile app",
      pl: "I-DUV — aplikacja mobilna do lokalizacji pojazdów",
    },
    description: {
      en: "A mobile app that lets owners of I-DUV-equipped vehicles locate their car, truck or motorcycle in real time, review trip history and manage their fleet.",
      pl: "Aplikacja mobilna pozwalająca właścicielom pojazdów z modułem I-DUV lokalizować w czasie rzeczywistym samochód, ciężarówkę lub motocykl, przeglądać historię tras i zarządzać flotą.",
    },
    time: { en: "2 years 4 months", pl: "2 lata 4 miesiące" },
    highlights: {
      en: [
        "Building the React Native (Expo) app for iOS and Android",
        "Real-time vehicle location, trip history and time/distance stats",
        "Creating geofences and assigning them to vehicles",
        "Backend work in PHP / Laravel with MySQL",
      ],
      pl: [
        "Budowa aplikacji React Native (Expo) na iOS i Android",
        "Lokalizacja pojazdów w czasie rzeczywistym, historia tras i statystyki czasu/dystansu",
        "Tworzenie geofence'ów i przypisywanie ich do pojazdów",
        "Praca przy backendzie w PHP / Laravel z MySQL",
      ],
    },
    technologies: "React Native, Expo, TypeScript, PHP, Laravel, MySQL",
    team: {
      en: "8 people: 4× BE, 2× FE, PO, QA",
      pl: "8 osób: 4× BE, 2× FE, PO, QA",
    },
    links: [
      {
        url: "https://play.google.com/store/apps/details?id=com.guidepoint.iduv",
        title: "Google Play",
      },
      {
        url: "https://apps.apple.com/app/i-duv/id6503607752",
        title: "App Store",
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
    time: { en: "3 months", pl: "3 miesiące" },
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
        pl: "CareerTest by Universum prowadzi kandydatów przez pytania i podsuwa dopasowane ścieżki kariery. Projekt rozwijałem przez rok w ośmioosobowym zespole.",
        en: "CareerTest by Universum guides candidates through the questions and suggests matching career paths. I worked on it for a year in a team of eight.",
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
    time: { en: "1 year", pl: "1 rok" },
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
    time: { en: "5 months", pl: "5 miesięcy" },
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
        pl: "Mieszkańcy rezerwują pokoje online, a wbudowane algorytmy dopasowują ich do siebie. Projekt rozwijałem przez 9 miesięcy w czteroosobowym zespole.",
        en: "Residents book rooms online and built-in algorithms match them with each other. I worked on it for nine months in a team of four.",
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
    time: { en: "9 months", pl: "9 miesięcy" },
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
    time: { en: "1 year", pl: "1 rok" },
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
        pl: "Model procesów odzwierciedla ich zachowanie na żywo, a odchylenia od normy są wychwytywane automatycznie. Rozwijałem go przez 1 rok i 8 miesięcy w sześcioosobowym zespole.",
        en: "The process model reflects their behaviour live and deviations from the norm are caught automatically. I worked on it for 1 year and 8 months in a team of six.",
      },
    },
    services: ["webapps", "integrations"],
    summary: {
      en: "The system watches business processes in real time, catches deviations from the norm on its own and shows them on a live model.",
      pl: "System na bieżąco pilnuje procesów w firmie, sam wychwytuje odchylenia od normy i pokazuje je na żywym modelu.",
    },
    media: {
      kind: "web",
      desktop: "/projects/process-control-desktop.webp",
      mobile: "/projects/process-control-mobile.webp",
      full: "/projects/process-control-full.webp",
      url: "intrack.eu",
      gallery: [{ src: "/projects/process-control-desktop.webp", caption: { pl: "Strona produktu inTrack", en: "The inTrack product page" } }],
    },
    platforms: ["Web", "iOS", "Android"],
    title: {
      en: "Business process control web app",
      pl: "Aplikacja webowa do kontroli procesów biznesowych",
    },
    description: {
      en: "An app that controls process behaviours through algorithms and automation, reflecting them in a model and validating parameters against business event history.",
      pl: "Aplikacja kontrolująca zachowania procesów za pomocą algorytmów i automatyzacji, odwzorowując je w modelu i weryfikując parametry na podstawie historii zdarzeń biznesowych.",
    },
    time: { en: "1 year 8 months", pl: "1 rok 8 miesięcy" },
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
  { id: "site-royalbotanic", url: "https://hotel-royalbotanic.pl/", title: "hotel-royalbotanic.pl" },
  { id: "site-civitas", url: "https://fundacja.civitaschristiana.pl/", title: "fundacja.civitaschristiana.pl" },
  { id: "site-ecotechnika", url: "https://www.ecotechnika.pl/", title: "ecotechnika.pl" },
  { id: "site-ksiegowy", url: "http://ksiegowy.plus/", title: "ksiegowy.plus" },
];

export function getProject(id: string): Project | undefined {
  return commercialProjects.find((p) => p.id === id);
}

/** Commercial projects with a case study page. */
export const caseStudies = commercialProjects.filter((p) => p.story);

export function projectsForService(serviceId: string): Project[] {
  return caseStudies.filter((p) => p.services?.includes(serviceId));
}
