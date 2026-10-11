export interface ProjectFrontmatter {
  title: string;
  slug: string;
  summary: string;
  tech: string[];
  date: string;
  featured?: boolean;
  /** Lower number = shown first. Projects without it fall to the end, newest first. */
  order?: number;
}

export interface Project extends ProjectFrontmatter {
  content: string; // raw MDX body
}