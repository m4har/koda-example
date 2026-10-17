import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Pillar {
  /** Rendered uppercase — keep titles short. */
  title: string;
  description: string;
  index?: string;
}

interface CareerPillarsProps extends React.HTMLAttributes<HTMLElement> {
  /** Mono eyebrow, e.g. "KENAPA MEMILIH BOOTCAMP INI". */
  eyebrow?: string;
  heading?: React.ReactNode;
  pillars: Pillar[];
}

/** "Why us" section: eyebrow + heading + four uppercase pillar cards on a hairline grid. */
function CareerPillars({ className, eyebrow, heading, pillars, ...props }: CareerPillarsProps) {
  return (
    <section className={cn("flex flex-col gap-10", className)} {...props}>
      {(eyebrow || heading) && (
        <div className="flex flex-col gap-3">
          {eyebrow ? <Label>{eyebrow}</Label> : null}
          {heading ? (
            <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-[48px]">
              {heading}
            </h2>
          ) : null}
        </div>
      )}
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <div key={pillar.title} className="flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-muted/40">
            <Label>{pillar.index ?? String(i + 1).padStart(2, "0")}</Label>
            <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-tight">{pillar.title}</h3>
            <p className="text-sm text-muted-foreground">{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { CareerPillars };
