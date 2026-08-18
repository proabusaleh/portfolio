import api from './axios';

export async function getPages(params = {}) {
  const { data } = await api.get('/pages', { params });
  return data.data || data;
}

export async function getPage(id) {
  const { data } = await api.get(`/pages/${id}`);
  return data;
}

export async function createPage(payload) {
  const { data } = await api.post('/pages', payload);
  return data;
}

export async function updatePage(id, payload) {
  const { data } = await api.put(`/pages/${id}`, payload);
  return data;
}

export async function deletePage(id) {
  await api.delete(`/pages/${id}`);
}
