import {
  Component,
  Atom,
  Triangle,
  FileCode2,
  Wind,
  Workflow,
  Hexagon,
  Server,
  Leaf,
  Database,
  Layers,
  Zap,
  Network,
  CreditCard,
  MessageCircle,
  Video,
  Bell,
  KeyRound,
  Cpu,
  Cloud,
  Box,
  Activity,
  Globe,
  Smartphone,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

export const TECH_ICON_MAP: Record<string, LucideIcon> = {
  Component,
  Atom,
  Triangle,
  FileCode2,
  Wind,
  Workflow,
  Hexagon,
  Server,
  Leaf,
  Database,
  Layers,
  Zap,
  Network,
  CreditCard,
  MessageCircle,
  Video,
  Bell,
  KeyRound,
  Cpu,
  Cloud,
  Box,
  Activity,
  Globe,
  Smartphone,
  GitBranch,
};

export function TechIcon({
  icon,
  color,
  className,
}: {
  icon: string;
  color: string;
  className?: string;
}) {
  const Icon = TECH_ICON_MAP[icon];
  if (!Icon) return null;
  return <Icon className={className} style={{ color }} aria-hidden="true" />;
}

/**
 * A small pill: icon in a tinted circle + label. Used for skill chips.
 * `familiar` renders a dashed, slightly dimmer chip: known, but not a daily driver.
 */
export function TechChip({
  name,
  icon,
  color,
  familiar = false,
}: {
  name: string;
  icon: string;
  color: string;
  familiar?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1.5 text-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 ${
        familiar
          ? "border-dashed border-border text-muted-foreground"
          : "border-border text-foreground"
      }`}
    >
      <span
        className="flex size-4 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}26` }}
      >
        <TechIcon icon={icon} color={color} className="size-2.5" />
      </span>
      {name}
    </span>
  );
}