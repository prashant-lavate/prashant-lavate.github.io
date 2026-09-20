export interface ProjectFrontmatter {
  title: string;
  slug: string;
  summary: string;
  tech: string[];
  date: string;
  featured?: boolean;
}

export interface Project extends ProjectFrontmatter {
  content: string; // raw MDX body
}
