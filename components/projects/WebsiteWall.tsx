import { websites } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "./DeviceFrames";

// Live sites as browser windows: hovering scrolls through the whole page, and
// the phone shows the same site on mobile.
export function WebsiteWall() {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {websites.map((w) => (
        <li key={w.id}>
          <a href={w.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl outline-none">
            <div className="relative pb-6 pr-6">
              <BrowserFrame
                scrollSrc={`/projects/${w.id}-full.webp`}
                alt={w.title}
                url={w.title}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
              <PhoneFrame src={`/projects/${w.id}-mobile.webp`} alt="" className="absolute bottom-0 right-0 w-[22%] min-w-[72px]" />
            </div>
            <p className="mt-3 text-sm font-medium transition-colors group-hover:text-brand">{w.title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
