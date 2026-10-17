import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar nav content. Stacks above content below lg, sticky column at lg+. */
  sidebar: React.ReactNode;
  /** Shell header content; sticky top-0 z-40, matches landing navbar chrome. */
  header?: React.ReactNode;
  children?: React.ReactNode;
}

/** Console shell: 232px sidebar column + main column, sticky header chrome. */
function SidebarShell({ className, sidebar, header, children, ...props }: SidebarShellProps) {
  return (
    <div className={cn("grid min-h-screen lg:grid-cols-[232px_1fr] lg:items-start", className)} {...props}>
      <aside className="border-b border-border bg-muted/30 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
        {sidebar}
      </aside>
      <div className="flex min-w-0 flex-col">
        {header ? (
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
            {header}
          </header>
        ) : null}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export { SidebarShell };
