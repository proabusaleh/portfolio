import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useThemeStore } from './store/themeStore';
import { useAuthStore } from './store/authStore';
import { useTheme } from './hooks/useTheme';
import { useNotificationsStore } from './store/notificationsStore';
import { useRealtimeNotifications } from './hooks/useNotifications';
import AppRouter from './router/AppRouter';
import CommandPalette from './components/command/CommandPalette';
import InstallBanner from './components/pwa/InstallBanner';
import OfflineIndicator from './components/pwa/OfflineIndicator';
import UpdatePrompt from './components/pwa/UpdatePrompt';

export default function App() {
  const initTheme = useThemeStore((s) => s.initTheme);
  const fetchNotifications = useNotificationsStore((s) => s.fetch);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const refreshUser = useAuthStore((s) => s.refreshUser);
  const { isDark } = useTheme();

  useRealtimeNotifications(isAuthenticated);

  useEffect(() => {
    initTheme();
    if (isAuthenticated) {
      fetchNotifications({ limit: 20 });
      refreshUser();
    }
  }, [initTheme, fetchNotifications, isAuthenticated, refreshUser]);

  return (
    <>
      <OfflineIndicator />
      <AppRouter />
      <CommandPalette />
      <InstallBanner />
      <UpdatePrompt />

      <Toaster
        position="top-right"
        theme={isDark ? 'dark' : 'light'}
        richColors
        closeButton
        toastOptions={{
          style: { borderRadius: '10px', fontSize: '13px' },
        }}
      />
    </>
  );
}
