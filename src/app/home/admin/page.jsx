"use client";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { User, Home, Search, Bell } from "lucide-react";

export default function AdminDashboard() {
  const cards = [
    {
      title: "User Management",
      description: "Manage users, suspend accounts, and view user details.",
      icon: <User size={32} className="text-blue-500" />,
      href: "/home/admin/users",
      color: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500"
    },
    {
      title: "House Management",
      description: "Oversee house listings, suspend inappropriate posts, and delete spam.",
      icon: <Home size={32} className="text-green-500" />,
      href: "/home/admin/houses",
      color: "bg-green-500/10 border-green-500/20 hover:border-green-500"
    },
    {
      title: "Roommate Search Management",
      description: "Monitor roommate search requests and ensure platform safety.",
      icon: <Search size={32} className="text-purple-500" />,
      href: "/home/admin/roommate-searches",
      color: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500"
    },
    {
      title: "Reports & Moderation",
      description: "Review and resolve reports submitted by users.",
      icon: <Bell size={32} className="text-red-500" />,
      href: "/home/admin/reports",
      color: "bg-red-500/10 border-red-500/20 hover:border-red-500"
    },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-neutral-400 mb-8">Welcome back, Admin. Select a section to manage.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {cards.map((card, idx) => (
            <Link key={idx} href={card.href} className={`block p-6 rounded-2xl border transition-all ${card.color}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-900 rounded-xl">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-neutral-300">{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}
