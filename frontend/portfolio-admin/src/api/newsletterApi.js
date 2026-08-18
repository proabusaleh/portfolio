import api from './axios';

/* ─── Subscribers ────────────────────────────────────────── */

export async function getSubscribers(params = {}) {
  const { data } = await api.get('/subscribers', { params });
  return data.data || data;
}

export async function getSubscriber(id) {
  const { data } = await api.get(`/subscribers/${id}`);
  return data;
}

export async function createSubscriber(payload) {
  const { data } = await api.post('/subscribers', payload);
  return data;
}

export async function updateSubscriber(id, payload) {
  const { data } = await api.put(`/subscribers/${id}`, payload);
  return data;
}

export async function deleteSubscribers(ids) {
  const results = await Promise.all(ids.map((id) => api.delete(`/subscribers/${id}`)));
  return { success: true, count: results.length };
}

/* ─── Campaigns ──────────────────────────────────────────── */

export async function getCampaigns(params = {}) {
  const { data } = await api.get('/campaigns', { params });
  return data.data || data;
}

export async function getCampaign(id) {
  const { data } = await api.get(`/campaigns/${id}`);
  return data;
}

export async function createCampaign(payload) {
  const { data } = await api.post('/campaigns', payload);
  return data;
}

export async function updateCampaign(id, payload) {
  const { data } = await api.put(`/campaigns/${id}`, payload);
  return data;
}

export async function deleteCampaign(id) {
  const { data } = await api.delete(`/campaigns/${id}`);
  return data;
}

export async function sendCampaign(id) {
  const { data } = await api.post(`/campaigns/${id}/send`);
  return data;
}

export async function sendTestEmail(id, email) {
  const { data } = await api.post(`/campaigns/${id}/test`, { email });
  return data;
}

/* ─── Aliases consumed by pages ────────────────────────── */

export const addSubscriber = createSubscriber;
export const saveCampaign = createCampaign;
export const deleteSubscriber = async (id) => api.delete(`/subscribers/${id}`);
export const getSubscriberStats = getSubscribersStats;

export async function getSubscribersStats() {
  const { data } = await api.get('/subscribers', { pageSize: 1 });
  const all = data.data || [];
  const total = data.total || all.length;
  return {
    total,
    active: all.filter((s) => s.status === 'active').length,
    unsubscribed: all.filter((s) => s.status === 'unsubscribed').length,
    thisMonth: 0,
    growthRate: '0',
  };
}

export async function getGrowthData() {
  return [];
}

export async function getCampaignsCounts() {
  const { data } = await api.get('/campaigns', { pageSize: 1 });
  const all = data.data || [];
  return {
    all: data.total || all.length,
    draft: all.filter((c) => c.status === 'draft').length,
    scheduled: all.filter((c) => c.status === 'scheduled').length,
    sent: all.filter((c) => c.status === 'sent').length,
  };
}

export function getAvailableTags() {
  return ['newsletter', 'updates', 'promotions', 'dev', 'design', 'general'];
}

export function exportSubscribersCsv(subscribers) {
  const headers = ['Name', 'Email', 'Status', 'Tags', 'Subscribed At'];
  const rows = subscribers.map((s) => [
    s.name,
    s.email,
    s.status,
    (s.tags || []).join(';'),
    s.subscribed_at || s.subscribedAt || '',
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c || ''}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
