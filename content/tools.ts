import type { IllustrationKey } from "@/content/services";
import type { L } from "@/content/quote";

const l = (pl: string, en: string): L => ({ pl, en });

// Free interactive tools: useful on their own, easy to link to, and each ends
// in a relevant quote category.
export interface Tool {
  id: string;
  slug: string;
  illustration: IllustrationKey;
  title: L;
  h1: L;
  lead: L;
  metaTitle: L;
  metaDescription: L;
}

export const tools: Tool[] = [
  {
    id: "ksef-readiness",
    slug: "ksef-readiness",
    illustration: "ksef",
    title: l("Test gotowości do KSeF", "KSeF readiness test"),
    h1: l("Czy Twoja firma jest gotowa na KSeF? Darmowy test w 10 pytaniach", "Is your company ready for KSeF? A free 10-question test"),
    lead: l(
      "KSeF już obowiązuje większość firm. Sprawdź w dwie minuty, co masz uporządkowane, a co wymaga pracy, i dostań listę konkretnych kroków.",
      "KSeF already applies to most companies. Check in two minutes what you have in order and what needs work, and get a list of concrete steps."
    ),
    metaTitle: l("Test gotowości do KSeF: sprawdź swoją firmę w 2 minuty", "KSeF readiness test: check your company in 2 minutes"),
    metaDescription: l(
      "Darmowy test w 10 pytaniach: integracja, odbiór faktur, korekty, tryb offline, UPO. Dostajesz wynik i listę rzeczy do zrobienia przed problemami z KSeF.",
      "A free 10-question test: integration, receiving invoices, corrections, offline mode, UPO. You get a score and a list of things to do before KSeF causes trouble."
    ),
  },
  {
    id: "automation-roi",
    slug: "automation-roi",
    illustration: "integrations",
    title: l("Kalkulator zwrotu z automatyzacji", "Automation payback calculator"),
    h1: l("Kalkulator automatyzacji: ile oszczędzisz i po jakim czasie to się zwróci", "Automation calculator: how much you will save and when it pays back"),
    lead: l(
      "Wpisz, ile czasu zajmuje Wam powtarzalne zadanie, a zobaczysz roczny koszt pracy ręcznej, oszczędność i czas zwrotu z automatyzacji.",
      "Enter how much time a repetitive task takes you and see the yearly cost of the manual work, the saving and the payback time of automating it."
    ),
    metaTitle: l("Kalkulator automatyzacji: oszczędność i czas zwrotu", "Automation calculator: savings and payback time"),
    metaDescription: l(
      "Darmowy kalkulator: policz roczny koszt pracy ręcznej, oszczędność z automatyzacji i czas zwrotu inwestycji. Dla małych i średnich firm.",
      "A free calculator: work out the yearly cost of manual work, the saving from automation and the payback time of the investment. For small and medium businesses."
    ),
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
