"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
  FaBriefcase,
  FaHeart,
  FaSmoking,
  FaGlassCheers,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import Link from "next/link";
import { singleHouseMate } from "@/utils/axios/houseMatesEndPoints";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [housemate, setHousemate] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSingleListing = async () => {
    try {
      const res = await singleHouseMate(id);
      console.log("single house", res);
      setHousemate(res);
    } catch (error) {
      console.log("Error fetching housemate details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        <p>Loading...</p>
      </div>
    );
  }

  if (!housemate) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        <p>Housemate not found.</p>
      </div>
    );
  }

  const user = housemate.userId || {};
  const location = housemate.location || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 relative">

        {/* Back to Browse Button */}
        <Link
          href="/find-housemate/browse"
          className="bg-green-600 text-white px-4 py-2 rounded-lg absolute top-4 right-4 hover:bg-green-700 transition"
        >
          See more
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Image
            src={user.profilePics || "/images/default-user.png"}
            alt={user.username || "User"}
            width={120}
            height={120}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.username || "Unknown"}</h1>
            {user.dateOfBirth && (
              <p className="text-gray-600 dark:text-gray-400">
                Age: {new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()}
              </p>
            )}
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="text-blue-500" />{" "}
              {location.lgaOrCountyOrDistrict}, {location.state}, {location.country}
            </p>
            <p className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
              <FaMoneyBillWave /> Budget:{" "}
              {housemate.currency?.toUpperCase()} {housemate.budget?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Bio / Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Searching for a roommate interested in a {housemate.apartmentType}.
          </p>
        </div>

        {/* Additional Details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="flex items-center gap-2">
            <FaUser className="text-blue-500" /> <strong>Occupation:</strong>{" "}
            {user.occupation || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            <FaHeart className="text-blue-500" /> <strong>Marital Status:</strong>{" "}
            {user.maritalStatus || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            <FaSmoking className="text-blue-500" /> <strong>Smoking:</strong>{" "}
            {user.habit?.smoking || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            <FaGlassCheers className="text-blue-500" /> <strong>Alcohol:</strong>{" "}
            {user.habit?.alcohol || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            {user.gender === "female" ? (
              <>
                <FaFemale className="text-pink-500" /> <strong>Gender:</strong> Female
              </>
            ) : (
              <>
                <FaMale className="text-blue-500" /> <strong>Gender:</strong> Male
              </>
            )}
          </p>
        </div>

        {/* Interests */}
        {user.hobbies?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Interests</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.hobbies.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            <FaUser className="inline-block mr-2 text-blue-500" />
            <span className="underline">{user.email}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3 flex-col sm:flex-row">
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Back to Listings
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition">
            Show Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
