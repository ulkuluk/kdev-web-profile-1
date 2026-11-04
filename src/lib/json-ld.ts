import type { SiteContent } from "@/content/site";
import { env } from "@/lib/env";

/** schema.org Organization. Only fields we actually have; empty socials are dropped. */
export function organizationJsonLd(site: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: env.siteUrl,
    description: site.description,
    email: site.contact.email,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 8 },
    sameAs: site.socials.map((s) => s.href).filter(Boolean),
  };
}
