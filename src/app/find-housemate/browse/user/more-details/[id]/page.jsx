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
  FaFlag
} from "react-icons/fa";
import Link from "next/link";
import { sendRequest, singleHouseMate } from "@/utils/axios/houseMatesEndPoints";
import useHouseStore from "@/utils/store/useHouseStore";
import { toast } from "react-toastify";
import ReportModal from "@/components/ReportModal";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [housemate, setHousemate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, setHouseError } = useHouseStore();
  const { message, setHouseMessage } = useHouseStore();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const posterId = housemate?.userId?._id;

  useEffect(() => {
    if (error) {
      toast.error(error);
      setHouseError(null);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setHouseMessage(null);
    }
  }, [message]);

  const getSingleListing = async () => {
    try {
      const res = await singleHouseMate(id);
      console.log("single roomate", res);
      setHousemate(res);
    } catch (error) {
      console.log("Error fetching housemate details:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendRoomateRequest = async () => {
    try {
      const res = await sendRequest(posterId);
    } catch (error) {
      console.log("Error sending request:", error);
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
      <button className="bg-green-600 text-white p-2 top-[56px] mr-3 mt-2 rounded-lg md:top-9/12 md:bottom-0 right-0 fixed z-40 md:mr-20 md:mb-5 md:h-[50px]">
        <Link href="/find-housemate/browse">See more</Link>
      </button>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 relative">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Image
            src={user.profilePics?.url}
            alt={user.username || "User"}
            width={120}
            height={120}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="text-center md:text-start">
            <h1 className="text-2xl font-bold">{user.username || "Unknown"}</h1>
            {user.dateOfBirth && (
              <p className="text-gray-600 dark:text-gray-400">
                Age:{" "}
                {new Date().getFullYear() -
                  new Date(user.dateOfBirth).getFullYear()}
              </p>
            )}
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="text-blue-500" />{" "}
              {location.lgaOrCountyOrDistrict}, {location.state},{" "}
              {location.country}
            </p>
            <p className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
              <FaMoneyBillWave /> Budget: {housemate.currency?.toUpperCase()}{" "}
              {housemate.budget?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Bio / Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center md:text-start">
            About Me
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 text-center md:text-start">
            Searching for a roommate interested in a {housemate.apartmentType}.
          </p>
        </div>

        {/* Additional Details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <div className="flex  items-center gap-2">
              <FaUser className="text-blue-500" />
              <strong>Occupation:</strong>{" "}
            </div>
            <p> {user.occupation || "Not specified"}</p>
          </div>

          <div className="flex items-center gap-2 flex-col md:flex-row">
            <div className="flex  items-center gap-2">
              <FaHeart className="text-blue-500" />{" "}
              <strong>Marital Status:</strong>{" "}
            </div>
            <p>{user.maritalStatus || "Not specified"}</p>
          </div>

          <div className="grid grid-cols-2 md:flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-col md:flex-row">
              <div className="flex items-center gap-2">
                <FaSmoking className="text-blue-500" /> <strong>Smoking:</strong>{" "}
              </div>
              {user.habit?.smoking || "Not specified"}
            </div>

            <div className="flex items-center gap-2 flex-col md:flex-row">
              <div className="flex items-center gap-2">
                <FaGlassCheers className="text-blue-500" />{" "}
                <strong>Alcohol:</strong>{" "}
              </div>

              {user.habit?.alcohol || "Not specified"}
            </div>

            <div className="flex items-center gap-2">
              {user.gender === "female" ? (
                <>
                  <FaFemale className="text-pink-500" />{" "}
                  <strong>Gender:</strong> Female
                </>
              ) : (
                <>
                  <FaMale className="text-blue-500" /> <strong>Gender:</strong>{" "}
                  Male
                </>
              )}
            </div>
          </div>
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
        <div className="mt-8 flex gap-3 flex-col sm:flex-row items-center justify-between">
          <div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto">
            <button
              onClick={() => router.back()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Back to Listings
            </button>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
              onClick={sendRoomateRequest}
            >
              Send Request
            </button>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition mt-4 sm:mt-0 cursor-pointer"
          >
            <FaFlag size={14} />
            Report
          </button>
        </div>

        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          targetModel="RoommateSearch"
          targetId={id}
        />
      </div>
    </div>
  );
};

export default Page;