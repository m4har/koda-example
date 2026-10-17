import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NextDirimuBandProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Registration page target. */
  href: string;
  /** Band text — rendered huge and uppercase. Pass your final-conversion phrase. */
  label?: string;
}

/** Full-width giant uppercase link band — the final push before the footer. */
function NextDirimuBand({ className, href, label = "Next Dirimu", ...props }: NextDirimuBandProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex items-end justify-between gap-6 border border-border bg-card px-4 py-8 outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-10 lg:px-16",
        className
      )}
      {...props}
    >
      <span className="font-display text-[13vw] font-medium uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-primary sm:text-[96px]">
        {label}
      </span>
      <ArrowRight
        aria-hidden
        className="mb-2 size-8 shrink-0 transition-transform duration-150 motion-reduce:transition-none group-hover:translate-x-1 sm:mb-4 sm:size-12"
      />
    </a>
  );
}

export { NextDirimuBand };
