import { cn } from "@/lib/cn";
import { Container } from "./container";
import { Reveal } from "./reveal";

type SectionProps = {
  /** Anchor id; also drives the heading id for aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Tinted background band, for visual rhythm between sections. */
  tone?: "default" | "muted";
};

/** Generic section wrapper: consistent spacing, anchor id, and heading structure (one h2). */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 sm:py-24", tone === "muted" && "bg-muted/60", className)}
    >
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs font-medium tracking-widest text-primary uppercase">
              {eyebrow}
            </p>
          )}
          <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-pretty text-muted-foreground">{description}</p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
