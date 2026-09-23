// ─── Portfolio Data ────────────────────────────────────────────────────────
// Edit this file to customize all portfolio content.

export const personalInfo = {
  name: "Henock M.",
  title: "Full Stack Developer",
  tagline: "Building digital experiences that live at the intersection of design and engineering.",
  email: "henock@example.com",
  github: "https://github.com/henockm",
  linkedin: "https://linkedin.com/in/henockm",
  twitter: "https://twitter.com/henockm",
  location: "Addis Ababa, Ethiopia",
  avatar: "/avatar.jpg",
  resumeUrl: "/resume.pdf",
};

// Typing animation roles
export const roles = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "Spring Boot Backend Dev",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

// ─── Skills ────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  icon: string;
  category: "Frontend" | "Backend" | "DevOps" | "Tools";
  level: number; // 0-100
  color: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "SiReact", category: "Frontend", level: 95, color: "#61DAFB" },
  { name: "Next.js", icon: "SiNextdotjs", category: "Frontend", level: 92, color: "#ffffff" },
  { name: "TypeScript", icon: "SiTypescript", category: "Frontend", level: 88, color: "#3178C6" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", category: "Frontend", level: 92, color: "#06B6D4" },
  { name: "Framer Motion", icon: "SiFramer", category: "Frontend", level: 80, color: "#0055FF" },
  { name: "Three.js", icon: "SiThreedotjs", category: "Frontend", level: 72, color: "#ffffff" },
  // Backend
  { name: "Spring Boot", icon: "SiSpring", category: "Backend", level: 88, color: "#6DB33F" },
  { name: "Node.js", icon: "SiNodedotjs", category: "Backend", level: 82, color: "#339933" },
  { name: "PostgreSQL", icon: "SiPostgresql", category: "Backend", level: 85, color: "#4169E1" },
  { name: "MongoDB", icon: "SiMongodb", category: "Backend", level: 78, color: "#47A248" },
  { name: "Redis", icon: "SiRedis", category: "Backend", level: 70, color: "#DC382D" },
  { name: "Java", icon: "SiOpenjdk", category: "Backend", level: 85, color: "#ED8B00" },
  // DevOps
  { name: "Docker", icon: "SiDocker", category: "DevOps", level: 80, color: "#2496ED" },
  { name: "Kubernetes", icon: "SiKubernetes", category: "DevOps", level: 65, color: "#326CE5" },
  { name: "GitHub Actions", icon: "SiGithubactions", category: "DevOps", level: 78, color: "#2088FF" },
  { name: "AWS", icon: "SiAmazon", category: "DevOps", level: 70, color: "#FF9900" },
  // Tools
  { name: "Git", icon: "SiGit", category: "Tools", level: 92, color: "#F05032" },
  { name: "Keycloak", icon: "SiKeycloak", category: "Tools", level: 82, color: "#4D4D4D" },
  { name: "Figma", icon: "SiFigma", category: "Tools", level: 75, color: "#F24E1E" },
  { name: "VS Code", icon: "SiVisualstudiocode", category: "Tools", level: 95, color: "#007ACC" },
];

// ─── Projects ──────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
  category: "Web App" | "API" | "Mobile" | "AI/ML" | "Other";
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "erp-hr",
    title: "ERP HR System",
    description: "Full-featured HR management platform with Education & Training modules, Keycloak SSO, and role-based access control.",
    longDescription: "A comprehensive enterprise resource planning system for human resources. Built with Next.js frontend and Spring Boot backend. Features include employee management, education opportunity tracking, training requests, multi-level approval workflows, and Keycloak integration for secure authentication.",
    tags: ["Next.js", "Spring Boot", "Keycloak", "PostgreSQL", "TypeScript"],
    github: "https://github.com/henockm/erp-hr",
    live: "#",
    featured: true,
    category: "Web App",
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    id: "portfolio-3d",
    title: "3D Portfolio",
    description: "Immersive developer portfolio with React Three Fiber, Framer Motion animations, and a futuristic design system.",
    longDescription: "This very portfolio! Built with Next.js 15, React Three Fiber for 3D elements, Framer Motion for smooth animations, and a custom dark futuristic design system using Tailwind CSS.",
    tags: ["Next.js", "Three.js", "Framer Motion", "TypeScript", "Tailwind"],
    github: "https://github.com/henockm/portfolio-3d",
    live: "#",
    featured: true,
    category: "Web App",
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: "chat-app",
    title: "Real-time Chat App",
    description: "Socket.io powered chat application with rooms, file sharing, and end-to-end encryption.",
    longDescription: "A full-stack real-time messaging application featuring WebSocket communication, private and group rooms, file attachments, message encryption, and user presence indicators.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    github: "https://github.com/henockm/chat-app",
    live: "#",
    featured: true,
    category: "Web App",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "api-gateway",
    title: "Microservices API Gateway",
    description: "Spring Cloud Gateway with service discovery, load balancing, circuit breakers, and JWT auth.",
    longDescription: "A production-grade API gateway built with Spring Cloud. Features dynamic routing, Eureka service discovery, Resilience4j circuit breakers, rate limiting, and JWT-based authentication.",
    tags: ["Spring Boot", "Spring Cloud", "Docker", "PostgreSQL", "Java"],
    github: "https://github.com/henockm/api-gateway",
    live: "#",
    featured: false,
    category: "API",
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description: "React dashboard integrating OpenAI APIs for data analysis, trend prediction, and automated report generation.",
    longDescription: "An intelligent analytics dashboard that leverages OpenAI's API to analyze business data, identify patterns, generate natural language reports, and provide actionable insights through interactive charts.",
    tags: ["React", "OpenAI", "Python", "FastAPI", "Chart.js"],
    github: "https://github.com/henockm/ai-dashboard",
    live: "#",
    featured: false,
    category: "AI/ML",
    gradient: "from-amber-500/20 to-emerald-500/20",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin panel.",
    longDescription: "A scalable e-commerce platform with product catalogue, cart & checkout, Stripe payment integration, order tracking, inventory management, and a comprehensive admin dashboard.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "shadcn/ui"],
    github: "https://github.com/henockm/ecommerce",
    live: "#",
    featured: false,
    category: "Web App",
    gradient: "from-amber-500/20 to-cyan-500/20",
  },
];

// ─── Timeline ──────────────────────────────────────────────────────────────
export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
}

export const timeline: TimelineItem[] = [
  {
    year: "2024–Present",
    title: "Senior Full Stack Developer",
    company: "Tech Company",
    description: "Leading development of enterprise HR systems, microservices architecture, and DevOps pipelines.",
    type: "work",
  },
  {
    year: "2022–2024",
    title: "Full Stack Developer",
    company: "Startup",
    description: "Built scalable React/Next.js frontends and Spring Boot APIs serving thousands of daily users.",
    type: "work",
  },
  {
    year: "2020–2022",
    title: "Junior Developer",
    company: "Agency",
    description: "Developed responsive web applications for various clients using React and Node.js.",
    type: "work",
  },
  {
    year: "2016–2020",
    title: "BSc. Computer Science",
    company: "AAiT, Addis Ababa University",
    description: "Graduated with honors. Focused on software engineering, algorithms, and distributed systems.",
    type: "education",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────
export const stats = [
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "Projects Delivered", value: 40, suffix: "+" },
  { label: "Happy Clients", value: 20, suffix: "+" },
  { label: "GitHub Stars", value: 150, suffix: "+" },
];
