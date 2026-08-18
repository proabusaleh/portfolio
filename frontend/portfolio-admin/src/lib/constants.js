export const APP_CONFIG = {
  name: 'Portfolio Admin',
  version: '1.0.0',
  author: 'Abu Saleh',
  supportEmail: 'abusaleh@example.com',
};

export const STORAGE_KEYS = {
  THEME:  'portfolio-theme',
  TOKEN:  'portfolio-token',
  USER:   'portfolio-user',
  SIDEBAR:'portfolio-sidebar-open',
  LANG:   'portfolio-lang',
};

export const THEMES = {
  LIGHT: 'light',
  DARK:  'dark',
};

export const USER_ROLES = {
  ADMIN:  'admin',
  EDITOR: 'editor',
};

export const PROJECT_CATEGORIES = [
  { value: 'wordpress',   label: 'WordPress',   color: 'bg-blue-500'    },
  { value: 'flutter',     label: 'Flutter',     color: 'bg-cyan-500'    },
  { value: 'woocommerce', label: 'WooCommerce', color: 'bg-purple-500'  },
  { value: 'uiux',        label: 'UI/UX',       color: 'bg-pink-500'    },
];

export const PROJECT_STATUS = [
  { value: 'published', label: 'Published', color: 'bg-green-500' },
  { value: 'draft',     label: 'Draft',     color: 'bg-gray-500'  },
  { value: 'archived',  label: 'Archived',  color: 'bg-red-500'   },
];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 20, 50, 100],
};

export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';