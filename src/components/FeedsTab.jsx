"use client";

export default function FeedTabs({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="flex justify-center gap-3 py-4 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeTab === tab.key
              ? "bg-black text-white"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
