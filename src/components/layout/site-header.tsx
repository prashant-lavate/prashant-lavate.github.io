"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-md">
      <div className="site-container flex h-18 items-center justify-between py-4">
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Prashant<span className="text-accent">.</span>dev
        </Link>

        <nav
          className="hidden items-center gap-8 sm:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className={cn(
                  "group relative py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
          <Link
            href="/contact"
            data-cursor="hover"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Start a project
          </Link>

          <a
            href="/Prashant_Lavate_Software_Engineer.pdf"
            download
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Download className="size-3.5" aria-hidden="true" /> Resume
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background sm:hidden"
          aria-label="Mobile navigation"
        >
          <div className="site-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-accent px-3 py-2.5 text-center text-sm font-medium text-accent-foreground"
            >
              Start a project
            </Link>

            <a
              href="/Prashant_Lavate_Software_Engineer.pdf"
              download
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-foreground"
            >
              <Download className="size-3.5" aria-hidden="true" /> Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
