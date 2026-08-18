import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import bn from './locales/bn.json';

const resources = {
  en: { translation: en },
  bn: { translation: bn },
};

export const AVAILABLE_LANGUAGES = [
  { code: 'en', label: 'English',  flag: '\u{1F1EC}\u{1F1E7}', nativeName: 'English' },
  { code: 'bn', label: 'Bengali',  flag: '\u{1F1E7}\u{1F1E9}', nativeName: '\u09AC\u09BE\u0982\u09B2\u09BE'   },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'bn'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'portfolio-language',
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
