import type { AudiencesContent } from "@/content/audiences";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function Audiences({ content }: { content: AudiencesContent }) {
  return (
    <Section
      id="clients"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {content.items.map((item, i) => (
          <li key={item.id} className="flex">
            <Reveal delay={i * 0.08} className="flex w-full">
              <Card interactive className="flex w-full flex-col">
                <span className="mb-4 grid size-11 place-items-center rounded-sm bg-primary/10 text-primary">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-5 font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {content.needsLabel}
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  {item.needs.map((need) => (
                    <li key={need} className="flex gap-2">
                      <Icon name="check" className="mt-0.5 size-4 text-primary" />
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {content.helpLabel}
                </p>
                <p className="mt-2 text-sm text-pretty">{item.howWeHelp}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
