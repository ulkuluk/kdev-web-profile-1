import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getCaseStudies, getClientDisplayName } from "@/content/work";

export const metadata: Metadata = {
  title: "Delivered Work & Production Case Studies",
  description:
    "Production software engineered by KDEV: verified web applications, creator platforms, and systems delivered from written scope to live deployment.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  const caseStudies = getCaseStudies();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="mb-14 max-w-2xl">
          <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
            {"//"} DELIVERED WORK &bull; PORTFOLIO
          </div>
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Production Software Built Under Written Scope
          </h1>
          <p className="font-body text-lg leading-relaxed text-muted-foreground">
            Every project we deliver is built to production readiness with real databases,
            authentication, and continuous deployment. We never stop at prototypes.
          </p>
        </div>

        {/* Case Studies Grid + "Your Project Could Be Next" Card */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {caseStudies.map((project) => {
            const clientName = getClientDisplayName(project);
            return (
              <div
                key={project.slug}
                className="shadow-hard flex flex-col justify-between overflow-hidden rounded-xs border border-border-dark bg-card transition-all hover:-translate-y-0.5"
              >
                <div>
                  {/* Browser bar */}
                  <div className="flex items-center justify-between border-b border-border bg-[#ECEAE4] px-4 py-2 font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full border border-border-dark bg-white" />
                      <span className="size-2 rounded-full border border-border-dark bg-white" />
                      <span className="size-2 rounded-full border border-border-dark bg-white" />
                      <span className="ml-2 font-medium text-muted-foreground">
                        {project.slug}.app
                      </span>
                    </div>
                    <span className="font-bold text-accent">{project.statusLabel}</span>
                  </div>

                  {/* Media Viewport */}
                  <div className="relative flex aspect-video w-full flex-col items-center justify-center bg-[#1A1E24] p-6 text-center text-white">
                    <div className="bg-dark-grid pointer-events-none absolute inset-0 opacity-20" />
                    <span className="relative z-10 mb-2 rounded-xs border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-accent-glow uppercase">
                      CASE STUDY CINEMA
                    </span>
                    <h3 className="relative z-10 mb-1 font-display text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="relative z-10 font-mono text-xs text-slate-400">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between border-b border-border pb-3 font-mono text-xs text-muted-foreground">
                      <span>Client: {clientName}</span>
                      <span>Cadence: {project.timeframe}</span>
                    </div>

                    <p className="mb-6 font-body text-sm leading-relaxed text-foreground/90 sm:text-base">
                      {project.summary}
                    </p>

                    <div>
                      <span className="mb-2 block font-mono text-[10px] font-medium text-muted-foreground uppercase">
                        Technologies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack
                          .flatMap((g) => g.items.map((i) => i.name))
                          .slice(0, 5)
                          .map((tech) => (
                            <span
                              key={tech}
                              className="rounded-xs border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border p-6 pt-0">
                  <Button href={`/work/${project.slug}`} variant="primary" size="sm">
                    Read Case Study &rarr;
                  </Button>
                  <span className="font-mono text-xs text-muted-foreground">
                    Team: {project.teamSize} Specialists
                  </span>
                </div>
              </div>
            );
          })}

          {/* "Your project could be next" card */}
          <div className="flex flex-col justify-between rounded-xs border-2 border-dashed border-border-dark bg-background p-8 sm:p-10">
            <div>
              <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
                {"//"} YOUR ROADMAP
              </div>
              <h3 className="mb-4 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                Your Startup MVP Could Be Next
              </h3>
              <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
                Have a product idea that needs to be taken all the way to a production-ready
                release? We agree on scope, milestones, and price in writing before writing a single
                line of code.
              </p>
              <div className="mb-8 space-y-2 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <span>Binding written MoU with deliverable guarantees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <span>Dedicated 8-person team assigned to your project</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <span>Full code repository ownership with zero lock-in</span>
                </div>
              </div>
            </div>

            <div>
              <Button href="/contact" variant="primary" size="md">
                Start Your MVP &rarr;
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
