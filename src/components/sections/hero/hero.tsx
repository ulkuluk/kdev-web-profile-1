import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/content/hero";
import type { WorkflowContent } from "@/content/process";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "./hero-visual";

type HeroProps = { hero: HeroContent; steps: WorkflowContent["steps"] };

export function Hero({ hero, steps }: HeroProps) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-header">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:py-28">
        <div>
          <span className="font-mono text-xs font-semibold text-primary">{hero.eyebrow}</span>
          <h1
            id="hero-title"
            className="mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {hero.facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-mono text-3xl font-bold text-primary sm:text-4xl">{f.value}</dd>
                <span
                  aria-hidden="true"
                  className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm"
                >
                  {f.label}
                </span>
              </div>
            ))}
          </dl>
        </div>
        <HeroVisual visual={hero.visual} steps={steps} />
      </Container>
    </section>
  );
}
