"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ExplorePage() {
  const tabs = [
    "For You",
    "Trending Rentals",
    "Near You",
    "Popular Areas",
    "Affordable Picks",
    "Housemates",
    "Shortlets",
    "Luxury Homes",
  ];

  const trends = [
    {
      category: "Trending in Lagos",
      title: "Furnished 2-bedroom Apartments",
      stats: "12.4K searches this week",
    },
    {
      category: "Trending in Abuja",
      title: "Garki Affordable Rentals",
      stats: "6.1K people checking today",
    },
    {
      category: "High Interest",
      title: "30+ people showed interest today",
      stats: "",
    },
  ];

  const [activeTab, setActiveTab] = useState("For You");

  return (
 <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto">
      {/* SEARCH BAR */}
      <div className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 bg-neutral-800/70 border border-white/10 px-3 py-2 rounded-full">
          <Search size={18} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search areas, prices, house types..."
            className="bg-transparent w-full outline-none text-sm"
          />
          <SlidersHorizontal size={18} className="text-neutral-400" />
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 overflow-x-auto px-4 py-3 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm whitespace-nowrap ${
              activeTab === tab
                ? "text-green-600 font-medium border-b-2 border-green-600"
                : "text-neutral-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SPOTLIGHT BANNER */}
      <div className="mt-4 px-4">
        <div className="relative h-44 w-full rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
            alt="Featured"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
            <p className="text-xs text-neutral-300">🔥 Hot This Week: Lekki Phase 1</p>
            <p className="text-lg font-semibold">120+ new apartments added</p>
          </div>
        </div>
      </div>

      {/* TRENDING RENTALS FEED */}
      <div className="mt-6">
        {trends.map((item, i) => (
          <div key={i} className="px-4 py-4 border-b border-white/10">
            <p className="text-xs text-neutral-400">{item.category}</p>
            <p className="mt-1 font-medium text-base">{item.title}</p>
            {item.stats && (
              <p className="text-xs text-neutral-500 mt-1">{item.stats}</p>
            )}
          </div>
        ))}
      </div>

      {/* INLINE RECOMMENDED BLOCK */}
      <div className="px-4 py-5 border-b border-white/10">
        <p className="font-semibold mb-3">Most Viewed Today</p>
        <div className="flex gap-3 overflow-x-auto">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="min-w-[140px] h-28 rounded-xl overflow-hidden bg-neutral-800/60 border border-white/10"
            >
              <img
                src="https://images.unsplash.com/photo-1560448075-bb485b067938"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

      {/* HOUSEMATE SUGGESTIONS */}
      <div className="px-4 py-6 border-b border-white/10">
        <p className="font-semibold mb-4">Housemates For You</p>
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((id) => (
            <div key={id} className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div className="">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-neutral-500">
                  Also looking in Lekki Phase 1
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROPERTY SPOTLIGHT */}
      <div className="px-4 py-6">
        <p className="font-semibold mb-3">Suggested For You</p>
        <div className="relative h-48 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <p className="text-neutral-300 text-xs">🔥 18 people interested</p>
            <p className="font-semibold">₦1,200,000 / year • Ikoyi</p>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}
