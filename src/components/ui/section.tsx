import { cn } from "@/lib/cn";
import { Container } from "./container";
import { Reveal } from "./reveal";

type SectionProps = {
  /** Anchor id; also drives heading id for aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Tinted background band for visual rhythm between sections. */
  tone?: "default" | "muted" | "dark";
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
  const toneStyles = {
    default: "bg-background text-foreground",
    muted: "bg-muted/70 text-foreground border-y border-border",
    dark: "bg-dark-band text-white border-y border-border-dark",
  }[tone];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 sm:py-24", toneStyles, className)}
    >
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow && (
            <p
              className={cn(
                "mb-3 font-mono text-xs font-semibold tracking-widest uppercase",
                tone === "dark" ? "text-accent-glow" : "text-accent",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h2
            id={`${id}-title`}
            className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 font-body text-lg leading-relaxed",
                tone === "dark" ? "text-slate-300" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
