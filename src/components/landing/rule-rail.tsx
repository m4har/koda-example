import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface RuleRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of 20px cells — rows = documentHeight / 20 (reference page: 333). */
  rows?: number;
}

/**
 * Left scroll rule: 28px line-number rail, one 20px cell per row,
 * spans the full document height. Position it in a `relative` page wrapper
 * (`absolute left-0 top-0`) — it scrolls with content, never fixed.
 */
function RuleRail({ rows = 333, className, ...props }: RuleRailProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute left-0 top-0 z-30 flex w-7 flex-col gap-px overflow-hidden", className)}
      {...props}
    >
      {Array.from({ length: rows }, (_, i) => (
        <span
          key={i}
          className={cn("flex h-5 w-7 shrink-0 items-center justify-center bg-background", i === 0 && "bg-transparent")}
        >
          <Label className="text-foreground/40">{i + 1}</Label>
        </span>
      ))}
    </div>
  );
}

export { RuleRail };
