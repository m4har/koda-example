import * as React from "react";
import { cn } from "@/lib/utils";

interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Message — uppercase 12px on koda blue, e.g. "REGISTRATION CLOSES 30 SEP 2026". */
  children: React.ReactNode;
  /** Wraps the message in a link. */
  href?: string;
}

/** Sticky 20px announcement strip — sits above the navbar (navbar sticks at top-5). */
function AnnouncementBar({ className, children, href, ...props }: AnnouncementBarProps) {
  const message = <span className="text-xs font-medium uppercase tracking-wide">{children}</span>;
  return (
    <div
      className={cn("sticky top-0 z-50 flex h-5 items-center justify-center bg-koda-blue px-4 text-black", className)}
      {...props}
    >
      {href ? (
        <a href={href} className="transition-opacity hover:opacity-70">
          {message}
        </a>
      ) : (
        message
      )}
    </div>
  );
}

export { AnnouncementBar };
