"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, User, Settings, LogOut } from "lucide-react";

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 h-screen p-5 border-r fixed transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 sm:w-[20%]`}
      >
        <h2 className="text-xl font-bold text-green-600 mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/manage/dashboard" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200">
            <Home className="size-5" /> <span>Home</span>
          </Link>
          <Link href="/manage/profile" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200">
            <User className="size-5" /> <span>Profile</span>
          </Link>
          <Link href="/manage/house" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200">
            <Home className="size-5" />  <Settings className="size-5" /><span>House management</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200">
            <Settings className="size-5" /> <span>Settings</span>
          </Link>
          <button className="flex items-center space-x-3 p-2 rounded-md text-red-600 hover:bg-gray-200">
            <LogOut className="size-5" /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="md:hidden bg-white shadow-md p-4 flex justify-end items-center">
          <button
            className="md:hidden p-2 rounded-md bg-gray-200"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="size-5" />
          </button>
          {/* <h1 className="text-xl font-semibold">Dashboard</h1> */}
        </header>

        {/* Content Area */}
        <main className="p-6 md:w-[80%]  md:ml-auto">   
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Welcome to your Dashboard</h2>
            <p className="text-gray-600">Manage your properties, messages, and account settings here.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
