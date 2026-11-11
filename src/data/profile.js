// Single source of truth for site content.
// Content follows CV v4 (2026-11-10) and the verified notes in the 531 job-search project.
// Keep claims here limited to things that can be explained in an interview.

export const profile = {
  name: 'Likai Xu',
  nickname: 'Bill',
  role: 'Full-Stack Developer',
  location: 'Auckland, New Zealand',
  timeZone: 'Pacific/Auckland',
  coordinates: { latitude: -36.8485, longitude: 174.7633 },
  email: 'likaixu.official@gmail.com',
  cvUrl: '/Likai-Xu-CV.pdf',
  siteUrl: 'https://likaixu.com/',
  links: {
    github: 'https://github.com/PhoneBill666',
    linkedin: 'https://www.linkedin.com/in/likai-xu/',
  },
  status: 'Open to graduate & junior developer roles',
  headline: 'I build web apps end to end — from Vue and React interfaces to FastAPI and Spring Boot APIs on PostgreSQL.',
  typing: [
    'Vue & React interfaces',
    'FastAPI & Spring Boot APIs',
    'PostgreSQL-backed workflows',
    'things that actually ship',
  ],
  facts: [
    { value: '2', label: 'software internships' },
    { value: '6', label: 'person capstone team I tech-led' },
    { value: 'BSc', label: 'Computer Science, UoA' },
  ],
  quote: { latin: 'Per aspera ad astra', chinese: '循此苦旅，以达繁星' },
}

export const about = {
  paragraphs: [
    "Hi, I'm Likai — most people call me Bill. I've just finished a Bachelor of Science in Computer Science at the University of Auckland, and I'm looking for a graduate or junior full-stack role in Auckland. I'm open to backend, frontend and other IT roles too.",
    'My two internships were quite different. At Huaqin Technology I joined a project that was already half built and worked inside an existing Vue codebase. At NTT DATA I started from an empty repository and built an internal invoice query system on my own, learning Spring Boot and Redis as I went. On my capstone, OpenInvite, I was tech lead for a team of six.',
    'Outside work I run two Debian servers for local AI models, and I use AI coding tools every day — reviewing and testing what they produce rather than taking it on trust.',
  ],
  strengths: [
    {
      icon: 'layers',
      title: 'Across the stack',
      text: 'Vue and React interfaces, REST APIs in FastAPI and Spring Boot, and the PostgreSQL queries underneath.',
    },
    {
      icon: 'branch',
      title: 'At home in existing code',
      text: 'Picked up an in-progress content management system at Huaqin and delivered new requirements, fixes and reusable components.',
    },
    {
      icon: 'spark',
      title: 'New stack, from zero',
      text: 'Learned Spring Boot, JDBC and Redis on the job at NTT DATA and still delivered a working full-stack system for handover.',
    },
    {
      icon: 'check',
      title: 'AI-assisted, human-checked',
      text: 'Codex, Claude Code and Cursor speed me up; I read the diff, run it and test it before I trust it.',
    },
  ],
  interests: [
    { emoji: '⚽', label: 'Football' },
    { emoji: '🚢', label: 'World of Warships' },
    { emoji: '🗺️', label: 'Hearts of Iron IV' },
    { emoji: '🎧', label: 'Late-night lo-fi', to: '/music' },
    { emoji: '🖥️', label: 'Homelab tinkering' },
  ],
}

export const experience = [
  {
    company: 'NTT DATA',
    role: 'Software Developer Intern',
    period: 'Nov 2025 – Feb 2026',
    place: 'Wuxi, China · On-site',
    summary: 'Built an internal invoice query system from an empty repository, on my own.',
    points: [
      'Developed a full-stack invoice query system over OCR data with Vue 3, Spring Boot and PostgreSQL.',
      'Implemented multi-condition search, pagination and detail views that join OCR, invoice and order data across multiple tables with JdbcTemplate and dynamic, parameterised SQL.',
      'Built Redis-backed token authentication with frontend route guards and backend interceptors, plus CSV export and search-condition caching.',
      'Packaged the backend as a JAR and the frontend build for handover to my supervisor.',
    ],
    tech: ['Vue 3', 'Element Plus', 'Spring Boot', 'JdbcTemplate', 'PostgreSQL', 'Redis'],
  },
  {
    company: 'Huaqin Technology',
    role: 'Software Developer Intern',
    period: 'Nov 2024 – Feb 2025',
    place: 'Wuxi, China · On-site',
    summary: 'Joined an in-vehicle infotainment CMS mid-project and delivered features inside an existing Vue codebase.',
    points: [
      'Developed frontend modules for an IVI (in-vehicle infotainment) back-office system with Vue 3 and Element Plus — carousel submission, approval, search, configuration and status tracking.',
      'Built reusable, data-driven UI components to keep content-management workflows consistent and easy to use.',
      'Developed and improved pages for an internal organisational management system based on business requirements.',
    ],
    tech: ['Vue 3', 'Element Plus', 'JavaScript'],
  },
]

