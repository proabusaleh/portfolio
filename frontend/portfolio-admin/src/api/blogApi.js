import api from './axios';

/* ─── Field name mapping: frontend camelCase ↔ backend snake_case ─── */
const FIELD_MAP_TO_SNAKE = {
  coverImage: 'cover_image',
  publishedAt: 'published_at',
  scheduledAt: 'scheduled_at',
  readTime: 'read_time',
};

const FIELD_MAP_TO_CAMEL = {
  cover_image: 'coverImage',
  published_at: 'publishedAt',
  scheduled_at: 'scheduledAt',
  read_time: 'readTime',
  user_id: 'userId',
};

function toSnakeCase(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const newKey = FIELD_MAP_TO_SNAKE[key] || key;
    result[newKey] = val;
  }
  return result;
}

function toCamelCase(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const newKey = FIELD_MAP_TO_CAMEL[key] || key;
    result[newKey] = val;
  }
  return result;
}

export async function getPosts(params = {}) {
  const { data } = await api.get('/blog-posts', { params });
  return {
    ...data,
    data: (data.data || []).map(toCamelCase),
  };
}

export async function getPost(id) {
  const { data } = await api.get(`/blog-posts/${id}`);
  return toCamelCase(data);
}

export async function createPost(payload) {
  const { data } = await api.post('/blog-posts', toSnakeCase(payload));
  return toCamelCase(data);
}

export async function updatePost(id, payload) {
  const { data } = await api.put(`/blog-posts/${id}`, toSnakeCase(payload));
  return toCamelCase(data);
}

export async function deletePost(id) {
  const { data } = await api.delete(`/blog-posts/${id}`);
  return data;
}

export async function getComments(params = {}) {
  const { data } = await api.get('/blog-comments', { params });
  return data;
}

export async function updateComment(id, payload) {
  const { data } = await api.put(`/blog-comments/${id}`, payload);
  return data;
}

export async function deleteComment(id) {
  const { data } = await api.delete(`/blog-comments/${id}`);
  return data;
}

/* ─── Aliases & helpers consumed by pages ───────────────── */

export async function deletePosts(ids) {
  await Promise.all(ids.map((id) => api.delete(`/blog-posts/${id}`)));
  return { success: true, deleted: ids.length };
}

export async function getPostStats() {
  const posts = await getPosts({ pageSize: 1000 });
  const list = posts.data || [];
  return {
    total: posts.total || list.length,
    published: list.filter((p) => p.status === 'published').length,
    draft: list.filter((p) => p.status === 'draft').length,
    scheduled: list.filter((p) => p.status === 'scheduled').length,
    totalViews: list.reduce((s, p) => s + (p.views || 0), 0),
    totalLikes: list.reduce((s, p) => s + (p.likes || 0), 0),
    totalShares: list.reduce((s, p) => s + (p.shares || 0), 0),
  };
}

export async function getCommentsCounts() {
  const all = await getComments({ pageSize: 1000 });
  const list = all.data || [];
  return {
    all: all.total || list.length,
    pending: list.filter((c) => c.status === 'pending').length,
    approved: list.filter((c) => c.status === 'approved').length,
    spam: list.filter((c) => c.status === 'spam').length,
  };
}

export async function updateCommentStatus(id, status) {
  return updateComment(id, { status });
}

export function calculateReadTime(html = '') {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
