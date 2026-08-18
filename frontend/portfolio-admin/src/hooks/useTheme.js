import { useThemeStore } from '../store/themeStore';
import { THEMES } from '../lib/constants';

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  return {
    theme,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    setTheme,
    toggleTheme,
  };
}