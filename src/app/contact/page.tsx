import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { StaggerIn, StaggerItem } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="site-container py-20 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <StaggerIn>
          <StaggerItem>
            <h1 className="font-display max-w-md text-4xl font-semibold leading-tight sm:text-5xl">
              Tell me what you&apos;re building.
            </h1>
          </StaggerItem>
          <StaggerItem className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Building a product, solving a production problem, or working through
            a tricky integration? I&apos;m always open to interesting
            engineering conversations.
          </StaggerItem>
        </StaggerIn>

        <StaggerIn className="flex flex-col justify-between gap-10">
          <StaggerItem>
            <p className="text-sm text-muted-foreground">Email</p>
            <MagneticButton className="mt-2 inline-block" strength={0.2}>
              <Link
                href={`mailto:${SITE_CONFIG.email}`}
                data-cursor="hover"
                className="flex items-center gap-3 text-2xl font-medium text-foreground transition-colors hover:text-accent sm:text-3xl"
              >
                <Mail className="size-5 shrink-0" aria-hidden="true" />
                {SITE_CONFIG.email}
              </Link>
            </MagneticButton>
          </StaggerItem>

          <StaggerItem className="hairline flex flex-wrap gap-8 pt-6 text-sm font-medium">
            <Link
              href={SITE_CONFIG.social.github}
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 text-foreground hover:text-accent"
            >
              GitHub{" "}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={SITE_CONFIG.social.linkedin}
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 text-foreground hover:text-accent"
            >
              LinkedIn{" "}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={SITE_CONFIG.social.instagram}
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 text-foreground hover:text-accent"
            >
              Instagram{" "}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </StaggerItem>
        </StaggerIn>
      </div>
    </main>
  );
}