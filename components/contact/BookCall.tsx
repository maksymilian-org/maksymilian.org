import { CalendarClock } from "lucide-react";
import { useLocale } from "next-intl";
import cn from "classnames";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";

// "Book a short call" button. When site.bookingUrl is set (e.g. a Google Calendar
// appointment page or Cal.com link) it opens the real calendar. Until then it
// opens the contact form with the call topic pre-selected, so the visitor can
// give a preferred time and the owner replies with a slot.
export function BookCall({
  variant = "outline",
  className,
}: {
  variant?: "outline" | "onBrand";
  className?: string;
}) {
  const locale = useLocale();
  const label = locale === "pl" ? "Umów 15-minutową rozmowę" : "Book a 15-minute call";
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5",
    variant === "onBrand"
      ? "border border-white/50 text-white hover:bg-white/10"
      : "border border-border text-fg hover:border-brand hover:text-brand",
    className
  );

  if (site.bookingUrl) {
    return (
      <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={styles}>
        <CalendarClock className="h-4 w-4" />
        {label}
      </a>
    );
  }
  return (
    <Link href={{ pathname: "/contact", query: { topic: "call" } }} className={styles}>
      <CalendarClock className="h-4 w-4" />
      {label}
    </Link>
  );
}
