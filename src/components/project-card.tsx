import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/tilt-card";
import type { Project } from "@/types/project";

/**
 * Static display card — intentionally not a link. There's no per-project
 * detail route, so these just present the summary in place. Tilt effect
 * stays for visual interest; nothing here navigates anywhere.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="relative overflow-hidden rounded-lg border border-border p-6 transition-colors hover:border-accent/40 sm:p-8">
      <p className="font-mono text-xs text-muted-foreground">{project.date}</p>
      <h3 className="font-display mt-2 text-2xl font-semibold leading-tight">{project.title}</h3>
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
    </TiltCard>
  );
}
