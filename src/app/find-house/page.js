"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeToggle } from "@/components/ThemeToggle";
import { allHouseListings } from "@/utils/axios/houseEndPoints";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const stagger = (i) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i },
});

// ─── data ─────────────────────────────────────────────────────────────────────
const propertyTypes = ["Flat", "Duplex", "Single Room", "Office", "Store", "Event Hall"];
const FALLBACK_IMAGE = "/placeholder.jpg";

// ─── helpers ──────────────────────────────────────────────────────────────────
/**
 * listing.location may be a plain string OR an object like:
 * { country, state, lgaOrCountyOrDistrict, streetAddress }
 * This always returns a renderable string.
 */
function formatLocation(location) {
  if (!location) return null;
  if (typeof location === "string") return location;
  if (typeof location === "object") {
    const { streetAddress, lgaOrCountyOrDistrict, state, country } = location;
    return [streetAddress, lgaOrCountyOrDistrict, state, country]
      .filter(Boolean)
      .join(", ") || null;
  }
  return null;
}

// ─── icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const LocationPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── component ────────────────────────────────────────────────────────────────
export default function FindHouseBrowse() {
  const [selectedType, setSelectedType] = useState(null);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 100;

  const getAllListings = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await allHouseListings(currentPage, limit);
      const { data, total } = res;
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

  const filteredListings = allListings.filter((listing) => {
    const matchesType = selectedType
      ? listing.houseType?.toLowerCase() === selectedType.toLowerCase()
      : true;
    const locationStr = formatLocation(listing.location) ?? "";
    const matchesSearch = searchQuery
      ? listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locationStr.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Floating geometric blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[120px] -right-[120px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_40%_40%,#3b82f633_0%,#3b82f600_70%)] dark:bg-[radial-gradient(circle_at_40%_40%,#3b82f433_0%,#3b82f600_70%)] blur-[60px]" />
        <div className="absolute -bottom-[80px] -left-[80px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_60%_60%,#06b6d422_0%,#06b6d400_70%)] dark:bg-[radial-gradient(circle_at_60%_60%,#06b6d422_0%,#06b6d400_70%)] blur-[80px]" />
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.05] dark:opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating decorative shapes */}
      <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" className="absolute top-[14%] right-[8%] w-[90px] text-blue-200/50 dark:text-blue-400/20 hidden md:block pointer-events-none">
        <polygon points="50,5 95,28.75 95,86.25 50,110 5,86.25 5,28.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[20%] left-[5%] w-[110px] text-indigo-200/50 dark:text-indigo-400/20 hidden md:block pointer-events-none">
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" />
      </svg>

      {/* ──────────── HERO ──────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <MaxWidthWrapper>
          <div className="relative z-10 max-w-4xl mx-auto text-center">

            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                Rental Listings
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8"
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Space to Rent.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12 font-light"
            >
              Browse verified rentals across Nigeria — flats, offices, duplexes and more. 
              <strong className="text-slate-900 dark:text-slate-100 font-semibold"> Book and move in </strong> 
              with ease.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="flex items-center rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                <span className="px-4 text-blue-400 dark:text-blue-500 flex items-center flex-shrink-0">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search by location or title..."
                  className="flex-1 bg-transparent border-none outline-none px-0 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 flex items-center gap-2 flex-shrink-0 transition-colors duration-200">
                  Search <ArrowRight />
                </button>
              </div>
            </motion.div>

            {/* Filter pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-4"
            >
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type === selectedType ? null : type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedType === type
                      ? "bg-blue-600 text-white border border-blue-600 shadow-md"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {type}
                </button>
              ))}
              {selectedType && (
                <button
                  onClick={() => setSelectedType(null)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors duration-200"
                >
                  ✕ Clear
                </button>
              )}
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ──────────── LISTINGS SECTION ──────────── */}
      <section className="relative z-10 py-24 px-6">
        <MaxWidthWrapper>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-2">Browse</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                {selectedType ? (
                  <>
                    <span className="text-blue-600">{selectedType}</span> Listings
                  </>
                ) : (
                  <>
                    All <span className="text-blue-600">Rentals</span>
                  </>
                )}
              </h2>
            </div>
            {!loading && (
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {filteredListings.length} propert{filteredListings.length !== 1 ? "ies" : "y"} found
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="h-52 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-slate-100 dark:to-slate-900 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2" />
                    <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-full w-32 mt-4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredListings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredListings.map((listing, i) => (
                  <motion.div
                    key={listing._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
                    className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={listing.images?.[0]?.url || FALLBACK_IMAGE}
                        alt={listing.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {listing.houseType && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {listing.houseType}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                        {listing.currency} {Number(listing.price).toLocaleString()}
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-1">
                          /{listing.rentType}
                        </span>
                      </p>
                      {formatLocation(listing.location) && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4 mt-auto">
                          <LocationPin />
                          <span>{formatLocation(listing.location)}</span>
                        </div>
                      )}
                      <Link
                        href={`/find-house/more-details/${listing._id}`}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-950/30 w-fit"
                      >
                        View Details <ArrowRight />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-medium hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronLeft /> Previous
                </button>
                <span className="text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-medium hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next <ChevronRight />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-5 text-slate-400 dark:text-slate-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-semibold mb-2">No listings found</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm">Try adjusting your filters or search query.</p>
            </div>
          )}
        </MaxWidthWrapper>
      </section>

      {/* ──────────── TESTIMONIALS SECTION ──────────── */}
      <section className="border-t border-slate-200 dark:border-slate-800 py-24 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">User Stories</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              What our <span className="text-blue-600 dark:text-blue-400">community</span> says
            </h2>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {[
              {
                quote: "Amazing platform! Found the perfect apartment in no time. Highly recommend to anyone looking for rentals in Lagos.",
                name: "John Doe",
                role: "Found a flat in Victoria Island",
                initials: "JD",
              },
              {
                quote: "The verified listings gave me total peace of mind. The whole process from browsing to move-in was seamless.",
                name: "Amara K.",
                role: "Rented a duplex in Abuja",
                initials: "AK",
              },
              {
                quote: "Super clean and easy to use. Found exactly what I needed within my budget in less than a week.",
                name: "Emeka O.",
                role: "Rented an office space, Lekki",
                initials: "EO",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-8 relative overflow-hidden hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.45 }}
              >
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}