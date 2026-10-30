export type ProjectLink = {
  kind: 'github' | 'demo' | 'download'
  href: string
}

export type Project = {
  id: string
  featured: boolean
  titleKey: string
  summaryKey: string
  tags: string[]
  image?: string
  links: ProjectLink[]
}

export const EMAIL = 'nicolascabelloalonso@gmail.com'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/nicol%C3%A1s-cabello-alonso-94319a282/'
export const GITHUB_URL = 'https://github.com/Nicolas-Cabello'
export const GITHUB_LABEL = 'github.com/Nicolas-Cabello'
export const CV_VIEW_URL = 'https://drive.google.com/file/d/16O5ippFClTS_O0RCSuVKLz6bROF2_F4c/view?usp=drive_link'
export const CV_DOWNLOAD_URL = 'https://drive.usercontent.google.com/u/0/uc?id=16O5ippFClTS_O0RCSuVKLz6bROF2_F4c&export=download'

export const projects: Project[] = [
  {
    id: 'crm',
    featured: true,
    titleKey: 'proj_crm_title',
    summaryKey: 'proj_crm_summary',
    tags: ['React', 'Vite', 'TypeScript'],
    image: '/images/crm.png',
    links: [{ kind: 'demo', href: 'https://crm-demo-nc.vercel.app/' }],
  },
  {
    id: 'metricut',
    featured: true,
    titleKey: 'proj_metricut_title',
    summaryKey: 'proj_metricut_summary',
    tags: ['React', 'Electron', 'FastAPI', 'Python'],
    image: '/images/metricut.png',
    links: [
      { kind: 'github', href: 'https://github.com/Nicolas-Cabello/Metricut' },
      { kind: 'download', href: 'https://drive.google.com/file/d/1TG8ChzQCM1zl0ZTSJszB-99iaxEURPwe/view' },
    ],
  },
  {
    id: 'aistetic',
    featured: true,
    titleKey: 'proj_aistetic_title',
    summaryKey: 'proj_aistetic_summary',
    tags: ['React', 'FastAPI', 'TensorFlow', 'Python'],
    image: '/images/aistetic.png',
    links: [
      { kind: 'github', href: 'https://github.com/Nicolas-Cabello/AISTETIC' },
      { kind: 'download', href: 'https://drive.google.com/file/d/1BC498ePOj8LCLBYX_FY8qFWLYdMXriDG/view' },
    ],
  },
  {
    id: 'agro',
    featured: true,
    titleKey: 'proj_agro_title',
    summaryKey: 'proj_agro_summary',
    tags: ['Python', 'PyTorch', 'Power BI'],
    image: '/images/agropecuario.png',
    links: [{ kind: 'github', href: 'https://github.com/Nicolas-Cabello/Analisis-Sector-Agropecuario' }],
  },
  {
    id: 'auth',
    featured: true,
    titleKey: 'proj_auth_title',
    summaryKey: 'proj_auth_summary',
    tags: ['Python', 'Linux', '2FA'],
    image: '/images/auth.jpg',
    links: [{ kind: 'github', href: 'https://github.com/Nicolas-Cabello/Sistema-de-Seguridad-2FA-y-biometrico-en-Linux' }],
  },
  {
    id: 'analitica',
    featured: false,
    titleKey: 'proj_analitica_title',
    summaryKey: 'proj_analitica_summary',
    tags: ['TypeScript', 'IA', 'CSV'],
    image: '/images/analitica.png',
    links: [
      { kind: 'github', href: 'https://github.com/Nicolas-Cabello/AnaliticaData' },
      { kind: 'demo', href: 'https://analitica-data.vercel.app/' },
    ],
  },
  {
    id: 'auto',
    featured: false,
    titleKey: 'proj_auto_title',
    summaryKey: 'proj_auto_summary',
    tags: ['Python', 'scikit-learn', 'XGBoost'],
    image: '/images/auto.jpg',
    links: [{ kind: 'github', href: 'https://github.com/Nicolas-Cabello/Analisis-Mercado-Automocion' }],
  },
  {
    id: 'chatbot',
    featured: false,
    titleKey: 'proj_chatbot_title',
    summaryKey: 'proj_chatbot_summary',
    tags: ['React', 'TypeScript', 'Vercel'],
    image: '/images/chatbot-correos.png',
    links: [
      { kind: 'github', href: 'https://github.com/Nicolas-Cabello/Chatbot-Correos-Express' },
      { kind: 'demo', href: 'https://chatbot-correos-express-kh5p3n1xu-nicolas-cabellos-projects.vercel.app/' },
    ],
  },
]

export const linkLabelKey = {
  github: 'proj_btn_repo',
  demo: 'proj_btn_live',
  download: 'proj_btn_download',
} as const

export const timeline = [
  { id: 'b2', year: '2021', titleKey: 'path_b2_title', placeKey: 'path_b2_place', detailKey: 'path_b2_detail' },
  { id: 'asir', year: '2023', titleKey: 'path_asir_title', placeKey: 'path_asir_place', detailKey: 'path_asir_detail' },
  { id: 'fedeto', year: '2025', titleKey: 'path_fedeto_title', placeKey: 'path_fedeto_place', detailKey: 'path_fedeto_detail' },
  { id: 'bigdata', year: '2025', titleKey: 'path_big_title', placeKey: 'path_big_place', detailKey: 'path_big_detail' },
  { id: 'nebrija', year: '2026', titleKey: 'path_nebrija_title', placeKey: 'path_nebrija_place', detailKey: 'path_nebrija_detail' },
] as const

export const skillGroups = [
  {
    id: 'lang',
    titleKey: 'skills_cat1',
    items: [
      { icon: '🐍', name: 'Python' },
      { icon: '⚡', name: 'JavaScript' },
      { icon: '</>', name: 'HTML' },
      { icon: '🗄️', name: 'SQL' },
      { icon: '🐚', name: 'Bash' },
    ],
  },
  {
    id: 'data',
    titleKey: 'skills_cat2',
    items: [
      { icon: '🐼', name: 'Pandas' },
      { icon: '📊', name: 'Power BI' },
      { icon: '🤖', name: 'scikit-learn' },
      { icon: '🌲', name: 'XGBoost' },
      { icon: '🔥', name: 'PyTorch' },
      { icon: '🧠', name: 'TensorFlow' },
      { icon: '📈', name: 'Matplotlib' },
      { icon: '👁️', name: 'OpenCV' },
    ],
  },
  {
    id: 'sys',
    titleKey: 'skills_cat3',
    items: [
      { icon: '🐧', name: 'Linux' },
      { icon: '🪟', name: 'Windows Server' },
      { icon: '🐳', name: 'Docker' },
      { icon: '🏢', name: 'Active Directory' },
      { icon: '🌐', name: 'TCP/IP' },
      { icon: '🔐', name: '2FA' },
      { icon: '🛡️', name: 'Hardening' },
    ],
  },
  {
    id: 'dev',
    titleKey: 'skills_cat4',
    items: [
      { icon: '⚛️', name: 'React' },
      { icon: '🚀', name: 'FastAPI' },
      { icon: '✍️', nameKey: 'skill_prompt' },
      { icon: '✨', nameKey: 'skill_vibe' },
      { icon: '🌀', nameKey: 'skill_gen' },
    ],
  },
] as const
