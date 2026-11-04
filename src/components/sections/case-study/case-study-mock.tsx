import { Heart } from "lucide-react";

/**
 * Placeholder illustration for the case study (no real screenshots yet).
 * Pure CSS mock of a creator page and a support flow. Contains no real brand, name or figure.
 * Decorative: hidden from assistive tech; the surrounding text carries the meaning.
 */
export function CaseStudyMock() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
      <div className="absolute -top-8 -right-6 size-48 rounded-full bg-secondary/25 blur-3xl" />

      {/* Creator page */}
      <div className="glass relative rounded-lg p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-linear-to-br from-primary to-secondary" />
          <div className="space-y-1.5">
            <div className="h-3 w-32 rounded-full bg-foreground/80" />
            <div className="h-2 w-20 rounded-full bg-muted-foreground/40" />
          </div>
          <div className="ml-auto grid h-9 place-items-center rounded-sm bg-accent px-4 text-xs font-semibold text-on-accent">
            Support
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-4/3 rounded-sm bg-muted" />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded-full bg-muted-foreground/20" />
          <div className="h-2 w-5/6 rounded-full bg-muted-foreground/20" />
        </div>
      </div>

      {/* Support flow */}
      <div className="glass relative mt-4 ml-auto w-4/5 rounded-lg p-4 sm:-mt-8 sm:mr-[-1rem]">
        <p className="font-mono text-xs text-muted-foreground">support / step 2</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["", "", ""].map((_, i) => (
            <div
              key={i}
              className={
                i === 1
                  ? "h-9 rounded-sm border-2 border-primary bg-primary/10"
                  : "h-9 rounded-sm border border-border bg-card"
              }
            />
          ))}
        </div>
        <div className="mt-3 h-9 rounded-sm border border-border bg-card" />
        <div className="mt-3 flex h-10 items-center justify-center gap-2 rounded-sm bg-accent text-sm font-semibold text-on-accent">
          <Heart className="size-4" /> Send support
        </div>
      </div>
    </div>
  );
}
