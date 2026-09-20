# Prashant Lavate — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui (Base UI primitives) + MDX-driven project content + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Editing content

- **Site info, skills, stats, nav:** `src/lib/constants.ts` — replace the TODO email and GitHub URL
- **Projects:** add/edit `.mdx` files in `src/content/projects/` — frontmatter must match `src/types/project.ts`
- **Home page copy:** `src/app/page.tsx`
- **About page:** `src/app/about/page.tsx`

## Deploying

Push to GitHub, then import the repo on [vercel.com](https://vercel.com) — zero config needed for Next.js.
