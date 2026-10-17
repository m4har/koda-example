import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Feature {
  index?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureGridProps extends React.HTMLAttributes<HTMLElement> {
  features: Feature[];
}

/** Hairline grid: gap-px on bg-border parent, bg-background children. */
function FeatureGrid({ className, features, ...props }: FeatureGridProps) {
  return (
    <div
      className={cn("grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    >
      {features.map((feature, i) => (
        <div key={feature.title} className="flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-muted/40">
          <div className="flex items-center justify-between">
            {feature.icon ? <span className="text-primary [&_svg]:size-5">{feature.icon}</span> : null}
            <Label>{feature.index ?? String(i + 1).padStart(2, "0")}</Label>
          </div>
          <h3 className="font-display text-base font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export { FeatureGrid };
