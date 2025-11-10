"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUser, FaBriefcase, FaHeart, FaSmoking, FaGlassCheers, FaMale, FaFemale } from "react-icons/fa";
import Link from "next/link";
import { singleHouseMate } from "@/utils/axios/houseMatesEndPoints";

// Mock Data (Replace with API data)
const housemates = [
  {
    id: 1,
    name: "Sarah O.",
    age: 27,
    gender:"female",
    location: "Lagos, Nigeria",
    budget: "$400 - $600",
    image: "/images/user-2.png",
    bio: "Looking for a friendly and clean housemate. Preferably female.",
    interests: ["Music", "Traveling", "Cooking"],
    contact: "sarah.o@example.com",
    religion: "Christian",
    race: "Black",
    occupation: "Software Developer",
    maritalStatus: "Single",
    smoking: "No",
    drinking: "Occasionally",
  },
  {
    id: 2,
    name: "John D.",
    age: 30,
    gender:"male",
    location: "Abuja, Nigeria",
    budget: "$300 - $500",
    image: "/images/user-1.png",
    bio: "Work-from-home professional looking for a quiet place.",
    interests: ["Tech", "Gaming", "Reading"],
    contact: "john.d@example.com",
    religion: "Atheist",
    race: "White",
    occupation: "Freelance Writer",
    maritalStatus: "Divorced",
    smoking: "Yes",
    drinking: "Frequently",
  },
  {
    id: 3,
    name: "Amaka C.",
    age: 25,
    gender:"female",
    location: "Port Harcourt, Nigeria",
    budget: "$250 - $450",
    image: "/images/user-3.png",
    bio: "Love socializing but also value my personal space. Looking for a respectful housemate.",
    interests: ["Fitness", "Movies", "Art"],
    contact: "amaka.c@example.com",
    religion: "Muslim",
    race: "Black",
    occupation: "Nurse",
    maritalStatus: "Married",
    smoking: "No",
    drinking: "Never",
  },
];

const Page = () => {
  const router = useRouter();
  const [housematedetails, setHousematedetails] = useState([]);

  const getSingleListing = async () =>{
    try {
      const res = await singleHouseMate();

      console.log("signle house",res );
      setHousematedetails(res.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getSingleListing();
  }, []);



  // if (!housemate) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
  //       <p>Housemate not found.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Profile Header */}
         <button className="bg-green-600 text-white p-2 top-[56px] mr-3 mt-2 rounded-lg md:top-10/12 md:bottom-0 right-0 fixed z-40 md:mr-20 md:mb-5 md:h-[50px]"><Link href="/find-house mate/browse">See more      </Link>
      </button>
        {/* <div className="flex items-center gap-6">
          <Image
            src={housemate.image}
            alt={housemate.name}
            width={120}
            height={120}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{housemate.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">Age: {housemate.age}</p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="text-blue-500" /> {housemate.location}
            </p>
            <p className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
              <FaMoneyBillWave /> Budget: {housemate.budget}
            </p>
          </div>
        </div> */}

        {/* Bio */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">About Me</h2>
          {/* <p className="text-gray-700 dark:text-gray-300 mt-2">{housemate.bio}</p> */}
        </div>

        {/* Additional Details */}
        {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="flex items-center gap-2">
            <FaUser className="text-blue-500" /> <strong>Religion:</strong> {housemate.religion}
          </p>
          <p className="flex items-center gap-2">
            <FaUser className="text-blue-500" /> <strong>Race:</strong> {housemate.race}
          </p>
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-blue-500" /> <strong>Occupation:</strong> {housemate.occupation}
          </p>
          <p className="flex items-center gap-2">
            <FaHeart className="text-blue-500" /> <strong>Marital Status:</strong> {housemate.maritalStatus}
          </p>
          <p className="flex items-center gap-2">
            <FaSmoking className="text-blue-500" /> <strong>Smoking:</strong> {housemate.smoking}
          </p>
          <p className="flex items-center gap-2">
            <FaGlassCheers className="text-blue-500" /> <strong>Drinking:</strong> {housemate.drinking}
          </p>
          <p className="flex items-center gap-2">
  {housemate.gender === "female" ? (
    <>
      <FaFemale className="text-pink-500" /> <strong>Gender:</strong> {housemate.gender}
    </>
  ) : (
    <>
      <FaMale className="text-blue-500" /> <strong>Gender:</strong> {housemate.gender}
    </>
  )}
</p>

        </div> */}

        {/* Interests */}
        {/* <div className="mt-6">
          <h2 className="text-xl font-semibold">Interests</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {housemate.interests.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div> */}

        {/* Contact */}
        {/* <div className="mt-6">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            <FaUser className="inline-block mr-2 text-blue-500" />
            <span className="underline">{housemate.contact}</span>
          </p>
        </div> */}

        {/* Back Button */}
        <div className="mt-8 flex gap-3 flex-col sm:flex-row">
            <button   onClick={() => router.back()} className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
              Back to Listings
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition">
              Show interest
            </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
