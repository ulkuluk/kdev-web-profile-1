import Link from "next/link";
import type { NavContent } from "@/content/nav";
import type { SiteContent } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

type HeaderProps = { nav: NavContent; siteName: SiteContent["name"] };

export function Header({ nav, siteName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-header border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={nav.labels.home}
          className="rounded-xs focus-visible:outline-offset-2"
        >
          <Wordmark name={siteName} />
        </Link>
        <nav aria-label={nav.labels.primaryNav} className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {nav.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-xs px-3 py-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Button href={nav.cta.href} variant="primary" size="sm" className="hidden sm:inline-flex">
            {nav.cta.label}
          </Button>
          <MobileNav items={nav.items} cta={nav.cta} labels={nav.labels} />
        </div>
      </Container>
    </header>
  );
}
