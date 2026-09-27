import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCE, SITE_CONFIG, SKILLS } from "@/lib/constants";
import { TechChip } from "@/components/tech-icon";
import {
  StaggerIn,
  StaggerItem,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="site-container py-20 lg:py-28">
      <StaggerIn>
        <StaggerItem>
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-accent uppercase">About</p>
        </StaggerItem>
        <StaggerItem>
          <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            {SITE_CONFIG.name}
          </h1>
        </StaggerItem>
        <StaggerItem className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {SITE_CONFIG.description}
        </StaggerItem>
      </StaggerIn>

      {/* Experience */}
      <section className="hairline mt-16 pt-16">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold leading-tight">Experience</h2>
        </ScrollReveal>
        <ScrollStagger className="mt-8 space-y-10">
          {EXPERIENCE.map((role) => (
            <ScrollStaggerItem
              key={`${role.org}-${role.role}`}
              className="grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-8"
            >
              <div>
                <p className="font-medium text-foreground">{role.role}</p>
                <p className="text-sm text-muted-foreground">{role.org}</p>
                <p className="font-mono text-xs text-muted-foreground">{role.period}</p>
              </div>
              <p className="max-w-xl leading-relaxed text-muted-foreground">{role.description}</p>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>

      {/* Skills */}
      <section className="hairline mt-16 pt-16">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold leading-tight">What I work with</h2>
        </ScrollReveal>
        <ScrollStagger className="mt-8 grid gap-8 sm:grid-cols-2">
          {Object.entries(SKILLS).map(([category, items]) => (
            <ScrollStaggerItem key={category}>
              <p className="font-mono text-xs text-muted-foreground">{category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <TechChip key={item.name} name={item.name} icon={item.icon} color={item.color} />
                ))}
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>

      {/* CTA */}
      <section className="hairline mt-16 pt-16">
        <ScrollReveal>
          <MagneticButton className="inline-block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
            >
              Get in touch <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
        </ScrollReveal>
      </section>
    </main>
  );
}