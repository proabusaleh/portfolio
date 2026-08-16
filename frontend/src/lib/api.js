import { projects, posts, getProjectBySlug, getPostBySlug } from '../data/fallback.js';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api';
const TIMEOUT = 4000;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: 'application/json' },
      ...options,
      signal: controller.signal,
    });
    if (!res.ok) {
      const err = new Error(`Request failed: ${res.status}`);
      err.status = res.status;
      try {
        err.payload = await res.json();
      } catch {
        /* ignore */
      }
      throw err;
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function normalizeImage(item) {
  const out = { ...item };
  if (item.image) out.image = `/images/projects/${item.image.split('/').pop()}`;
  if (item.gallery) out.gallery = item.gallery.map((g) => `/images/projects/${g.split('/').pop()}`);
  return out;
}

export async function getProjects(params = {}) {
  const qs = new URLSearchParams(params).toString();
  try {
    const json = await request(`/projects${qs ? `?${qs}` : ''}`);
    return Array.isArray(json) ? json.map(normalizeImage) : (json.data || []).map(normalizeImage);
  } catch {
    let list = [...projects];
    if (params.category && params.category !== 'all') {
      list = list.filter((p) => p.categories.includes(params.category));
    }
    if (params.featured) list = list.filter((p) => p.featured);
    return list;
  }
}

export async function getProject(slug) {
  try {
    const json = await request(`/projects/${slug}`);
    const item = Array.isArray(json) ? json[0] : json;
    return normalizeImage(item);
  } catch {
    return getProjectBySlug(slug) || null;
  }
}

export async function getPosts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  try {
    const json = await request(`/posts${qs ? `?${qs}` : ''}`);
    return Array.isArray(json) ? json : json.data || [];
  } catch {
    let list = [...posts];
    if (params.category && params.category !== 'all') {
      list = list.filter((p) => p.category === params.category);
    }
    if (params.featured) list = list.filter((p) => p.featured);
    return list;
  }
}

export async function getPost(slug) {
  try {
    const json = await request(`/posts/${slug}`);
    return Array.isArray(json) ? json[0] : json;
  } catch {
    return getPostBySlug(slug) || null;
  }
}

export async function sendContact(payload) {
  try {
    return await request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    if (err.status === 422) throw err;
    await new Promise((r) => setTimeout(r, 1200));
    return { message: 'Message sent successfully (demo mode).' };
  }
}

export { API_BASE };
