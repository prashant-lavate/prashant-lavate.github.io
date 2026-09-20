import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/project-card";

export const metadata = {
  title: "Work",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="site-container py-20 lg:py-28">
      <p className="mb-4 text-xs font-bold tracking-[0.2em] text-accent uppercase">Selected work</p>
      <h1 className="font-display max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
        Platforms and integrations I&apos;ve built end to end.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Each of these shipped to production — not a demo, not a tutorial follow-along.
      </p>

      <div className="mt-16 space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
