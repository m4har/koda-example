import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type AlumniTone = "pink" | "yellow" | "green" | "blue";

interface AlumniStory {
  name: string;
  /** Graduation year, e.g. "2025". */
  year: string;
  role: string;
  /** Card accent — one of the `--alumni-*` tokens. */
  tone: AlumniTone;
}

interface AlumniCarouselProps extends React.HTMLAttributes<HTMLElement> {
  /** Alumni stories — 10 slides in the reference composition. */
  items: AlumniStory[];
  /** Link target for the "Tonton cerita lengkap" button. */
  storyHref?: string;
}

/**
 * Alumni story carousel: one tone-tagged active slide (name + role large,
 * "Tonton cerita lengkap" CTA) with Previous/Next controls and numbered
 * dot buttons (aria-label `Putar slide N`). Uncontrolled; wraps around.
 * Tone colors come from `--alumni-pink/-yellow/-green/-blue` in globals.css.
 */
function AlumniCarousel({ className, items, storyHref = "#", ...props }: AlumniCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const total = items.length;
  const active = items[index];
  const goTo = (i: number) => setIndex((i + total) % total);

  if (!total) return null; // ponytail: empty state = render nothing; real slot states live in the consumer page

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Cerita alumni"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {/* Active slide — tone accent via --alumni-* token */}
      <div
        className="flex flex-wrap items-start justify-between gap-6 border border-border bg-card p-6 sm:p-10"
        style={{ borderTop: `4px solid var(--alumni-${active.tone})` }}
      >
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")} &middot; lulus {active.year}
          </span>
          <p className="font-display text-4xl font-medium leading-none tracking-tight sm:text-6xl">{active.name}</p>
          <p className="text-sm text-muted-foreground">{active.role}</p>
        </div>
        <Button size="lg" asChild className="shrink-0">
          <a href={storyHref}>Tonton cerita lengkap</a>
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" aria-label="Previous" onClick={() => goTo(index - 1)}>
            <ChevronLeft aria-hidden />
          </Button>
          <Button variant="outline" size="icon" aria-label="Next" onClick={() => goTo(index + 1)}>
            <ChevronRight aria-hidden />
          </Button>
        </div>
        <div role="group" aria-label="Navigasi slide alumni" className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Putar slide ${i + 1}`}
              aria-current={i === index || undefined}
              onClick={() => goTo(i)}
              className={cn(
                "size-3 border transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                i === index ? "border-primary bg-primary" : "border-border bg-transparent hover:bg-accent"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { AlumniCarousel };
