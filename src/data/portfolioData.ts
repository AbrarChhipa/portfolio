export interface Project {
  id: string;
  name: string;
  category: 'mobile' | 'web' | 'system';
  period: string;
  icon: string;
  accent: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    playstore?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: string;
    proficiency: number;
    highlight?: boolean;
  }[];
}

export interface PortfolioFile {
  id: string;
  name: string;
  folder: 'src' | 'data' | 'root';
  path: string;
  lang: string;
  iconColor: string;
  fileType: 'tsx' | 'html' | 'js' | 'json' | 'ts' | 'css' | 'md' | 'pdf';
  description: string;
}

export const PERSONAL_INFO = {
  name: "Mohammad Abrar",
  role: "React Native Developer",
  subRole: "Mobile & Web Engineer · Cross-Platform Specialist",
  location: "Udaipur, Rajasthan, India",
  email: "abrarchhipa23@gmail.com",
  phone: "+91 9950786083",
  status: "Available for new opportunities & contracts",
  summary: "React Native Developer with 1.5+ years shipping production cross-platform apps (Android & iOS) using React Native, React.js, TypeScript, Redux Toolkit, RTK Query, REST APIs, Razorpay, and Firebase Auth.",
  links: {
    github: "https://github.com/AbrarChhipa",
    linkedin: "https://in.linkedin.com/in/mohammad-abrar-a75523275",
    email: "mailto:abrarchhipa23@gmail.com",
    gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=abrarchhipa23@gmail.com",
    phone: "tel:+919950786083",
  },
  stats: [
    { label: "Experience", value: "1.5+ Yrs" },
    { label: "Production Apps", value: "15+" },
    { label: "Cross-Platform", value: "Android & iOS" },
    { label: "API Latency Reduction", value: "30%" },
  ],
  typewriterRoles: [
    "React Native Developer 📱",
    "Shipping Cross-Platform iOS & Android Apps 🚀",
    "Redux Toolkit & RTK Query Architecture ⚛️",
    "Interactive Reels & Video Experiences 🎥",
    "Clean Code & Mobile Performance Fanatic ✨",
  ],
};

