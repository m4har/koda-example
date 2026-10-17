import * as React from "react";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface Social {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand: string;
  tagline?: string;
  columns?: FooterColumn[];
  /** Newsletter row; `false` hides it. */
  newsletter?: { heading?: string; placeholder?: string; buttonLabel?: string } | false;
  /** Social icons row; defaults to Instagram / LinkedIn / YouTube. */
  socials?: Social[];
}

const defaultSocials: Social[] = [
  { label: "Instagram", href: "https://instagram.com", icon: <Instagram aria-hidden /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin aria-hidden /> },
  { label: "YouTube", href: "https://youtube.com", icon: <Youtube aria-hidden /> },
];

/** Hairline footer: brand block + mono link columns + newsletter + socials + bottom bar. */
function Footer({
  className,
  brand,
  tagline,
  columns = [],
  newsletter = {},
  socials = defaultSocials,
  ...props
}: FooterProps) {
  const nl = newsletter === false ? null : newsletter;
  return (
    <footer className={cn("border-t border-border px-4 py-12 sm:px-8", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em]">{brand}</span>
            {tagline ? <p className="max-w-xs text-sm text-muted-foreground">{tagline}</p> : null}
          </div>
          {columns.map((column) => (
            <nav key={column.title} className="flex flex-col gap-2.5" aria-label={column.title}>
              <Label>{column.title}</Label>
              {column.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        {nl ? (
          <form
            className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label>{nl.heading ?? "Newsletter"}</Label>
              <p className="max-w-md text-sm text-muted-foreground">
                Batch dates and registration deadlines, no noise.
              </p>
            </div>
            <div className="flex w-full gap-px sm:w-auto">
              <Input
                type="email"
                required
                aria-label="Email address"
                placeholder={nl.placeholder ?? "you@example.com"}
                className="h-10 w-full sm:w-64"
              />
              <Button
                type="submit"
                className="h-10 rounded-none bg-[#434343] text-white hover:bg-[#4f4f4f]"
              >
                {nl.buttonLabel ?? "Langganan"}
              </Button>
            </div>
          </form>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Label>{`© ${new Date().getFullYear()} ${brand}`}</Label>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-4"
              >
                {social.icon}
              </a>
            ))}
            <Label>Built with koda-ui</Label>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
