import { sleep } from '../lib/utils';
import {
  VISITORS_BY_DAY, DEVICE_BREAKDOWN, BROWSER_STATS, TOP_PAGES,
  TOP_REFERRERS, GEO_DATA, REALTIME_STATS, SUMMARY_STATS,
} from '../data/analyticsData';

let realtime = { ...REALTIME_STATS };

export async function getAnalytics(range = '7d') {
  await sleep(400);
  return {
    chart: VISITORS_BY_DAY[range] || VISITORS_BY_DAY['7d'],
    devices: DEVICE_BREAKDOWN,
    browsers: BROWSER_STATS,
    topPages: TOP_PAGES,
    referrers: TOP_REFERRERS,
    geo: GEO_DATA,
    summary: SUMMARY_STATS[range] || SUMMARY_STATS['7d'],
  };
}

export async function getRealtime() {
  await sleep(100);
  realtime.activeVisitors += Math.floor(Math.random() * 5) - 2;
  realtime.activeVisitors = Math.max(5, realtime.activeVisitors);
  return { ...realtime };
}

export async function getRealTimeData() {
  await sleep(100);
  realtime.activeVisitors += Math.floor(Math.random() * 5) - 2;
  realtime.activeVisitors = Math.max(5, realtime.activeVisitors);
  return { activeUsers: realtime.activeVisitors, history: [] };
}

export async function exportAnalytics(range, format = 'csv') {
  await sleep(600);
  const data = SUMMARY_STATS[range] || SUMMARY_STATS['7d'];
  return { success: true, format, data };
}

export function exportToCSV(analytics) {
  if (!analytics) return;
  const rows = [
    ['Metric', 'Value'],
    ['Visitors', analytics.summary?.visitors ?? 0],
    ['Sessions', analytics.summary?.sessions ?? 0],
    ['Pageviews', analytics.summary?.pageviews ?? 0],
    ['Bounce Rate', `${analytics.summary?.bounceRate ?? 0}%`],
    ['Avg Session', analytics.summary?.avgSession ?? '0:00'],
  ];
  const csv = rows.map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
