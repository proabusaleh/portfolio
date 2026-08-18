import api from './axios';

export async function getMessages(params = {}) {
  const apiParams = { search: params.search, pageSize: params.pageSize };
  if (params.filter === 'unread') apiParams.unread = 'true';
  else if (params.filter === 'starred') apiParams.starred = 'true';
  else if (params.filter === 'replied') apiParams.replied = 'true';

  const { data } = await api.get('/messages', { params: apiParams });
  return {
    data: data.data,
    meta: {
      total: data.total,
      unread: data.unread ?? 0,
      starred: data.starred ?? 0,
      replied: data.replied ?? 0,
    },
  };
}

export async function getMessage(id) {
  const { data } = await api.get(`/messages/${id}`);
  return data;
}

export async function createMessage(payload) {
  const { data } = await api.post('/messages', payload);
  return data;
}

export async function updateMessage(id, payload) {
  const { data } = await api.put(`/messages/${id}`, payload);
  return data;
}

export async function deleteMessage(id) {
  const { data } = await api.delete(`/messages/${id}`);
  return data;
}

export async function toggleStar(id) {
  const { data } = await api.post(`/messages/${id}/star`);
  return data;
}

export async function moveMessage(id, folder) {
  const { data } = await api.post(`/messages/${id}/move`, { folder });
  return data;
}

export async function markAsRead(id) {
  const { data } = await api.post(`/messages/${id}/mark-read`);
  return data;
}

export async function sendReply(id, payload) {
  const { data } = await api.post(`/messages/${id}/reply`, payload);
  return data;
}

/* ─── Aliases consumed by pages ────────────────────────── */

export async function markMultipleAsRead(ids) {
  await Promise.all(ids.map((id) => api.post(`/messages/${id}/mark-read`)));
  return true;
}

export async function deleteMessages(ids) {
  await Promise.all(ids.map((id) => api.delete(`/messages/${id}`)));
  return ids.length;
}

export async function exportMessages(ids = null) {
  const params = ids ? { ids } : {};
  const { data } = await api.get('/messages', { params });
  const rows = data.data || data;
  const header = 'Name,Email,Subject,Date,Read,Starred\n';
  const csv = header + rows.map((m) =>
    `"${m.name}","${m.email}","${m.subject}","${m.created_at || ''}",${m.unread ? false : true},${m.starred}`
  ).join('\n');
  return csv;
}

export async function getCounts() {
  const { data } = await api.get('/messages', { pageSize: 1 });
  return {
    total: data.total || 0,
    unread: data.unread || 0,
  };
}
