// ─── Portfolio Data ────────────────────────────────────────────────────────
// Edit this file to customize all portfolio content.

export const personalInfo = {
  name: "Henok Mekonnen Berhe",
  shortName: "Henok Mekonnen",
  title: "Full-Stack Developer",
  tagline: "Full-Stack Developer specializing in React, Next.js, Node.js, and PostgreSQL. Passionate about solving real-world problems through clean architecture.",
  summary: "Full-Stack Developer specializing in React, Next.js, Node.js, and PostgreSQL. Experienced in building scalable web applications including e-commerce platforms, tournament systems, and management dashboards. Passionate about solving real-world problems through clean architecture and modern development practices.",
  email: "henockmekonnen105@gmail.com",
  phone: "+251 90 430 7038",
  phoneRaw: "+251904307038",
  github: "https://github.com/Hena7",
  linkedin: "https://www.linkedin.com/in/henok-mekonnen-734731362",
  telegram: "https://t.me/hena2129",
  telegramHandle: "@hena2129",
  location: "Addis Ababa, Ethiopia",
  education: "Bachelor of Engineer in Software Engineering, Mekelle University",
  graduation: "Expected graduation: June 2027",
  internship: "Software Engineering Intern at INSA (Information Network Security Administration)",
  avatar: "/avatar.jpg",
  resumeUrl: "/Henok_Mekonnen_Fullstack_Resume.pdf",
};

// Typing animation roles
export const roles = [
  "Full-Stack Developer",
  "React.js & Next.js Engineer",
  "Node.js & Express Specialist",
  "Spring Boot & PostgreSQL Dev",
  "Software Engineering @ Mekelle Univ",
];

// ─── Skills ────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  icon: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  level: number; // 0-100
  color: string;
}

export const skills: Skill[] = [
  // Front-end (from Resume)
  { name: "React.js", icon: "SiReact", category: "Frontend", level: 95, color: "#0284c7" },
  { name: "Next.js", icon: "SiNextdotjs", category: "Frontend", level: 94, color: "#0f172a" },
  { name: "TypeScript", icon: "SiTypescript", category: "Frontend", level: 90, color: "#3178C6" },
  { name: "TailwindCSS", icon: "SiTailwindcss", category: "Frontend", level: 92, color: "#06B6D4" },
  { name: "HTML5 & CSS3", icon: "SiHtml5", category: "Frontend", level: 95, color: "#E34F26" },
  { name: "Framer Motion", icon: "SiFramer", category: "Frontend", level: 82, color: "#0055FF" },

  // Back-end (from Resume)
  { name: "Node.js", icon: "SiNodedotjs", category: "Backend", level: 92, color: "#339933" },
  { name: "Express.js", icon: "SiExpress", category: "Backend", level: 90, color: "#1e293b" },
  { name: "NestJS", icon: "SiNestjs", category: "Backend", level: 82, color: "#E0234E" },
  { name: "Spring Boot", icon: "SiSpring", category: "Backend", level: 86, color: "#6DB33F" },

  // Database (from Resume)
  { name: "PostgreSQL", icon: "SiPostgresql", category: "Database", level: 92, color: "#4169E1" },
  { name: "MongoDB", icon: "SiMongodb", category: "Database", level: 86, color: "#47A248" },
  { name: "SQL", icon: "SiMysql", category: "Database", level: 90, color: "#00758F" },
  { name: "Redis", icon: "SiRedis", category: "Database", level: 75, color: "#DC382D" },

  // Tools (from Resume)
  { name: "Git", icon: "SiGit", category: "Tools", level: 94, color: "#F05032" },
  { name: "GitHub", icon: "SiGithub", category: "Tools", level: 94, color: "#0f172a" },
  { name: "Docker", icon: "SiDocker", category: "Tools", level: 82, color: "#2496ED" },
  { name: "Swagger", icon: "SiSwagger", category: "Tools", level: 88, color: "#85EA2D" },
  { name: "Trello", icon: "SiTrello", category: "Tools", level: 85, color: "#0052CC" },
  { name: "VS Code", icon: "SiVisualstudiocode", category: "Tools", level: 96, color: "#007ACC" },
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
    year: "Feb 2026 – Jun 2026",
    title: "Software Engineering Intern",
    company: "INSA (Information Network Security Administration)",
    description: "Developed features for an HR Training Management System using Next.js, TypeScript, Spring Boot, and PostgreSQL. Implemented responsive user interfaces, integrated backend APIs, and applied Git-based version control.",
    type: "work",
  },
  {
    year: "2024 – Present",
    title: "Full-Stack Web Architect",
    company: "Independent & Open Source Projects",
    description: "Engineered scalable web applications: PlayStation Tournament App (Swiss-system pairing & live leaderboards), Lena Luxe Wear e-commerce, Maedot Consulting management system, and Yzezun Delivery.",
    type: "work",
  },
  {
    year: "Expected June 2027",
    title: "Bachelor of Engineer in Software Engineering",
    company: "Mekelle University, Mekelle, Tigray, Ethiopia",
    description: "Consistently maintained strong academic performance in Software Engineering. Contributed to engineering group projects that strengthened teamwork, clean architecture, and problem-solving abilities.",
    type: "education",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────
export const stats = [
  { label: "Production Apps", value: 7, suffix: "+" },
  { label: "Core Technologies", value: 18, suffix: "+" },
  { label: "GitHub Repos", value: 35, suffix: "+" },
  { label: "Class of 2027", value: 100, suffix: "%" },
];
