import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { ScrollReveal } from "@/components/motion/reveal";

export function SiteFooter() {
  return (
    <footer className="hairline">
      <ScrollReveal className="site-container flex flex-col gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-6">
          <Link href={SITE_CONFIG.social.github} className="transition-colors hover:text-foreground">
            GitHub
          </Link>
          <Link href={SITE_CONFIG.social.linkedin} className="transition-colors hover:text-foreground">
            LinkedIn
          </Link>
          <Link href={SITE_CONFIG.social.instagram} className="transition-colors hover:text-foreground">
            Instagram
          </Link>
          <Link href={`mailto:${SITE_CONFIG.email}`} className="transition-colors hover:text-foreground">
            Email
          </Link>
        </div>
      </ScrollReveal>
    </footer>
  );
}