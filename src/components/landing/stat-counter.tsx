import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Stat {
  value: string;
  label: string;
}

interface StatCounterProps extends React.HTMLAttributes<HTMLElement> {
  stats: Stat[];
}

/** Numeric proof strip: hairline grid of value + mono caption pairs. */
function StatCounter({ className, stats, ...props }: StatCounterProps) {
  return (
    <div className={cn("grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4", className)} {...props}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 bg-background p-6">
          <span className="font-display text-4xl font-semibold tracking-tight text-primary">{stat.value}</span>
          <Label>{stat.label}</Label>
        </div>
      ))}
    </div>
  );
}

export { StatCounter };
