import api from './axios';

export async function getServices(params = {}) {
  const { data } = await api.get('/services', { params });
  return data;
}

export async function getService(id) {
  const { data } = await api.get(`/services/${id}`);
  return data;
}

export async function createService(payload) {
  const { data } = await api.post('/services', payload);
  return data;
}

export async function updateService(id, payload) {
  const { data } = await api.put(`/services/${id}`, payload);
  return data;
}

export async function deleteService(id) {
  const { data } = await api.delete(`/services/${id}`);
  return data;
}

export async function reorderServices(ids) {
  const { data } = await api.post('/services/reorder', { ids });
  return data;
}