export const projects = [
  {
    featured: true,
    name: 'OpenInvite',
    kind: 'Mentorship matching platform · UoA capstone',
    role: 'Tech Lead & Full-Stack Developer · team of 6',
    period: 'Mar – Jun 2026',
    url: 'https://openinvite.store/',
    linkLabel: 'Visit site',
    summary: 'Mentors publish availability, mentees book sessions, and Google Calendar and Meet stay in sync.',
    points: [
      'Chose the stack and set up the repository, the route–service–repository backend architecture and the team Git workflow.',
      'Built the OAuth 2.0 Google Calendar integration: calendar selection, event caching, availability import, and Google Meet sessions created through a platform-owned calendar and synced with bookings.',
      'Engineered booking and invitation workflows in PostgreSQL — custom meeting times, batch accept/decline, server-side availability splitting, rescheduling and in-app notifications.',
      'Sped up the dashboard and mentor profiles by replacing many frontend requests with aggregated FastAPI endpoints and tuned SQL; also built JWT cookie auth, email verification and Google sign-in.',
      'Helped deploy it on Railway, Supabase and Cloudflare, including DNS, environment and OAuth configuration.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Google OAuth 2.0', 'Railway', 'Supabase', 'Cloudflare'],
  },
  {
    name: 'This website',
    kind: 'Personal site',
    url: 'https://github.com/PhoneBill666/personal_website',
    linkLabel: 'Source',
    summary: 'A Vue 3 + Vite single-page site with scroll-aware navigation, a small music player and media served from Cloudflare R2.',
    tech: ['Vue 3', 'Vite', 'Cloudflare R2'],
  },
  {
    name: 'Homelab',
    kind: 'Self-hosted',
    summary: 'Two Debian servers I run for local AI models — my hands-on practice ground for Linux, remote access and troubleshooting.',
    tech: ['Debian', 'Linux', 'Tailscale', 'Local LLMs'],
  },
]

// "where" powers the "used in" hint on the skills section.
export const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', where: ['OpenInvite'] },
      { name: 'JavaScript', where: ['NTT DATA', 'Huaqin', 'This website'] },
      { name: 'Python', where: ['OpenInvite'] },
      { name: 'Java', where: ['NTT DATA'] },
      { name: 'SQL', where: ['NTT DATA', 'OpenInvite'] },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue 3', where: ['NTT DATA', 'Huaqin', 'This website'] },
      { name: 'React', where: ['OpenInvite'] },
      { name: 'Next.js', where: ['OpenInvite'] },
      { name: 'Element Plus', where: ['NTT DATA', 'Huaqin'] },
    ],
  },
  {
    title: 'Backend & data',
    skills: [
      { name: 'FastAPI', where: ['OpenInvite'] },
      { name: 'Spring Boot', where: ['NTT DATA'] },
      { name: 'SQLAlchemy', where: ['OpenInvite'] },
      { name: 'PostgreSQL', where: ['NTT DATA', 'OpenInvite'] },
      { name: 'Redis', where: ['NTT DATA'] },
      { name: 'REST APIs', where: ['NTT DATA', 'OpenInvite'] },
    ],
  },
  {
    title: 'Cloud & tooling',
    skills: [
      { name: 'Git', where: ['Every project'] },
      { name: 'Railway', where: ['OpenInvite'] },
      { name: 'Supabase', where: ['OpenInvite'] },
      { name: 'Cloudflare', where: ['OpenInvite', 'This website'] },
      { name: 'Google OAuth 2.0', where: ['OpenInvite'] },
      { name: 'Linux / Debian', where: ['Homelab'] },
    ],
  },
  {
    title: 'AI workflow',
    skills: [
      { name: 'Codex', where: ['Daily development'] },
      { name: 'Claude Code', where: ['Daily development'] },
      { name: 'Cursor', where: ['Daily development'] },
    ],
  },
]

export const alsoUsed = ['Node.js', 'Flask', 'ASP.NET', 'Hono', 'MySQL', 'Docker', 'Figma']

export const education = [
  {
    school: 'University of Auckland',
    degree: 'Bachelor of Science, Computer Science',
    period: 'Feb 2024 – Nov 2026',
    highlight: 'Capstone (COMPSCI 399): A+',
    courses: [
      'Data Structures & Algorithms',
      'Computer Organisation',
      'Operating Systems',
      'Discrete Mathematics',
      'Software Engineering',
      'Large-Scale Software Development',
    ],
  },
  {
    school: 'University of Auckland International College',
    degree: 'UP Education',
    period: 'Aug 2023 – Jan 2024',
  },
]

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

