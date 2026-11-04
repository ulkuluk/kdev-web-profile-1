import type { NavContent } from "@/content/nav";
import type { SiteContent } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Wordmark } from "./wordmark";

type FooterProps = { site: SiteContent; nav: NavContent };

export function Footer({ site, nav }: FooterProps) {
  // Socials with an empty href are hidden; the whole list disappears if none remain.
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="border-t border-border bg-card py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Wordmark name={site.name} />
          <p className="mt-3 text-sm text-muted-foreground">{site.tagline}</p>
        </div>
        <nav aria-label={nav.labels.footerNav}>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm py-1 text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {socials.length > 0 && (
          <ul className="flex gap-4 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm py-1 font-medium text-primary hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
      <Container className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
        <p>
          � {new Date().getFullYear()} {site.copyright}
        </p>
      </Container>
    </footer>
  );
}
