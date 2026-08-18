import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS, THEMES } from '../lib/constants';

/**
 * Apply theme class to <html> element
 */
const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === THEMES.DARK) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: THEMES.LIGHT,

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const newTheme = 
          get().theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        applyTheme(newTheme);
        set({ theme: newTheme });
      },

      /**
       * Initialize theme on app load (called from App.jsx)
       */
      initTheme: () => {
        const { theme } = get();
        applyTheme(theme);
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: createJSONStorage(() => localStorage),
    }
  )
);