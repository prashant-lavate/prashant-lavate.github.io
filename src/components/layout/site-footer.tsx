import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="hairline">
      <div className="site-container flex flex-col gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-6">
          <Link href={SITE_CONFIG.social.github} className="hover:text-foreground">
            GitHub
          </Link>
          <Link href={SITE_CONFIG.social.linkedin} className="hover:text-foreground">
            LinkedIn
          </Link>
          <Link href={SITE_CONFIG.social.instagram} className="hover:text-foreground">
            Instagram
          </Link>
          <Link href={`mailto:${SITE_CONFIG.email}`} className="hover:text-foreground">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
