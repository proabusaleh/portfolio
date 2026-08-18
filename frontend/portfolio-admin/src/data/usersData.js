const now = Date.now();
const daysAgo = (n) => new Date(now - n * 86400000).toISOString();
const hoursAgo = (n) => new Date(now - n * 3600000).toISOString();

/* ─── Roles ──────────────────────────────────────────────── */

export const ROLES = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Full system access',
    color: 'from-red-500 to-rose-500',
    icon: '👑',
    level: 100,
  },
  {
    id: 'editor',
    label: 'Editor',
    description: 'Manage content & settings',
    color: 'from-indigo-500 to-purple-500',
    icon: '✏️',
    level: 70,
  },
  {
    id: 'author',
    label: 'Author',
    description: 'Create & edit own content',
    color: 'from-blue-500 to-cyan-500',
    icon: '📝',
    level: 50,
  },
  {
    id: 'contributor',
    label: 'Contributor',
    description: 'Submit content for review',
    color: 'from-emerald-500 to-teal-500',
    icon: '🤝',
    level: 30,
  },
  {
    id: 'viewer',
    label: 'Viewer',
    description: 'Read-only access',
    color: 'from-gray-500 to-slate-500',
    icon: '👁️',
    level: 10,
  },
];

/* ─── Permissions grouped ────────────────────────────────── */

export const PERMISSION_GROUPS = [
  {
    group: 'Projects',
    permissions: [
      { id: 'projects.view',   label: 'View projects'   },
      { id: 'projects.create', label: 'Create projects' },
      { id: 'projects.edit',   label: 'Edit projects'   },
      { id: 'projects.delete', label: 'Delete projects' },
    ],
  },
  {
    group: 'Blog',
    permissions: [
      { id: 'blog.view',    label: 'View posts'   },
      { id: 'blog.create',  label: 'Create posts' },
      { id: 'blog.edit',    label: 'Edit posts'   },
      { id: 'blog.publish', label: 'Publish posts' },
      { id: 'blog.delete',  label: 'Delete posts' },
    ],
  },
  {
    group: 'Messages',
    permissions: [
      { id: 'messages.view',   label: 'View inbox'      },
      { id: 'messages.reply',  label: 'Reply to messages' },
      { id: 'messages.delete', label: 'Delete messages' },
    ],
  },
  {
    group: 'Media',
    permissions: [
      { id: 'media.view',   label: 'View media'   },
      { id: 'media.upload', label: 'Upload files' },
      { id: 'media.delete', label: 'Delete files' },
    ],
  },
  {
    group: 'Users',
    permissions: [
      { id: 'users.view',   label: 'View users'   },
      { id: 'users.invite', label: 'Invite users' },
      { id: 'users.edit',   label: 'Edit users'   },
      { id: 'users.delete', label: 'Delete users' },
    ],
  },
  {
    group: 'Settings',
    permissions: [
      { id: 'settings.view', label: 'View settings' },
      { id: 'settings.edit', label: 'Edit settings' },
    ],
  },
];

/* ─── Default role permissions ───────────────────────────── */

export const ROLE_PERMISSIONS = {
  admin: PERMISSION_GROUPS.flatMap((g) => g.permissions.map((p) => p.id)),

  editor: [
    'projects.view', 'projects.create', 'projects.edit', 'projects.delete',
    'blog.view',     'blog.create',     'blog.edit',     'blog.publish', 'blog.delete',
    'messages.view', 'messages.reply',  'messages.delete',
    'media.view',    'media.upload',    'media.delete',
    'settings.view',
  ],

  author: [
    'projects.view', 'projects.create', 'projects.edit',
    'blog.view',     'blog.create',     'blog.edit',
    'messages.view', 'messages.reply',
    'media.view',    'media.upload',
  ],

  contributor: [
    'projects.view',
    'blog.view', 'blog.create',
    'media.view', 'media.upload',
  ],

  viewer: [
    'projects.view', 'blog.view', 'messages.view', 'media.view', 'settings.view',
  ],
};

/* ─── Sample users ───────────────────────────────────────── */

