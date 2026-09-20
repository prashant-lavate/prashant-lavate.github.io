import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCE, SITE_CONFIG, SKILLS } from "@/lib/constants";
import { TechChip } from "@/components/tech-icon";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="site-container py-20 lg:py-28">
      <p className="mb-4 text-xs font-bold tracking-[0.2em] text-accent uppercase">About</p>
      <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
        {SITE_CONFIG.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {SITE_CONFIG.description}
      </p>

      {/* Experience */}
      <section className="hairline mt-16 pt-16">
        <h2 className="font-display text-2xl font-semibold leading-tight">Experience</h2>
        <div className="mt-8 space-y-10">
          {EXPERIENCE.map((role) => (
            <div
              key={`${role.org}-${role.role}`}
              className="grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-8"
            >
              <div>
                <p className="font-medium text-foreground">{role.role}</p>
                <p className="text-sm text-muted-foreground">{role.org}</p>
                <p className="font-mono text-xs text-muted-foreground">{role.period}</p>
              </div>
              <p className="max-w-xl leading-relaxed text-muted-foreground">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="hairline mt-16 pt-16">
        <h2 className="font-display text-2xl font-semibold leading-tight">What I work with</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-xs text-muted-foreground">{category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <TechChip key={item.name} name={item.name} icon={item.icon} color={item.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hairline mt-16 pt-16">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Get in touch <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
