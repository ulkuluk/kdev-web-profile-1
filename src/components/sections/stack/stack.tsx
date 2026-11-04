import type { StackContent } from "@/content/stack";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/** Text chips only: no third-party logos. */
export function Stack({ content }: { content: StackContent }) {
  return (
    <Section
      id="stack"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {content.groups.map((group, i) => (
          <Reveal key={group.label} delay={(i % 3) * 0.06}>
            <Card className="h-full">
              <h3 className="font-mono text-sm font-bold text-primary">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <li
                    key={`${item}-${j}`}
                    className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
