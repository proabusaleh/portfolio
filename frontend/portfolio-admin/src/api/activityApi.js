import api from './axios';

export async function getActivityLog(params = {}) {
  const { data } = await api.get('/activity', { params });
  return data.data || data;
}

export async function getActivityStats() {
  const { data } = await api.get('/activity/stats');
  return data;
}

export async function getActivityHeatmap() {
  const { data } = await api.get('/activity/heatmap');
  return data;
}

export async function getActivityBreakdown() {
  const { data } = await api.get('/activity/breakdown');
  return data;
}

/* ─── Aliases consumed by pages ────────────────────────── */

export async function getLeaderboard() {
  const stats = await getActivityStats();
  return (stats.byUser || []).map((item) => ({
    userId: item.user_id,
    name: item.user?.name || 'Unknown',
    count: item.count,
  }));
}

export async function exportActivityLog(format = 'csv') {
  const { data } = await api.get('/activity', { pageSize: 1000 });
  const rows = data.data || [];
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'activity-log.json'; a.click();
    URL.revokeObjectURL(url);
  } else {
    const headers = ['Action', 'Module', 'Target', 'IP', 'Date'];
    const csv = [headers.join(','), ...rows.map((r) =>
      headers.map((h) => {
        const key = h.toLowerCase();
        return `"${(r[key] || r[key.replace(' ', '_')] || '').toString().replace(/"/g, '""')}"`;
      }).join(',')
    )].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'activity-log.csv'; a.click();
    URL.revokeObjectURL(url);
  }
  return { success: true };
}
