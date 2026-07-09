import type { Block } from "@/content/blog";

// Renders a post body (array of blocks) to semantic, styled HTML. We style
// elements directly instead of relying on a typography plugin.
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-10 max-w-2xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 text-2xl font-bold tracking-tight first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="mt-5 leading-relaxed text-fg/90">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span className="text-fg/90">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 space-y-2">
                {block.items.map((item, j) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                      {j + 1}
                    </span>
                    <span className="pt-0.5 text-fg/90">{item}</span>
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
