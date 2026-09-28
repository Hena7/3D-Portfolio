// ─── Portfolio Data ────────────────────────────────────────────────────────
// Edit this file to customize all portfolio content.

export const personalInfo = {
  name: "Henok Mekonnen",
  title: "Full Stack Developer",
  tagline: "Building digital experiences that live at the intersection of design and engineering.",
  email: "henockmekonnen105@gmail.com",
  phone: "+251 90 430 7038",
  phoneRaw: "+251904307038",
  github: "https://github.com/Hena7",
  linkedin: "https://www.linkedin.com/in/henok-mekonnen-734731362",
  telegram: "https://t.me/hena2129",
  telegramHandle: "@hena2129",
  location: "Addis Ababa, Ethiopia",
  avatar: "/avatar.jpg",
  resumeUrl: "/Henok_Mekonnen_Fullstack_Resume.pdf",
};

// Typing animation roles
export const roles = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "Node.js & Spring Boot Dev",
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
  { name: "Node.js", icon: "SiNodedotjs", category: "Backend", level: 85, color: "#339933" },
  { name: "PostgreSQL", icon: "SiPostgresql", category: "Backend", level: 85, color: "#4169E1" },
  { name: "MongoDB", icon: "SiMongodb", category: "Backend", level: 82, color: "#47A248" },
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
  longDescription?: string;
  tags: string[];
  github: string;
  live: string;
  demoLink?: string;
  githubLink?: string;
  image?: string;
  featured: boolean;
  category: "Full-Stack" | "Frontend" | "Backend" | string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "playstation-tournament",
    title: "PlayStation Tournament App",
    description:
      "Competitive gaming platform using Swiss-system pairing. Features random pairing, ranking system, live leaderboard, and detailed player dashboards.",
    tags: ["React", "TailwindCSS", "Prisma", "Node.js", "Socket.io"],
    category: "Full-Stack",
    live: "https://bekisha.vercel.app",
    github: "https://github.com/Hena7/PlayStation-Tournament-App",
    demoLink: "https://bekisha.vercel.app",
    githubLink: "https://github.com/Hena7/PlayStation-Tournament-App",
    image:
      "https://api.microlink.io/?url=https://bekisha.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    featured: true,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "maedot-consulting",
    title: "Maedot Consulting",
    description:
      "A comprehensive construction consulting management app that organizes clients, projects, and analytics dashboards. Includes robust admin features for efficient management.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full-Stack",
    live: "https://maedot-consultant.vercel.app",
    github: "https://github.com/Hena7/Maedot-Consulting",
    demoLink: "https://maedot-consultant.vercel.app",
    githubLink: "https://github.com/Hena7/Maedot-Consulting",
    image:
      "https://api.microlink.io/?url=https://maedot-consultant.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    featured: true,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "yzezun-delivery",
    title: "Yzezun Delivery System",
    description:
      "A food delivery platform featuring admin and customer dashboards, real-time order tracking, and efficient delivery management systems.",
    tags: ["Next.js", "TailwindCSS", "Firebase", "Google Maps API"],
    category: "Full-Stack",
    live: "https://yzezun.vercel.app",
    github: "https://github.com/Hena7/Yzezun-delivery",
    demoLink: "https://yzezun.vercel.app",
    githubLink: "https://github.com/Hena7/Yzezun-delivery",
    image:
      "https://api.microlink.io/?url=https://yzezun.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    featured: true,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "easy-rent-x",
    title: "EasyRentX",
    description:
      "A modern car rental application with advanced search, booking management, and user-friendly interface for seamless vehicle rental experiences.",
    tags: ["React", "TypeScript", "TailwindCSS", "Prisma"],
    category: "Full-Stack",
    live: "https://easy-rent-h.vercel.app",
    github: "https://github.com/Hena7/EasyRentX",
    demoLink: "https://easy-rent-h.vercel.app",
    githubLink: "https://github.com/Hena7/EasyRentX",
    image:
      "https://api.microlink.io/?url=https://easy-rent-h.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    featured: true,
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    id: "heni-chat",
    title: "HeniChat",
    description:
      "A modern real-time chat application built with Next.js, Zustand, and Firebase. Features clean UI, responsive design, chat lists, message bubbles, and real-time syncing. Designed to showcase UI architecture and dynamic state management.",
    tags: ["Next.js", "TailwindCSS", "ShadCN UI", "Firebase", "Zustand"],
    category: "Frontend",
    live: "https://heni-chat-h.vercel.app",
    github: "https://github.com/Hena7/HeniChat",
    demoLink: "https://heni-chat-h.vercel.app",
    githubLink: "https://github.com/Hena7/HeniChat",
    image:
      "https://api.microlink.io/?url=https://heni-chat-h.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    featured: true,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "lena-garment-store",
    title: "Lena Garment Store",
    description:
      "An elegant e-commerce platform for luxury fashion items featuring a modern shopping experience, product catalog, and streamlined checkout process.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Stripe"],
    category: "Full-Stack",
    live: "https://lena-luxe-wear.vercel.app",
    github: "https://github.com/Hena7/Lena-garment-store",
    demoLink: "https://lena-luxe-wear.vercel.app",
    githubLink: "https://github.com/Hena7/Lena-garment-store",
    image:
      "https://api.microlink.io/?url=https://lena-luxe-wear.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    featured: true,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "property-rental-platform",
    title: "Property Rental Platform",
    description:
      "A Next.js-powered rental platform with comprehensive property listings, booking system, and intuitive user experience for property rentals.",
    tags: ["Next.js", "React", "TailwindCSS", "MongoDB"],
    category: "Full-Stack",
    live: "https://easy-rent-x.vercel.app",
    github: "https://github.com/Hena7/EasyRent",
    demoLink: "https://easy-rent-x.vercel.app",
    githubLink: "https://github.com/Hena7/EasyRent",
    image:
      "https://api.microlink.io/?url=https://easy-rent-x.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    featured: false,
    gradient: "from-teal-500/20 to-cyan-500/20",
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
