import { Sparkles } from "lucide-react";
import type { NextContent } from "@/content/next";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function UpNext({ content }: { content: NextContent }) {
  return (
    <section id="next" aria-labelledby="next-title" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-xl p-8 sm:p-12">
            <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-70" />
            <div className="relative max-w-2xl">
              <p className="mb-3 font-mono text-xs font-medium tracking-widest text-primary uppercase">
                {content.eyebrow}
              </p>
              <Badge tone="accent" className="mb-4">
                <Sparkles aria-hidden="true" className="size-3.5" />
                {content.badge}
              </Badge>
              <h2 id="next-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                {content.title}
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">{content.body}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
