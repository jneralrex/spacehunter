import { useEffect } from "react";
import useNotificationStore from "@/utils/store/useNotificationStore";
import useAuthStore from "@/utils/store/useAuthStore";

export default function NotificationLoader() {
  const { user } = useAuthStore();
  const fetchNotifications = useNotificationStore(state => state.fetchNotifications);

  useEffect(() => {
    if (user) {
      fetchNotifications(); 
    }
  }, [user, fetchNotifications]);

  return null; 
}
