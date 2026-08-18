import api from './axios';

export async function getSkills(params = {}) {
  const { data } = await api.get('/skills', { params });
  return data;
}

export async function getSkill(id) {
  const { data } = await api.get(`/skills/${id}`);
  return data;
}

export async function createSkill(payload) {
  const { data } = await api.post('/skills', payload);
  return data;
}

export async function updateSkill(id, payload) {
  const { data } = await api.put(`/skills/${id}`, payload);
  return data;
}

export async function deleteSkill(id) {
  const { data } = await api.delete(`/skills/${id}`);
  return data;
}

export async function reorderSkills(ids) {
  const { data } = await api.post('/skills/reorder', { ids });
  return data;
}

/* ─── Aliases & constants consumed by pages ────────────── */

export const SKILL_CATEGORIES = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

export async function getSkillsGrouped(category = '') {
  const all = await getSkills();
  const list = Array.isArray(all) ? all : all.data || [];
  const grouped = {};
  for (const cat of SKILL_CATEGORIES) {
    grouped[cat.value] = list
      .filter((s) => s.category === cat.value)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return grouped;
}
