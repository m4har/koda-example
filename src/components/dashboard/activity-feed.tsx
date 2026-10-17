import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Activity {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  /** Optional status token dot. */
  tone?: "default" | "success" | "warning" | "destructive";
}

interface ActivityFeedProps extends React.OlHTMLAttributes<HTMLOListElement> {
  items: Activity[];
  emptyLabel?: string;
}

const toneClass: Record<NonNullable<Activity["tone"]>, string> = {
  default: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

/** Vertical timeline with hairline rail and tone dots. */
function ActivityFeed({ className, items, emptyLabel = "No activity yet", ...props }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className={cn("flex h-32 items-center justify-center border border-dashed border-border", className)}>
        <Label>{emptyLabel}</Label>
      </div>
    );
  }
  return (
    <ol className={cn("flex flex-col", className)} {...props}>
      {items.map((item) => (
        <li key={item.id} className="relative flex gap-4 border-b border-border py-4 last:border-b-0">
          <span aria-hidden className={cn("mt-1.5 size-2 shrink-0", toneClass[item.tone ?? "default"])} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate text-sm font-medium">{item.title}</span>
            {item.description ? <span className="text-xs text-muted-foreground">{item.description}</span> : null}
          </div>
          <Label className="shrink-0 whitespace-nowrap">{item.timestamp}</Label>
        </li>
      ))}
    </ol>
  );
}

export { ActivityFeed };
