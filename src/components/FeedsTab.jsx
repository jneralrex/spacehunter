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
              ? "bg-blue-600 dark:bg-blue-600 text-white"
              : "bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
