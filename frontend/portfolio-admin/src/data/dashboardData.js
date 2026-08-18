export const STATS = [
  {
    id:     'projects',
    label:  'Total Projects',
    value:  48,
    change: 12.5,
    trend:  'up',
    icon:   'FolderKanban',
    color:  'from-indigo-500 to-purple-500',
    period: 'vs last month',
  },
  {
    id:     'blog',
    label:  'Blog Posts',
    value:  24,
    change: 8.2,
    trend:  'up',
    icon:   'FileText',
    color:  'from-emerald-500 to-teal-500',
    period: 'vs last month',
  },
  {
    id:     'messages',
    label:  'New Messages',
    value:  156,
    change: -3.4,
    trend:  'down',
    icon:   'MessageSquare',
    color:  'from-orange-500 to-red-500',
    period: 'vs last month',
  },
  {
    id:     'visitors',
    label:  'Portfolio Visitors',
    value:  12459,
    change: 24.8,
    trend:  'up',
    icon:   'Users',
    color:  'from-cyan-500 to-blue-500',
    period: 'vs last month',
  },
];

/* ── Line chart: Visitors last 30 days ── */
export const VISITORS_DATA = Array.from({ length: 30 }, (_, i) => {
  const base = 200 + Math.sin(i / 3) * 80 + Math.random() * 100;
  return {
    date:     `${i + 1}`,
    visitors: Math.round(base + i * 5),
    pageViews: Math.round(base * 2.5 + i * 8),
  };
});

/* ── Bar chart: Project categories ── */
export const CATEGORY_DATA = [
  { name: 'WordPress',   count: 18, color: '#3b82f6' },
  { name: 'Flutter',     count: 12, color: '#06b6d4' },
  { name: 'WooCommerce', count: 10, color: '#8b5cf6' },
  { name: 'UI/UX',       count: 8,  color: '#ec4899' },
];

/* ── Pie chart: Traffic sources ── */
export const TRAFFIC_DATA = [
  { name: 'Direct',   value: 4200, color: '#6366f1' },
  { name: 'Google',   value: 5800, color: '#10b981' },
  { name: 'Social',   value: 1800, color: '#f59e0b' },
  { name: 'Referral', value: 900,  color: '#ef4444' },
];

/* ── Recent messages ── */
export const RECENT_MESSAGES = [
  {
    id:      1,
    name:    'Sarah Johnson',
    email:   'sarah@techstart.com',
    subject: 'WordPress e-commerce project inquiry',
    preview: "Hi, I'm interested in building a WooCommerce store for my new fashion brand...",
    time:    new Date(Date.now() - 15 * 60 * 1000),
    unread:  true,
    avatar:  null,
  },
  {
    id:      2,
    name:    'Mark Chen',
    email:   'mark@appventure.io',
    subject: 'Flutter app development',
    preview: 'Looking for a Flutter developer to build our MVP for a fitness tracking app...',
    time:    new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread:  true,
    avatar:  null,
  },
  {
    id:      3,
    name:    'Emma Davis',
    email:   'emma@dataflow.co',
    subject: 'Portfolio website redesign',
    preview: 'Would love to discuss a complete redesign of our corporate website using WordPress...',
    time:    new Date(Date.now() - 5 * 60 * 60 * 1000),
    unread:  false,
    avatar:  null,
  },
  {
    id:      4,
    name:    'James Wilson',
    email:   'james@shopflow.com',
    subject: 'Payment gateway integration',
    preview: 'Need help integrating Stripe & PayPal into our existing WooCommerce store...',
    time:    new Date(Date.now() - 24 * 60 * 60 * 1000),
    unread:  false,
    avatar:  null,
  },
  {
    id:      5,
    name:    'Lisa Anderson',
    email:   'lisa@bloomdesign.com',
    subject: 'UI/UX consultation',
    preview: 'Interested in your UI/UX services for our upcoming mobile app project...',
    time:    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    unread:  false,
    avatar:  null,
  },
];

/* ── Recent projects ── */
export const RECENT_PROJECTS = [
  {
    id:       1,
    title:    'E-commerce Fashion Store',
    category: 'WooCommerce',
    image:    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
    status:   'published',
    views:    2340,
    date:     '2 days ago',
  },
  {
    id:       2,
    title:    'Fitness Tracker Mobile App',
    category: 'Flutter',
    image:    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    status:   'published',
    views:    1890,
    date:     '5 days ago',
  },
  {
    id:       3,
    title:    'Corporate Website Redesign',
    category: 'WordPress',
    image:    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
    status:   'draft',
    views:    0,
    date:     '1 week ago',
  },
  {
    id:       4,
    title:    'Food Delivery Dashboard',
    category: 'UI/UX',
    image:    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    status:   'published',
    views:    3120,
    date:     '2 weeks ago',
  },
];