import type { ServicesContent } from "@/content/services";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

type Service = ServicesContent["items"][number];

function ServiceCard({
  service,
  labels,
  className,
}: {
  service: Service;
  labels: ServicesContent["labels"];
  className?: string;
}) {
  return (
    <Card interactive className={cn("flex h-full flex-col justify-between gap-6", className)}>
      <div>
        <span className="mb-4 grid size-12 place-items-center rounded-sm bg-primary text-on-primary">
          <Icon name={service.icon} className="size-6" />
        </span>
        <h3 className="text-2xl font-bold">{service.title}</h3>
        <p className="mt-2 text-pretty text-muted-foreground">{service.summary}</p>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
            {labels.deliverables}
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-2">
                <Icon name="check" className="mt-0.5 size-4 text-primary" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
            {labels.useCases}
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            {service.useCases.map((u) => (
              <li key={u} className="flex gap-2">
                <Icon name="check" className="mt-0.5 size-4 text-primary" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/** Bento layout: first service spans two columns on large screens. */
export function Services({ content }: { content: ServicesContent }) {
  return (
    <Section
      id="services"
      tone="muted"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <ul className="grid gap-6 lg:grid-cols-2">
        {content.items.map((service, i) => (
          <li key={service.id} className={cn(i === 0 && "lg:col-span-2")}>
            <Reveal delay={i * 0.08} className="h-full">
              <ServiceCard
                service={service}
                labels={content.labels}
                className={cn(i === 0 && "lg:flex-row lg:gap-10")}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
