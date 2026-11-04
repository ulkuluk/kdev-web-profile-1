import { Check } from "lucide-react";
import type { HeroContent } from "@/content/hero";
import type { WorkflowContent } from "@/content/process";

type HeroVisualProps = {
  visual: HeroContent["visual"];
  steps: WorkflowContent["steps"];
};

/**
 * Hero visual, built from HTML/CSS only (no images):
 *  - a glass "pipeline" card whose six steps light up in turn (CSS keyframes, static under reduced motion)
 *  - a code card showing the team as data
 *  - a small UI mock card
 * It is decorative, so the whole composition is aria-hidden except for the pipeline list.
 */
export function HeroVisual({ visual, steps }: HeroVisualProps) {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-8 size-56 rounded-full bg-secondary/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -left-6 size-48 rounded-full bg-accent/15 blur-3xl"
      />

      <figure className="glass relative rounded-lg p-5 sm:p-6">
        <figcaption className="mb-4">
          <p className="text-sm font-semibold">{visual.pipelineTitle}</p>
          <p className="text-xs text-muted-foreground">{visual.pipelineCaption}</p>
        </figcaption>
        <ol className="relative space-y-2">
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[1.375rem] w-px bg-border-strong/50"
          />
          {steps.map((step, i) => (
            <li
              key={step.id}
              style={{ "--i": i } as React.CSSProperties}
              className="step-active relative flex items-center gap-3 rounded-sm border border-border px-3 py-2"
            >
              <span className="relative z-10 grid size-6 shrink-0 place-items-center rounded-full bg-card font-mono text-xs font-semibold text-primary ring-1 ring-primary/40">
                {i + 1}
              </span>
              <span className="text-sm font-semibold">{step.title}</span>
              <span className="ml-auto truncate font-mono text-xs text-muted-foreground">
                {step.owners[0]}
              </span>
            </li>
          ))}
        </ol>
      </figure>

      <div
        aria-hidden="true"
        className="relative mt-4 grid gap-4 sm:-mt-6 sm:ml-10 sm:grid-cols-5 sm:gap-3"
      >
        <div className="animate-float rounded-md bg-foreground p-4 font-mono text-xs leading-relaxed text-card shadow-xl sm:col-span-3">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-code-comment" />
            <span className="size-2 rounded-full bg-code-comment" />
            <span className="size-2 rounded-full bg-code-comment" />
            <span className="ml-2 text-code-comment">{visual.codeFile}</span>
          </div>
          {visual.codeLines.map((line, i) => (
            <div key={i} className="whitespace-pre text-code-key">
              {line}
            </div>
          ))}
        </div>
        <div className="glass rounded-md p-4 sm:col-span-2">
          <div className="mb-3 h-2 w-14 rounded-full bg-primary/30" />
          <p className="text-sm font-semibold">{visual.uiCardTitle}</p>
          <p className="mt-1 text-xs text-muted-foreground">{visual.uiCardNote}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-success">
            <Check className="size-4" strokeWidth={2.5} /> QA
          </div>
        </div>
      </div>
    </div>
  );
}
