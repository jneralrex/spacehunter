"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const housemates = [
  {
    id: 1,
    name: "Sarah O.",
    age: 27,
    location: "Lagos, Nigeria",
    budget: "$400 - $600",
    image: "/images/user-2.png",
    bio: "Looking for a friendly and clean housemate. Preferably female.",
  },
  {
    id: 2,
    name: "John D.",
    age: 30,
    location: "Abuja, Nigeria",
    budget: "$300 - $500",
    image: "/images/user-1.png",
    bio: "Work-from-home professional looking for a quiet place.",
  },
  {
    id: 3,
    name: "Amaka C.",
    age: 25,
    location: "Port Harcourt, Nigeria",
    budget: "$250 - $450",
    image: "/images/user-3.png",
    bio: "Love socializing but also value my personal space. Looking for a respectful housemate.",
  },
];

const Page = () => {
  const [search, setSearch] = useState("");

  const filteredHousemates = housemates.filter((housemate) =>
    housemate.name.toLowerCase().includes(search.toLowerCase()) ||
    housemate.location.toLowerCase().includes(search.toLowerCase())
  );

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
          filteredHousemates.map((housemate) => (
            <div
              key={housemate.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <Image
                src={housemate.image}
                alt={housemate.name}
                width={100}
                height={100}
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h2 className="text-xl font-semibold text-center mt-4">{housemate.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center">{housemate.location}</p>
              <p className="text-gray-700 dark:text-gray-300 text-center text-sm">{housemate.bio}</p>
              <p className="mt-2 text-center text-blue-600 dark:text-blue-400 font-semibold">
                Budget: {housemate.budget}
              </p>
              <Link href={`/find-housmate/browse/user/more-details/${housemate.id}`} className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg">
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
