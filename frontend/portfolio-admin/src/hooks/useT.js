import { useTranslation } from 'react-i18next';

/**
 * Shortcut hook — returns the `t` function bound to the 'translation' namespace.
 *
 * Usage:
 *   const t = useT();
 *   <h1>{t('dashboard.welcome')}</h1>
 */
export function useT() {
  const { t } = useTranslation();
  return t;
}
