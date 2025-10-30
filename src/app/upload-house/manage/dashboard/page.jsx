"use client";

import useModalStore from "@/store/useModalStore";

const Dashboard = () => {
  // Mock data (Replace with API data)
  const totalHouses = 20;
  const housesWithInterest = 8;
  const housesWithoutInterest = totalHouses - housesWithInterest;
  const { openModal } = useModalStore();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">House Owner Dashboard</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Component */}
        <DashboardCard title="Total Houses" count={totalHouses} color="blue" />
        <DashboardCard title="Houses with Interest" count={housesWithInterest} color="green" />
        <DashboardCard title="Houses with No Interest" count={housesWithoutInterest} color="red" />
      </div>

      {/* Upload House Button */}
      <div className="p-6 flex justify-center">
        <button
          onClick={openModal} 
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
        >
          + Upload New House
        </button>
      </div>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({ title, count, color }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500`}>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className={`text-3xl font-bold text-${color}-500`}>{count}</p>
    </div>
  );
};

export default Dashboard;
