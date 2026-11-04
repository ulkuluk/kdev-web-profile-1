import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About the Team & Delivery Unit",
  description:
    "An integrated 8-specialist software engineering unit: PM, UI/UX, 2 Frontend, 2 Backend, QA, and DevOps engineers taking startup ideas to production.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="space-y-20 py-16 sm:py-20">
      {/* 1. Header */}
      <section>
        <Container>
          <div className="max-w-3xl">
            <div className="mb-3 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} {about.eyebrow}
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {about.title}
            </h1>
            <p className="mb-6 font-body text-xl leading-relaxed text-muted-foreground">
              {about.description}
            </p>
            {about.productVision && (
              <p className="border-l-2 border-accent py-1 pl-4 font-body text-base text-foreground/80 italic">
                &ldquo;{about.productVision}&rdquo;
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* 2. The Team of 8 */}
      <section className="border-y border-border bg-card py-16">
        <Container>
          <div className="mb-12 max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} THE 8 SPECIALISTS
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              One Cross-Functional Delivery Unit
            </h2>
            <p className="mt-2 font-body text-base text-muted-foreground">
              Every project is staffed with this exact team composition. No junior sub-contractors,
              no handoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.team.members.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between overflow-hidden rounded-xs border border-border bg-background p-5 transition-all hover:border-border-dark"
              >
                <div>
                  {/* Photo / Avatar slot */}
                  <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-xs border border-border bg-muted font-mono text-2xl font-bold text-accent">
                    {member.initials || "KDEV"}
                  </div>
                  <div className="mb-1 font-mono text-xs font-bold tracking-wider text-accent uppercase">
                    {member.role}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">{member.name}</h3>
                </div>

                <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 font-mono text-xs">
                  {member.github ? (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      GitHub
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400">[GitHub TODO]</span>
                  )}
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400">[LinkedIn TODO]</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. How We Work (Operating Principles) */}
      <section>
        <Container>
          <div className="mb-12 max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} HOW WE OPERATE
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Engineering Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {about.principles.map((principle, idx) => (
              <div
                key={idx}
                className="rounded-xs border border-t-4 border-border border-t-border-dark bg-card p-6"
              >
                <div className="mb-2 font-mono text-xs font-bold text-accent">
                  PRINCIPLE 0{idx + 1}
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-foreground">
                  {principle.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Compact "Our Toolbox" */}
      <section className="border-t border-border bg-card py-16">
        <Container>
          <div className="mb-10 max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} OUR TOOLBOX
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Technical Stack &amp; Standards
            </h2>
            <p className="mt-2 font-body text-base text-muted-foreground">
              Grouped by functional area. We choose proven, production-grade tools over transient
              hype.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {about.toolbox.map((group) => (
              <div key={group.area} className="rounded-xs border border-border bg-background p-5">
                <h3 className="mb-3 border-b border-border pb-2 font-mono text-xs font-bold tracking-wider text-foreground uppercase">
                  {group.area}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-xs border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/contact" variant="primary" size="md">
              Start Your MVP With Our Team &rarr;
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
