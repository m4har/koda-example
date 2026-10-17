import * as React from "react";
import { cn } from "@/lib/utils";

/** Indeterminate wait indicator. Use Skeleton for known-shape content. */
function Spinner({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={cn("size-4 animate-spinner motion-reduce:animate-none", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" strokeOpacity={0.25} />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}

export { Spinner };
