import { Heart } from "lucide-react";

/**
 * Placeholder illustration for the case study (no real screenshots yet).
 * Pure CSS mock of a creator page and a support flow. Contains no real brand, name or figure.
 * Decorative: hidden from assistive tech; the surrounding text carries the meaning.
 */
export function CaseStudyMock() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
      <div className="absolute -top-8 right-0 size-48 rounded-full bg-secondary/25 blur-3xl" />

      {/* Creator page */}
      <div className="glass relative rounded-lg p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-linear-to-br from-primary to-secondary" />
          <div className="space-y-1">
            <p className="text-sm font-bold">Creator profile</p>
            <p className="text-xs text-muted-foreground">Digital illustration & tutorials</p>
          </div>
          <div className="ml-auto grid h-9 place-items-center rounded-sm bg-accent px-4 text-xs font-semibold text-on-accent">
            Support
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Weekly design breakdowns, process videos and custom asset packs.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Video pack 04", "Asset library", "Process reel"].map((item) => (
            <div
              key={item}
              className="flex aspect-4/3 items-end rounded-sm bg-muted p-2 font-mono text-[10px] text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Support flow */}
      <div className="glass relative mt-4 ml-auto w-4/5 rounded-lg p-4 sm:-mt-8">
        <p className="font-mono text-xs text-muted-foreground">support · step 2</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["$10", "$25", "$50"].map((tier, i) => (
            <div
              key={tier}
              className={
                i === 1
                  ? "flex h-9 items-center justify-center rounded-sm border-2 border-primary bg-primary/10 font-mono text-xs font-bold text-primary"
                  : "flex h-9 items-center justify-center rounded-sm border border-border bg-card font-mono text-xs text-muted-foreground"
              }
            >
              {tier}
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-9 items-center rounded-sm border border-border bg-card px-3 font-mono text-xs text-muted-foreground">
          Custom amount
        </div>
        <div className="mt-3 flex h-10 items-center justify-center gap-2 rounded-sm bg-accent text-sm font-semibold text-on-accent">
          <Heart className="size-4" /> Send support
        </div>
      </div>
    </div>
  );
}
