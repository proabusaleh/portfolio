import { create } from 'zustand';
import {
  getNotifications, getUnreadCount, markAsRead, markAllAsRead,
  deleteNotification, clearAll,
} from '../api/notificationsApi';

export const useNotificationsStore = create((set, get) => ({
  list: [],
  unreadCount: 0,
  loading: false,

  fetch: async (opts = {}) => {
    set({ loading: true });
    const [notifData, unreadCount] = await Promise.all([
      getNotifications(opts),
      getUnreadCount(),
    ]);
    const list = Array.isArray(notifData) ? notifData : (notifData.data || []);
    set({ list, unreadCount, loading: false });
  },

  /* Called by real-time subscription */
  addNew: (notification) => {
    set((state) => ({
      list: [notification, ...state.list],
      unreadCount: state.unreadCount + 1,
    }));
  },

  /* Actions */
  markRead: async (id) => {
    await markAsRead(id);
    set((state) => ({
      list: state.list.map((n) => n.id === id ? { ...n, read: true } : n),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  markAllRead: async () => {
    await markAllAsRead();
    set((state) => ({
      list: state.list.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  remove: async (id) => {
    const wasUnread = get().list.find((n) => n.id === id && !n.read);
    await deleteNotification(id);
    set((state) => ({
      list: state.list.filter((n) => n.id !== id),
      unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
    }));
  },

  clearAll: async () => {
    await clearAll();
    set({ list: [], unreadCount: 0 });
  },
}));