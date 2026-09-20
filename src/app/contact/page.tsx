import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="site-container py-20 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <h1 className="font-display max-w-md text-4xl font-semibold leading-tight sm:text-5xl">
            Tell me what you&apos;re building.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Whether it&apos;s a platform that needs a payment or messaging integration done
            right, or a production issue nobody else wants to own — my inbox is open.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <Link
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-2 flex items-center gap-3 text-2xl font-medium text-foreground hover:text-accent sm:text-3xl"
            >
              <Mail className="size-5 shrink-0" aria-hidden="true" />
              {SITE_CONFIG.email}
            </Link>
          </div>

          <div className="hairline flex flex-wrap gap-8 pt-6 text-sm font-medium">
            <Link
              href={SITE_CONFIG.social.github}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-accent"
            >
              GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={SITE_CONFIG.social.linkedin}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-accent"
            >
              LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={SITE_CONFIG.social.instagram}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-accent"
            >
              Instagram <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
