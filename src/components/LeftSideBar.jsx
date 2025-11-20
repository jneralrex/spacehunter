"use client";
import { useRouter } from "next/navigation";
import { Home, Bell, Search, User, MoreHorizontal } from "lucide-react";
import RequestHouseMate from "./RequestHouseMate";
import Link from "next/link";
import { use } from "react";
import useAuthStore from "@/utils/store/useAuthStore";

export default function LeftSidebar() {
  const router = useRouter();
  const { user } = useAuthStore();

  const navItems = [
    { label: "Home", icon: <Home size={22} />, href: "/home" },
    { label: "Explore", icon: <Search size={22} />, href: "/home/explore" },
    { label: "Notifications", icon: <Bell size={22} />, href: "/home/notifications" },
    { label: "Requests", icon: <User size={22} />, href: "/home/requests" },
    { label: "More", icon: <MoreHorizontal size={22} />, href: "/home/more" },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col items-center border-r border-green-100 py-4 fixed min-h-screen">
        <nav className="space-y-6 pt-4">
          <Link href="/" className="flex z-40 font-semibold text-2xl text-white">
            space <span className="text-green-600">hunters</span>
          </Link>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => router.push(item.href)}
              className="flex items-center gap-3 text-white hover:text-green-600 font-medium transition"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {user?.role === 'user' ? (
          <div className="w-full">
            <RequestHouseMate />
          </div>
        ) :
          <div className=" w-full">
            <div className="mt-8 bg-green-600 text-white py-3 rounded-full font-semibold text-center cursor-pointer transition max-w-[200px]">
              Upload Property
            </div>
          </div>
        }


      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 flex justify-around items-center py-2 px-4 shadow-lg lg:hidden z-50">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => router.push(item.href)}
            className="flex flex-col items-center text-gray-700 hover:text-green-700 text-sm"
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}


