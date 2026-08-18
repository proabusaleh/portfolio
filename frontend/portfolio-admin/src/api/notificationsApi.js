import api from './axios';

export async function getNotifications(params = {}) {
  const { data } = await api.get('/notifications', { params });
  return data;
}

export async function getUnreadCount() {
  const { data } = await api.get('/notifications/unread-count');
  return data.count;
}

export async function markAsRead(id) {
  const { data } = await api.post(`/notifications/${id}/read`);
  return data;
}

export async function markAllAsRead() {
  const { data } = await api.post('/notifications/read-all');
  return data;
}

export async function deleteNotification(id) {
  const { data } = await api.delete(`/notifications/${id}`);
  return data;
}

export async function clearAll() {
  const { data } = await api.delete('/notifications');
  return data;
}

/* ─── Aliases consumed by pages & hooks ────────────────── */

export async function getTypeCounts() {
  const { data } = await api.get('/notifications', { pageSize: 1000 });
  const list = data.data || [];
  const counts = { all: data.total || list.length, unread: list.filter((n) => !n.read).length };
  list.forEach((n) => { counts[n.type] = (counts[n.type] || 0) + 1; });
  return counts;
}

export async function getPreferences() {
  return { email: true, push: true, sms: false };
}

export async function savePreferences(prefs) {
  return prefs;
}

/* ─── Real-time simulation (kept as client-side) ────────── */

let subscribers = [];

export function subscribeToNotifications(callback) {
  subscribers.push(callback);
  return () => { subscribers = subscribers.filter((s) => s !== callback); };
}

let intervalId = null;
export function startRealtimeSimulation(intervalMs = 25000) {
  if (intervalId) return;
  intervalId = setInterval(() => {}, intervalMs);
}

export function stopRealtimeSimulation() {
  if (intervalId) { clearInterval(intervalId); intervalId = null; }
}
