export const VISITORS_BY_DAY = {
  '7d': Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
    visitors: Math.floor(800 + Math.random() * 600),
    sessions: Math.floor(1000 + Math.random() * 800),
    pageviews: Math.floor(2000 + Math.random() * 1500),
  })),
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
    visitors: Math.floor(600 + Math.random() * 900),
    sessions: Math.floor(800 + Math.random() * 1100),
    pageviews: Math.floor(1500 + Math.random() * 2000),
  })),
  '90d': Array.from({ length: 13 }, (_, i) => ({
    date: new Date(Date.now() - (12 - i) * 7 * 86400000).toISOString().split('T')[0],
    visitors: Math.floor(4000 + Math.random() * 3000),
    sessions: Math.floor(5000 + Math.random() * 4000),
    pageviews: Math.floor(10000 + Math.random() * 8000),
  })),
};

export const DEVICE_BREAKDOWN = [
  { name: 'Desktop', value: 52, color: '#6366f1', icon: 'Monitor' },
  { name: 'Mobile', value: 35, color: '#8b5cf6', icon: 'Smartphone' },
  { name: 'Tablet', value: 13, color: '#a78bfa', icon: 'Tablet' },
];

export const BROWSER_STATS = [
  { name: 'Chrome', value: 3842, color: '#6366f1' },
  { name: 'Safari', value: 1680, color: '#8b5cf6' },
  { name: 'Firefox', value: 910, color: '#ec4899' },
  { name: 'Edge', value: 490, color: '#f59e0b' },
  { name: 'Other', value: 141, color: '#6b7280' },
];

export const TOP_PAGES = [
  { path: '/', title: 'Home', views: 12450, avgTime: 135, bounce: 28 },
  { path: '/projects', title: 'Projects', views: 8320, avgTime: 222, bounce: 32 },
  { path: '/about', title: 'About', views: 5100, avgTime: 118, bounce: 41 },
  { path: '/blog', title: 'Blog', views: 4750, avgTime: 250, bounce: 35 },
  { path: '/contact', title: 'Contact', views: 3200, avgTime: 82, bounce: 45 },
  { path: '/resume', title: 'Resume', views: 2840, avgTime: 330, bounce: 22 },
];

export const TOP_REFERRERS = [
  { name: 'Google', visitors: 2150, percent: 38, color: 'from-blue-400 to-blue-600', icon: 'G' },
  { name: 'Direct', visitors: 1680, percent: 30, color: 'from-gray-400 to-gray-600', icon: 'D' },
  { name: 'GitHub', visitors: 890, percent: 16, color: 'from-gray-700 to-gray-900', icon: '\u25CB' },
  { name: 'Twitter / X', visitors: 520, percent: 9, color: 'from-sky-400 to-sky-600', icon: 'X' },
  { name: 'LinkedIn', visitors: 310, percent: 5, color: 'from-blue-500 to-blue-700', icon: 'in' },
  { name: 'Other', visitors: 83, percent: 2, color: 'from-gray-300 to-gray-500', icon: '?' },
];

export const GEO_DATA = [
  { name: 'United States', code: 'US', visitors: 2100, percent: 30, flag: '\uD83C\uDDFA\uD83C\uDDF8' },
  { name: 'Germany', code: 'DE', visitors: 840, percent: 12, flag: '\uD83C\uDDE9\uD83C\uDDEA' },
  { name: 'United Kingdom', code: 'GB', visitors: 630, percent: 9, flag: '\uD83C\uDDEC\uD83C\uDDE7' },
  { name: 'India', code: 'IN', visitors: 560, percent: 8, flag: '\uD83C\uDDEE\uD83C\uDDF3' },
  { name: 'France', code: 'FR', visitors: 420, percent: 6, flag: '\uD83C\uDDEB\uD83C\uDDF7' },
  { name: 'Canada', code: 'CA', visitors: 350, percent: 5, flag: '\uD83C\uDDE8\uD83C\uDDE6' },
  { name: 'Japan', code: 'JP', visitors: 280, percent: 4, flag: '\uD83C\uDDEF\uD83C\uDDF5' },
  { name: 'Brazil', code: 'BR', visitors: 210, percent: 3, flag: '\uD83C\uDDE7\uD83C\uDDF7' },
  { name: 'Netherlands', code: 'NL', visitors: 175, percent: 2, flag: '\uD83C\uDDF3\uD83C\uDDF1' },
  { name: 'Australia', code: 'AU', visitors: 140, percent: 2, flag: '\uD83C\uDDE6\uD83C\uDDFA' },
];

export const REALTIME_STATS = {
  activeVisitors: 24,
  todayVisitors: 1247,
  todaySessions: 1580,
  todayPageviews: 3842,
};

export const SUMMARY_STATS = {
  '7d': { visitors: 5620, sessions: 7100, pageviews: 18400, bounceRate: 38, avgSession: '2:45' },
  '30d': { visitors: 22400, sessions: 28900, pageviews: 74200, bounceRate: 35, avgSession: '3:02' },
  '90d': { visitors: 61200, sessions: 78500, pageviews: 198000, bounceRate: 33, avgSession: '3:18' },
};

export const TIME_RANGES = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
];
