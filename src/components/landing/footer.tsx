import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand: string;
  tagline?: string;
  columns?: FooterColumn[];
}

/** Hairline footer: brand block + mono link columns + bottom bar. */
function Footer({ className, brand, tagline, columns = [], ...props }: FooterProps) {
  return (
    <footer className={cn("border-t border-border px-4 py-12 sm:px-8", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em]">{brand}</span>
            {tagline ? <p className="max-w-xs text-sm text-muted-foreground">{tagline}</p> : null}
          </div>
          {columns.map((column) => (
            <nav key={column.title} className="flex flex-col gap-2.5" aria-label={column.title}>
              <Label>{column.title}</Label>
              {column.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Label>{`© ${new Date().getFullYear()} ${brand}`}</Label>
          <Label>Built with koda-ui</Label>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
