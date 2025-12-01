"use client";

import { useEffect, useState } from "react";
import { useParams} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  FaToilet,
  FaUtensils,
  FaBed,
  FaCouch,
  FaDoorOpen,
  FaCar,
  FaRulerCombined,
  FaCalendarAlt,
  FaHeart,
  FaEye,
} from "react-icons/fa";
import { FaBookmark, FaLocationDot } from "react-icons/fa6";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { showInterestInHouse, singleHouse } from "@/utils/axios/houseEndPoints";
import useLoadingStore from "@/utils/store/useLoading";
import useHouseStore from "@/utils/store/useHouseStore";
import { toast } from "react-toastify";

import useAuthStore from "@/utils/store/useAuthStore";

const FeatureItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2">
    <Icon className="text-gray-600" size={20} />
    <span>
      {value} {label}
    </span>
  </div>
);

const HouseDetail = () => {
  const { id } = useParams();
  const { loading, setLoading } = useLoadingStore();

  const [house, setHouse] = useState(null);
  const [engagement, setEngagement] = useState(null);

  const [interested, setInterested] = useState(false);

  // Get logged in user
  const { user } = useAuthStore();

  const { error, setHouseError } = useHouseStore();
  const { message, setHouseMessage } = useHouseStore();

  if (error) {
    toast.error(error);
    setHouseError(null);
  }

  if (message) {
    toast.success(message);
    setHouseMessage(null);
  }

  // Fetch house
  const getSingleListing = async () => {
    setLoading(true);
    try {
      const res = await singleHouse(id);

      setHouse(res.data);
      setEngagement(res.engagement);

      const userId = user?.id;
      const interestedList = res.engagement?.interestedUsers || [];

      setInterested(interestedList.some((u) => u._id === userId));

    } catch (error) {
      console.error("Error fetching house:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    getSingleListing();
  }, [user]);


  // ---- HANDLE INTEREST TOGGLE ----
  const toggleInterest = async () => {
    setLoading(true);
    try {
      const res = await showInterestInHouse(id);

      setEngagement(res.engagement);

      const userId = user?.id;
      const interestedList = res.engagement.interestedUsers || [];

      setInterested(interestedList.some((u) => u._id === userId));


    } catch (error) {
      console.error("Error updating interest:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !house) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading house details...
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="py-10">
      {/* Hero Image */}
      <button className="bg-green-600 text-white p-2 top-[56px] mr-3 mt-2 rounded-lg md:top-10/12 md:bottom-0 right-0 fixed z-40 md:mr-20 md:mb-5 md:h-[50px]">
        <Link href="/find-house">See more</Link>
      </button>

      {/* MAIN IMAGE */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-gray-200 mt-3 md:mt-0">
        {house?.images?.length > 0 && (
          <Image
            src={house.images[0].url || house.images[0]}
            alt={house.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* House Info */}
      <div className="mt-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-green-500">{house.title}</h1>
        <p className="text-xl text-gray-400 font-semibold">
          {house.currency?.toUpperCase()} {house.price}
        </p>

        <p className="text-gray-400">
          <span>
            <FaLocationDot size={20} />
          </span>
          {house.location?.streetAddress}, {house.location?.lgaOrCountyOrDistrict},{" "}
          {house.location?.state}, {house.location?.country}
        </p>
      </div>

      {/* Features */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-400 text-lg">
        <FeatureItem icon={FaBed} label="Bedrooms" value={house.bedrooms} />
        <FeatureItem icon={FaCouch} label="Living Rooms" value={house.livingRooms} />
        <FeatureItem icon={FaToilet} label="Toilets" value={house.toilets} />
        <FeatureItem icon={FaUtensils} label="Kitchens" value={house.kitchens} />
        <FeatureItem icon={FaDoorOpen} label="Balconies" value={house.balconies} />
        <FeatureItem
          icon={FaCar}
          label="Garage"
          value={house.garage ? "Available" : "Not Available"}
        />
        <FeatureItem icon={FaRulerCombined} label="Size" value={house.size} />
        <FeatureItem icon={FaCalendarAlt} label="Built" value={house.yearBuilt} />
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-green-500 mt-4">
          Description
        </h2>
        <p className="text-gray-400 leading-relaxed">{house.description}</p>
      </div>

      {/* Amenities */}
      {house.amenities && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-green-500">Amenities</h2>
          <ul className="flex flex-wrap gap-2">
            {house.amenities.map((amenity, idx) => (
              <li
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {amenity.replace(/[\[\]"]/g, "")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-green-500">Gallery</h2>

        {house?.otherImages &&
          Object.entries(house.otherImages).map(([category, images]) =>
            images.length > 0 ? (
              <div key={category} className="mt-4">
                <h3 className="text-lg font-medium capitalize text-green-500">
                  {category.replace(/([A-Z])/g, " $1")}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-40 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img.url || img}
                        alt={`${category} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
      </div>

      {/* Engagement */}
      <div className="mt-6 text-center flex flex-col justify-center items-center">
        {/* INTEREST BUTTON */}
        <button
          onClick={toggleInterest}
          className={`w-full flex items-center justify-center gap-2 rounded-lg text-lg font-semibold transition max-w-[200px] p-2 ${interested
            ? "bg-red-600/90 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          <FaBookmark className={interested ? "text-black" : "text-grey-600"} />
          {interested ? "Remove from Bookmark" : "Bookmark Interest"}
        </button>

        {/* Contact Button */}
        <div className="mt-4">
          <Link href={`/find-house/contact/${house._id}`}>
            <button className="w-full flex items-center justify-center gap-2 transition bg-blue-600 text-white rounded-lg text-lg font-semibold max-w-[200px] p-2">
              <FaEye />
              See Owner
            </button>
          </Link>
        </div>

        <p className="mt-2 text-gray-400">
          {engagement?.interestCount || 0}{" "}
          {engagement?.interestCount === 1 ? "person has" : "people have"} shown
          interest.
        </p>

        <p className="mt-2 text-gray-400">
          viewed by {engagement?.viewCount || 0}{" "}
          {engagement?.viewCount === 1 ? "person" : "people"}
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default HouseDetail;
