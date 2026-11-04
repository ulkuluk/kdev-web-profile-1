import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getCaseStudyBySlug, getAllCaseStudySlugs, getClientDisplayName } from "@/content/work";
import { MDXContent } from "@/components/mdx/mdx-content";

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.frontmatter.title} — Case Study`,
    description: study.frontmatter.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const { frontmatter, content } = study;
  const clientName = getClientDisplayName(frontmatter);

  return (
    <article className="py-14 sm:py-20">
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            &larr; Back to all case studies
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="mb-12 border-b border-border pb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              CASE STUDY // {frontmatter.slug}
            </span>
            <span className="inline-block size-1 rounded-full bg-border-dark" />
            <span className="rounded-xs border border-accent bg-accent-tint px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-accent uppercase">
              {frontmatter.statusLabel}
            </span>
          </div>

          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {frontmatter.title}
          </h1>

          <p className="mb-8 max-w-3xl font-body text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {frontmatter.tagline}
          </p>

          {/* Quick Specifications Matrix */}
          <div className="shadow-hard grid grid-cols-2 gap-4 rounded-xs border border-border-dark bg-card p-5 sm:grid-cols-4">
            <div>
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                Client
              </span>
              <span className="mt-0.5 block truncate font-display text-base font-bold text-foreground">
                {clientName}
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                Timeframe
              </span>
              <span className="mt-0.5 block font-display text-base font-bold text-foreground">
                {frontmatter.timeframe}
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                Team Assigned
              </span>
              <span className="mt-0.5 block font-display text-base font-bold text-foreground">
                {frontmatter.teamSize} Specialists
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                Contract
              </span>
              <span className="mt-0.5 block font-display text-base font-bold text-foreground">
                Written MoU Scope
              </span>
            </div>
          </div>
        </div>

        {/* Roles & Stack Overview Strip */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground">
              Roles &amp; Responsibilities Handled
            </h2>
            <div className="mb-8 flex flex-wrap gap-2">
              {frontmatter.ourRole.map((role) => (
                <span
                  key={role}
                  className="rounded-xs border border-border bg-card px-3 py-1 font-mono text-xs font-semibold text-foreground"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* MDX Body Content */}
            <div className="border-t border-border pt-8">
              <MDXContent source={content} />
            </div>
          </div>

          {/* Sidebar: Technology Stack with "Why" Rationales */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-xs border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 border-b border-border pb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
                Technology Decisions
              </div>
              <div className="space-y-6">
                {frontmatter.stack.map((group) => (
                  <div key={group.label}>
                    <h3 className="mb-2 font-mono text-xs font-bold tracking-wider text-foreground uppercase">
                      {group.label}
                    </h3>
                    <ul className="space-y-3 font-mono text-xs">
                      {group.items.map((tech) => (
                        <li key={tech.name} className="border-l-2 border-accent pl-3">
                          <span className="block font-bold text-foreground">{tech.name}</span>
                          {tech.why && (
                            <span className="mt-0.5 block font-body text-xs leading-relaxed text-muted-foreground">
                              {tech.why}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <Button href="/contact" variant="primary" size="sm" className="w-full">
                  Start Your MVP &rarr;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
