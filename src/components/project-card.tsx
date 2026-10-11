import ReactMarkdown, { type Components } from "react-markdown";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/tilt-card";
import type { Project } from "@/types/project";

/** Styling for the markdown inside the expandable case study. */
const markdownComponents: Components = {
  h2: ({ children }) => (
    <h4 className="mt-6 mb-2 text-sm font-medium text-foreground first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mt-2 leading-relaxed text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => <ul className="mt-2 space-y-2">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 leading-relaxed text-muted-foreground">
      <span
        aria-hidden="true"
        className="mt-2.5 size-1 shrink-0 rounded-full bg-accent/60"
      />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  ),
};

/**
 * Static display card — intentionally not a link. The summary is always
 * visible; the full write-up opens in place via a native <details> element
 * (no JS, keyboard accessible, content stays in the DOM for SEO).
 */
export function ProjectCard({ project }: { project: Project }) {
  // The tech badges already show the stack, so drop the "## Stack" section.
  const body = project.content
    .replace(/\n?## Stack[\s\S]*?(?=\n## |$)/, "")
    .trim();

  return (
    <TiltCard className="hover-lift overflow-hidden rounded-lg border border-border bg-surface/70 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 sm:p-8">
      <p className="font-mono text-xs text-muted-foreground">{project.date}</p>
      <h3 className="font-display mt-2 text-2xl font-semibold leading-tight">
        {project.title}
      </h3>
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
        {project.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>

      {body && (
        <details className="group mt-8 border-t border-border pt-5">
          <summary
            data-cursor="hover"
            className="case-toggle flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            <Plus className="case-icon size-4" aria-hidden="true" />
            <span className="group-open:hidden">Read the case study</span>
            <span className="hidden group-open:inline">Hide the case study</span>
          </summary>
          <div className="case-body mt-5 max-w-2xl">
            <ReactMarkdown components={markdownComponents}>{body}</ReactMarkdown>
          </div>
        </details>
      )}
    </TiltCard>
  );
}