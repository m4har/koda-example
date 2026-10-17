import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-none border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground",
        outline: "border-border text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        success: "border-transparent bg-[#35d49c]/15 text-[#128a63] dark:text-[#35d49c]",
        warning: "border-transparent bg-[#fcbb40]/15 text-[#8a6400] dark:text-[#fcbb40]",
        destructive: "border-transparent bg-destructive/15 text-destructive",
        info: "border-transparent bg-[#1d64ff]/15 text-[#1d64ff] dark:text-[#6cc7f2]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
