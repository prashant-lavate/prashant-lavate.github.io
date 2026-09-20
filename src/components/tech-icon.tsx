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

/** A small pill: icon in a tinted circle + label. Used for skill/integration chips. */
export function TechChip({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
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
