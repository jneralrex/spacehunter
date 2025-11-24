"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { allRoomateListings } from "@/utils/axios/houseMatesEndPoints";

const Page = () => {
  const [search, setSearch] = useState("");
  const [allHouseMates, setAllHouseMates] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHouseMates = async () => {
    try {
      const res = await allRoomateListings();
      console.log("aLL HOUSEMATES", res);

      // your API response: res.data.roommateRequests = Array of users
      setAllHouseMates(res || []);
    } catch (error) {
      console.error("Error fetching housemates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHouseMates();
  }, []);

  // Filter by search text (name or location)
  const filteredHousemates = allHouseMates.filter((hm) => {
    const name = hm.userId?.username?.toLowerCase() || "";
    const location =
      `${hm.location?.state || ""}, ${hm.location?.country || ""}`.toLowerCase();
    return (
      name.includes(search.toLowerCase()) ||
      location.includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-6">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search housemates by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>

      {/* Housemate List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredHousemates.length > 0 ? (
          filteredHousemates.map((hm) => (
            <div
              key={hm._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-center">
                <Image
                  src={
                    hm.userId?.profilePics.url ||
                    "/images/default-user.png"
                  }
                  alt={hm.userId?.username || "Housemate"}
                  width={100}
                  height={100}
                  className="w-24 h-24 mx-auto rounded-full object-cover"
                />
              </div>

              <h2 className="text-xl font-semibold text-center mt-4">
                {hm.userId?.username || "Unknown"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {hm.location?.state}, {hm.location?.country}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-center text-sm mt-1">
                Looking for a {hm.apartmentType || "room"} roommate.
              </p>
              <p className="mt-2 text-center text-blue-600 dark:text-blue-400 font-semibold">
                Budget: {hm.currency?.toUpperCase()} {hm.budget?.toLocaleString()}
              </p>

              <Link
                href={`/find-housemate/browse/user/more-details/${hm._id}`}
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 dark:text-gray-400">
            No housemates found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
