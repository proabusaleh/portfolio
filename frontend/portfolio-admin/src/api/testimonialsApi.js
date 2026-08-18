import api from './axios';

export async function getTestimonials(params = {}) {
  const { data } = await api.get('/testimonials', { params });
  return data;
}

export async function getTestimonial(id) {
  const { data } = await api.get(`/testimonials/${id}`);
  return data;
}

export async function createTestimonial(payload) {
  const { data } = await api.post('/testimonials', payload);
  return data;
}

export async function updateTestimonial(id, payload) {
  const { data } = await api.put(`/testimonials/${id}`, payload);
  return data;
}

export async function deleteTestimonial(id) {
  const { data } = await api.delete(`/testimonials/${id}`);
  return data;
}

/* ─── Aliases consumed by pages ────────────────────────── */

export async function getTestimonialStats() {
  const all = await getTestimonials();
  const list = Array.isArray(all) ? all : all.data || [];
  const total = list.length;
  const avgRating = total ? +(list.reduce((s, t) => s + (t.rating || 0), 0) / total).toFixed(1) : 0;
  const ratings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  list.forEach((t) => { ratings[t.rating] = (ratings[t.rating] || 0) + 1; });
  return { total, avgRating, ratings, featured: list.filter((t) => t.featured).length };
}

export async function getCounts() {
  const all = await getTestimonials();
  const list = Array.isArray(all) ? all : all.data || [];
  return {
    all: list.length,
    approved: list.filter((t) => t.status === 'approved').length,
    pending: list.filter((t) => t.status === 'pending').length,
    featured: list.filter((t) => t.featured).length,
  };
}

export async function updateStatus(id, status) {
  return updateTestimonial(id, { status });
}

export async function toggleFeatured(id, featured) {
  return updateTestimonial(id, { featured });
}
