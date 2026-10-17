import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartShellProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  /** Legend/period slot, top-right. */
  actions?: React.ReactNode;
  /** Chart body. Pass Skeleton children while loading. */
  children?: React.ReactNode;
  loading?: boolean;
}

/** Bordered frame around any chart lib; ships title, legend slot, loading state. */
function ChartShell({ className, title, description, actions, children, loading = false, ...props }: ChartShellProps) {
  return (
    <Card className={cn("rounded-none", className)} {...props}>
      <CardHeader className="flex-row items-start justify-between space-y-0 border-b border-border">
        <div className="flex flex-col gap-1.5">
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex h-64 flex-col justify-end gap-3" aria-busy="true" aria-label="Loading chart">
            <div className="flex items-end gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full" style={{ height: `${25 + ((i * 37) % 70)}%` }} />
              ))}
            </div>
            <Label>Loading</Label>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

export { ChartShell };
