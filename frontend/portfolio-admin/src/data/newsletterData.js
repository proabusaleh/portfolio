const now = Date.now();
const daysAgo = (n) => new Date(now - n * 86400000).toISOString();

export const SAMPLE_SUBSCRIBERS = [
  { id: 1,  name: 'Sarah Johnson',   email: 'sarah@techstart.com',   status: 'active',       tags: ['client', 'wordpress'],  subscribedAt: daysAgo(45),  lastOpen: daysAgo(2)   },
  { id: 2,  name: 'Mark Chen',       email: 'mark@appventure.io',    status: 'active',       tags: ['client', 'flutter'],    subscribedAt: daysAgo(120), lastOpen: daysAgo(5)   },
  { id: 3,  name: 'Emma Davis',      email: 'emma@dataflow.co',      status: 'active',       tags: ['client', 'design'],     subscribedAt: daysAgo(78),  lastOpen: daysAgo(1)   },
  { id: 4,  name: 'James Wilson',    email: 'james@shopflow.com',    status: 'active',       tags: ['client', 'woocommerce'],subscribedAt: daysAgo(30),  lastOpen: daysAgo(7)   },
  { id: 5,  name: 'Lisa Anderson',   email: 'lisa@bloomdesign.com',  status: 'active',       tags: ['prospect', 'design'],   subscribedAt: daysAgo(15),  lastOpen: daysAgo(3)   },
  { id: 6,  name: 'David Kim',       email: 'david@foodhub.io',      status: 'active',       tags: ['client', 'flutter'],    subscribedAt: daysAgo(90),  lastOpen: daysAgo(10)  },
  { id: 7,  name: 'Rachel Green',    email: 'rachel@luxebeauty.com', status: 'unsubscribed', tags: ['prospect'],             subscribedAt: daysAgo(180), lastOpen: daysAgo(60)  },
  { id: 8,  name: 'Priya Patel',     email: 'priya@edutech.in',      status: 'active',       tags: ['client', 'wordpress'],  subscribedAt: daysAgo(60),  lastOpen: daysAgo(4)   },
  { id: 9,  name: 'Tom Harris',      email: 'tom@realestatehub.com', status: 'active',       tags: ['prospect', 'wordpress'],subscribedAt: daysAgo(200), lastOpen: daysAgo(30)  },
  { id: 10, name: 'Jessica Wu',      email: 'jessica@petcare.co',    status: 'active',       tags: ['prospect', 'flutter'],  subscribedAt: daysAgo(25),  lastOpen: daysAgo(6)   },
  { id: 11, name: 'Ahmed Hassan',    email: 'ahmed@travelplus.ae',   status: 'active',       tags: ['client', 'wordpress'],  subscribedAt: daysAgo(150), lastOpen: daysAgo(15)  },
  { id: 12, name: 'Sophie Martin',   email: 'sophie@architstudio.fr',status: 'active',       tags: ['client'],               subscribedAt: daysAgo(220), lastOpen: daysAgo(8)   },
  { id: 13, name: 'Michael Brown',   email: 'michael@newsletter.co', status: 'active',       tags: ['newsletter'],           subscribedAt: daysAgo(365), lastOpen: daysAgo(2)   },
  { id: 14, name: 'Anna Thompson',   email: 'anna@blogsphere.io',    status: 'active',       tags: ['newsletter'],           subscribedAt: daysAgo(300), lastOpen: daysAgo(1)   },
  { id: 15, name: 'Robert Lee',      email: 'robert@dev.com',        status: 'bounced',      tags: ['newsletter'],           subscribedAt: daysAgo(400), lastOpen: null         },
  { id: 16, name: 'Maria Garcia',    email: 'maria@design.es',       status: 'active',       tags: ['newsletter', 'design'], subscribedAt: daysAgo(50),  lastOpen: daysAgo(3)   },
  { id: 17, name: 'John Smith',      email: 'john@tech.io',          status: 'active',       tags: ['newsletter'],           subscribedAt: daysAgo(10),  lastOpen: daysAgo(2)   },
  { id: 18, name: 'Yuki Tanaka',     email: 'yuki@tokyo.jp',         status: 'active',       tags: ['newsletter', 'flutter'],subscribedAt: daysAgo(5),   lastOpen: null         },
  { id: 19, name: 'Carlos Silva',    email: 'carlos@brazil.com',     status: 'active',       tags: ['newsletter'],           subscribedAt: daysAgo(85),  lastOpen: daysAgo(12)  },
  { id: 20, name: 'Nora Ibrahim',    email: 'nora@dubai.ae',         status: 'active',       tags: ['newsletter'],           subscribedAt: daysAgo(2),   lastOpen: null         },
];

