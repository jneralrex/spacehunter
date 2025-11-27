"use client";

import { Bell } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useNotificationStore from "@/utils/store/useNotificationStore";

export default function NotificationsPage() {
  const {
    grouped,
    fetchNotifications,
    markNotificationAsRead,
    markAllAsRead,
    clearUnreadOnOpen,
  } = useNotificationStore();

  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
    clearUnreadOnOpen();
  }, []);

  const isEmpty = !grouped || Object.keys(grouped).length === 0;

  const handleNotificationClick = async (n) => {
    try {
      await markNotificationAsRead(n._id); 
      if (n.link) router.push(n.link); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto">
      {/* HEADER */}
      <div className="sticky top-0 z-50 px-4 py-4 bg-neutral-900 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>

        <button
          onClick={markAllAsRead}
          className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition"
        >
          Mark all as read
        </button>
      </div>

      {/* EMPTY STATE */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-neutral-500">
          <Bell size={40} className="mb-3 text-neutral-600" />
          <p>You have no notifications.</p>
        </div>
      )}

      {/* GROUPED NOTIFICATIONS */}
      <div className="mt-3">
        {Object.keys(grouped).map((dateKey) => (
          <div key={dateKey} className="mb-6">
            <p className="text-neutral-400 text-sm px-4 mb-2">{dateKey}</p>

            {grouped[dateKey].map((n) => (
              <button
                key={n._id}
                onClick={() => handleNotificationClick(n)}
                className={`w-full text-left px-4 py-4 flex gap-3 border-b border-white/10 transition cursor-pointer ${
                  !n.isRead ? "bg-green-800/40" : ""
                }`}
              >
                {/* PROFILE PIC */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-green-800 flex-shrink-0">
                  {n.sender?.profilePics?.url ? (
                    <Image
                      src={n.sender.profilePics.url}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      alt={n.sender.username}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Bell size={18} />
                    </div>
                  )}
                </div>

                {/* TEXT CONTENT */}
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {n.sender?.username || "Someone"}
                  </p>

                  <p className="text-xs text-neutral-300 mt-1">
                    {n.message}
                  </p>

                  <p className="text-[10px] text-neutral-500 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
