import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  Figure,
  Video,
  Gallery,
  Timeline,
  TimelineItem,
  Callout,
  DeviceFrame,
  Stat,
} from "./mdx-components";

const components = {
  Figure,
  Video,
  Gallery,
  Timeline,
  TimelineItem,
  Callout,
  DeviceFrame,
  Stat,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 mb-4 border-b border-border pb-2 font-display text-2xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 mb-3 font-display text-xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 font-body text-base leading-relaxed text-foreground/90" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 font-body text-base text-foreground/90"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 font-body text-base text-foreground/90"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-xs border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-accent"
      {...props}
    />
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <article className="prose-kdev max-w-none">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
