import api from './axios';

export async function getMedia(params = {}) {
  const { data } = await api.get('/media', { params });
  return data;
}

export async function uploadFile(file, folder = 'root', onProgress) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const { data } = await api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    },
  });
  return data;
}

export async function deleteMedia(ids) {
  const { data } = await api.delete('/media', { data: { ids } });
  return data;
}

export async function moveMedia(ids, targetFolder) {
  const { data } = await api.post('/media/move', { ids, folder: targetFolder });
  return data;
}

export async function getFolders() {
  const { data } = await api.get('/media/folders');
  return data;
}

export async function getFolderCounts() {
  const { data } = await api.get('/media/folder-counts');
  return data;
}

export async function getStorage() {
  const { data } = await api.get('/media/storage');
  return data;
}

export async function createFolder(name) {
  const { data } = await api.post('/media/folders', { name });
  return data;
}

export async function deleteFolder(id) {
  const { data } = await api.delete(`/media/folders/${id}`);
  return data;
}

/* ─── Aliases consumed by pages ────────────────────────── */

export async function deleteFile(id) {
  return deleteMedia([id]);
}

export async function deleteFiles(ids) {
  return deleteMedia(ids);
}

export async function updateFile(id, payload) {
  const { data } = await api.put(`/media/${id}`, payload);
  return data;
}

export async function getStorageInfo() {
  const storage = await getStorage();
  return { used: storage.used, total: storage.total, count: (await getMedia()).length };
}

export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