export const PORTFOLIO_FILES: PortfolioFile[] = [
  {
    id: "home",
    name: "home.tsx",
    folder: "src",
    path: "src/home.tsx",
    lang: "TypeScript React",
    iconColor: "#4fc1ff",
    fileType: "tsx",
    description: "Welcome page & developer overview",
  },
  {
    id: "about",
    name: "about.html",
    folder: "src",
    path: "src/about.html",
    lang: "HTML",
    iconColor: "#e34c26",
    fileType: "html",
    description: "Personal narrative, journey & philosophy",
  },
  {
    id: "projects",
    name: "projects.js",
    folder: "src",
    path: "src/projects.js",
    lang: "JavaScript",
    iconColor: "#f7df1e",
    fileType: "js",
    description: "Production mobile apps & engineering projects",
  },
  {
    id: "skills",
    name: "skills.json",
    folder: "data",
    path: "data/skills.json",
    lang: "JSON",
    iconColor: "#dcdcaa",
    fileType: "json",
    description: "Technical skills, tools & proficiency matrix",
  },
  {
    id: "experience",
    name: "experience.ts",
    folder: "src",
    path: "src/experience.ts",
    lang: "TypeScript",
    iconColor: "#3178c6",
    fileType: "ts",
    description: "Professional career timeline & track record",
  },
  {
    id: "contact",
    name: "contact.css",
    folder: "src",
    path: "src/contact.css",
    lang: "CSS",
    iconColor: "#563d7c",
    fileType: "css",
    description: "Contact form & direct communication channels",
  },
  {
    id: "readme",
    name: "README.md",
    folder: "root",
    path: "README.md",
    lang: "Markdown",
    iconColor: "#42b883",
    fileType: "md",
    description: "Repository overview & documentation",
  },
  {
    id: "resume",
    name: "Mohammad_Abrar_Resume.pdf",
    folder: "root",
    path: "Mohammad_Abrar_Resume.pdf",
    lang: "PDF",
    iconColor: "#f44747",
    fileType: "pdf",
    description: "Curriculum Vitae & printable PDF",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "blind-assist",
    name: "BlindAssist App",
    category: "mobile",
    period: "2026",
    icon: "👁️",
    accent: "#4fc1ff",
    tagline: "Voice-guided accessibility app with offline Venue Mode & NFC support",
    description: "Developed an accessibility-focused React Native application featuring voice-guided navigation, accessible UI components, NFC-based physical tag reading, and hardware volume-button controls designed specifically for visually impaired users.",
    keyFeatures: [
      "Voice-guided navigation and screen-reader accessibility integration",
      "NFC-based information reading for tactile landmark detection",
      "Hardware volume-button interception for blind gesture controls",
      "Offline SQLite storage with custom Venue Mode to import and navigate venue-specific JSON maps",
    ],
    techStack: ["React Native", "TypeScript", "SQLite", "NFC Manager", "Text-to-Speech", "Hardware Key API"],
    links: {
      github: "https://github.com/AbrarChhipa",
    },
  },
  {
    id: "turf-booking",
    name: "Turf Booking Platform",
    category: "mobile",
    period: "2026",
    icon: "⚽",
    accent: "#4ec9b0",
    tagline: "Two-sided sports facility booking platform with automated payments",
    description: "Built a production-grade, two-sided turf booking ecosystem serving both facility owners and sports enthusiasts. Covers facility onboarding, slot scheduling, real-time availability sync, and seamless multi-mode booking.",
    keyFeatures: [
      "Two-sided platform for arena owners and players with role-based routing",
      "Flexible booking options: slot-wise, full-day, multi-day, corporate, and tournaments",
      "Integrated Razorpay payment gateway with instant webhook verification",
      "Real-time slot availability lock to prevent double booking",
    ],
    techStack: ["React Native", "Redux Toolkit", "RTK Query", "Razorpay", "REST APIs", "Push Notifications"],
    links: {
      github: "https://github.com/AbrarChhipa",
    },
  },
  {
    id: "digital-gold",
    name: "Digital Gold Investment App",
    category: "mobile",
    period: "2025",
    icon: "🥇",
    accent: "#fabd2f",
    tagline: "Real-time gold purchasing, portfolio management & transaction analytics",
    description: "Developed a digital gold wealth application allowing users to buy, sell, and accumulate gold holdings in real time. Backed by live market rate feeds and secure payment processing.",
    keyFeatures: [
      "Live gold price streaming with market charts and historical price tracking",
      "Seamless Razorpay checkout with instant vault certificate generation",
      "Dynamic portfolio valuation and transaction history logging",
      "Token-based biometric authentication and fraud prevention checks",
    ],
    techStack: ["React Native", "Razorpay", "Axios", "Redux Toolkit", "ChartKit", "Secure Storage"],
    links: {
      github: "https://github.com/AbrarChhipa",
    },
  },
  {
    id: "reels-stories-engine",
    name: "Reels & Stories Feature Module",
    category: "system",
    period: "2025",
    icon: "🎬",
    accent: "#ff6fd8",
    tagline: "High-performance video module with interactive stickers & doodle editor",
    description: "Engineered an Instagram-style Reels and Stories subsystem for production mobile applications at Websenor Infotech. Supports multi-story uploads, pinch-to-zoom stickers, custom text overlays, and gesture doodle tools for videos and images.",
    keyFeatures: [
      "Multi-story upload with automated queue handling and background progress tasks",
      "Interactive editor: pinch-to-zoom stickers, custom text overlays, and gesture doodling",
      "Optimized multipart media chunking module supporting large video files",
      "Smooth 60fps animations with React Native Reanimated",
    ],
    techStack: ["React Native", "PanResponder", "Reanimated 3", "Video Processing", "AWS S3 Multipart"],
    links: {
      github: "https://github.com/AbrarChhipa",
    },
  },
  {
    id: "live-streaming-app",
    name: "Real-Time Live Streaming Platform",
    category: "mobile",
    period: "2025",
    icon: "📡",
    accent: "#7aa2f7",
    tagline: "Ultra-low latency live broadcasting & real-time chat with ZegoCloud",
    description: "Implemented a full-featured live broadcasting module supporting interactive host-audience streams with low latency, real-time comment feeds, gift reactions, and co-hosting capabilities.",
    keyFeatures: [
      "ZegoCloud RTC integration for sub-second video and audio broadcasting",
      "High-throughput real-time chat feed with reaction bubbles and moderations",
      "Stream health metrics and adaptive bitrate based on network bandwidth",
      "Token-based room authentication and broadcaster permissions",
    ],
    techStack: ["React Native", "ZegoCloud RTC", "WebSockets", "Firebase", "Redux Toolkit"],
    links: {
      github: "https://github.com/AbrarChhipa",
    },
  },
  {
    id: "websenor-apps",
    name: "Production App Store & Play Store Suite",
    category: "mobile",
    period: "2025 – Present",
    icon: "🚀",
    accent: "#c586c0",
    tagline: "15+ production apps delivered with Google Play & Apple App Store releases",
    description: "Spearheaded the mobile engineering lifecycle across 15+ production React Native apps at Websenor Infotech, including standalone delivery of 5 end-to-end commercial applications and client outsourcing deliverables.",
    keyFeatures: [
      "End-to-end publishing on Google Play Console and Apple App Store Connect",
      "Apple Push Notification service (APNs) and Firebase Cloud Messaging (FCM) setup",
      "Production signing certificates, provisioning profiles, and release pipelines",
      "30% API latency improvement through RTK Query caching and Axios request pooling",
    ],
    techStack: ["React Native", "TypeScript", "Xcode", "Android Studio", "Fastlane", "APNs", "Firebase"],
    links: {
      github: "https://github.com/AbrarChhipa",
    },
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "websenor",
    company: "Websenor Infotech Pvt. Ltd.",
    role: "React Native Developer",
    period: "Jan 2025 – Present",
    location: "Udaipur, Rajasthan",
    current: true,
    type: "Full-Time",
    summary: "Leading cross-platform mobile app development, media architectures, and store deployments for production consumer applications.",
    achievements: [
      "Contributed to 15+ production React Native applications and independently designed, developed, and delivered 5 complete mobile applications from concept through deployment.",
      "Developed Instagram-style Reels and Stories features, including multi-story upload, pinch-to-zoom stickers and text overlays, and custom doodle tools for both images and videos.",
      "Implemented real-time live streaming with integrated chat using ZegoCloud, enabling scalable, low-latency communication.",
      "Optimized API integration using Axios and RTK Query, improving caching efficiency and reducing latency by 30%.",
      "Engineered high-performance video upload modules supporting large files using optimized bandwidth management.",
      "Integrate secure authentication flows (Google Sign-In, Apple Sign-In, Firebase OTP) and push notifications using token-based architecture.",
      "Published and managed application releases on Google Play Store and Apple App Store, including signing certificates and Apple Push Notification service (APNs) configuration.",
      "Delivered features for 3 external client projects as an outsourced engineer, consistently meeting strict deadlines.",
      "Enhanced application performance through optimized React Hooks usage and improved component architecture.",
    ],
    technologies: ["React Native", "TypeScript", "Redux Toolkit", "RTK Query", "ZegoCloud", "Firebase", "Razorpay", "Xcode", "Android Studio"],
  },
  {
    id: "lakebrains",
    company: "Lakebrains Pvt. Ltd.",
    role: "Web Developer Intern",
    period: "Jul 2024 – Dec 2024",
    location: "Udaipur, Rajasthan",
    current: false,
    type: "Internship",
    summary: "Built modular web applications and Chrome extensions with modern React.js, component architecture, and REST API integration.",
    achievements: [
      "Developed and optimized web applications and Chrome extensions using React.js.",
      "Built reusable UI components to improve development efficiency and code maintainability.",
      "Integrated REST APIs for dynamic data fetching and real-time state updates.",
      "Collaborated with designers and backend developers to deliver high-quality, user-focused web solutions.",
      "Ensured cross-browser compatibility and fully responsive UI across mobile and desktop devices.",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Chrome Extensions", "REST APIs", "Git"],
  },
];

export const EDUCATION: Education = {
  institution: "Geetanjali Institute of Technical Studies",
  degree: "Bachelor of Technology (B.Tech), Computer Science",
  period: "May 2025",
  location: "Udaipur, Rajasthan",
  gpa: "GPA: 8.4 / 10.0",
  highlights: [
    "Core focus on Data Structures, Algorithms, Software Engineering, and Mobile Systems",
    "Developed multiple open-source utilities and production-grade prototypes",
    "Consistently maintained strong academic standing (8.4 GPA)",
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Mobile App Development",
    icon: "📱",
    skills: [
      { name: "React Native (iOS & Android)", level: "Production Expert", proficiency: 95, highlight: true },
      { name: "Expo Ecosystem", level: "Advanced", proficiency: 90, highlight: true },
      { name: "Mobile UI / UX & Gestures", level: "Advanced", proficiency: 92, highlight: true },
      { name: "SQLite & Offline Storage", level: "Advanced", proficiency: 88 },
      { name: "NFC Integration", level: "Specialist", proficiency: 85 },
      { name: "Video Processing (Reels/Stories)", level: "Specialist", proficiency: 90 },
      { name: "Live Streaming (ZegoCloud)", level: "Specialist", proficiency: 90 },
    ],
  },
  {
    category: "Languages & Core",
    icon: "💻",
    skills: [
      { name: "JavaScript (ES6+)", level: "Expert", proficiency: 95, highlight: true },
      { name: "TypeScript", level: "Advanced", proficiency: 90, highlight: true },
      { name: "C Programming", level: "Intermediate", proficiency: 75 },
      { name: "HTML5 & Semantic Web", level: "Expert", proficiency: 95 },
      { name: "CSS3 & Modern Layouts", level: "Expert", proficiency: 92 },
    ],
  },
  {
    category: "Frontend & State Management",
    icon: "⚛️",
    skills: [
      { name: "React.js", level: "Advanced", proficiency: 92, highlight: true },
      { name: "Redux Toolkit (RTK)", level: "Expert", proficiency: 95, highlight: true },
      { name: "RTK Query", level: "Expert", proficiency: 92, highlight: true },
      { name: "Axios & Network Optimization", level: "Advanced", proficiency: 90 },
      { name: "REST APIs & Endpoints", level: "Advanced", proficiency: 92 },
      { name: "Chrome Extensions", level: "Intermediate", proficiency: 82 },
    ],
  },
  {
    category: "Cloud, Auth & Integrations",
    icon: "☁️",
    skills: [
      { name: "Razorpay Payment Gateway", level: "Advanced", proficiency: 90, highlight: true },
      { name: "Firebase Authentication", level: "Advanced", proficiency: 90 },
      { name: "Google & Apple Sign-In", level: "Advanced", proficiency: 88 },
      { name: "Firebase OTP Verification", level: "Advanced", proficiency: 88 },
      { name: "Push Notifications (APNs / FCM)", level: "Advanced", proficiency: 88 },
      { name: "AWS S3 Cloud Storage", level: "Specialist", proficiency: 88 },
    ],
  },
  {
    category: "Tools, DevOps & Deployments",
    icon: "🛠️",
    skills: [
      { name: "Git, GitHub & BitBucket", level: "Advanced", proficiency: 92, highlight: true },
      { name: "Apple App Store Connect", level: "Production Releases", proficiency: 90, highlight: true },
      { name: "Google Play Console", level: "Production Releases", proficiency: 90, highlight: true },
      { name: "Xcode & iOS Toolchain", level: "Advanced", proficiency: 85 },
      { name: "Android Studio & Gradle", level: "Advanced", proficiency: 88 },
      { name: "Postman API Testing", level: "Advanced", proficiency: 90 },
      { name: "Visual Studio Code", level: "Expert", proficiency: 98 },
    ],
  },
];

export const THEMES = [
  { id: "default", name: "Abrar Dark", icon: "💙", accent: "#007acc" },
  { id: "rose-pine", name: "Rosé Pine", icon: "🌸", accent: "#eb6f92" },
  { id: "tokyo-night", name: "Tokyo Night", icon: "🌃", accent: "#7aa2f7" },
  { id: "catppuccin", name: "Catppuccin", icon: "🐱", accent: "#cba6f7" },
  { id: "nord", name: "Nord", icon: "🧊", accent: "#88c0d0" },
  { id: "gruvbox", name: "Gruvbox", icon: "🔥", accent: "#fabd2f" },
];

export const GIT_COMMITS = [
  { hash: "f8d32a1", message: "feat: release Instagram-style Reels & Stories features", date: "2 days ago", author: "Mohammad Abrar" },
  { hash: "c29e47b", message: "feat: implement ZegoCloud low-latency live broadcast", date: "5 days ago", author: "Mohammad Abrar" },
  { hash: "a71b9c0", message: "perf: optimize RTK Query caching reducing latency by 30%", date: "1 week ago", author: "Mohammad Abrar" },
  { hash: "e44d812", message: "feat: release BlindAssist App with offline Venue Mode & NFC", date: "2 weeks ago", author: "Mohammad Abrar" },
  { hash: "9b3c108", message: "feat: Razorpay integrated turf booking workflows", date: "3 weeks ago", author: "Mohammad Abrar" },
  { hash: "1d8f56e", message: "chore: configure APNs certificates and Google Play releases", date: "1 month ago", author: "Mohammad Abrar" },
];
