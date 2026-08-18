import { create } from 'zustand';
import i18n from '../i18n';

export const useI18nStore = create((set) => ({
  currentLang: i18n.language || 'en',

  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
    document.documentElement.setAttribute('lang', lang);
    set({ currentLang: lang });
  },
}));
