import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  /** Mono brand mark above the title. */
  brand?: string;
  /** Footer row under the form: sign-up / forgot-password links. */
  footer?: React.ReactNode;
}

/** Centered auth panel: bordered card on muted backdrop, form slot inside. */
function AuthCard({ className, title, description, brand, footer, children, ...props }: AuthCardProps) {
  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-muted/30 p-4", className)} {...props}>
      <div className="flex w-full max-w-sm flex-col gap-4">
        {brand ? (
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em]">{brand}</span>
        ) : null}
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">{children}</CardContent>
        </Card>
        {footer ? (
          <div className="flex items-center justify-between">
            <Label>{footer}</Label>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { AuthCard };
