import { PATHS } from '../router/routes';

export const COMMAND_GROUPS = [
  {
    id: 'navigation',
    label: 'Navigation',
    commands: [
      { id: 'nav-dashboard', label: 'Go to Dashboard', path: PATHS.DASHBOARD, icon: 'LayoutDashboard', keywords: ['home', 'main'] },
      { id: 'nav-projects', label: 'Go to Projects', path: PATHS.PROJECTS, icon: 'FolderKanban', keywords: ['portfolio', 'work'] },
      { id: 'nav-blog', label: 'Go to Blog', path: PATHS.BLOG, icon: 'FileText', keywords: ['posts', 'articles'] },
      { id: 'nav-services', label: 'Go to Services', path: PATHS.SERVICES, icon: 'Wrench', keywords: ['skills'] },
      { id: 'nav-skills', label: 'Go to Skills', path: PATHS.SKILLS, icon: 'Sparkles', keywords: ['abilities'] },
      { id: 'nav-testimonials', label: 'Go to Testimonials', path: PATHS.TESTIMONIALS, icon: 'MessageSquareQuote', keywords: ['reviews'] },
      { id: 'nav-messages', label: 'Go to Messages', path: PATHS.MESSAGES, icon: 'Inbox', keywords: ['inbox', 'contact'] },
      { id: 'nav-resume', label: 'Go to Resume', path: PATHS.RESUME, icon: 'FileUser', keywords: ['cv'] },
      { id: 'nav-media', label: 'Go to Media Library', path: PATHS.MEDIA, icon: 'Images', keywords: ['uploads', 'files'] },
      { id: 'nav-newsletter', label: 'Go to Newsletter', path: PATHS.NEWSLETTER, icon: 'Mail', keywords: ['subscribers', 'email'] },
      { id: 'nav-contact', label: 'Go to Contact Info', path: PATHS.CONTACT_INFO, icon: 'PhoneCall', keywords: ['phone', 'address'] },
      { id: 'nav-seo', label: 'Go to SEO Manager', path: PATHS.SEO, icon: 'Search', keywords: ['meta', 'sitemap'] },
      { id: 'nav-analytics', label: 'Go to Analytics', path: PATHS.ANALYTICS, icon: 'BarChart3', keywords: ['stats', 'charts'] },
      { id: 'nav-users', label: 'Go to Users', path: PATHS.USERS, icon: 'Users', keywords: ['team', 'admin'] },
      { id: 'nav-activity', label: 'Go to Activity Log', path: PATHS.ACTIVITY, icon: 'Activity', keywords: ['logs', 'history'] },
      { id: 'nav-settings', label: 'Go to Settings', path: PATHS.SETTINGS, icon: 'Settings', keywords: ['config', 'preferences'] },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    commands: [
      { id: 'action-new-project', label: 'Create New Project', path: PATHS.PROJECT_NEW, icon: 'Plus', keywords: ['add', 'portfolio'] },
      { id: 'action-new-post', label: 'Create New Blog Post', path: PATHS.BLOG_NEW, icon: 'Plus', keywords: ['add', 'write'] },
      { id: 'action-new-service', label: 'Add New Service', path: PATHS.SERVICES, icon: 'Plus', keywords: ['create'] },
      { id: 'action-new-skill', label: 'Add New Skill', path: PATHS.SKILLS, icon: 'Plus', keywords: ['create'] },
      { id: 'action-invite-user', label: 'Invite Team Member', path: PATHS.USERS, icon: 'UserPlus', keywords: ['add', 'member'] },
      { id: 'action-export-activity', label: 'Export Activity Log', path: PATHS.ACTIVITY, icon: 'Download', keywords: ['save', 'csv'] },
    ],
  },
  {
    id: 'appearance',
    label: 'Appearance',
    commands: [
      { id: 'theme-toggle', label: 'Toggle Dark Mode', action: 'toggleTheme', icon: 'Moon', keywords: ['night', 'light'] },
      { id: 'sidebar-toggle', label: 'Toggle Sidebar', action: 'toggleSidebar', icon: 'PanelLeftClose', keywords: ['menu', 'navigation'] },
    ],
  },
];

export function getAllCommands() {
  return COMMAND_GROUPS.flatMap((g) => g.commands);
}

export const getCommands = getAllCommands;
