import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { WorkflowContent } from "@/content/process";
import { cn } from "@/lib/cn";

export function EngagementFlow({ workflow }: { workflow: WorkflowContent }) {
  return (
    <section id="how-it-works" className="border-b border-border bg-card py-20 sm:py-24">
      <Container>
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {"//"} {workflow.eyebrow}
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {workflow.title}
            </h2>
            <p className="mt-3 font-body text-lg leading-relaxed text-muted-foreground">
              {workflow.description}
            </p>
          </div>
          <Button href={workflow.cta.href} variant="secondary" size="md">
            {workflow.cta.label} &rarr;
          </Button>
        </div>

        {/* 5-step grid with Step 1 emphasized as anchor */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {workflow.steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex flex-col justify-between rounded-xs border p-5 transition-all",
                step.isAnchor
                  ? "shadow-hard border-border-dark bg-background ring-1 ring-border-dark"
                  : "border-border bg-card hover:border-border-dark",
              )}
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent">
                    STEP {step.stepNum}
                  </span>
                  {step.isAnchor && (
                    <span className="rounded-xs bg-accent px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-on-accent uppercase">
                      ANCHOR
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-muted-foreground">
                  {step.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-3">
                <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                  {workflow.ownerLabel}:
                </span>
                <span className="mt-0.5 block truncate font-mono text-xs font-semibold text-foreground">
                  {step.owners.join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
