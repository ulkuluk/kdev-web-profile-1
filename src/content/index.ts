import { z } from "zod";
import { nav } from "./nav";
import { sectionIds } from "./_shared";
import { services } from "./services";
import { team } from "./team";

export * from "./_shared";
export * from "./site";
export * from "./nav";
export * from "./hero";
export * from "./audiences";
export * from "./services";
export * from "./projects";
export * from "./process";
export * from "./team";
export * from "./stack";
export * from "./next";
export * from "./faq";
export * from "./contact";

/**
 * Cross-file rules a single schema cannot express. Runs at module load, so a bad edit fails
 * `npm run build`. Exported so it can be unit-tested.
 */
export function assertContentConsistency() {
  const targets = new Set<string>(Object.values(sectionIds));
  for (const { href } of [...nav.items, nav.cta]) {
    z.literal(true, { error: `nav link ${href} has no matching section` }).parse(
      targets.has(href.slice(1)),
    );
  }
  const ids = services.items.map((s) => s.id);
  z.literal(true, { error: "service ids must be unique" }).parse(new Set(ids).size === ids.length);
  const roleCount = (r: string) => team.members.filter((m) => m.role === r).length;
  z.literal(true, { error: "team must have 2 front-end and 2 back-end engineers" }).parse(
    roleCount("Frontend Engineer") === 2 && roleCount("Backend Engineer") === 2,
  );
}

assertContentConsistency();
