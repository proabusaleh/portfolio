import api from './axios';

export async function getMenus(params = {}) {
  const { data } = await api.get('/menus', { params });
  return data.data || data;
}

export async function createMenu(payload) {
  const { data } = await api.post('/menus', payload);
  return data;
}

export async function updateMenu(id, payload) {
  const { data } = await api.put(`/menus/${id}`, payload);
  return data;
}

export async function deleteMenu(id) {
  await api.delete(`/menus/${id}`);
}

export async function reorderMenus(ids) {
  await api.post('/menus/reorder', { ids });
}
