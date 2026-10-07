// ─────────────────────────────────────────────────────────────
//  PLACEHOLDERS — replace these with your real details.
//  Anything containing "your-" is treated as a placeholder and is
//  labelled as one on the page until you change it.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Jasmin Sahu',
  email: 'jasminsahu2310@gmail.com',
  linkedin: 'https://www.linkedin.com/in/JasminSahu',
  github: 'https://github.com/Jasminsahu23',
  resume: '/Jasmin-Sahu-Resume.pdf', // replace the file at public/Jasmin-Sahu-Resume.pdf
}

export const isPlaceholder = (value) => /your-/i.test(value)

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const STATS = [
  { value: 9.0, decimals: 1, label: 'CGPA' },
  { value: 2027, decimals: 0, label: 'Graduation', from: 2015 },
  { text: 'Data Science', label: 'Honours' },
  { text: 'IT', label: 'Engineering' },
]

export const SKILL_GROUPS = [
  { id: 'programming', label: 'Programming', skills: ['Python', 'JavaScript', 'SQL', 'C/C++'] },
  {
    id: 'web',
    label: 'Web development',
    skills: ['React', 'Vite', 'Node.js', 'Express.js', 'HTML', 'CSS'],
  },
  {
    id: 'data',
    label: 'Data & analytics',
    skills: ['Pandas', 'NumPy', 'SQL', 'Tableau', 'Power BI', 'Excel'],
  },
  { id: 'databases', label: 'Databases', skills: ['MongoDB', 'MySQL', 'SQLite'] },
  {
    id: 'tools',
    label: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Tableau', 'Power BI'],
  },
]

export const EXPERIENCE = [
  {
    org: 'SmartInternz × SmartBridge',
    kind: 'Externship',
    role: 'Data Analytics Externship',
    project: 'Visualizing Housing Market Trends Using Tableau',
    skills: ['Python', 'Pandas', 'NumPy', 'SQL', 'Excel', 'Tableau'],
  },
  {
    org: 'Tata iQ × Forage',
    kind: 'Simulation',
    role: 'GenAI Powered Data Analytics Simulation',
    project: null,
    skills: [],
  },
]

export const FLOW = [
  { name: 'Data', text: 'Collecting and cleaning real-world datasets.' },
  { name: 'Analysis', text: 'Finding patterns with Python, SQL and dashboards.' },
  { name: 'Intelligence', text: 'Turning patterns into ML models and GenAI systems.' },
  { name: 'Impact', text: 'Shipping practical tools people can actually use.' },
]

export const INTERESTS = [
  'Data Analytics',
  'Machine Learning',
  'Artificial Intelligence',
  'Generative AI',
  'Data Visualization',
  'Full-Stack Development',
]

export const TARGET_ROLES = ['Software Development', 'Data Analytics', 'Data Science', 'AI/ML']
