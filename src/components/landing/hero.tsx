import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
}

/** Full-bleed hero: mono eyebrow, big display heading, action slot. */
function Hero({ className, eyebrow, heading, description, actions, meta, ...props }: HeroProps) {
  return (
    <section className={cn("border-b border-border px-4 py-20 sm:px-8 lg:py-28", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6">
        {eyebrow ? <Label>{eyebrow}</Label> : null}
        <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-[68px]">{heading}</h1>
        {description ? <p className="max-w-xl text-base text-muted-foreground">{description}</p> : null}
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
        {meta ? <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">{meta}</div> : null}
      </div>
    </section>
  );
}

export { Hero };
