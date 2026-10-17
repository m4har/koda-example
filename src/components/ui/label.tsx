import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The kit's ONE micro-label primitive.
 * Monospace, 10px, uppercase, tracking 0.1em — reuse everywhere, never redefine.
 */
function Label({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Label };
