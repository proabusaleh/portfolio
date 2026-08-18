const now = Date.now();
const hoursAgo = (n) => new Date(now - n * 3600000).toISOString();
const daysAgo = (n) => new Date(now - n * 86400000).toISOString();
const minsAgo = (n) => new Date(now - n * 60000).toISOString();

export const ACTION_TYPES = {
  login:       { label: 'Login',       icon: 'LogIn',       color: 'text-gray-500',    bg: 'bg-gray-100 dark:bg-gray-800' },
  logout:      { label: 'Logout',      icon: 'LogOut',      color: 'text-gray-400',    bg: 'bg-gray-100 dark:bg-gray-800' },
  create:      { label: 'Created',     icon: 'Plus',        color: 'text-green-500',   bg: 'bg-green-50 dark:bg-green-950/30' },
  update:      { label: 'Updated',     icon: 'Edit',        color: 'text-blue-500',    bg: 'bg-blue-50 dark:bg-blue-950/30' },
  delete:      { label: 'Deleted',     icon: 'Trash2',      color: 'text-red-500',     bg: 'bg-red-50 dark:bg-red-950/30' },
  publish:     { label: 'Published',   icon: 'Send',        color: 'text-purple-500',  bg: 'bg-purple-50 dark:bg-purple-950/30' },
  upload:      { label: 'Uploaded',    icon: 'Upload',      color: 'text-teal-500',    bg: 'bg-teal-50 dark:bg-teal-950/30' },
  invite:      { label: 'Invited',     icon: 'UserPlus',    color: 'text-indigo-500',  bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  settings:    { label: 'Settings',    icon: 'Settings',    color: 'text-orange-500',  bg: 'bg-orange-50 dark:bg-orange-950/30' },
  backup:      { label: 'Backup',      icon: 'Download',    color: 'text-cyan-500',    bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  comment:     { label: 'Comment',     icon: 'MessageCircle', color: 'text-pink-500',  bg: 'bg-pink-50 dark:bg-pink-950/30' },
  export:      { label: 'Exported',    icon: 'FileDown',    color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-950/30' },
};

export const RESOURCE_TYPES = ['All', 'Posts', 'Projects', 'Media', 'Users', 'Settings', 'Newsletter', 'Comments'];

const users = [
  { id: 1, name: 'Abu Saleh', email: 'abusaleh@example.com' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@techstart.com' },
  { id: 3, name: 'Mark Chen', email: 'mark@appventure.io' },
  { id: 4, name: 'Emma Davis', email: 'emma@dataflow.co' },
  { id: 5, name: 'Priya Patel', email: 'priya@edutech.in' },
];

export const SAMPLE_ACTIVITY = [
  { id: 1,  userId: 1, action: 'login',    resource: 'Auth',       detail: 'Chrome on Windows',          timestamp: minsAgo(5) },
  { id: 2,  userId: 1, action: 'update',   resource: 'Settings',   detail: 'Updated site title',          timestamp: minsAgo(15) },
  { id: 3,  userId: 2, action: 'publish',  resource: 'Posts',      detail: 'Published "React Best Practices"', timestamp: minsAgo(45) },
  { id: 4,  userId: 1, action: 'create',   resource: 'Projects',   detail: 'Created "E-Commerce Platform"',    timestamp: hoursAgo(1) },
  { id: 5,  userId: 3, action: 'upload',   resource: 'Media',      detail: 'Uploaded 3 images',            timestamp: hoursAgo(2) },
  { id: 6,  userId: 2, action: 'update',   resource: 'Posts',      detail: 'Edited "Flutter Guide"',       timestamp: hoursAgo(3) },
  { id: 7,  userId: 1, action: 'invite',   resource: 'Users',      detail: 'Invited priya@edutech.in',     timestamp: hoursAgo(4) },
  { id: 8,  userId: 4, action: 'create',   resource: 'Posts',      detail: 'Created draft "CSS Grid Tips"', timestamp: hoursAgo(5) },
  { id: 9,  userId: 1, action: 'backup',   resource: 'Settings',   detail: 'Created weekly backup',        timestamp: hoursAgo(6) },
  { id: 10, userId: 3, action: 'update',   resource: 'Projects',   detail: 'Updated "FoodHub App"',        timestamp: hoursAgo(8) },
  { id: 11, userId: 2, action: 'delete',   resource: 'Media',      detail: 'Deleted 2 old screenshots',    timestamp: hoursAgo(10) },
  { id: 12, userId: 1, action: 'settings', resource: 'Settings',   detail: 'Changed SMTP configuration',   timestamp: hoursAgo(12) },
  { id: 13, userId: 5, action: 'login',    resource: 'Auth',       detail: 'Safari on macOS',              timestamp: hoursAgo(14) },
  { id: 14, userId: 4, action: 'upload',   resource: 'Media',      detail: 'Uploaded hero banner',         timestamp: hoursAgo(16) },
  { id: 15, userId: 2, action: 'publish',  resource: 'Posts',      detail: 'Published "Node.js Tips"',     timestamp: hoursAgo(20) },
  { id: 16, userId: 1, action: 'export',   resource: 'Newsletter', detail: 'Exported subscriber list',     timestamp: hoursAgo(24) },
  { id: 17, userId: 3, action: 'comment',  resource: 'Comments',   detail: 'Replied to user feedback',     timestamp: hoursAgo(28) },
  { id: 18, userId: 1, action: 'update',   resource: 'Projects',   detail: 'Updated "Portfolio V3"',       timestamp: daysAgo(1) },
  { id: 19, userId: 2, action: 'create',   resource: 'Posts',      detail: 'Created "TypeScript Guide"',   timestamp: daysAgo(1) },
  { id: 20, userId: 4, action: 'login',    resource: 'Auth',       detail: 'Firefox on Linux',             timestamp: daysAgo(1) },
  { id: 21, userId: 1, action: 'delete',   resource: 'Posts',      detail: 'Deleted "Old Draft"',          timestamp: daysAgo(2) },
  { id: 22, userId: 3, action: 'publish',  resource: 'Projects',   detail: 'Published "AI Chatbot"',       timestamp: daysAgo(2) },
  { id: 23, userId: 2, action: 'upload',   resource: 'Media',      detail: 'Uploaded 5 project screenshots', timestamp: daysAgo(2) },
  { id: 24, userId: 1, action: 'settings', resource: 'Settings',   detail: 'Updated SEO configuration',    timestamp: daysAgo(3) },
  { id: 25, userId: 5, action: 'create',   resource: 'Posts',      detail: 'Created "Docker 101"',         timestamp: daysAgo(3) },
  { id: 26, userId: 4, action: 'update',   resource: 'Projects',   detail: 'Edited "Mobile App"',          timestamp: daysAgo(3) },
  { id: 27, userId: 1, action: 'backup',   resource: 'Settings',   detail: 'Created manual backup',        timestamp: daysAgo(4) },
  { id: 28, userId: 2, action: 'invite',   resource: 'Users',      detail: 'Invited james@shopflow.com',   timestamp: daysAgo(4) },
  { id: 29, userId: 3, action: 'update',   resource: 'Newsletter', detail: 'Edited campaign "Monthly"',     timestamp: daysAgo(5) },
  { id: 30, userId: 1, action: 'export',   resource: 'Posts',      detail: 'Exported blog posts as CSV',   timestamp: daysAgo(5) },
  { id: 31, userId: 4, action: 'publish',  resource: 'Posts',      detail: 'Published "Vue vs React"',     timestamp: daysAgo(6) },
  { id: 32, userId: 2, action: 'delete',   resource: 'Comments',   detail: 'Deleted 5 spam comments',      timestamp: daysAgo(6) },
  { id: 33, userId: 1, action: 'update',   resource: 'Users',      detail: 'Changed Mark role to Editor',  timestamp: daysAgo(7) },
  { id: 34, userId: 3, action: 'upload',   resource: 'Media',      detail: 'Uploaded project video',       timestamp: daysAgo(7) },
  { id: 35, userId: 5, action: 'login',    resource: 'Auth',       detail: 'Edge on Windows',              timestamp: daysAgo(8) },
  { id: 36, userId: 1, action: 'create',   resource: 'Newsletter', detail: 'Created campaign "Launch"',    timestamp: daysAgo(8) },
  { id: 37, userId: 2, action: 'update',   resource: 'Posts',      detail: 'Updated "React Hooks"',        timestamp: daysAgo(9) },
  { id: 38, userId: 4, action: 'delete',   resource: 'Media',      detail: 'Removed unused assets',        timestamp: daysAgo(10) },
  { id: 39, userId: 1, action: 'settings', resource: 'Settings',   detail: 'Updated appearance theme',     timestamp: daysAgo(10) },
  { id: 40, userId: 3, action: 'create',   resource: 'Projects',   detail: 'Created "Analytics Dashboard"', timestamp: daysAgo(11) },
  { id: 41, userId: 2, action: 'publish',  resource: 'Posts',      detail: 'Published "Next.js Tips"',     timestamp: daysAgo(12) },
  { id: 42, userId: 1, action: 'backup',   resource: 'Settings',   detail: 'Restored from backup',         timestamp: daysAgo(13) },
  { id: 43, userId: 5, action: 'upload',   resource: 'Media',      detail: 'Uploaded profile photo',       timestamp: daysAgo(14) },
  { id: 44, userId: 1, action: 'delete',   resource: 'Projects',   detail: 'Archived old project',         timestamp: daysAgo(15) },
  { id: 45, userId: 4, action: 'comment',  resource: 'Comments',   detail: 'Moderated 3 comments',         timestamp: daysAgo(16) },
  { id: 46, userId: 2, action: 'export',   resource: 'Newsletter', detail: 'Exported campaign analytics',  timestamp: daysAgo(17) },
  { id: 47, userId: 1, action: 'login',    resource: 'Auth',       detail: 'Chrome on macOS',              timestamp: daysAgo(18) },
  { id: 48, userId: 3, action: 'update',   resource: 'Settings',   detail: 'Updated API keys',             timestamp: daysAgo(19) },
  { id: 49, userId: 1, action: 'publish',  resource: 'Posts',      detail: 'Published "DevOps Guide"',      timestamp: daysAgo(20) },
  { id: 50, userId: 2, action: 'create',   resource: 'Projects',   detail: 'Created "Mobile E-Commerce"',  timestamp: daysAgo(21) },
  { id: 51, userId: 4, action: 'invite',   resource: 'Users',      detail: 'Invited tali@uxstudio.com',    timestamp: daysAgo(22) },
  { id: 52, userId: 1, action: 'settings', resource: 'Settings',   detail: 'Configured Google Analytics',  timestamp: daysAgo(23) },
];

export function getUsers() { return users; }
