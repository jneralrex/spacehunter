"use client";

import { Bell, Heart, MessageCircle, Home } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      type: "interest",
      icon: <Heart size={18} />,
      title: "Someone showed interest in your listing",
      desc: "A user is interested in your 2-bedroom apartment in Lekki.",
      time: "2h",
    },
    {
      type: "message",
      icon: <MessageCircle size={18} />,
      title: "New message received",
      desc: "A potential tenant sent you a message.",
      time: "4h",
    },
    {
      type: "listing",
      icon: <Home size={18} />,
      title: "Listing approved",
      desc: "Your new property in Gwarinpa is now live.",
      time: "1d",
    },
    {
      type: "interest",
      icon: <Heart size={18} />,
      title: "4 people viewed your listing",
      desc: "Your apartment is gaining attention. Consider boosting it.",
      time: "1d",
    },
  ];

  return (
 <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto">
      
      {/* HEADER */}
      <div className="sticky top-0 z-50 px-4 py-4 lg:py-[26px] bg-neutral-900 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>

      {/* LIST */}
      <div className="mt-3">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="px-4 py-4 flex gap-3 border-b border-white/10 hover:bg-neutral-800/40 transition"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-teal-400">
              {n.icon}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-neutral-400 mt-1">{n.desc}</p>
              <p className="text-xs text-neutral-500 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE (if no notifications) */}
      {/* Uncomment if needed */}
      {/* 
      <div className="flex flex-col items-center justify-center h-[70vh] text-neutral-500">
        <Bell size={40} className="mb-3 text-neutral-600" />
        <p>No notifications yet.</p>
      </div>
      */}

    </div>
  );
}
