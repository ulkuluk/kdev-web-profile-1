import { ExternalLink } from "lucide-react";
import type { TeamContent, TeamMember } from "@/content/team";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/** Derive up to 2 initials from a name; "TODO: Name" style placeholders fall back to `initials`. */
export function deriveInitials(member: Pick<TeamMember, "name" | "initials">): string {
  if (member.initials) return member.initials;
  const words = member.name.split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberLink({ href, label, who }: { href: string; label: string; who: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${who}`}
      className="inline-flex min-h-11 items-center gap-1 rounded-sm px-1 text-sm font-medium text-primary hover:underline"
    >
      {label}
      <ExternalLink aria-hidden="true" className="size-3.5" />
    </a>
  );
}

export function Team({ content }: { content: TeamContent }) {
  return (
    <Section
      id="team"
      tone="muted"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.members.map((m, i) => (
          <li key={i} className="flex">
            <Reveal delay={(i % 4) * 0.06} className="flex w-full">
              <Card className="flex w-full flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className="grid size-16 place-items-center rounded-full bg-linear-to-br from-primary to-secondary font-mono text-lg font-bold text-on-primary"
                >
                  {deriveInitials(m)}
                </span>
                <h3 className="mt-4 font-bold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                {(m.github || m.linkedin) && (
                  <div className="mt-2 flex gap-3">
                    {m.github && (
                      <MemberLink href={m.github} label={content.linkLabels.github} who={m.name} />
                    )}
                    {m.linkedin && (
                      <MemberLink
                        href={m.linkedin}
                        label={content.linkLabels.linkedin}
                        who={m.name}
                      />
                    )}
                  </div>
                )}
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
