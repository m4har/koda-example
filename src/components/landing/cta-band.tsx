import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface CtaBandProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Closing conversion band: accent hairline top, heading + action slot. */
function CtaBand({ className, eyebrow, heading, description, actions, ...props }: CtaBandProps) {
  return (
    <section className={cn("border-t-2 border-primary bg-muted px-4 py-16 sm:px-8", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5">
        {eyebrow ? <Label>{eyebrow}</Label> : null}
        <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        {description ? <p className="max-w-xl text-sm text-muted-foreground">{description}</p> : null}
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export { CtaBand };
