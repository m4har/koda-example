import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  title: string;
  /** Right-side mono hint, e.g. "Lihat 5 materi". */
  meta?: string;
  content: React.ReactNode;
}

/** Disclosure list built from primitives: button header + region panel. */
function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className={cn("border border-border", className)}>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.title} className="border-b border-border last:border-b-0">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-muted/50 active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{item.title}</span>
                <span className="flex items-center gap-3">
                  {item.meta ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{item.meta}</span>
                  ) : null}
                  <ChevronDown
                    aria-hidden
                    className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-150", expanded && "rotate-180")}
                  />
                </span>
              </button>
            </h3>
            {expanded ? (
              <div className="border-t border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">{item.content}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
