import { describe, expect, it } from "vitest";
import { faqSchema } from "./faq";
import { siteSchema } from "./site";
import { teamSchema } from "./team";
import * as content from "./index";

describe("content layer", () => {
  it("loads and validates every content module (assertContentConsistency runs on import)", () => {
    expect(content.site.name).toBe("KDEV");
    // If assertContentConsistency() throws, the import above already fails. This is a readable receipt.
    expect(() => content.assertContentConsistency()).not.toThrow();
  });

  it("every nav link starts with '/' or '#'", () => {
    expect(
      content.nav.items.every(({ href }) => href.startsWith("/") || href.startsWith("#")),
    ).toBe(true);
    expect(content.nav.cta.href.startsWith("/") || content.nav.cta.href.startsWith("#")).toBe(true);
  });

  it("team has exactly 8 members covering every role from the brief", () => {
    expect(content.team.members).toHaveLength(8);
    const roles = new Set(content.team.members.map((m) => m.role));
    expect(roles).toEqual(new Set(content.roles));
  });

  it("every process step is owned by a known role", () => {
    for (const step of content.workflow.steps) {
      for (const owner of step.owners) {
        expect(content.roles).toContain(owner);
      }
    }
  });

  it("FAQ has 5-6 questions", () => {
    expect(content.faq.items.length).toBeGreaterThanOrEqual(5);
    expect(content.faq.items.length).toBeLessThanOrEqual(6);
  });

  it("states the case-study outcome without claiming the product is live", () => {
    const studies = content.getCaseStudies();
    const text = JSON.stringify(studies).toLowerCase();
    expect(text).toContain("paused");
    expect(text).not.toMatch(/\b(is live|now live|went live)\b/);
  });
});

describe("schemas reject bad content", () => {
  it("rejects a team with the wrong number of members", () => {
    expect(() =>
      teamSchema.parse({ ...content.team, members: content.team.members.slice(1) }),
    ).toThrow();
  });

  it("rejects an invalid email or a malformed WhatsApp number", () => {
    const base = content.site;
    expect(() =>
      siteSchema.parse({ ...base, contact: { ...base.contact, email: "nope" } }),
    ).toThrow();
    expect(() =>
      siteSchema.parse({ ...base, contact: { ...base.contact, whatsapp: "+62 812" } }),
    ).toThrow();
  });

  it("accepts an empty social href (hidden in the UI) but rejects a non-URL", () => {
    const base = content.site;
    const withHref = (href: string) => ({ ...base, socials: [{ label: "X", href }] });
    expect(() => siteSchema.parse(withHref(""))).not.toThrow();
    expect(() => siteSchema.parse(withHref("not a url"))).toThrow();
  });

  it("rejects a FAQ with too few items", () => {
    expect(() =>
      faqSchema.parse({ ...content.faq, items: content.faq.items.slice(0, 2) }),
    ).toThrow();
  });
});
