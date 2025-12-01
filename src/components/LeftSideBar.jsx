"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Bell,
  Search,
  User,
  MoreHorizontal,
  X,
  Settings,
  MessageSquare,
  Bookmark,
  DollarSign,
  House,
} from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/utils/store/useAuthStore";
import useNotificationStore from "@/utils/store/useNotificationStore";

export default function LeftSidebar() {
  const router = useRouter();
  const { user } = useAuthStore();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const navItems = [
    { label: "Home", icon: <Home size={22} />, href: "/home" },
    { label: "Explore", icon: <Search size={22} />, href: "/home/explore" },
    { label: "Notifications", icon: <Bell size={22} />, href: "/home/notifications" },
    { label: "Requests", icon: <User size={22} />, href: "/home/requests" },
    { label: "More", icon: <MoreHorizontal size={22} />, action: openDrawer },
  ];

  const drawerItems = [
    { label: "Manage Listings", icon: <House size={18} />, href: "/home/listing-management" },
    user?.role === "user" ? { label: "Manage Search", icon: <House size={18} />, href: "/home/housemate-search-management" } : { label: "Ads", icon: <DollarSign size={18} />, href: "/home/ads" },
    { label: "Bookmarks", icon: <Bookmark size={18} />, href: "/home/bookmarks" },
    { label: "Settings / Privacy", icon: <Settings size={18} />, href: "/home/settings" },
  ];

  const handleDrawerItemClick = (href) => {
    router.push(href);
    closeDrawer();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col items-center border-r border-green-100 py-4 fixed min-h-screen px-3">
        <nav className="space-y-6 pt-4">
          <Link href="/" className="flex z-40 font-semibold text-2xl text-white">
            spacee <span className="text-green-600">hunters</span>
          </Link>

          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.href ? () => router.push(item.href) : item.action}
              className="relative flex items-center gap-3 text-white hover:text-green-600 font-medium transition"
            >
              {item.icon}

              {/* Notification badge (Desktop) */}
              {item.label === "Notifications" && unreadCount > 0 && (
                <span className="absolute -top-1 left-2 bg-red-600 text-white text-[10px] px-2 py-[1px] rounded-full">
                  {unreadCount}
                </span>
              )}

              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA depending on user role */}
        {user?.role === "user" ? (
          <div className="w-full mt-8">
            <button
              onClick={() => router.push("/home/housemate-search-management")}
              className="w-full bg-green-600 text-white p-3 rounded-full font-semibold text-center cursor-pointer transition max-w-[200px]"
            >
              Manage Search
            </button>
          </div>
        ) : (
          <div className="w-full mt-8">
            <button
              onClick={() => router.push("/home/listing-management")}
              className="w-full bg-green-600 text-white p-3 rounded-full font-semibold text-center cursor-pointer transition max-w-[200px]"
            >
              Manage Listings
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 flex justify-around items-center py-2 px-4 shadow-lg lg:hidden z-50">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={item.href ? () => router.push(item.href) : item.action}
            className="relative flex flex-col items-center text-gray-700 hover:text-green-700 text-sm"
          >
            {item.icon}

            {/* Notification badge (Mobile) */}
            {item.label === "Notifications" && unreadCount > 0 && (
              <span className="absolute -top-1 left-6 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                {unreadCount}
              </span>
            )}

            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-[300px] bg-[#000000]/95 shadow-2xl z-[9999] transform transition-all duration-300 ${
          drawerOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-[22px] border-b text-white border-white/10">
          <h2 className="text-lg font-semibold">More Options</h2>
          <button
            onClick={closeDrawer}
            className="p-2 hover:bg-neutral-800 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto h-[calc(100%-64px)]">
          {drawerItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleDrawerItemClick(item.href)}
              className="flex items-center gap-3 w-full px-4 py-2 bg-white rounded-lg transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        ></div>
      )}
    </>
  );
}
