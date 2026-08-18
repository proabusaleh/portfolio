import { sleep } from '../lib/utils';
import { DEFAULT_SEO, DEFAULT_ROBOTS, SAMPLE_SITEMAP_URLS, PAGE_OVERRIDES, GSC_DATA } from '../data/seoData';

const STORAGE_KEY = 'portfolio-seo';
let db = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {
  settings: { ...DEFAULT_SEO },
  robots: DEFAULT_ROBOTS,
  sitemap: [...SAMPLE_SITEMAP_URLS],
  overrides: [...PAGE_OVERRIDES],
  schemas: [],
};

const persist = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(db));

/* ─── Settings ───────────────────────────────────────────── */

export async function getSeoSettings() {
  await sleep(300);
  return { ...db.settings };
}

export async function updateSeoSettings(data) {
  await sleep(400);
  db.settings = { ...db.settings, ...data };
  persist();
  return db.settings;
}

export const saveSeoSettings = updateSeoSettings;

/* ─── Robots.txt ─────────────────────────────────────────── */

export async function getRobots() {
  await sleep(200);
  return db.robots;
}

export async function updateRobots(text) {
  await sleep(300);
  db.robots = text;
  persist();
  return text;
}

/* ─── Sitemap ────────────────────────────────────────────── */

export async function getSitemap() {
  await sleep(200);
  return [...db.sitemap];
}

export async function updateSitemap(urls) {
  await sleep(300);
  db.sitemap = [...urls];
  persist();
  return db.sitemap;
}

export function generateSitemapXml(urls) {
  const items = urls.map((u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

/* ─── Page overrides ─────────────────────────────────────── */

export async function getOverrides() {
  await sleep(200);
  return [...db.overrides];
}

export async function saveOverride(data) {
  await sleep(300);
  if (data.id) {
    const idx = db.overrides.findIndex((o) => o.id === data.id);
    if (idx !== -1) db.overrides[idx] = data;
  } else {
    data.id = db.overrides.length ? Math.max(...db.overrides.map((o) => o.id)) + 1 : 1;
    db.overrides.push(data);
  }
  persist();
  return data;
}

export async function deleteOverride(id) {
  await sleep(200);
  db.overrides = db.overrides.filter((o) => o.id !== id);
  persist();
  return { success: true };
}

/* ─── Schemas ────────────────────────────────────────────── */

export async function getSchemas() {
  await sleep(200);
  return [...db.schemas];
}

export async function saveSchema(data) {
  await sleep(300);
  if (data.id) {
    const idx = db.schemas.findIndex((s) => s.id === data.id);
    if (idx !== -1) db.schemas[idx] = data;
  } else {
    data.id = db.schemas.length ? Math.max(...db.schemas.map((s) => s.id)) + 1 : 1;
    db.schemas.push(data);
  }
  persist();
  return data;
}

export async function deleteSchema(id) {
  await sleep(200);
  db.schemas = db.schemas.filter((s) => s.id !== id);
  persist();
  return { success: true };
}

/* ─── SEO Score analyzer ─────────────────────────────────── */

export function analyzeSeoScore(settings) {
  const checks = [];

  // Title
  const titleLen = settings.defaultTitle?.length || 0;
  checks.push({
    id: 'title',
    label: 'Page title',
    status: titleLen >= 30 && titleLen <= 60 ? 'good' : titleLen === 0 ? 'error' : 'warning',
    message: titleLen === 0
      ? 'Title is missing'
      : titleLen < 30 ? `Title too short (${titleLen}/30-60)`
      : titleLen > 60 ? `Title too long (${titleLen}/60)`
      : `Perfect length (${titleLen} chars)`,
  });

  // Description
  const descLen = settings.description?.length || 0;
  checks.push({
    id: 'description',
    label: 'Meta description',
    status: descLen >= 120 && descLen <= 160 ? 'good' : descLen === 0 ? 'error' : 'warning',
    message: descLen === 0
      ? 'Description is missing'
      : descLen < 120 ? `Too short (${descLen}/120-160)`
      : descLen > 160 ? `Too long (${descLen}/160)`
      : `Perfect length (${descLen} chars)`,
  });

  // Keywords
  checks.push({
    id: 'keywords',
    label: 'Keywords defined',
    status: (settings.keywords?.length || 0) >= 3 ? 'good' : 'warning',
    message: `${settings.keywords?.length || 0} keywords set`,
  });

  // OG Image
  checks.push({
    id: 'og',
    label: 'Open Graph image',
    status: settings.ogImage ? 'good' : 'error',
    message: settings.ogImage ? 'OG image configured' : 'Missing OG image',
  });

  // Twitter
  checks.push({
    id: 'twitter',
    label: 'Twitter card',
    status: settings.twitterCard && settings.twitterHandle ? 'good' : 'warning',
    message: settings.twitterHandle ? 'Twitter configured' : 'Add Twitter handle',
  });

  // Analytics
  checks.push({
    id: 'analytics',
    label: 'Google Analytics',
    status: settings.gaTrackingId ? 'good' : 'warning',
    message: settings.gaTrackingId ? 'GA tracking active' : 'No analytics installed',
  });

  // Verification
  checks.push({
    id: 'gsc',
    label: 'Search Console',
    status: settings.googleVerification ? 'good' : 'warning',
    message: settings.googleVerification ? 'Verified' : 'Not verified with Google',
  });

  // Canonical
  checks.push({
    id: 'canonical',
    label: 'Canonical URL',
    status: settings.canonicalUrl ? 'good' : 'warning',
    message: settings.canonicalUrl ? 'Canonical URL set' : 'Missing canonical URL',
  });

  // Index
  checks.push({
    id: 'index',
    label: 'Search indexing',
    status: !settings.noindex ? 'good' : 'error',
    message: settings.noindex ? 'Blocked from search engines!' : 'Indexable by search engines',
  });

  const good    = checks.filter((c) => c.status === 'good').length;
  const total   = checks.length;
  const score   = Math.round((good / total) * 100);

  return { score, checks, total, good };
}

/* ─── GSC ─────────────────────────────────────────────── */

export async function getGscData() {
  await sleep(400);
  return { ...GSC_DATA };
}