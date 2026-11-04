import type { WorkflowContent } from "@/content/process";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function Process({ content }: { content: WorkflowContent }) {
  return (
    <Section
      id="process"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.steps.map((step, i) => (
          <li key={step.id} className="flex">
            <Reveal delay={(i % 3) * 0.08} className="flex w-full">
              <Card className="flex w-full flex-col">
                <span className="font-mono text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">{step.summary}</p>
                <p className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
                  <span className="mr-1 font-mono text-xs text-muted-foreground">
                    {content.ownerLabel}
                  </span>
                  {step.owners.map((o) => (
                    <span
                      key={o}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                    >
                      {o}
                    </span>
                  ))}
                </p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
