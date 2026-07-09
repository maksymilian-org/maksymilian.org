import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Messenger from "./icons/Messenger";
import WhatsApp from "./icons/WhatsApp";
import GoogleMaps from "./icons/GoogleMaps";
import { site } from "@/content/site";

const links = [
  { href: site.social.github, label: "GitHub", Icon: Github },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedIn },
  { href: site.social.messenger, label: "Messenger", Icon: Messenger },
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsApp },
  { href: site.googleProfile, label: "Google Maps", Icon: GoogleMaps },
];

export function Social({ className }: { className?: string }) {
  return (
    <ul className={"flex items-center gap-3 " + (className ?? "")}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-brand hover:text-brand [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
