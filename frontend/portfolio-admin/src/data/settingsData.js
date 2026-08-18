export const DEFAULT_SETTINGS = {
  /* ── General ── */
  siteName:       'Abu Saleh Portfolio',
  siteTagline:    'WordPress & Flutter Developer',
  siteUrl:        'https://yourportfolio.com',
  adminEmail:     'admin@yourportfolio.com',
  logo:           '',
  favicon:        '',
  timezone:       'Asia/Dhaka',
  language:       'en',
  dateFormat:     'MMM DD, YYYY',
  timeFormat:     '24',

  /* ── Appearance ── */
  themeMode:      'system',  // 'light' | 'dark' | 'system'
  primaryColor:   '#6366f1',
  accentColor:    '#8b5cf6',
  fontFamily:     'Inter',
  borderRadius:   'medium',   // small | medium | large
  layout:         'sidebar',  // sidebar | topbar
  animations:     true,
  compactMode:    false,

  /* ── Email (SMTP) ── */
  smtpEnabled:    false,
  smtpHost:       '',
  smtpPort:       587,
  smtpSecure:     'tls',      // 'none' | 'tls' | 'ssl'
  smtpUser:       '',
  smtpPassword:   '',
  smtpFromEmail:  '',
  smtpFromName:   '',

  /* ── Backup ── */
  autoBackup:     true,
  backupSchedule: 'weekly',   // daily | weekly | monthly
  backupRetention: 10,        // number of backups to keep

  /* ── API Keys ── */
  googleApiKey:      '',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  mailchimpKey:      '',
  stripeKey:         '',
  stripeSecret:      '',
  openaiKey:         '',
  githubToken:       '',
  cloudinaryUrl:     '',
};

export const LANGUAGES = [
  { value: 'en',    label: '🇬🇧 English' },
  { value: 'bn',    label: '🇧🇩 Bengali' },
  { value: 'hi',    label: '🇮🇳 Hindi' },
  { value: 'es',    label: '🇪🇸 Spanish' },
  { value: 'fr',    label: '🇫🇷 French' },
  { value: 'de',    label: '🇩🇪 German' },
  { value: 'ar',    label: '🇸🇦 Arabic' },
  { value: 'zh',    label: '🇨🇳 Chinese' },
  { value: 'ja',    label: '🇯🇵 Japanese' },
];

export const FONTS = [
  { value: 'Inter',     label: 'Inter (default)',  preview: 'The quick brown fox' },
  { value: 'Poppins',   label: 'Poppins',          preview: 'The quick brown fox' },
  { value: 'Roboto',    label: 'Roboto',           preview: 'The quick brown fox' },
  { value: 'Montserrat',label: 'Montserrat',       preview: 'The quick brown fox' },
  { value: 'Nunito',    label: 'Nunito',           preview: 'The quick brown fox' },
  { value: 'Open Sans', label: 'Open Sans',        preview: 'The quick brown fox' },
  { value: 'Lato',      label: 'Lato',             preview: 'The quick brown fox' },
];

export const COLOR_PRESETS = [
  { name: 'Indigo',  primary: '#6366f1', accent: '#8b5cf6' },
  { name: 'Blue',    primary: '#3b82f6', accent: '#06b6d4' },
  { name: 'Emerald', primary: '#10b981', accent: '#14b8a6' },
  { name: 'Rose',    primary: '#f43f5e', accent: '#ec4899' },
  { name: 'Orange',  primary: '#f97316', accent: '#eab308' },
  { name: 'Purple',  primary: '#a855f7', accent: '#d946ef' },
  { name: 'Slate',   primary: '#475569', accent: '#64748b' },
  { name: 'Ocean',   primary: '#0891b2', accent: '#0ea5e9' },
];

export const LANGUAGE_OPTIONS = LANGUAGES;
export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];
export const FONT_OPTIONS = FONTS.map((f) => ({ value: f.value, label: f.label }));
export const ENCRYPTION_OPTIONS = [
  { value: 'tls', label: 'TLS' },
  { value: 'ssl', label: 'SSL' },
  { value: 'none', label: 'None' },
];
export const BACKUP_FREQUENCY = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];
export const SETTINGS_SECTIONS = [
  { id: 'general', label: 'General', icon: 'bx-cog' },
  { id: 'appearance', label: 'Appearance', icon: 'bx-palette' },
  { id: 'email', label: 'Email / SMTP', icon: 'bx-envelope' },
  { id: 'apiKeys', label: 'API Keys', icon: 'bx-key' },
  { id: 'backup', label: 'Backup & Restore', icon: 'bx-cloud-download' },
  { id: 'danger', label: 'Danger Zone', icon: 'bx-error' },
];

/* Sample backup history */
export const SAMPLE_BACKUPS = [
  { id: 1, name: 'weekly-2024-05-30.zip',   size: 12459000, createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),  type: 'auto' },
  { id: 2, name: 'manual-2024-05-25.zip',   size: 12234000, createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),  type: 'manual' },
  { id: 3, name: 'weekly-2024-05-23.zip',   size: 11890000, createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),  type: 'auto' },
  { id: 4, name: 'weekly-2024-05-16.zip',   size: 11123000, createdAt: new Date(Date.now() - 16 * 86400000).toISOString(), type: 'auto' },
  { id: 5, name: 'manual-2024-05-10.zip',   size: 10890000, createdAt: new Date(Date.now() - 22 * 86400000).toISOString(), type: 'manual' },
];