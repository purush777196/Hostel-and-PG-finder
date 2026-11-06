export const APP_CONFIG = {
  name: 'Hostel and PG Finder',
  tagline: 'Find your perfect accommodation',
  version: '1.0.0',
  phase: 'Phase 0 - Initialization & Architecture Setup',
  status: 'Ready',
  githubUrl: 'https://github.com/purush777196/Hostel-and-PG-finder',
};

export const TECH_STACK = [
  { name: 'React 18', role: 'Frontend UI Library', icon: 'Code' },
  { name: 'Vite', role: 'Frontend Build Tool & Bundler', icon: 'Zap' },
  { name: 'Tailwind CSS', role: 'Utility-first Styling', icon: 'Palette' },
  { name: 'Axios', role: 'HTTP Client for API Requests', icon: 'Network' },
  { name: 'Node.js', role: 'Backend JavaScript Runtime', icon: 'Cpu' },
  { name: 'Express.js', role: 'RESTful Backend Framework', icon: 'Server' },
  { name: 'MongoDB & Mongoose', role: 'NoSQL Database & ODM', icon: 'Database' },
  { name: 'Git & GitHub', role: 'Version Control & CI/CD', icon: 'GitBranch' },
];

export const ROADMAP_PHASES = [
  {
    phase: 'Phase 0',
    name: 'Repository Initialization & Architecture Setup',
    status: 'completed',
    description: 'Clean MERN monorepo structure, Vite + Tailwind CSS frontend, Express backend, MongoDB connection handling, and health-check endpoint.',
  },
  {
    phase: 'Phase 1',
    name: 'Authentication & Authorization',
    status: 'upcoming',
    description: 'User registration, login, JWT issuance, bcrypt password hashing, role-based access control (Student vs PG Owner vs Admin).',
  },
  {
    phase: 'Phase 2',
    name: 'PG & Hostel Listings Management',
    status: 'upcoming',
    description: 'Property creation, room types, pricing, amenities, photo uploads, geo-location mapping, and owner dashboards.',
  },
  {
    phase: 'Phase 3',
    name: 'Search, Filter & Discovery',
    status: 'upcoming',
    description: 'Advanced search by college/locality, price filters, sharing options, rating filters, and map-based exploration.',
  },
  {
    phase: 'Phase 4',
    name: 'Booking & Inquiries',
    status: 'upcoming',
    description: 'Room reservations, visit scheduling, owner contact system, and automated notifications.',
  },
];
