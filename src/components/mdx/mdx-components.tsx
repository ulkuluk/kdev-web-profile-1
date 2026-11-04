"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Play } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * 1. Figure: Responsive image with caption and fallback placeholder for missing assets.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure
      className={cn("my-6 overflow-hidden rounded-xs border border-border bg-card", className)}
    >
      {hasError ? (
        <div className="flex aspect-video w-full flex-col items-center justify-center border-b border-border bg-muted p-6 text-center font-mono text-xs text-muted-foreground">
          <span className="font-semibold text-accent">[ ASSET PLACEHOLDER ]</span>
          <span className="mt-2 text-foreground">{alt}</span>
          <span className="mt-1 text-[11px] text-muted-foreground">Drop file at: public{src}</span>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-full w-full object-cover"
            onError={() => setHasError(true)}
            loading="lazy"
          />
        </div>
      )}
      {caption && (
        <figcaption className="border-t border-border bg-background px-4 py-2 font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * 2. Video: Click-to-load facade for embeds + local short mp4/webm with poster and reduced motion check.
 */
export function Video({
  src,
  poster,
  title = "Video player",
  type = "local",
  caption,
  className,
}: {
  src: string;
  poster?: string;
  title?: string;
  type?: "local" | "youtube" | "vimeo" | "loom";
  caption?: string;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [hasError, setHasError] = useState(false);

  const isEmbed = type !== "local";

  return (
    <div className={cn("my-6 overflow-hidden rounded-xs border border-border bg-card", className)}>
      <div className="relative aspect-video w-full bg-primary text-on-primary">
        {hasError ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center font-mono text-xs text-slate-400">
            <span className="font-semibold text-accent-glow">[ VIDEO ASSET PLACEHOLDER ]</span>
            <span className="mt-2 text-white">{title}</span>
            <span className="mt-1 text-[11px] text-slate-400">Target path: public{src}</span>
          </div>
        ) : isEmbed ? (
          !isPlaying ? (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              {poster && (
                <Image
                  src={poster}
                  alt={title}
                  fill
                  className="object-cover opacity-80"
                  onError={() => {}}
                />
              )}
              <div className="absolute inset-0 bg-black/40" />
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="shadow-hard relative z-10 inline-flex items-center gap-2 rounded-xs border border-white/30 bg-primary/90 px-5 py-3 font-mono text-xs font-semibold text-white uppercase transition-all hover:bg-accent"
                aria-label={`Play ${title}`}
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                <span>Load & Play Video</span>
              </button>
            </div>
          ) : (
            <iframe
              src={src}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          )
        ) : (
          <video
            src={src}
            poster={poster}
            controls
            muted
            playsInline
            loop={!prefersReducedMotion}
            autoPlay={!prefersReducedMotion && false}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
            aria-label={title}
          >
            Your browser does not support HTML video.
          </video>
        )}
      </div>
      {caption && (
        <div className="border-t border-border bg-background px-4 py-2 font-mono text-xs text-muted-foreground">
          {caption}
        </div>
      )}
    </div>
  );
}

/**
 * 3. Gallery: Grid layout for multiple screenshots or figures.
 */
export function Gallery({ children, columns = 2 }: { children: React.ReactNode; columns?: 2 | 3 }) {
  return (
    <div
      className={cn(
        "my-6 grid gap-4",
        columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}

/**
 * 4. Timeline: Sequential stages or delivery phases.
 */
export function TimelineItem({
  date,
  title,
  description,
}: {
  date: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute top-1.5 -left-[23px] h-3 w-3 rounded-full border-2 border-border-dark bg-background group-hover:bg-accent sm:-left-[31px]" />
      <div className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
        {date}
      </div>
      <h4 className="mt-1 font-display text-lg font-bold text-foreground">{title}</h4>
      <p className="mt-1 font-body text-base text-muted-foreground">{description}</p>
    </div>
  );
}

export function Timeline({
  events = [],
  children,
}: {
  events?: Array<{ date: string; title: string; description: string }>;
  children?: React.ReactNode;
}) {
  return (
    <div className="my-8 space-y-6 border-l-2 border-border-dark pl-4 sm:pl-6">
      {events && events.length > 0
        ? events.map((event, idx) => <TimelineItem key={idx} {...event} />)
        : children}
    </div>
  );
}

/**
 * 5. Callout: Notice / Architecture highlight / Covenant guarantee.
 */
export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "warning" | "architecture" | "guarantee";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    note: "border-border bg-card",
    warning: "border-destructive/60 bg-red-50/50 text-foreground",
    architecture: "border-accent bg-accent-tint/30 text-foreground",
    guarantee: "border-border-dark bg-muted text-foreground shadow-hard",
  }[type];

  return (
    <div className={cn("my-6 rounded-xs border-l-4 p-5", styles)}>
      <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
        <span>[{type.toUpperCase()}]</span>
        {title && <span className="text-foreground">— {title}</span>}
      </div>
      <div className="mt-2 font-body text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}

/**
 * 6. DeviceFrame: Browser/application chassis with address bar and status indicator.
 */
export function DeviceFrame({
  title = "app.preview / dashboard",
  status = "DELIVERED",
  caption,
  children,
}: {
  title?: string;
  status?: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shadow-hard my-6 overflow-hidden rounded-xs border border-border-dark bg-card">
      <div className="flex items-center justify-between border-b border-border bg-[#ECEAE4] px-4 py-2 font-mono text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 border border-border-dark bg-white" />
          <span className="h-2.5 w-2.5 border border-border-dark bg-white" />
          <span className="h-2.5 w-2.5 border border-border-dark bg-white" />
        </div>
        <span className="truncate px-2 text-muted-foreground">{title}</span>
        <span className="font-semibold text-accent">{status}</span>
      </div>
      <div className="relative">{children}</div>
      {caption && (
        <div className="border-t border-border bg-background px-4 py-2 font-mono text-xs text-muted-foreground">
          {caption}
        </div>
      )}
    </div>
  );
}

/**
 * 7. Stat: Factual verification statistics (only ever real numbers).
 */
export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="shadow-hard my-6 inline-flex flex-col border border-border-dark bg-card p-5">
      <span className="font-display text-4xl font-extrabold tracking-tight text-foreground">
        {value}
      </span>
      <span className="mt-1 font-mono text-xs font-semibold text-accent uppercase">{label}</span>
      {note && <span className="mt-1 font-body text-xs text-muted-foreground">{note}</span>}
    </div>
  );
}
