import api from './axios';

export async function getUsers(params = {}) {
  const { data } = await api.get('/users', { params });
  return data.data || data;
}

export async function getUser(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export async function createUser(payload) {
  const { data } = await api.post('/users', payload);
  return data;
}

export async function updateUser(id, payload) {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}

export async function updateUserStatus(id, status) {
  const { data } = await api.post(`/users/${id}/status`, { status });
  return data;
}

/* ─── Aliases consumed by pages ────────────────────────── */

export async function getUsersStats() {
  const { data } = await api.get('/users', { pageSize: 1 });
  const all = data.data || [];
  return {
    total: data.total || all.length,
    active: all.filter((u) => u.status === 'active').length,
    pending: all.filter((u) => u.status === 'pending').length,
    suspended: all.filter((u) => u.status === 'suspended').length,
  };
}

export async function inviteUser(payload) {
  return createUser({ ...payload, password: 'changeme123' });
}

export async function getActivity(userId) {
  const { data } = await api.get('/activity', { user_id: userId });
  return data.data || data;
}
