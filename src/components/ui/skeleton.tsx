import * as React from "react";
import { cn } from "@/lib/utils";

/** Content with a known shape. Use Spinner for indeterminate waits. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted after:absolute after:inset-y-0 after:w-1/2 after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-background/60 after:to-transparent after:content-[''] motion-reduce:after:animate-none",
        className
      )}
      {...props}
    />
  );
}

/** Multi-line text placeholder. Last bar is short, like real text. */
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-3", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonText };
