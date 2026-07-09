import type { Locale } from "@/i18n/routing";

export interface Localized {
  en: string;
  pl: string;
}

export interface ProjectLink {
  url: string;
  title: string;
}

export interface Project {
  id: string;
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
    links: [
      {
        url: "https://www.studenthousingsoftware.com/",
        title: "studenthousingsoftware.com",
      },
    ],
  },
  {
    id: "audio",
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

export const websites: ProjectLink[] = [
  { url: "https://koniewojciechow.pl/", title: "koniewojciechow.pl" },
  { url: "http://apartamentyogrodowa.pl/en", title: "apartamentyogrodowa.pl" },
  {
    url: "https://fundacja.civitaschristiana.pl/",
    title: "fundacja.civitaschristiana.pl",
  },
  { url: "https://hotel-royalbotanic.pl/", title: "hotel-royalbotanic.pl" },
  { url: "http://ksiegowy.plus/", title: "ksiegowy.plus" },
  { url: "http://forchetto.com/en/", title: "forchetto.com" },
  { url: "http://spstasin.com.pl/", title: "spstasin.com.pl" },
  { url: "https://dermatologlublin.com.pl/", title: "dermatologlublin.com.pl" },
  { url: "https://www.ecotechnika.pl/", title: "ecotechnika.pl" },
];
