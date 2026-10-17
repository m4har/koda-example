import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface SectionFrameProps extends React.HTMLAttributes<HTMLElement> {
  /** HUD eyebrow: mono 10px uppercase, e.g. "01 / CURRICULUM". */
  eyebrow?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  as?: "section" | "div";
}

/** Reference-style section chrome: hairline top border, mono index, heading block. */
function SectionFrame({ className, eyebrow, heading, description, as = "section", children, ...props }: SectionFrameProps) {
  const Comp = as;
  return (
    <Comp className={cn("border-t border-border px-4 py-16 sm:px-8 lg:px-16", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {(eyebrow || heading) && (
          <div className="flex flex-col gap-3">
            {eyebrow ? <Label>{eyebrow}</Label> : null}
            {heading ? <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-[48px]">{heading}</h2> : null}
            {description ? <p className="max-w-xl text-sm text-muted-foreground">{description}</p> : null}
          </div>
        )}
        {children}
      </div>
    </Comp>
  );
}

export { SectionFrame };
