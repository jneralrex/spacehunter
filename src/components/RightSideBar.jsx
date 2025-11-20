"use client";

import useAuthStore from "@/utils/store/useAuthStore";
import { ChevronsUp, House, MailPlus, Megaphone, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RightSideBar() {

  const {user} = useAuthStore();
  return (
      <>
      {/* RIGHT SIDEBAR */}
        <aside className=" hidden sm:flex flex-col border-l border-green-100 px-4 py-4 space-y-6 max-h-screen overflow-auto hide-scrollbar top-0">
          {/* Profile */}
          <div className="bg-white rounded-2xl shadow flex flex-col p-4">
            <div className="flex items-center gap-3 ">
              <Image
                src={user?.profilePics?.url} 
                alt="User"
                width={50}
                height={50}
                className="rounded-full size-[50px] object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-950">Hi, {user?.username}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition">
              <Link href="/home/profile">
              Edit Profile
              </Link>
            </button>
          </div>

          {/* Featured Spaces */}
      <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold mb-4 text-2xl text-gray-950">
        Featured Spaces
      </h3>

      <ul className="grid grid-cols-1 sm:grid-cols-1 lg:rid-cols-3 gap-4 text-sm text-gray-600 max-h-[200px] overflow-auto">
        {[
          { icon: <House className="w-6 h-6" />, label: "Apartment in Ikeja" },
          { icon: <Printer className="w-6 h-6" />, label: "Workspace in Lekki" },
          { icon: <House className="w-6 h-6" />, label: "Shared Flat in Abuja" },
        ].map((item, i) => (
          <li
            key={i}
            className="flex flex-col items-center justify-center text-center border border-green-300 p-4 rounded-xl hover:bg-green-100 hover:shadow-md transition-all duration-300 "
          >
            <div className="mb-2 transform hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <p className="text-sm font-medium">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>

          {/* Ads / Promotions */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-2 flex gap-2 text-2xl text-gray-950 items-center "><Megaphone/> Sponsored</h3>
            <p className="text-sm text-gray-600">
              Promote your space and reach thousands of renters daily.
            </p>
            <button className="mt-3 bg-black text-white w-full py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition">
              Advertise Now
            </button>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2 text-green-700">Messages</h3>
            {/* <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <span className="font-semibold">Jane:</span> Hi, is this still available?
              </li>
              <li>
                <span className="font-semibold">Landlord:</span> Sure, when do you want a viewing?
              </li>
            </ul> */}
            <button
              onClick={() => router.push("/messages")}
              className="mt-3 w-full bg-black text-white py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition flex items-end justify-center space-x-3"
            >
              <ChevronsUp size={40} />
              <MailPlus size={30} />
            </button>
          </div>
        </aside>
        </>
  );
}
