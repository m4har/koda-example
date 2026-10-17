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

/** Sticky landing chrome (top-5 = under the 20px announcement bar): hairline bottom border, 12px links, one dark CTA. */
function Navbar({ className, brand, items = [], cta, ...props }: NavbarProps) {
  return (
    <header
      className={cn("sticky top-5 z-40 border-b border-border bg-background/95 backdrop-blur-sm", className)}
      {...props}
    >
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between">
        <a href="/" className="pl-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] sm:pl-8">
          {brand}
        </a>
        <nav className="hidden items-center md:flex" aria-label="Primary">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-[14px] text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {cta ? (
          <Button
            asChild
            className="rounded-none bg-[#222222] pr-4 text-white hover:bg-[#2e2e2e] sm:pr-8"
          >
            <a href={cta.href}>{cta.label}</a>
          </Button>
        ) : null}
      </div>
    </header>
  );
}

export { Navbar };
