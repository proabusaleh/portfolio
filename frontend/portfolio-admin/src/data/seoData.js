export const DEFAULT_SEO = {
  // Site-wide
  siteName:        'Abu Saleh - Portfolio',
  titleTemplate:   '%s | Abu Saleh',
  defaultTitle:    'Abu Saleh - WordPress & Flutter Developer',
  description:     'Professional WordPress & Flutter developer from Bangladesh. Building fast, scalable web and mobile solutions for clients worldwide.',
  keywords:        ['wordpress developer', 'flutter developer', 'web development', 'mobile apps', 'woocommerce', 'freelancer'],
  author:          'Abu Saleh',
  language:        'en',
  locale:          'en_US',

  // Open Graph
  ogImage:         'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
  ogType:          'website',
  ogSiteName:      'Abu Saleh Portfolio',

  // Twitter
  twitterCard:     'summary_large_image',
  twitterHandle:   '@abusaleh',
  twitterSite:     '@abusaleh',

  // Verification codes
  googleVerification:    'abc123xyz456',
  bingVerification:      '',
  yandexVerification:    '',

  // Analytics
  gaTrackingId:    'G-XXXXXXXXXX',
  gtmId:           '',
  fbPixelId:       '',

  // Advanced
  canonicalUrl:    'https://yourportfolio.com',
  noindex:         false,
  nofollow:        false,
  themeColor:      '#6366f1',
};

export const DEFAULT_ROBOTS = `User-agent: *
Allow: /

# Disallow admin area
Disallow: /admin/
Disallow: /login
Disallow: /*.json$

# Sitemaps
Sitemap: https://yourportfolio.com/sitemap.xml`;

export const SAMPLE_SITEMAP_URLS = [
  { url: 'https://yourportfolio.com/',          priority: 1.0, changefreq: 'weekly',  lastmod: '2024-05-30' },
  { url: 'https://yourportfolio.com/about',     priority: 0.9, changefreq: 'monthly', lastmod: '2024-04-15' },
  { url: 'https://yourportfolio.com/services',  priority: 0.9, changefreq: 'monthly', lastmod: '2024-05-10' },
  { url: 'https://yourportfolio.com/portfolio', priority: 0.9, changefreq: 'weekly',  lastmod: '2024-05-28' },
  { url: 'https://yourportfolio.com/blog',      priority: 0.8, changefreq: 'daily',   lastmod: '2024-05-30' },
  { url: 'https://yourportfolio.com/contact',   priority: 0.7, changefreq: 'monthly', lastmod: '2024-01-10' },
  { url: 'https://yourportfolio.com/blog/building-fast-wordpress-sites-2024', priority: 0.7, changefreq: 'monthly', lastmod: '2024-05-15' },
  { url: 'https://yourportfolio.com/blog/flutter-vs-react-native-comparison', priority: 0.7, changefreq: 'monthly', lastmod: '2024-04-22' },
];

export const PAGE_OVERRIDES = [
  {
    id: 1,
    path: '/',
    title: 'Abu Saleh - WordPress & Flutter Developer',
    description: 'Professional WordPress & Flutter developer with 5+ years experience.',
    ogImage: '',
    noindex: false,
  },
  {
    id: 2,
    path: '/services',
    title: 'Services - WordPress, Flutter & More',
    description: 'Explore my services: WordPress development, Flutter apps, WooCommerce stores, and UI/UX design.',
    ogImage: '',
    noindex: false,
  },
  {
    id: 3,
    path: '/portfolio',
    title: 'Portfolio - 50+ Projects Delivered',
    description: 'Browse my portfolio of WordPress websites, Flutter mobile apps, and design projects.',
    ogImage: '',
    noindex: false,
  },
  {
    id: 4,
    path: '/admin',
    title: 'Admin Dashboard',
    description: '',
    ogImage: '',
    noindex: true,
  },
];

export const SCHEMA_TYPES = [
  { value: 'Person',        label: '👤 Person',          description: 'Personal profile' },
  { value: 'Organization',  label: '🏢 Organization',    description: 'Business/company' },
  { value: 'WebSite',       label: '🌐 WebSite',         description: 'Full website' },
  { value: 'Article',       label: '📄 Article',         description: 'Blog post/news' },
  { value: 'Service',       label: '💼 Service',         description: 'Service offering' },
  { value: 'FAQPage',       label: '❓ FAQ Page',        description: 'FAQ content' },
  { value: 'BreadcrumbList',label: '🍞 Breadcrumbs',     description: 'Navigation path' },
];

export const GSC_DATA = {
  connected: false,
  totalClicks: 12459,
  totalImpressions: 245680,
  avgCtr: 5.07,
  avgPosition: 12.4,
  topQueries: [
    { query: 'wordpress developer bangladesh', clicks: 823, impressions: 12450, ctr: 6.6, position: 8.2 },
    { query: 'flutter app developer',          clicks: 645, impressions: 18923, ctr: 3.4, position: 15.4 },
    { query: 'woocommerce customization',      clicks: 523, impressions: 9834,  ctr: 5.3, position: 11.7 },
    { query: 'abu saleh portfolio',            clicks: 412, impressions: 512,   ctr: 80.5, position: 1.2 },
    { query: 'flutter vs react native',        clicks: 298, impressions: 8934,  ctr: 3.3, position: 18.9 },
  ],
};