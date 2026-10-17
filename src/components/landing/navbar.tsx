import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: string;
  items?: NavItem[];
  cta?: { label: string; href: string };
}

/** Sticky landing chrome: hairline bottom border, mono links, one CTA. */
function Navbar({ className, brand, items = [], cta, ...props }: NavbarProps) {
  return (
    <header
      className={cn("sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm", className)}
      {...props}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
        <a href="/" className="font-mono text-xs font-semibold uppercase tracking-[0.1em]">
          {brand}
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {cta ? (
          <Button asChild size="sm">
            <a href={cta.href}>{cta.label}</a>
          </Button>
        ) : null}
      </div>
    </header>
  );
}

export { Navbar };
