import api from './axios';

export async function getProjects(params = {}) {
  const { data } = await api.get('/projects', { params });
  return data;
}

export async function getProject(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data;
}

export async function createProject(payload) {
  const { data } = await api.post('/projects', payload);
  return data;
}

export async function updateProject(id, payload) {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data;
}

export async function deleteProjects(ids) {
  const { data } = await api.delete('/projects', { data: { ids } });
  return data;
}

export async function updateProjects(ids, updates) {
  const { data } = await api.post('/projects/bulk', { ids, updates });
  return data;
}

export async function duplicateProject(id) {
  const { data } = await api.post(`/projects/${id}/duplicate`);
  return data;
}
