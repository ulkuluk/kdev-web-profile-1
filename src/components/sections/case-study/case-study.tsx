import type { Project, ProjectsContent } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { CaseStudyMock } from "./case-study-mock";

type CaseStudyProps = { content: ProjectsContent; project: Project };

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-xs font-medium tracking-wider text-primary uppercase">
        {title}
      </h3>
      <div className="mt-2 text-pretty">{children}</div>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({ content, project }: CaseStudyProps) {
  const { labels } = content;
  return (
    <Section
      id="work"
      tone="muted"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <Reveal className="space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">{project.type}</Badge>
            <Badge tone="neutral">{project.status}</Badge>
          </div>
          <h3 className="-mt-4 text-2xl font-bold">{project.title}</h3>
          <Block title={labels.challenge}>
            <p>{project.challenge}</p>
          </Block>
          <Block title={labels.solution}>
            <p>{project.solution}</p>
          </Block>
          <Block title={labels.outcome}>
            <p className="rounded-sm border-l-4 border-primary bg-card px-4 py-3 font-medium">
              {project.outcome}
            </p>
          </Block>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <CaseStudyMock />
          <p className="text-center text-xs text-muted-foreground">{labels.mockNote}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <Block title={labels.features}>
            <ul className="space-y-2 text-sm">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Icon name="check" className="mt-0.5 size-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>
        </Card>
        <Card>
          <Block title={labels.stack}>
            <Chips items={project.stack} />
          </Block>
        </Card>
        <Card>
          <Block title={labels.role}>
            <ul className="mb-4 space-y-2 text-sm">
              {project.role.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Chips items={project.team} />
          </Block>
        </Card>
      </div>
    </Section>
  );
}
