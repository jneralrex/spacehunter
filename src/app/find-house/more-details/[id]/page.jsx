"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaToilet, FaUtensils, FaBed, FaCouch, FaDoorOpen, FaCar, FaRulerCombined, FaCalendarAlt, FaHeart } from "react-icons/fa";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const houseListings = [
  {
    id: 1,
    title: "Modern Flat in NYC",
    price: "$1,500/month",
    location: "New York City, NY",
    description: "This stunning modern flat offers great views...",
    images: ["/house-1.jpeg", "/house-5.jpeg", "/house-6.jpeg"],
    otherImages: {
      bedrooms: ["/bedroom-1.webp", "/bedroom-2.jpeg"],
      kitchens: ["/kitchen-1.webp"],
      toilets: ["/toilet-1.webp", "/toilet-2.jpeg"],
      livingRooms: ["/livingroom-1.jpeg"],
      garage: ["/garage-1.webp"],
    },
    amenities: ["WiFi", "Parking", "Air Conditioning"],
    toilets: 4,
    kitchens: 1,
    bedrooms: 2,
    livingRooms: 1,
    balconies: 1,
    garage: true,
    size: "1200 sqft",
    yearBuilt: 2018,
  },
];

const FeatureItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2">
    <Icon className="text-gray-600" size={20} />
    <span>{value} {label}</span>
  </div>
);

const HouseDetail = () => {
  const { id } = useParams();
  const house = houseListings.find((h) => h.id === Number(id));

  const [interested, setInterested] = useState(false);
  const [interestCount, setInterestCount] = useState(0);

  const handleInterestClick = () => {
    setInterested((prev) => !prev);
    setInterestCount((prev) => (interested ? Math.max(prev - 1, 0) : prev + 1));
  };

  if (!house) {
    return <div className="text-center py-10 text-xl">House not found.</div>;
  }

  return (
    <MaxWidthWrapper className="py-10">
      {/* Hero Image */}


      <button className="bg-green-600 text-white p-2 top-[56px] mr-3 mt-2 rounded-lg md:top-10/12 md:bottom-0 right-0 fixed z-40 md:mr-20 md:mb-5 md:h-[50px]"><Link href="/find-house">See more      </Link>
      </button>


      <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-amber-600 mt-3 md:mt-0">
        <Image src={house.images[0]} alt={house.title} fill className="object-cover" />
      </div>

      {/* House Info */}
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{house.title}</h1>
        <p className="text-xl text-gray-700">{house.price}</p>
        <p className="text-gray-600">{house.location}</p>
      </div>

      {/* House Features */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-700 text-lg">
        <FeatureItem icon={FaBed} label="Bedrooms" value={house.bedrooms} />
        <FeatureItem icon={FaCouch} label="Living Room" value={house.livingRooms} />
        <FeatureItem icon={FaToilet} label="Toilets" value={house.toilets} />
        <FeatureItem icon={FaUtensils} label="Kitchen" value={house.kitchens} />
        <FeatureItem icon={FaDoorOpen} label="Balcony" value={house.balconies} />
        <FeatureItem icon={FaCar} label="Garage" value={house.garage ? "Available" : "Not Available"} />
        <FeatureItem icon={FaRulerCombined} label="Size" value={house.size} />
        <FeatureItem icon={FaCalendarAlt} label="Built in" value={house.yearBuilt} />
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700">{house.description}</p>

      {/* Image Gallery */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        {house.otherImages && Object.entries(house.otherImages).map(([category, images]) => (
          <div key={category} className="mt-4">
            <h3 className="text-lg font-medium capitalize">{category.replace(/([A-Z])/g, " $1")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                  <Image src={img} alt={`${category} ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Show Interest Button */}
      <div className="mt-6 text-center flex flex-col justify-center items-center">
        <button
          onClick={handleInterestClick}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-lg font-semibold transition max-w-[200px] ${interested ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          <FaHeart className={interested ? "text-white" : "text-red-600"} />
          {interested ? "Interested" : "Show Interest"}
        </button>
        <p className="mt-2 text-gray-700 ">{interestCount} {interestCount === 1 ? "person has" : "people have"} shown interest.</p>
        {/* Contact Button */}
        <div className="mt-4">
          <Link href={`/find-house/contact/${house.id}`}>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold max-w-[200px] p-3">
              See Owner
            </button>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default HouseDetail;
