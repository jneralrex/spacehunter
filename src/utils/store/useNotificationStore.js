// import { create } from "zustand";

import api from "../axios/axiosInstance";
import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  grouped: {},
  unreadCount: 0,
  loading: false,

  // Fetch all notifications
  fetchNotifications: async () => {
    set({ loading: true });
    const res = await api.get("/notifications");

    console.log("notification",res)

    const notifications = res.data.notifications;

    // Group by date
    const grouped = {};
    notifications.forEach((n) => {
      const date = new Date(n.createdAt).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(n);
    });

    set({
      loading: false,
      notifications,
      grouped,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    });
  },

  // Mark a single notification as read
  markNotificationAsRead: async (id) => {
    const data = await api.patch(`/notifications/${id}/read`);

    console.log("single", data)

    const { notifications } = get();
    const updated = notifications.map((n) =>
      n._id === id ? { ...n, read: true } : n
    );

    const unread = updated.filter((n) => !n.isRead).length;

    // Re-group after update
    const grouped = {};
    updated.forEach((n) => {
      const date = new Date(n.createdAt).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(n);
    });

    set({
      notifications: updated,
      grouped,
      unreadCount: unread,
    });
  },

  // Mark ALL notifications as read
  markAllAsRead: async () => {
    await api.patch("/notifications/read-all");

    const { notifications } = get();
    const updated = notifications.map((n) => ({ ...n, isRead: true }));

    const grouped = {};
    updated.forEach((n) => {
      const date = new Date(n.createdAt).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(n);
    });

    set({
      notifications: updated,
      grouped,
      unreadCount: 0,
    });
  },

  // Clear unread count when page opens
  clearUnreadOnOpen: () => set({ unreadCount: 0 }),
}));

export default useNotificationStore;
