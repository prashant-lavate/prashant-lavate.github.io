import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import KineticGrid from "@/components/ui/kinetic-grid";
import {
  StaggerIn,
  StaggerItem,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { TiltCard } from "@/components/motion/tilt-card";
import { IntegrationsMarquee } from "@/components/integrations-marquee";
import { TechChip } from "@/components/tech-icon";
import { SITE_CONFIG, SKILLS, STATS } from "@/lib/constants";

export const metadata = {
  title: "Software Engineer",
};

const CAPABILITIES = [
  {
    title: "Ship the backend that has to hold",
    body: "Node.js and Express APIs on MongoDB, built to handle real traffic and real edge cases — not just the happy path.",
  },
  {
    title: "Wire up the systems that get you paid",
    body: "Razorpay, Zoom, WhatsApp Business, Firebase, Google Sign-In — the integrations that turn a product into a business, done properly the first time.",
  },
  {
    title: "Own it past the demo",
    body: "Angular and React on the frontend, deployment on EC2 with PM2 and Nginx, and the production debugging that comes after launch day.",
  },
];

export default function HomePage() {
  const projects = getAllProjects();
  const featuredProject =
    projects.find((project) => project.featured) ?? projects[0];

  return (
    <main className="overflow-x-clip">
      {/* Hero — interactive grid background, original content on top */}
      <section className="relative overflow-hidden">
        <KineticGrid />

        <div className="relative site-container grid gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-32">
          <StaggerIn>
            {/* <StaggerItem>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
                <span className="status-dot-live size-1.5 rounded-full bg-signal" />
                Available for new projects
              </span>
            </StaggerItem> */}
            <StaggerItem>
              <h1 className="font-display max-w-xl text-[clamp(2.75rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
                {SITE_CONFIG.tagline}
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              I&apos;m {SITE_CONFIG.name.split(" ")[0]}, a software engineer who
              builds and maintains production applications end to end — from
              Angular and React on the frontend to Node.js on the backend, with
              APIs, databases, and third-party integrations in between.
            </StaggerItem>
            <StaggerItem className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-block rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
                >
                  Start a project
                </Link>
              </MagneticButton>
              <Link
                href="/projects"
                data-cursor="hover"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
              >
                See my work{" "}
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </StaggerItem>

            <StaggerItem className="mt-16 grid max-w-md grid-cols-3 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </StaggerItem>
          </StaggerIn>

          {/* Integrations status panel */}
          <StaggerIn className="lg:pt-1">
            <StaggerItem>
              <div className="overflow-hidden rounded-lg border border-border bg-surface/80 backdrop-blur">
                <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                  <p className="font-mono text-xs text-muted-foreground">
                    production_integrations.log
                  </p>
                  <span className="flex items-center gap-2 font-mono text-xs text-signal">
                    <span className="status-dot-live size-1.5 rounded-full bg-signal" />
                    live
                  </span>
                </div>
                <div className="space-y-3 px-5 py-6">
                  {SKILLS.Integrations.slice(0, 3).map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-foreground">{integration.name}</span>
                      <span className="font-mono text-xs text-signal">
                        ✓ shipped
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerIn>
        </div>
      </section>

      {/* Integrations marquee — full-bleed, with logos */}
      <section className="hairline py-10">
        <ScrollReveal>
          <p className="site-container mb-6 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Production integrations I&apos;ve shipped
          </p>
        </ScrollReveal>
        <IntegrationsMarquee />
      </section>

      {/* Capabilities — editorial list */}
      <section className="hairline">
        <div className="site-container grid gap-10 py-20 lg:grid-cols-[0.9fr_2fr] lg:gap-16 lg:py-24">
          <ScrollReveal>
            <h2 className="font-display max-w-xs text-2xl font-semibold leading-tight">
              What working with me looks like
            </h2>
          </ScrollReveal>
          <ScrollStagger className="space-y-10">
            {CAPABILITIES.map((capability, i) => (
              <ScrollStaggerItem
                key={capability.title}
                className="group flex max-w-2xl gap-5"
              >
                <span className="font-mono text-sm text-muted-foreground/60 transition-colors group-hover:text-accent">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {capability.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {capability.body}
                  </p>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* Featured case study — static, no link, no arrow */}
      {featuredProject && (
        <section className="hairline">
          <div className="site-container py-20 lg:py-24">
            <ScrollReveal>
              <TiltCard className="hover-lift grid overflow-hidden rounded-lg border border-border md:grid-cols-2">
                <div className="flex min-h-72 flex-col justify-between bg-surface p-8 sm:p-12">
                  <p className="font-mono text-xs text-muted-foreground">
                    {featuredProject.date}
                  </p>
                  <h3 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                    {featuredProject.title}
                  </h3>
                  <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                    Featured work
                  </span>
                </div>
                <div className="flex min-h-72 flex-col justify-between p-8 sm:p-12">
                  <p className="max-w-md leading-relaxed text-muted-foreground">
                    {featuredProject.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.tech.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Skills — bento grid, with logos */}
      <section className="hairline">
        <div className="site-container py-20 lg:py-24">
          <ScrollReveal>
            <h2 className="font-display mb-10 max-w-xs text-2xl font-semibold leading-tight">
              What I work with
            </h2>
          </ScrollReveal>
          <ScrollStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(SKILLS).map(([category, items], i) => (
              <ScrollStaggerItem
                key={category}
                className={`hover-lift group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40 ${
                  i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {category}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <TechChip
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      color={item.color}
                    />
                  ))}
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="hairline">
        <ScrollReveal className="site-container flex flex-col items-start justify-between gap-8 py-20 sm:flex-row sm:items-end lg:py-24">
          <h2 className="font-display max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">
            Have something that needs to work in production, not just in a demo?
          </h2>
          <MagneticButton className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
            >
              Let&apos;s talk{" "}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
        </ScrollReveal>
      </section>
    </main>
  );
}
