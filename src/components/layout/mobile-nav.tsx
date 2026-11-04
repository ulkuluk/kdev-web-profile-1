"use client";

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
        className="inline-flex size-11 items-center justify-center rounded-sm hover:bg-muted"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label={labels.primaryNav}
          className="glass absolute inset-x-0 top-full border-x-0 px-5 py-4"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-3 font-medium hover:bg-muted"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={cta.href} onClick={() => setOpen(false)} className="mt-3 w-full">
            {cta.label}
          </Button>
        </nav>
      )}
    </div>
  );
}
