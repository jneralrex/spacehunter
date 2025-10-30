"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const propertyTypes = ["Flat", "Duplex", "Single Room", "Office", "Store", "Event Hall"];

const allListings = [
  { id: 1, type: "Flat", title: "Modern Flat in NYC", price: "$1,500/month", image: "/house-1.jpeg" },
  { id: 2, type: "Duplex", title: "Luxury Duplex in LA", price: "$2,500/month", image: "/house-2.jpeg" },
  { id: 3, type: "Single Room", title: "Cozy Single Room", price: "$500/month", image: "/house-3.jpeg" },
  { id: 4, type: "Office", title: "Spacious Office Space", price: "$3,000/month", image: "/house-4.jpeg" },
  { id: 5, type: "Store", title: "Retail Store for Rent", price: "$1,200/month", image: "/house-5.jpeg" },
  { id: 6, type: "Event Hall", title: "Grand Event Hall", price: "$5,000/month", image: "/house-6.jpeg" },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState(null);

  const filteredListings = selectedType
    ? allListings.filter((listing) => listing.type === selectedType)
    : allListings;

  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="relative h-[250px] flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <MaxWidthWrapper className="text-gray-900">
          <h1 className="text-4xl font-bold">Find Your Perfect Space to Rent</h1>
          <p className="mt-2 text-lg">Browse, Book, and Move In with Ease</p>
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search location..."
              className="p-3 rounded-l-lg border outline-none w-2/3"
            />
            <button className="bg-blue-600 px-4 py-3 rounded-r-lg text-white">
              Search
            </button>
          </div>

          
          {/* Property Type Filters */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded border ${
                  selectedType === type
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
            {/* Reset Filter Button */}
            {selectedType && (
              <button
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Reset Filter
              </button>
            )}
          </div>
        </MaxWidthWrapper>
      </section>

         {/* Listings */}
         <section className="pt-30 pb-12 sm:py-12">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            {selectedType ? `${selectedType} Listings` : "All Rentals"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <div key={listing.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Image src={listing.image} alt={listing.title} width={400} height={250} className="w-full" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{listing.title}</h3>
                    <p className="text-gray-500">{listing.price}</p>
                    <Link href={`/find-house/more-details/${listing.id}`} >
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                      View Details
                    </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No listings found for {selectedType}.</p>
            )}
          </div>
        </MaxWidthWrapper>
      </section>

        {/* Featured Listings */}
        <section className="py-12">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Featured Rentals
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image src="/house-1.jpeg" alt="House" width={400} height={250} className="w-full" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">Luxury Villa in LA</h3>
                  <p className="text-gray-500">$2,500/month</p>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

   

      {/* Other Rentals */}
      <section className="py-12">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Explore More Rentals
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white shadow rounded-lg overflow-hidden">
                <Image src="/house-2.jpeg" alt="House" width={400} height={250} className="w-full" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">Modern Apartment</h3>
                  <p className="text-gray-500">$1,200/month</p>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Reviews */}
      <section className="py-12">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            What Our Users Say
          </h2>
          <div className="flex gap-6 overflow-x-auto">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md min-w-[300px]">
                <p className="text-gray-700">
                  "Amazing platform! Found the perfect apartment in no time."
                </p>
                <p className="mt-3 text-sm font-semibold">- John Doe</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
