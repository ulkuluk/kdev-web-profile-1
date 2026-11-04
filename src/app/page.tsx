import { Audiences } from "@/components/sections/audiences/audiences";
import { CaseStudy } from "@/components/sections/case-study/case-study";
import { Contact } from "@/components/sections/contact/contact";
import { Faq } from "@/components/sections/faq/faq";
import { Hero } from "@/components/sections/hero/hero";
import { UpNext } from "@/components/sections/next/up-next";
import { Process } from "@/components/sections/process/process";
import { Services } from "@/components/sections/services/services";
import { Stack } from "@/components/sections/stack/stack";
import { Team } from "@/components/sections/team/team";
import {
  audiences,
  contact,
  faq,
  hero,
  projects,
  services,
  site,
  stack,
  team,
  upNext,
  workflow,
} from "@/content";

/** Composition only: order of sections lives here, copy lives in src/content. */
export default function HomePage() {
  const [featured] = projects.items;
  return (
    <>
      <Hero hero={hero} steps={workflow.steps} />
      <Audiences content={audiences} />
      <Services content={services} />
      {featured && <CaseStudy content={projects} project={featured} />}
      <Process content={workflow} />
      <Team content={team} />
      <Stack content={stack} />
      <UpNext content={upNext} />
      <Faq content={faq} />
      <Contact content={contact} site={site} />
    </>
  );
}
