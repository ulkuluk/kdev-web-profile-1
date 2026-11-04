"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavContent } from "@/content/nav";
import { Button } from "@/components/ui/button";

type MobileNavProps = Pick<NavContent, "items" | "cta" | "labels">;

/** Collapsible menu for < md screens. Closes on link click and Escape. */
export function MobileNav({ items, cta, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.closeMenu : labels.openMenu}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex size-10 items-center justify-center rounded-xs border border-border bg-card hover:bg-muted"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label={labels.primaryNav}
          className="shadow-hard absolute inset-x-0 top-full border-b border-border-dark bg-background px-5 py-5"
        >
          <ul className="flex flex-col space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xs px-3 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground uppercase hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            href={cta.href}
            onClick={() => setOpen(false)}
            variant="primary"
            className="mt-4 w-full"
          >
            {cta.label}
          </Button>
        </nav>
      )}
    </div>
  );
}
