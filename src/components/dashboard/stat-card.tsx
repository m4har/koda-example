import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  /** e.g. "+12% vs last month". Rendered in mono under the value. */
  delta?: string;
  /** positive | negative — colors the delta token. */
  trend?: "positive" | "negative" | "neutral";
  footer?: React.ReactNode;
}

function StatCard({ className, label, value, delta, trend = "neutral", footer, ...props }: StatCardProps) {
  return (
    <Card className={cn("rounded-none", className)} {...props}>
      <CardHeader className="pb-2">
        <Label>{label}</Label>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span className="font-display text-3xl font-semibold tracking-tight">{value}</span>
        {delta ? (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.1em]",
              trend === "positive" && "text-success",
              trend === "negative" && "text-destructive",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {delta}
          </span>
        ) : null}
        {footer ? <div className="text-xs text-muted-foreground">{footer}</div> : null}
      </CardContent>
    </Card>
  );
}

export { StatCard };
