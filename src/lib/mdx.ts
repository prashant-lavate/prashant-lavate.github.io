import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const filePath = path.join(PROJECTS_DIR, filename);
    // Normalise Windows (CRLF) line endings so frontmatter parsing is predictable.
    const raw = fs.readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n");
    const { data, content } = matter(raw);
    const frontmatter = data as ProjectFrontmatter;

    return {
      ...frontmatter,
      content,
    };
  });

  // Manual `order` first, then newest first.
  return projects.sort(
    (a, b) =>
      (a.order ?? 99) - (b.order ?? 99) || (a.date < b.date ? 1 : -1),
  );
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}