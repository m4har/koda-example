import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface RuleRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed cell count. Omit to auto-size: cells = measured height / 21 (20px cell + 1px gap), updates on resize. */
  rows?: number;
}

/**
 * Left scroll rule: 28px line-number rail, one 20px cell per row.
 * Auto-sizes to the page (ResizeObserver) unless `rows` is given.
 * Place in a `relative` page wrapper (`absolute left-0 top-0`, `h-full`) —
 * it scrolls with content, never fixed. Offset page content with `pl-7`.
 */
function RuleRail({ rows: rowsProp, className, ...props }: RuleRailProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = React.useState(0);

  React.useEffect(() => {
    if (rowsProp !== undefined || !ref.current) return;
    const el = ref.current;
    // cell (20px) + gap-px (1px) = 21px per row; clamp so the rail never spills past the page.
    const update = () => setMeasured(Math.max(1, Math.ceil((el.clientHeight + 1) / 21)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rowsProp]);

  const rows = rowsProp ?? measured;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "absolute left-0 top-0 z-30 flex h-full w-7 flex-col gap-px overflow-hidden",
        className,
      )}
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
