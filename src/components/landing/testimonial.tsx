import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialProps extends React.HTMLAttributes<HTMLElement> {
  items: Testimonial[];
}

/** Quote cards in a hairline grid; initials square instead of photos. */
function Testimonial({ className, items, ...props }: TestimonialProps) {
  return (
    <div className={cn("grid gap-px border border-border bg-border md:grid-cols-3", className)} {...props}>
      {items.map((item) => (
        <figure key={item.name} className="flex flex-col gap-4 bg-background p-6">
          <blockquote className="text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
          <figcaption className="mt-auto flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center border border-border bg-muted font-mono text-[10px] font-medium uppercase tracking-[0.1em]"
            >
              {item.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium">{item.name}</span>
              <Label>{item.role}</Label>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export { Testimonial };
