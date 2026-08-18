import { sleep } from '../lib/utils';
import { DEFAULT_RESUME } from '../data/resumeData';

let db = JSON.parse(JSON.stringify(DEFAULT_RESUME));

export async function getResume() {
  await sleep(300);
  return JSON.parse(JSON.stringify(db));
}

export async function saveResume(data) {
  await sleep(500);
  db = JSON.parse(JSON.stringify(data));
  return { success: true, updatedAt: new Date().toISOString() };
}

export async function resetResume() {
  await sleep(300);
  db = JSON.parse(JSON.stringify(DEFAULT_RESUME));
  return JSON.parse(JSON.stringify(db));
}

export async function exportResumePDF() {
  await sleep(600);
  return { success: true, message: 'PDF export simulated — in production this generates a real PDF' };
}
