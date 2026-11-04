import { cn } from "@/lib/cn";

type WordmarkProps = { name: string; className?: string };

/** Logo: a chevron-pair mark (code, but also "open/forward") plus the name in mono. */
export function Wordmark({ name, className }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-primary" />
        <path
          d="M13 10 7.5 16 13 22M19 10l5.5 6L19 22"
          className="stroke-on-primary"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-mono text-lg font-bold tracking-tight">{name}</span>
    </span>
  );
}
