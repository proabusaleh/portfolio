import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS } from '../lib/constants';

export const useLayoutStore = create(
  persist(
    (set) => ({
      // Desktop: collapsed to icons-only
      collapsed: false,
      toggleCollapsed: () =>
        set((s) => ({ collapsed: !s.collapsed })),

      // Mobile: drawer open/close
      mobileOpen: false,
      openMobile: () => set({ mobileOpen: true }),
      closeMobile: () => set({ mobileOpen: false }),
      toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
    }),
    {
      name: STORAGE_KEYS.SIDEBAR,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ collapsed: state.collapsed }), // don't persist mobile state
    }
  )
);