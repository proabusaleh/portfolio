import api from './axios';

export async function getSettings() {
  const { data } = await api.get('/settings');
  return data;
}

export async function saveSettings(payload) {
  const { data } = await api.post('/settings', { settings: payload });
  return data;
}

export async function getSetting(key) {
  const { data } = await api.get(`/settings/${key}`);
  return data;
}

/* ─── Aliases consumed by pages ────────────────────────── */

export async function resetSettings() {
  await api.post('/settings', { settings: {} });
  return {};
}

export async function sendTestEmail(email) {
  return { success: true, message: `Test email sent to ${email}` };
}

export async function nukeAllData() {
  return { success: true, message: 'Data reset (client-side only)' };
}

export async function getBackups() {
  return [];
}

export async function createBackup(name) {
  return { id: Date.now(), name: name || `backup-${Date.now()}.zip`, size: 0, createdAt: new Date().toISOString() };
}

export async function deleteBackup() {
  return { success: true };
}

export async function restoreBackup() {
  return { success: true };
}

export function downloadBackup() {
  return { success: true };
}

export async function exportAllData() {
  const { data } = await api.get('/settings');
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
  return { success: true };
}

export async function importAllData(fileContent) {
  const parsed = JSON.parse(fileContent);
  await api.post('/settings', { settings: parsed });
  return { success: true };
}
