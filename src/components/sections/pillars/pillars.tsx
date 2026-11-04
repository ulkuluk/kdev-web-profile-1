import { Container } from "@/components/ui/container";
import type { PillarsContent } from "@/content/pillars";

export function Pillars({ pillars }: { pillars: PillarsContent }) {
  return (
    <section id="pillars" className="border-b border-border bg-card py-20">
      <Container>
        <div className="mb-14 max-w-2xl">
          <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
            {"//"} {pillars.eyebrow}
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {pillars.heading}
          </h2>
        </div>

        {/* Distinctive architectural strip layout with drafting line accents */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.items.map((item) => (
            <div
              key={item.id}
              className="relative border-l-2 border-border-dark pt-1 pl-5 transition-all hover:border-accent"
            >
              <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-accent">
                <span>{item.num}</span>
                <span>/</span>
                <span>{item.tag}</span>
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-foreground">{item.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
