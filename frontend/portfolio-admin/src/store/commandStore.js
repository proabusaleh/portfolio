import { create } from 'zustand';

export const useCommandStore = create((set, get) => ({
  isOpen: false,
  query: '',
  selectedIndex: 0,
  recent: JSON.parse(localStorage.getItem('cmd-recent') || '[]'),
  pinned: JSON.parse(localStorage.getItem('cmd-pinned') || '[]'),

  openPalette:    () => set({ isOpen: true, query: '', selectedIndex: 0 }),
  closePalette:   () => set({ isOpen: false, query: '', selectedIndex: 0 }),
  togglePalette:  () => set((s) => ({ isOpen: !s.isOpen, query: '', selectedIndex: 0 })),
  setQuery:       (q) => set({ query: q, selectedIndex: 0 }),
  setSelectedIndex: (i) => set({ selectedIndex: i }),
  incrementIndex: (max) => set((s) => ({ selectedIndex: Math.min(s.selectedIndex + 1, max - 1) })),
  decrementIndex: () => set((s) => ({ selectedIndex: Math.max(s.selectedIndex - 1, 0) })),

  addRecent: (cmd) => {
    const list = get().recent.filter((r) => r.id !== cmd.id);
    const updated = [cmd, ...list].slice(0, 8);
    localStorage.setItem('cmd-recent', JSON.stringify(updated));
    set({ recent: updated });
  },

  togglePin: (cmd) => {
    const list = get().pinned;
    const exists = list.find((p) => p.id === cmd.id);
    const updated = exists ? list.filter((p) => p.id !== cmd.id) : [...list, cmd];
    localStorage.setItem('cmd-pinned', JSON.stringify(updated));
    set({ pinned: updated });
  },
}));
