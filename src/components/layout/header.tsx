import type { NavContent } from "@/content/nav";
import type { SiteContent } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

type HeaderProps = { nav: NavContent; siteName: SiteContent["name"] };

export function Header({ nav, siteName }: HeaderProps) {
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 h-header border-x-0 border-t-0 shadow-sm">
      <Container className="flex h-full items-center justify-between gap-6">
        <a href="#top" aria-label={nav.labels.home} className="rounded-sm">
          <Wordmark name={siteName} />
        </a>
        <nav aria-label={nav.labels.primaryNav} className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:px-3"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button href={nav.cta.href} className="hidden sm:inline-flex">
            {nav.cta.label}
          </Button>
          <MobileNav items={nav.items} cta={nav.cta} labels={nav.labels} />
        </div>
      </Container>
    </header>
  );
}
