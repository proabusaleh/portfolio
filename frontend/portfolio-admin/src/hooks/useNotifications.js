import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNotificationsStore } from '../store/notificationsStore';
import {
  subscribeToNotifications, startRealtimeSimulation,
  stopRealtimeSimulation, getPreferences,
} from '../api/notificationsApi';
import { NOTIFICATION_TYPES } from '../data/notificationsData';

/**
 * Initialize real-time notifications, toast pop-ups & browser notifs.
 * Call once in App.jsx.
 */
export function useRealtimeNotifications(isAuthenticated = false) {
  const addNew = useNotificationsStore((s) => s.addNew);
  const [browserPerm, setBrowserPerm] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    let prefs = {};
    getPreferences().then((p) => { prefs = p; });

    // Subscribe to new notifications
    const unsub = subscribeToNotifications((notification) => {
      // Add to store
      addNew(notification);

      const typePref = prefs[notification.type] || { inApp: true, browser: false };

      // In-app toast
      if (typePref.inApp) {
        const typeCfg = NOTIFICATION_TYPES.find((t) => t.value === notification.type);
        toast(notification.title, {
          description: notification.description,
          duration: 5000,
          icon: '🔔',
          className: typeCfg?.text,
        });
      }

      // Browser notification
      if (typePref.browser && Notification.permission === 'granted') {
        try {
          new Notification(notification.title, {
            body: notification.description,
            icon: '/favicon.ico',
            tag: `notif-${notification.id}`,
          });
        } catch (e) { /* silent */ }
      }
    });

    // Start real-time simulation (new notif every 25 seconds)
    startRealtimeSimulation(25000);

    return () => {
      unsub();
      stopRealtimeSimulation();
    };
  }, [addNew]);

  const requestBrowserPermission = async () => {
    if (!('Notification' in window)) return 'unsupported';
    const perm = await Notification.requestPermission();
    setBrowserPerm(perm);
    return perm;
  };

  return { browserPerm, requestBrowserPermission };
}