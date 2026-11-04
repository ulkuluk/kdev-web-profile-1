"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import type { HeroContent } from "@/content/hero";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function SignedScopeDocket({ docket }: { docket: HeroContent["signatureDocket"] }) {
  const [activeClauses, setActiveClauses] = useState<Record<string, boolean>>({
    "c-01": true,
    "c-02": true,
    "c-03": true,
  });
  const prefersReducedMotion = useReducedMotion();

  const toggleClause = (id: string) => {
    setActiveClauses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      role="region"
      aria-label="Signed Scope MoU Specification Docket"
      className="shadow-hard overflow-hidden rounded-xs border border-border-dark bg-card"
    >
      <div className="flex flex-wrap items-center justify-between border-b border-border-dark bg-primary px-4 py-2.5 font-mono text-xs text-on-primary">
        <span className="font-semibold tracking-wider">{docket.protocol}</span>
        <span className="text-[11px] font-medium text-accent-glow">[{docket.tag}]</span>
      </div>
      <div className="divide-y divide-border bg-card p-2 sm:p-3">
        {docket.clauses.map((clause, idx) => {
          const isVerified = activeClauses[clause.id] ?? true;
          return (
            <button
              key={clause.id}
              type="button"
              onClick={() => toggleClause(clause.id)}
              className={cn(
                "group flex w-full flex-col justify-between gap-3 p-3 text-left transition-colors hover:bg-muted/60 sm:flex-row sm:items-center",
                !prefersReducedMotion && "transition-all duration-200",
              )}
              style={{
                animationDelay: !prefersReducedMotion ? `${idx * 120}ms` : undefined,
              }}
              aria-pressed={isVerified}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center font-mono text-xs font-bold text-accent">
                  {clause.num}
                </span>
                <div>
                  <div className="font-display text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                    {clause.title}
                  </div>
                  <div className="mt-0.5 max-w-md font-body text-xs text-muted-foreground">
                    {clause.desc}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-xs border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase",
                    isVerified
                      ? "border-accent bg-accent-tint text-accent"
                      : "border-border bg-muted text-muted-foreground",
                  )}
                >
                  {isVerified ? (
                    <>
                      <Check className="size-3" aria-hidden="true" />
                      <span>{clause.status}</span>
                    </>
                  ) : (
                    <span>INSPECT</span>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-border bg-background px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>Click clause row to inspect verification criteria</span>
        <span className="font-semibold text-accent">ALL GATES BINDING</span>
      </div>
    </div>
  );
}
