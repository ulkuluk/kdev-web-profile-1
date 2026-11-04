import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { CaseStudyFrontmatter } from "@/content/work";
import { getClientDisplayName } from "@/content/work";

export function FeaturedWork({ project }: { project: CaseStudyFrontmatter }) {
  // Collect all stack item names for chips
  const stackChips = project.stack.flatMap((group) => group.items.map((item) => item.name));
  const clientName = getClientDisplayName(project);

  return (
    <section id="work" className="border-b border-border bg-background py-20 sm:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
            {"//"} PROOF OF DELIVERY &bull; FEATURED CASE STUDY
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Production Software Shipped to Specification
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Media Chassis */}
          <div className="lg:col-span-7">
            <div className="shadow-hard overflow-hidden rounded-xs border border-border-dark bg-card">
              <div className="flex items-center justify-between border-b border-border bg-[#ECEAE4] px-4 py-2 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full border border-border-dark bg-white" />
                  <span className="size-2.5 rounded-full border border-border-dark bg-white" />
                  <span className="size-2.5 rounded-full border border-border-dark bg-white" />
                  <span className="ml-3 font-medium text-muted-foreground">
                    petepete-walkthrough.mp4
                  </span>
                </div>
                <span className="font-semibold text-accent">{project.statusLabel}</span>
              </div>

              {/* Viewport placeholder slot */}
              <div className="relative flex aspect-video w-full flex-col items-center justify-center bg-[#181C24] p-6 text-center text-white">
                <div className="bg-dark-grid pointer-events-none absolute inset-0 opacity-20" />
                <span className="relative z-10 mb-3 rounded-xs border border-white/20 bg-black/50 px-3 py-1 font-mono text-[11px] tracking-wider text-accent-glow uppercase">
                  PRIMARY CASE STUDY MEDIA
                </span>
                <h3 className="relative z-10 mb-2 font-display text-2xl font-bold text-white">
                  {project.title}: Creator Tipping Platform
                </h3>
                <p className="relative z-10 max-w-md font-mono text-xs text-slate-400">
                  {project.tagline}
                </p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-background p-3 text-center font-mono text-xs text-muted-foreground">
                <div>
                  <span className="block text-[10px] uppercase">Client</span>
                  <span className="mt-0.5 block truncate font-semibold text-foreground">
                    {clientName}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase">Timeframe</span>
                  <span className="mt-0.5 block font-semibold text-foreground">
                    {project.timeframe}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase">Delivery Team</span>
                  <span className="mt-0.5 block font-semibold text-foreground">
                    {project.teamSize} Specialists
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="flex flex-col lg:col-span-5">
            <div className="mb-2 font-mono text-xs font-semibold text-accent uppercase">
              Case Study &bull; {project.slug}
            </div>

            <h3 className="mb-4 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
              {project.title}: {project.tagline}
            </h3>

            <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </p>

            {/* Spec fact board */}
            <div className="mb-6 grid grid-cols-2 gap-3 rounded-xs border border-border bg-card p-4">
              <div>
                <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                  Delivery Scope
                </span>
                <span className="mt-0.5 block font-display text-sm font-bold text-foreground">
                  Production MVP
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                  Contract Standard
                </span>
                <span className="mt-0.5 block font-display text-sm font-bold text-foreground">
                  Written MoU Scope
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                  Launch Status
                </span>
                <span className="mt-0.5 block font-display text-sm font-bold text-foreground">
                  Paused by Client
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                  Delivery Team
                </span>
                <span className="mt-0.5 block font-display text-sm font-bold text-foreground">
                  8 Specialists
                </span>
              </div>
            </div>

            {/* "Built with" chips read directly from project's content */}
            <div className="mb-8">
              <span className="mb-2 block font-mono text-xs font-medium text-muted-foreground uppercase">
                Built With:
              </span>
              <div className="flex flex-wrap gap-2">
                {stackChips.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xs border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button href={`/work/${project.slug}`} variant="primary" size="md">
                Read Full Case Study &rarr;
              </Button>
              <Link
                href="/work"
                className="font-mono text-xs font-semibold text-accent uppercase hover:underline"
              >
                Browse all work
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
