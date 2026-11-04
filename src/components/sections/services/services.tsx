import React from "react";
import { Check, X, ArrowRight } from "lucide-react";
import type { ServicesContent } from "@/content/services";
import type { FaqContent } from "@/content/faq";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export function ServicesOverview({
  services,
  faq,
}: {
  services: ServicesContent;
  faq: FaqContent;
}) {
  return (
    <div className="space-y-24 py-12 sm:py-16">
      {/* 1. Header & MVP-to-Production Offer */}
      <section className="relative">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-3 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} {services.eyebrow}
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {services.title}: From First Scope to Live Deployment
            </h1>
            <p className="mb-8 font-body text-xl leading-relaxed text-muted-foreground">
              {services.mvpOffer.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start Your MVP Under Written Scope &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. What's Included vs. What's Not Included */}
      <section className="border-y border-border bg-card py-16">
        <Container>
          <div className="mb-12 max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} DELIVERY BOUNDARIES
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              What Is Included (and What Is Excluded)
            </h2>
            <p className="mt-2 font-body text-base text-muted-foreground">
              We work under strict covenants. You always know what is in scope before any code is
              committed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* What's Included */}
            <div className="shadow-hard rounded-xs border-2 border-accent bg-accent-tint/30 p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-accent/20 pb-4">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Included in Every MVP
                </h3>
                <span className="rounded-xs bg-accent px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-on-accent uppercase">
                  GUARANTEED
                </span>
              </div>
              <ul className="space-y-4">
                {services.mvpOffer.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-xs bg-accent text-on-accent">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    <span className="font-body text-sm leading-snug text-foreground sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Not Included */}
            <div className="rounded-xs border border-border bg-background p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Excluded from Scope
                </h3>
                <span className="rounded-xs border border-border bg-muted px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  ANTI-CREEP
                </span>
              </div>
              <ul className="space-y-4">
                {services.mvpOffer.notIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-xs border border-border text-muted-foreground">
                      <X className="size-3" aria-hidden="true" />
                    </span>
                    <span className="font-body text-sm leading-snug text-muted-foreground sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Full Engagement Flow (Phases 1 to 5) */}
      <section>
        <Container>
          <div className="mb-14 max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} COMPLETE ENGAGEMENT PROTOCOL
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Phases, Milestones &amp; Deliverables
            </h2>
            <p className="mt-3 font-body text-base text-muted-foreground">
              From our binding written agreement to production launch, every phase delivers
              concrete, verifiable assets.
            </p>
          </div>

          <div className="space-y-6">
            {services.phases.map((phase) => (
              <div
                key={phase.id}
                className={cn(
                  "rounded-xs border p-6 transition-all sm:p-8",
                  phase.isMoUAnchor
                    ? "shadow-hard border-border-dark bg-card ring-1 ring-border-dark"
                    : "border-border bg-background hover:border-border-dark",
                )}
              >
                <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-xs border border-border-dark bg-primary font-mono text-xs font-bold text-on-primary">
                      {phase.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {phase.name}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        Estimated Cadence: {phase.timeline}
                      </span>
                    </div>
                  </div>

                  {phase.reviewStatus && (
                    <span
                      className={cn(
                        "self-start rounded-xs border px-2.5 py-1 font-mono text-xs font-semibold sm:self-center",
                        phase.isMoUAnchor
                          ? "border-accent bg-accent-tint text-accent"
                          : "border-border bg-muted text-muted-foreground",
                      )}
                    >
                      {phase.reviewStatus}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="mb-3 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                    Phase Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {phase.deliverables.map((d, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xs border border-border bg-card p-3 font-mono text-xs text-foreground"
                      >
                        <span className="size-1.5 rounded-full bg-accent" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Pricing Approach */}
      <section className="border-y border-border bg-card py-16">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} PRICING PRINCIPLES
            </div>
            <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-foreground">
              {services.pricing.title}
            </h2>
            <p className="mb-6 font-body text-lg leading-relaxed text-muted-foreground">
              {services.pricing.description}
            </p>
            <div className="rounded-xs border border-border bg-background p-5 font-mono text-xs text-muted-foreground">
              <span className="font-bold text-foreground">TODO Notice: </span>
              {services.pricing.packagesNote}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Core Capabilities (Secondary) */}
      <section>
        <Container>
          <div className="mb-12 max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} TECHNICAL CAPABILITIES
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Software Solutions We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.capabilities.map((cap) => (
              <div
                key={cap.id}
                className="hover:shadow-hard flex flex-col justify-between rounded-xs border border-border bg-card p-6 transition-all hover:border-border-dark"
              >
                <div>
                  <div className="mb-5 flex size-10 items-center justify-center rounded-xs border border-border-dark bg-primary text-on-primary">
                    <Icon name={cap.icon} className="size-5" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                    {cap.summary}
                  </p>

                  <div className="mb-6 space-y-4">
                    <div>
                      <span className="mb-2 block font-mono text-[10px] font-medium text-muted-foreground uppercase">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1.5 font-mono text-xs text-foreground">
                        {cap.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="size-1 rounded-full bg-accent" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="mb-2 block font-mono text-[10px] font-medium text-muted-foreground uppercase">
                        Example Use Cases
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.examples.map((ex, i) => (
                          <span
                            key={i}
                            className="rounded-xs border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Button
                    href="/contact"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between"
                  >
                    <span>Discuss this build</span>
                    <ArrowRight className="size-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FAQ Section (Moved to /services per BRIEF-v2) */}
      <section className="border-t border-border bg-card py-20">
        <Container>
          <div className="mb-14 max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {faq.title}
            </h2>
            <p className="mt-2 font-body text-base text-muted-foreground">{faq.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {faq.items.map((item) => (
              <div
                key={item.id}
                className="rounded-xs border border-border bg-background p-6 transition-all hover:border-border-dark"
              >
                <h3 className="mb-3 font-display text-lg font-bold text-foreground">
                  {item.question}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
