"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaStar } from "react-icons/fa";

const landlord = {
  name: "John Doe",
  profilePhoto: "/profile.webp",
//   email: "johndoe@example.com",
//   phone: "+1 234 567 890",
  properties: [
    {
      id: 1,
      title: "Modern Flat in NYC",
      price: "$1,500/month",
      image: "/house-1.jpeg",
    },
    {
      id: 2,
      title: "Luxury Duplex in LA",
      price: "$2,500/month",
      image: "/house-2.jpeg",
    },
  ],
  rating: 4.7,
  reviews: [
    { id: 1, user: "Alice", comment: "Great landlord, very responsive!", rating: 5 },
    { id: 2, user: "Bob", comment: "Smooth rental process.", rating: 4.5 },
  ],
};

const LandlordPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Landlord Profile */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 relative rounded-full overflow-hidden border">
          <Image src={landlord.profilePhoto} alt={landlord.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{landlord.name}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <FaStar className="text-yellow-500" /> {landlord.rating} Rating
          </p>
        </div>
      </div>

      {/* Contact Info */}
      {/* <div className="mt-6 flex flex-col gap-3 text-gray-700">
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-blue-600" />
          <span>{landlord.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-green-600" />
          <span>{landlord.phone}</span>
        </div>
      </div> */}

      {/* Properties Owned */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Listed Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {landlord.properties.map((property) => (
            <Link key={property.id} href={`/more-details/${property.id}`} className="block">
              <div className="border rounded-lg overflow-hidden shadow-md">
                <div className="relative w-full h-40">
                  <Image src={property.image} alt={property.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-600">{property.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="mt-4 space-y-4">
          {landlord.reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg">
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-600">{review.comment}</p>
              <p className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Button */}
      <div className="mt-6">
        <Link href="/contact">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold">
            Contact Landlord
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandlordPage;
