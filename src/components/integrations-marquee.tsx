import { INTEGRATIONS } from "@/lib/constants";
import { TechIcon } from "@/components/tech-icon";

function LogoChip({ integration }: { integration: (typeof INTEGRATIONS)[number] }) {
  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 transition-colors hover:border-accent/50">
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${integration.color}1f` }}
      >
        <TechIcon icon={integration.icon} color={integration.color} className="size-4" />
      </span>
      <div className="whitespace-nowrap">
        <p className="text-sm font-medium text-foreground">{integration.name}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{integration.detail}</p>
      </div>
    </div>
  );
}

/**
 * Seamless infinite horizontal scroll — the track is duplicated once so the
 * loop point is invisible, animated with a plain CSS keyframe (see
 * globals.css `.marquee-track`). Pauses on hover.
 */
export function IntegrationsMarquee() {
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-track flex w-max gap-4">
        {[...INTEGRATIONS, ...INTEGRATIONS].map((integration, i) => (
          <LogoChip key={`${integration.name}-${i}`} integration={integration} />
        ))}
      </div>
    </div>
  );
}
