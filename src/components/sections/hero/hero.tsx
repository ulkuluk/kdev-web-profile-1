import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/content/hero";
import { SignedScopeDocket } from "./signed-scope-docket";

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative border-b border-border bg-background pt-12 pb-0">
      {/* Drafting grid background decoration */}
      <div className="bg-drafting-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative pb-16 lg:pb-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Heading, Subhead, CTAs, Docket */}
          <div className="flex flex-col lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="mb-6 font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
              {hero.headline}
            </h1>

            <p className="mb-8 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {hero.subheadline}
            </p>

            {/* CTAs: Primary is prominently styled with high-contrast */}
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <Button href={hero.primaryCta.href} variant="primary" size="lg">
                {hero.primaryCta.label} &rarr;
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* Signature Element: Signed Scope MoU Docket */}
            <div className="w-full">
              <SignedScopeDocket docket={hero.signatureDocket} />
            </div>
          </div>

          {/* Right Column: Software House Telemetry & Terminal Blueprint */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Terminal Snippet Moment */}
            <div className="shadow-hard overflow-hidden rounded-xs border border-border-dark bg-[#1A1E24] text-white">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#12151A] px-4 py-2 font-mono text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-500/80" />
                  <span className="size-2 rounded-full bg-amber-500/80" />
                  <span className="size-2 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300">spec/mou-protocol.ts</span>
                </div>
                <span className="font-medium text-accent-glow">READY</span>
              </div>
              <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-300">
                <p className="text-slate-500">
                  {"// Protocol 01: Scope agreed in writing before commit"}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-accent-glow">interface</span>{" "}
                  <span className="font-semibold text-white">DeliveryContract</span> {"{"}
                </p>
                <p className="pl-4">
                  team: <span className="text-amber-400">8</span>;{" "}
                  <span className="text-slate-500">{"// PM, UX, 2 FE, 2 BE, QA, DevOps"}</span>
                </p>
                <p className="pl-4">
                  scopeSigned: <span className="text-emerald-400">true</span>;
                </p>
                <p className="pl-4">
                  deliverable: <span className="text-amber-300">&quot;Production MVP&quot;</span>;
                </p>
                <p className="pl-4">
                  pricingAgreed: <span className="text-emerald-400">true</span>;
                </p>
                <p>{"}"}</p>
                <p className="mt-2 font-semibold text-accent-glow">
                  export const <span className="text-white">initProject</span> = (c:
                  DeliveryContract) =&gt; deploy(c);
                </p>
              </div>
            </div>

            {/* Factual Spec Card */}
            <div className="rounded-xs border border-border bg-card p-5 shadow-sm">
              <div className="mb-2 font-mono text-xs font-semibold text-accent uppercase">
                Operational Guarantee
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Zero Prototype Drop-off
              </h3>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
                Every project is verified by an independent QA engineer and packaged into Docker
                containers with automated GitHub Actions deployment.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 font-mono text-[11px] text-muted-foreground">
                <span>Unit Capacity: 8 Members</span>
                <span className="font-semibold text-foreground">Active Roadmap</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* USER REQUIREMENT: ONE DARK INK-COLORED BAND BEHIND PETEPETE MEDIA SO REAL FOOTAGE POPS */}
      <div className="relative w-full overflow-hidden border-y border-border-dark bg-[#12151A] py-14 text-white">
        <div className="bg-dark-grid pointer-events-none absolute inset-0 opacity-30" />
        <Container className="relative">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-1 font-mono text-xs font-semibold tracking-wider text-accent-glow uppercase">
                PRIMARY DELIVERED WORK FOOTAGE &bull; PETEPETE MVP
              </div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Production-Engineered Creator Tipping Platform
              </h2>
            </div>
            <div className="font-mono text-xs text-slate-400">
              <span className="mr-2 inline-block size-2 rounded-full bg-emerald-400" />
              STATUS: MVP DELIVERED (LAUNCH PAUSED BY CLIENT)
            </div>
          </div>

          {/* Device Frame Viewport for Footage */}
          <div className="shadow-hard-lg overflow-hidden rounded-xs border border-slate-700 bg-[#0B0D11]">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#161A22] px-4 py-2.5 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-slate-600" />
                <span className="size-2.5 rounded-full bg-slate-600" />
                <span className="size-2.5 rounded-full bg-slate-600" />
                <span className="ml-3 font-medium text-slate-300">{hero.mediaBand.label}</span>
              </div>
              <span className="rounded-xs border border-teal-500/30 bg-teal-950/60 px-2 py-0.5 text-[11px] font-semibold text-teal-300">
                {hero.mediaBand.statusTag}
              </span>
            </div>

            {/* Media footage slot */}
            <div className="relative flex aspect-video w-full flex-col items-center justify-center bg-[#080A0E] p-6 text-center sm:aspect-[21/9]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-950/20 via-transparent to-transparent" />
              <div className="relative z-10 max-w-lg">
                <span className="mb-3 inline-block rounded-xs border border-slate-700 bg-slate-900/80 px-2.5 py-1 font-mono text-xs text-teal-400 uppercase">
                  Delivered MVP Showcase
                </span>
                <h3 className="mb-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {hero.mediaBand.appName}
                </h3>
                <p className="mb-6 font-body text-sm text-slate-400">
                  Next.js App Router, multi-tenant creator dashboards, PostgreSQL ledger, and
                  payment gateway hooks.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button href="/work/petepete" variant="accent" size="sm">
                    Read Petepete Technical Case Study &rarr;
                  </Button>
                </div>
              </div>
            </div>

            {/* Telemetry Footer */}
            <div className="grid grid-cols-2 divide-x divide-slate-800 border-t border-slate-800 bg-[#141820] font-mono text-xs sm:grid-cols-4">
              {hero.mediaBand.facts.map((fact, idx) => (
                <div key={idx} className="p-3 text-center sm:text-left">
                  <span className="block text-[10px] tracking-wider text-slate-400 uppercase">
                    {fact.label}
                  </span>
                  <span className="mt-0.5 block truncate font-semibold text-slate-200">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
