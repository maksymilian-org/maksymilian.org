import type { ComponentProps, PropsWithChildren } from "react";
import cn from "classnames";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-brand-soft",
  secondary:
    "border border-border text-fg hover:border-brand hover:text-brand",
};

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: PropsWithChildren<ButtonLinkProps>) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
