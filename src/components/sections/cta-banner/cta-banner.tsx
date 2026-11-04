import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section id="cta" className="relative border-b border-border bg-background py-20 sm:py-24">
      <div className="bg-drafting-grid pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative">
        <div className="shadow-hard overflow-hidden rounded-xs border border-border-dark bg-primary p-8 text-on-primary sm:p-12">
          <div className="max-w-2xl">
            <div className="mb-3 font-mono text-xs font-semibold tracking-wider text-accent-glow uppercase">
              {"//"} READY TO BUILD YOUR MVP?
            </div>
            <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Scope, milestones, and price locked in writing before code starts.
            </h2>
            <p className="mb-8 max-w-xl font-body text-base leading-relaxed text-slate-300">
              Talk to our team about your product concept. We reply within one business day with
              scope boundaries, delivery timeline, and clear milestone estimates.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="accent" size="lg">
                Start Your MVP &rarr;
              </Button>
              <Button
                href="/services"
                variant="secondary"
                size="lg"
                className="border-slate-600 bg-transparent text-white hover:border-white hover:bg-white/10"
              >
                View Services &amp; MoU
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
