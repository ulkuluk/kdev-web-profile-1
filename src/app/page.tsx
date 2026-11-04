import { Hero } from "@/components/sections/hero/hero";
import { Pillars } from "@/components/sections/pillars/pillars";
import { FeaturedWork } from "@/components/sections/featured-work/featured-work";
import { EngagementFlow } from "@/components/sections/engagement-flow/engagement-flow";
import { CtaBanner } from "@/components/sections/cta-banner/cta-banner";
import { hero, pillars, workflow, getFeaturedCaseStudy } from "@/content";

/**
 * Home page (v2):
 * Composes sections in order, passing strictly typed content data.
 * No copy or business logic live in this component.
 */
export default function HomePage() {
  const featured = getFeaturedCaseStudy();

  return (
    <>
      <Hero hero={hero} />
      <Pillars pillars={pillars} />
      {featured && <FeaturedWork project={featured} />}
      <EngagementFlow workflow={workflow} />
      <CtaBanner />
    </>
  );
}
