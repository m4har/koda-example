import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface CurriculumModule {
  /** Padded module number, e.g. "01". */
  nomor: string;
  judul: string;
  /** Materials count — part of the trigger accessible name ("Lihat 6 materi"). */
  materiCount: number;
  /** Expanded panel content. */
  isi: React.ReactNode;
}

interface CurriculumAccordionProps extends React.HTMLAttributes<HTMLElement> {
  modules: CurriculumModule[];
  heading?: React.ReactNode;
  /** Section eyebrow. */
  eyebrow?: string;
  /** Counter chip in the header; defaults to `N modul` from `modules.length`. */
  counterLabel?: string;
  /** Pre-opened module index; default 0. */
  defaultOpen?: number;
}

/**
 * Single-open curriculum accordion. Each trigger is a native button whose
 * accessible name is the combined text "NN Judul Modul Lihat N materi"
 * (number + title + materials meta), and the section header carries the
 * module counter. Deliberately standalone — no accordion primitive exists in
 * ui/ yet, and the numbered-trigger contract is specific to this section.
 */
function CurriculumAccordion({
  className,
  modules,
  heading,
  eyebrow,
  counterLabel,
  defaultOpen = 0,
  ...props
}: CurriculumAccordionProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const baseId = React.useId();
  const counter = counterLabel ?? `${modules.length} modul`;

  return (
    <section className={cn("flex flex-col gap-10", className)} {...props}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          {eyebrow ? <Label>{eyebrow}</Label> : null}
          {eyebrow ? <span aria-hidden className="h-3 w-px bg-border" /> : null}
          <Label className="text-primary">{counter}</Label>
        </div>
        {heading ? (
          <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-[48px]">
            {heading}
          </h2>
        ) : null}
      </div>
      <div className="border-b border-border">
        {modules.map((module, i) => {
          const isOpen = open === i;
          return (
            <div key={module.nomor} className="border-t border-border">
              <h3>
                <button
                  type="button"
                  id={`${baseId}-trigger-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 py-5 text-left outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-6"
                >
                  <span className="font-mono text-sm text-primary">{module.nomor}</span>
                  <span className="font-display text-xl font-medium tracking-tight">{module.judul}</span>
                  <Label className="ml-auto shrink-0">Lihat {module.materiCount} materi</Label>
                </button>
              </h3>
              <div
                id={`${baseId}-panel-${i}`}
                role="region"
                aria-labelledby={`${baseId}-trigger-${i}`}
                hidden={!isOpen}
                className="sm:px-6 sm:pl-16"
              >
                <p className="py-5 text-sm leading-relaxed text-muted-foreground">{module.isi}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { CurriculumAccordion, type CurriculumModule };
