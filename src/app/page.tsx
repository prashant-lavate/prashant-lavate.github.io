import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getAllProjects } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
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
  title: "Software engineer, Mumbai",
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
  const recentProjects = [...projects]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  // The marquee already covers integrations, so skip that group in the skills grid.
  const skillGroups = Object.entries(SKILLS).filter(
    ([category]) => category !== "Integrations",
  );

  return (
    <main className="overflow-x-clip">
      {/* Hero — the site-wide starfield (in layout.tsx) is the background */}
      <section className="relative">
        <div className="relative site-container grid gap-12 py-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.35fr_0.75fr] lg:items-center lg:gap-12 lg:py-16">
          <StaggerIn>
            <StaggerItem>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                <span className="status-dot-live size-1.5 rounded-full bg-signal" />
                {SITE_CONFIG.availability}
              </span>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-display max-w-2xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
                {SITE_CONFIG.tagline}
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              I&apos;m {SITE_CONFIG.name.split(" ")[0]}, a software engineer who
              builds and maintains production applications end to end — from
              Angular and React on the frontend to Node.js on the backend, with
              APIs, databases, and third-party integrations in between.
            </StaggerItem>
            <StaggerItem className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {SITE_CONFIG.location}
            </StaggerItem>
            <StaggerItem className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/contact"
                className="inline-block bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
              >
                Get in touch
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
              >
                See my work{" "}
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={SITE_CONFIG.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
              >
                Resume{" "}
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </StaggerItem>

            <StaggerItem className="mt-12 grid max-w-md grid-cols-2 gap-6">
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

          {/* Launch log — built from the real project data */}
          <StaggerIn className="lg:pt-1">
            <StaggerItem>
              <div className="overflow-hidden rounded-lg border border-border bg-surface/70 backdrop-blur">
                <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                  <p className="font-mono text-xs text-muted-foreground">
                    recent_launches.log
                  </p>
                  <span className="flex items-center gap-2 font-mono text-xs text-signal">
                    <span className="status-dot-live size-1.5 rounded-full bg-signal" />
                    live
                  </span>
                </div>
                <div className="space-y-3 px-5 py-6">
                  {recentProjects.map((project) => (
                    <div
                      key={project.slug}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-foreground">{project.title}</span>
                      <span className="shrink-0 font-mono text-xs text-signal">
                        ✓ {project.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerIn>
        </div>
      </section>

      {/* Integrations marquee — full-bleed */}
      <section className="hairline py-10">
        <ScrollReveal>
          <p className="site-container mb-6 text-sm text-muted-foreground">
            Production integrations I&apos;ve shipped
          </p>
        </ScrollReveal>
        <IntegrationsMarquee />
      </section>

      {/* Capabilities */}
      <section className="hairline">
        <div className="site-container grid gap-10 py-20 lg:grid-cols-[0.9fr_2fr] lg:gap-16 lg:py-24">
          <ScrollReveal>
            <h2 className="font-display max-w-xs text-2xl font-semibold leading-tight">
              What working with me looks like
            </h2>
          </ScrollReveal>
          <ScrollStagger className="space-y-10">
            {CAPABILITIES.map((capability) => (
              <ScrollStaggerItem
                key={capability.title}
                className="group max-w-2xl border-l border-border pl-6 transition-colors hover:border-accent/60"
              >
                <h3 className="text-lg font-medium text-foreground">
                  {capability.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {capability.body}
                </p>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* Featured case study — static, no link */}
      {featuredProject && (
        <section className="hairline">
          <div className="site-container py-20 lg:py-24">
            <ScrollReveal>
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold leading-tight">
                  Featured work
                </h2>
                <Link
                  href="/projects"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
                >
                  All projects{" "}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <TiltCard className="hover-lift grid overflow-hidden rounded-lg border border-border md:grid-cols-2">
                <div className="flex min-h-72 flex-col justify-between bg-surface/70 p-8 backdrop-blur-sm sm:p-12">
                  <p className="font-mono text-xs text-muted-foreground">
                    {featuredProject.date}
                  </p>
                  <h3 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                    {featuredProject.title}
                  </h3>
                </div>
                <div className="flex min-h-72 flex-col justify-between bg-surface/40 p-8 backdrop-blur-sm sm:p-12">
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

      {/* Skills */}
      <section className="hairline">
        <div className="site-container py-20 lg:py-24">
          <ScrollReveal>
            <h2 className="font-display max-w-xs text-2xl font-semibold leading-tight">
              What I work with
            </h2>
            <p className="mt-3 mb-10 text-sm text-muted-foreground">
              Dashed chips are tools I know but don&apos;t use daily.
            </p>
          </ScrollReveal>
          <ScrollStagger className="grid gap-4 md:grid-cols-3">
            {skillGroups.map(([category, items]) => (
              <ScrollStaggerItem
                key={category}
                className="hover-lift group relative overflow-hidden rounded-lg border border-border bg-surface/70 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <p className="text-sm font-medium text-foreground">
                  {category}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <TechChip
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      color={item.color}
                      familiar={item.familiar}
                    />
                  ))}
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* Two ways to work together: roles and client projects */}
      <section className="hairline">
        <div className="site-container py-20 lg:py-24">
          <ScrollReveal>
            <h2 className="font-display max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">
              Hiring, or have something to build?
            </h2>
          </ScrollReveal>
          <ScrollStagger className="mt-10 grid gap-4 md:grid-cols-2">
            <ScrollStaggerItem className="hover-lift flex flex-col justify-between rounded-lg border border-border bg-surface/70 p-8 backdrop-blur-sm transition-colors hover:border-accent/40">
              <div>
                <h3 className="font-display text-xl font-semibold">
                  Join your team
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  I&apos;m open to software engineer roles in{" "}
                  {SITE_CONFIG.location} — building, shipping and supporting
                  production systems.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={SITE_CONFIG.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
                >
                  View resume
                </a>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-foreground hover:text-accent"
                >
                  Get in touch
                </Link>
              </div>
            </ScrollStaggerItem>
            <ScrollStaggerItem className="hover-lift flex flex-col justify-between rounded-lg border border-border bg-surface/70 p-8 backdrop-blur-sm transition-colors hover:border-accent/40">
              <div>
                <h3 className="font-display text-xl font-semibold">
                  Build your product
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Need a web app, an API, or an integration like payments or
                  WhatsApp built or fixed? I take on freelance projects, from
                  first scope to deployment.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/contact"
                  className="inline-block rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
                >
                  Start a project
                </Link>
                <Link
                  href="/projects"
                  className="text-sm font-medium text-foreground hover:text-accent"
                >
                  See my work
                </Link>
              </div>
            </ScrollStaggerItem>
          </ScrollStagger>
        </div>
      </section>
    </main>
  );
}
