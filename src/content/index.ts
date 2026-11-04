import { z } from "zod";
import { nav } from "./nav";
import { services } from "./services";
import { team } from "./team";

export * from "./_shared";
export * from "./site";
export * from "./nav";
export * from "./hero";
export * from "./pillars";
export * from "./services";
export * from "./about";
export * from "./work";
export * from "./process";
export * from "./team";
export * from "./faq";
export * from "./contact";

/**
 * Cross-file rules a single schema cannot express. Runs at module load, so a bad edit fails
 * `npm run build`. Exported so it can be unit-tested.
 */
export function assertContentConsistency() {
  for (const { href } of [...nav.items, nav.cta]) {
    z.literal(true, { error: `nav link ${href} must start with / or #` }).parse(
      href.startsWith("/") || href.startsWith("#"),
    );
  }

  const capabilityIds = services.capabilities.map((c) => c.id);
  z.literal(true, { error: "service capability ids must be unique" }).parse(
    new Set(capabilityIds).size === capabilityIds.length,
  );

  const phaseIds = services.phases.map((p) => p.id);
  z.literal(true, { error: "service phase ids must be unique" }).parse(
    new Set(phaseIds).size === phaseIds.length,
  );

  const roleCount = (r: string) => team.members.filter((m) => m.role === r).length;
  z.literal(true, { error: "team must have 2 frontend and 2 backend engineers" }).parse(
    roleCount("Frontend Engineer") === 2 && roleCount("Backend Engineer") === 2,
  );

  z.literal(true, { error: "team must have exactly 8 members" }).parse(team.members.length === 8);
}

assertContentConsistency();
