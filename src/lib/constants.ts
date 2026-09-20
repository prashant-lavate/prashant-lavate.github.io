export const SITE_CONFIG = {
  name: "Prashant Lavate",
  title: "Full-Stack Developer",
  tagline: "Full-stack engineer for the parts that can't go down.",
  description:
    "Full-stack developer specializing in Angular, React, Node.js, and production integrations — Razorpay, WhatsApp Business, Zoom, Firebase, and Google Sign-In.",
  email: "prashant.lavate.in@gmail.com", // TODO: replace with your real email
  social: {
    linkedin: "https://www.linkedin.com/in/prashant-lavate-631966214/",
    github: "https://github.com/your-username", // TODO: replace
    instagram: "https://www.instagram.com/prashant.lavate_/", // TODO: replace
  },
};

// Each skill carries an icon key (resolved in tech-icon.tsx) and a stylized
// accent color — not official brand artwork, to keep things trademark-safe.
export const SKILLS: Record<string, { name: string; icon: string; color: string }[]> = {
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
    { name: "PostgreSQL", icon: "Database", color: "#336791" },
    { name: "Prisma", icon: "Layers", color: "#5A67D8" },
    { name: "Redis", icon: "Zap", color: "#DC382D" },
    { name: "REST APIs", icon: "Network", color: "#4C8DFF" },
  ],
  Integrations: [
    { name: "Razorpay", icon: "CreditCard", color: "#5B8DEF" },
    { name: "WhatsApp Business API", icon: "MessageCircle", color: "#3ECF8E" },
    { name: "Zoom SDK", icon: "Video", color: "#4C8DFF" },
    { name: "Firebase", icon: "Bell", color: "#F5A623" },
    { name: "Google Sign-In", icon: "KeyRound", color: "#EF6C6C" },
  ],
  "DevOps & Infra": [
    { name: "AWS EC2", icon: "Cpu", color: "#FF9900" },
    { name: "AWS S3", icon: "Cloud", color: "#FF9900" },
    { name: "Docker", icon: "Box", color: "#2496ED" },
    { name: "PM2", icon: "Activity", color: "#8B5CF6" },
    { name: "Nginx", icon: "Globe", color: "#009639" },
    { name: "Capacitor (Android)", icon: "Smartphone", color: "#119EFF" },
    { name: "Git", icon: "GitBranch", color: "#F05033" },
  ],
};

// Same data, flattened — used by the homepage marquee strip.
export const INTEGRATIONS = SKILLS.Integrations.map((s) => ({
  name: s.name,
  detail:
    s.name === "Razorpay"
      ? "Payments"
      : s.name === "WhatsApp Business API"
        ? "Messaging & OTP"
        : s.name === "Zoom SDK"
          ? "Live sessions"
          : s.name === "Firebase"
            ? "Push notifications"
            : "Authentication",
  icon: s.icon,
  color: s.color,
}));

export const STATS = [
  { value: "4+", label: "Years shipping production code" },
  { value: "5+", label: "Third-party integrations live in prod" },
  // { value: "2–3", label: "Person team, full ownership" },
];

export const NAV_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    org: "Evara Technologies",
    period: "Current — ~2 years",
    description:
      "Full-stack ownership of a production edtech/LMS platform on a small team of 2-3 developers, reporting directly to the company director. Frontend, backend, deployment, and everything that breaks in between.",
  },
];
