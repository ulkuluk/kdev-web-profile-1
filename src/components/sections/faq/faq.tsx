import { ChevronDown } from "lucide-react";
import type { FaqContent } from "@/content/faq";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/** Native <details>: keyboard accessible, no JS, works under reduced motion. */
export function Faq({ content }: { content: FaqContent }) {
  return (
    <Section
      id="faq"
      tone="muted"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="max-w-3xl space-y-3">
        {content.items.map((item, i) => (
          <Reveal key={item.id} delay={Math.min(i, 3) * 0.05}>
            <details className="group rounded-md border border-border bg-card shadow-sm">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-md px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 text-pretty text-muted-foreground">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
