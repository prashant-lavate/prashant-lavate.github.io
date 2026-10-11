// Single source of truth for years of experience. Keep this identical to your
// resume and LinkedIn. It feeds the hero stat and the experience entry.
export const YEARS_EXPERIENCE = "2+";

export const SITE_CONFIG = {
  name: "Prashant Lavate",
  title: "Software engineer",
  tagline: "Software engineer building products that hold up in production",
  description:
    "Software engineer experienced in building and maintaining production applications end to end — from frontend and backend development to APIs, databases, cloud services, deployments, and third-party integrations.",
  url: "https://prashant-lavate.github.io",
  email: "prashant.lavate.in@gmail.com",
  location: "Mumbai, Navi Mumbai & Pune",
  availability: "Open to software engineer roles and freelance projects.",
  resume: "/Prashant_Lavate_Software_Engineer.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/prashant-lavate-631966214/",
    github: "https://github.com/prashant-lavate",
    instagram: "https://www.instagram.com/prashant.lavate_/",
  },
};

type Skill = {
  name: string;
  icon: string;
  color: string;
  /** Short caption, used by the integrations marquee. */
  detail?: string;
  /** true = familiar with it, but not a daily driver. Rendered with a dashed chip. */
  familiar?: boolean;
};

// Each skill carries an icon key (resolved in tech-icon.tsx) and a stylized
// accent color — not official brand artwork, to keep things trademark-safe.
export const SKILLS: Record<string, Skill[]> = {
  Frontend: [
    { name: "Angular 15 (SSR)", icon: "Component", color: "#DD0031" },
    { name: "React", icon: "Atom", color: "#61DAFB" },
    { name: "Next.js", icon: "Triangle", color: "#EDEFF2" },
    { name: "TypeScript", icon: "FileCode2", color: "#3178C6" },
    { name: "Tailwind CSS", icon: "Wind", color: "#38BDF8" },
    { name: "RxJS", icon: "Workflow", color: "#B7178C" },
  ],
  Backend: [
    { name: "Node.js", icon: "Hexagon", color: "#3C873A" },
    { name: "Express", icon: "Server", color: "#9CA3AF" },
    { name: "MongoDB", icon: "Leaf", color: "#47A248" },
    { name: "REST APIs", icon: "Network", color: "#4C8DFF" },
    { name: "PostgreSQL", icon: "Database", color: "#336791", familiar: true },
    { name: "Prisma", icon: "Layers", color: "#5A67D8", familiar: true },
    { name: "Redis", icon: "Zap", color: "#DC382D", familiar: true },
  ],
  Integrations: [
    { name: "Razorpay", icon: "CreditCard", color: "#5B8DEF", detail: "Payments" },
    { name: "WhatsApp Business API", icon: "MessageCircle", color: "#3ECF8E", detail: "Messaging & OTP" },
    { name: "Zoom SDK", icon: "Video", color: "#4C8DFF", detail: "Live sessions" },
    { name: "Firebase", icon: "Bell", color: "#F5A623", detail: "Push notifications" },
    { name: "Google Sign-In", icon: "KeyRound", color: "#EF6C6C", detail: "Authentication" },
  ],
  "DevOps & Infra": [
    { name: "AWS EC2", icon: "Cpu", color: "#FF9900" },
    { name: "AWS S3", icon: "Cloud", color: "#FF9900" },
    { name: "PM2", icon: "Activity", color: "#8B5CF6" },
    { name: "Nginx", icon: "Globe", color: "#009639" },
    { name: "Capacitor (Android)", icon: "Smartphone", color: "#119EFF" },
    { name: "Git", icon: "GitBranch", color: "#F05033" },
    { name: "Docker", icon: "Box", color: "#2496ED", familiar: true },
  ],
};

// Same data, flattened — used by the homepage marquee strip.
export const INTEGRATIONS = SKILLS.Integrations.map((s) => ({
  name: s.name,
  detail: s.detail ?? "",
  icon: s.icon,
  color: s.color,
}));

export const STATS = [
  { value: YEARS_EXPERIENCE, label: "Years shipping production code" },
  { value: "5+", label: "Third-party integrations live in prod" },
];

export const NAV_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Evara Technologies",
    period: `Current — ${YEARS_EXPERIENCE} years`,
    description:
      "End-to-end ownership of production applications on a small engineering team of 2–3 developers, working directly with the company director. Responsible for frontend, backend, APIs, databases, integrations, deployments, and production support.",
  },
];