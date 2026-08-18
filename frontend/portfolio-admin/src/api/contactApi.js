import { sleep } from '../lib/utils';
import { DEFAULT_CONTACT } from '../data/contactData';

const STORAGE_KEY = 'portfolio-contact';

let db = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || { ...DEFAULT_CONTACT };

const persist = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(db));

export async function getContact() {
  await sleep(300);
  return { ...db };
}

export async function saveContact(data) {
  await sleep(500);
  db = { ...db, ...data };
  persist();
  return db;
}

export const updateContact = saveContact;

export async function resetContact() {
  await sleep(300);
  db = { ...DEFAULT_CONTACT };
  persist();
  return db;
}

/**
 * Attempt to geocode address using OpenStreetMap Nominatim (free, no key needed)
 * Returns { lat, lon } or null
 */
export async function geocodeAddress(query) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      { headers: { 'User-Agent': 'PortfolioAdmin/1.0' } }
    );
    const data = await res.json();
    if (data?.[0]) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
  } catch (err) {
    console.warn('Geocode failed:', err);
  }
  return null;
}