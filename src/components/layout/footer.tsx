import Link from "next/link";
import type { NavContent } from "@/content/nav";
import type { SiteContent } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Wordmark } from "./wordmark";

type FooterProps = { site: SiteContent; nav: NavContent };

export function Footer({ site, nav }: FooterProps) {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="border-t border-border bg-card py-16">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Wordmark name={site.name} />
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
          <div className="mt-4 font-mono text-xs text-accent">
            PROTOCOL: WRITTEN MOU &middot; 8-SPECIALIST UNIT
          </div>
        </div>
        <nav aria-label={nav.labels.footerNav}>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 font-mono text-xs tracking-wider uppercase">
            {nav.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-xs py-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {socials.length > 0 && (
          <ul className="flex gap-4 font-mono text-xs tracking-wider uppercase">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xs py-1 text-accent hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
      <Container className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {site.copyright}
        </p>
        <span className="text-[11px] tracking-wider text-muted-foreground uppercase">
          MVP TO PRODUCTION &bull; NO UNWRITTEN CODE
        </span>
      </Container>
    </footer>
  );
}
