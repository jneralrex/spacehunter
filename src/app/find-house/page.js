"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { allHouseListings } from "@/utils/axios/houseEndPoints";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const propertyTypes = ["Flat", "Duplex", "Single Room", "Office", "Store", "Event Hall"];
const FALLBACK_IMAGE = "/placeholder.jpg";

export default function Home() {
  const [selectedType, setSelectedType] = useState(null);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 100;

  const getAllListings = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await allHouseListings(currentPage, limit);
      const { data, total } = res;
      console.log("getAllListings",res)

      setAllListings(data || []);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllListings(page);
  }, [page]);

  const filteredListings = selectedType
    ? allListings.filter(
        (listing) =>
          listing.houseType?.toLowerCase() === selectedType.toLowerCase()
      )
    : allListings;

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[250px] flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <MaxWidthWrapper className="text-green-500">
          <h1 className="text-4xl font-bold">Find Your Perfect Space to Rent</h1>
          <p className="mt-2 text-lg text-gray-400">Browse, Book, and Move In with Ease</p>

          {/* Search Input */}
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search location..."
              className="p-3 rounded-l-lg border outline-none w-2/3 placeholder:text-green-500"
            />
            <button className="bg-green-600 px-4 py-3 rounded-r-lg text-white">
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
          <h2 className="text-3xl font-semibold text-green-500 mb-6">
            {selectedType ? `${selectedType} Listings` : "All Rentals"}
          </h2>

          {loading ? (
            <p className="text-gray-500 text-center">Loading listings...</p>
          ) : filteredListings.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <Image
                      src={listing.images?.[0]?.url || FALLBACK_IMAGE}
                      alt={listing.title}
                      width={400}
                      height={250}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{listing.title}</h3>
                      <p className="text-gray-500">
                        {listing.currency} {listing.price}/{listing.rentType}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        Type: {listing.houseType}
                      </p>
                      <Link href={`/find-house/more-details/${listing._id}`}>
                        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-10 gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded border ${
                    page === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Previous
                </button>

                <span className="text-gray-700">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded border ${
                    page === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">
              No listings found for {selectedType || "this category"}.
            </p>
          )}
        </MaxWidthWrapper>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-gray-50">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            What Our Users Say
          </h2>
          <div className="flex gap-6 overflow-x-auto">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-lg shadow-md min-w-[300px]"
              >
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