export const SAMPLE_USERS = [
  {
    id: 1,
    name:      'Abu Saleh',
    email:     'abusaleh@example.com',
    avatar:    'https://i.pravatar.cc/150?img=8',
    role:      'admin',
    status:    'active',
    lastLogin: hoursAgo(1),
    joinedAt:  daysAgo(365),
    twoFactor: true,
    isYou:     true,
  },
  {
    id: 2,
    name:      'Sarah Johnson',
    email:     'sarah@techstart.com',
    avatar:    'https://i.pravatar.cc/150?img=1',
    role:      'editor',
    status:    'active',
    lastLogin: hoursAgo(4),
    joinedAt:  daysAgo(120),
    twoFactor: true,
  },
  {
    id: 3,
    name:      'Mark Chen',
    email:     'mark@appventure.io',
    avatar:    'https://i.pravatar.cc/150?img=12',
    role:      'editor',
    status:    'active',
    lastLogin: hoursAgo(24),
    joinedAt:  daysAgo(90),
    twoFactor: false,
  },
  {
    id: 4,
    name:      'Emma Davis',
    email:     'emma@dataflow.co',
    avatar:    'https://i.pravatar.cc/150?img=5',
    role:      'author',
    status:    'active',
    lastLogin: hoursAgo(48),
    joinedAt:  daysAgo(60),
    twoFactor: false,
  },
  {
    id: 5,
    name:      'James Wilson',
    email:     'james@shopflow.com',
    avatar:    'https://i.pravatar.cc/150?img=13',
    role:      'author',
    status:    'active',
    lastLogin: daysAgo(3),
    joinedAt:  daysAgo(45),
    twoFactor: false,
  },
  {
    id: 6,
    name:      'Lisa Anderson',
    email:     'lisa@bloomdesign.com',
    avatar:    'https://i.pravatar.cc/150?img=9',
    role:      'contributor',
    status:    'active',
    lastLogin: daysAgo(7),
    joinedAt:  daysAgo(30),
    twoFactor: false,
  },
  {
    id: 7,
    name:      'David Kim',
    email:     'david@foodhub.io',
    avatar:    'https://i.pravatar.cc/150?img=14',
    role:      'viewer',
    status:    'active',
    lastLogin: daysAgo(15),
    joinedAt:  daysAgo(20),
    twoFactor: false,
  },
  {
    id: 8,
    name:      'Rachel Green',
    email:     'rachel@luxebeauty.com',
    avatar:    'https://i.pravatar.cc/150?img=10',
    role:      'author',
    status:    'inactive',
    lastLogin: daysAgo(90),
    joinedAt:  daysAgo(200),
    twoFactor: false,
  },
  {
    id: 9,
    name:      'Priya Patel',
    email:     'priya@edutech.in',
    avatar:    'https://i.pravatar.cc/150?img=25',
    role:      'editor',
    status:    'pending',
    lastLogin: null,
    joinedAt:  daysAgo(1),
    twoFactor: false,
    invitedBy: 'Abu Saleh',
  },
  {
    id: 10,
    name:      'Tom Harris',
    email:     'tom@realestatehub.com',
    avatar:    'https://i.pravatar.cc/150?img=15',
    role:      'contributor',
    status:    'suspended',
    lastLogin: daysAgo(60),
    joinedAt:  daysAgo(180),
    twoFactor: false,
    suspendedReason: 'Multiple guideline violations',
  },
];

/* ─── User activity log ──────────────────────────────────── */

export const USER_ACTIVITY = {
  1: [ // Abu Saleh
    { id: 1, action: 'Updated site settings',     type: 'update', target: 'Settings',   time: hoursAgo(1) },
    { id: 2, action: 'Deleted 3 old backups',     type: 'delete', target: 'Backups',    time: hoursAgo(2) },
    { id: 3, action: 'Published blog post',       type: 'publish',target: 'WordPress 6.5 Guide', time: hoursAgo(5) },
    { id: 4, action: 'Invited priya@edutech.in',  type: 'invite', target: 'Users',      time: daysAgo(1) },
    { id: 5, action: 'Created project',           type: 'create', target: 'E-commerce Site', time: daysAgo(2) },
  ],
  2: [ // Sarah
    { id: 1, action: 'Replied to inquiry',        type: 'update', target: 'Mark Chen message', time: hoursAgo(4) },
    { id: 2, action: 'Uploaded 8 images',         type: 'upload', target: 'Media Library',    time: hoursAgo(8) },
    { id: 3, action: 'Edited blog post',          type: 'update', target: 'Flutter Guide',    time: daysAgo(1) },
  ],
  3: [ // Mark
    { id: 1, action: 'Approved testimonial',      type: 'update', target: 'Emma Davis review', time: daysAgo(1) },
    { id: 2, action: 'Created new service',       type: 'create', target: 'Flutter Development', time: daysAgo(2) },
  ],
  4: [
    { id: 1, action: 'Created draft',             type: 'create', target: 'Blog post',        time: daysAgo(2) },
  ],
  9: [
    { id: 1, action: 'Received invite',           type: 'invite', target: 'System',           time: daysAgo(1) },
  ],
};

export const ACTION_ICONS = {
  create:  { icon: 'Plus',        color: 'text-green-500'  },
  update:  { icon: 'Edit',        color: 'text-blue-500'   },
  delete:  { icon: 'Trash2',      color: 'text-red-500'    },
  publish: { icon: 'Send',        color: 'text-purple-500' },
  invite:  { icon: 'UserPlus',    color: 'text-indigo-500' },
  upload:  { icon: 'Upload',      color: 'text-teal-500'   },
  login:   { icon: 'LogIn',       color: 'text-gray-500'   },
};

export const ROLES_MAP = Object.fromEntries(ROLES.map((r) => [r.id, r]));
export const ALL_PERMISSIONS = PERMISSION_GROUPS.flatMap((g) => g.permissions.map((p) => p.id));