export const SAMPLE_CAMPAIGNS = [
  {
    id: 1,
    subject: '🚀 5 WordPress Tips That Will Save You Hours',
    preheader: 'Discover the shortcuts that pro developers use daily',
    from: 'Abu Saleh <abu@yourportfolio.com>',
    content: '<h2>Hey there!</h2><p>This week I want to share 5 WordPress tips that will completely transform your workflow...</p><p>Let\'s dive in!</p>',
    status: 'sent',
    tags: [],
    scheduledAt: null,
    sentAt: daysAgo(5),
    recipients: 18,
    opens: 14,
    clicks: 8,
    bounces: 1,
    unsubscribes: 0,
  },
  {
    id: 2,
    subject: 'Flutter 3.16 is Here — Here\'s What\'s New',
    preheader: 'The biggest Flutter update this year, explained in 5 minutes',
    from: 'Abu Saleh <abu@yourportfolio.com>',
    content: '<h2>Flutter 3.16 Released!</h2><p>Google just dropped Flutter 3.16 and it\'s packed with amazing features...</p>',
    status: 'sent',
    tags: ['flutter'],
    scheduledAt: null,
    sentAt: daysAgo(20),
    recipients: 8,
    opens: 7,
    clicks: 5,
    bounces: 0,
    unsubscribes: 0,
  },
  {
    id: 3,
    subject: 'Client Spotlight: How We Built TechStart\'s New Site',
    preheader: 'A case study on the tools, process, and results',
    from: 'Abu Saleh <abu@yourportfolio.com>',
    content: '<h2>Case Study</h2><p>Last month, we helped TechStart Inc. rebuild their entire website from scratch...</p>',
    status: 'sent',
    tags: [],
    scheduledAt: null,
    sentAt: daysAgo(40),
    recipients: 17,
    opens: 12,
    clicks: 4,
    bounces: 1,
    unsubscribes: 1,
  },
  {
    id: 4,
    subject: '📅 Upcoming: WordPress 6.5 Deep Dive Webinar',
    preheader: 'Save your spot for our exclusive live session',
    from: 'Abu Saleh <abu@yourportfolio.com>',
    content: '<h2>Join us live!</h2><p>Next Friday, I\'m hosting a free deep-dive webinar on WordPress 6.5...</p>',
    status: 'scheduled',
    tags: ['wordpress'],
    scheduledAt: new Date(now + 3 * 86400000).toISOString(),
    sentAt: null,
    recipients: 0,
    opens: 0,
    clicks: 0,
    bounces: 0,
    unsubscribes: 0,
  },
  {
    id: 5,
    subject: 'Draft: Best Design Tools for 2024',
    preheader: '',
    from: 'Abu Saleh <abu@yourportfolio.com>',
    content: '<h2>My 2024 Design Stack</h2><p>Here are the tools I use every day...</p>',
    status: 'draft',
    tags: ['design'],
    scheduledAt: null,
    sentAt: null,
    recipients: 0,
    opens: 0,
    clicks: 0,
    bounces: 0,
    unsubscribes: 0,
  },
];

/* Available tags */
export const AVAILABLE_TAGS = [
  { value: 'client',      label: 'Client',      color: 'bg-green-500'  },
  { value: 'prospect',    label: 'Prospect',    color: 'bg-yellow-500' },
  { value: 'newsletter',  label: 'Newsletter',  color: 'bg-blue-500'   },
  { value: 'wordpress',   label: 'WordPress',   color: 'bg-indigo-500' },
  { value: 'flutter',     label: 'Flutter',     color: 'bg-cyan-500'   },
  { value: 'woocommerce', label: 'WooCommerce', color: 'bg-purple-500' },
  { value: 'design',      label: 'Design',      color: 'bg-pink-500'   },
];

export const ALL_TAGS = AVAILABLE_TAGS.map((t) => t.value);

/* Growth data (last 12 months) */
export const GROWTH_DATA = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setMonth(d.getMonth() - (11 - i));
  return {
    month: d.toLocaleString('en', { month: 'short' }),
    subscribers: Math.round(5 + i * 1.5 + Math.random() * 4),
    unsubscribes: Math.round(Math.random() * 2),
  };
});