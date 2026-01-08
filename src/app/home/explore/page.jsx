"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, MapPin, TrendingUp, Users, Home, X } from "lucide-react";
import { 
  getTrendingHouses, 
  getPopularAreas, 
  getCuratedHouses, 
  getNearbyHouses 
} from "@/utils/axios/houseEndPoints";
import { getSuggestedHousemates } from "@/utils/axios/houseMatesEndPoints";
import Link from "next/link";

export default function ExplorePage() {
  const tabs = [
    "For You",
    "Trending Rentals",
    "Near You",
    "Popular Areas",
    "Affordable Picks",
    "Housemates",
    "Shortlets",
    "Luxury Homes",
  ];

  const [activeTab, setActiveTab] = useState("For You");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    trending: [],
    popularAreas: [],
    suggestedHousemates: [],
    curated: [],
    nearby: [],
  });
  const [locationError, setLocationError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [manualLocation, setManualLocation] = useState("");

  const fetchExploreData = useCallback(async () => {
    setLoading(true);
    console.log("Fetching Explore Data for tab:", activeTab);
    try {
      if (activeTab === "For You") {
        const [trending, housemates, areas] = await Promise.all([
          getTrendingHouses(5),
          getSuggestedHousemates(),
          getPopularAreas(),
        ]);
        console.log("Trending Response:", trending);
        console.log("Housemates Response:", housemates);
        console.log("Areas Response:", areas);
        setData((prev) => ({
          ...prev,
          trending: trending.data || [],
          suggestedHousemates: housemates.data || [],
          popularAreas: areas.data || [],
        }));
      } else if (activeTab === "Trending Rentals") {
        const trending = await getTrendingHouses(15);
        console.log("All Trending Response:", trending);
        setData((prev) => ({ ...prev, trending: trending.data || [] }));
      } else if (activeTab === "Popular Areas") {
        const areas = await getPopularAreas();
        console.log("All Areas Response:", areas);
        setData((prev) => ({ ...prev, popularAreas: areas.data || [] }));
      } else if (activeTab === "Housemates") {
        const housemates = await getSuggestedHousemates();
        console.log("All Housemates Response:", housemates);
        setData((prev) => ({ ...prev, suggestedHousemates: housemates.data || [] }));
      } else if (activeTab === "Affordable Picks") {
        const curated = await getCuratedHouses("affordable");
        console.log("Curated Affordable Response:", curated);
        setData((prev) => ({ ...prev, curated: curated.data || [] }));
      } else if (activeTab === "Shortlets") {
        const curated = await getCuratedHouses("shortlet");
        console.log("Curated Shortlets Response:", curated);
        setData((prev) => ({ ...prev, curated: curated.data || [] }));
      } else if (activeTab === "Luxury Homes") {
        const curated = await getCuratedHouses("luxury");
        console.log("Curated Luxury Response:", curated);
        setData((prev) => ({ ...prev, curated: curated.data || [] }));
      } else if (activeTab === "Near You") {
        handleGetNearby();
      }
    } catch (error) {
      console.error("Explore Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const handleGetNearby = (location = null) => {
    if (!location && !navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    if (location) {
        fetchNearbyByLocation(location);
        return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log("Geolocation Position:", position);
          const nearby = await getNearbyHouses({ lat: latitude, lng: longitude });
          console.log("Nearby Houses (Geo) Response:", nearby);
          setData((prev) => ({ ...prev, nearby: nearby.data || [] }));
          setLocationError(null);
        } catch (error) {
          console.error("Nearby Houses (Geo) Error:", error);
          setLocationError("Could not find houses near your current location.");
        }
      },
      (error) => {
        setLocationError("Please enable location access or type your city below.");
        console.error("Geolocation error:", error);
      }
    );
  };

  const fetchNearbyByLocation = async (location) => {
      setLoading(true);
      console.log("Fetching Nearby for Location:", location);
      try {
          const nearby = await getNearbyHouses({ location });
          console.log("Nearby Houses (Manual) Response:", nearby);
          setData((prev) => ({ ...prev, nearby: nearby.data || [] }));
          setLocationError(null);
      } catch (error) {
          console.error("Nearby Houses (Manual) Error:", error);
          setLocationError(`Could not find houses in "${location}".`);
      } finally {
          setLoading(false);
      }
  };

  const handleSearch = async (e) => {
      if (e.key === 'Enter' && searchQuery.trim()) {
          setActiveTab("Near You");
          fetchNearbyByLocation(searchQuery);
      }
  };

  useEffect(() => {
    fetchExploreData();
  }, [fetchExploreData]);

  const renderTrendingFeed = (items) => (
    <div className="mt-3 sm:mt-6">
      {items.map((item) => (
        <Link href={`/find-house/more-details/${item._id}`} key={item._id} className="block px-3 sm:px-4 py-3 sm:py-4 border-b border-white/10 hover:bg-white/5 transition-colors">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs text-neutral-400">Trending in {item.location?.state || "Unknown"}</p>
              <p className="mt-1 font-medium text-sm sm:text-base line-clamp-2">{item.title}</p>
              <p className="text-[10px] sm:text-xs text-neutral-500 mt-1 line-clamp-1">
                {item.interestCount || 0} interested • ₦{item.price?.toLocaleString()} / {item.rentType}
              </p>
            </div>
            {item.images?.[0]?.url && (
              <img src={item.images[0].url} className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0" alt={item.title} />
            )}
          </div>
        </Link>
      ))}
    </div>
  );

  const renderHousemates = (items) => (
    <div className="px-3 sm:px-4 py-4 sm:py-6 border-b border-white/10">
      <p className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
        <Users size={18} className="text-green-500 flex-shrink-0" /> Housemates For You
      </p>
      <div className="flex flex-col gap-3 sm:gap-4">
        {items.map((mate) => (
          <Link href={`/find-housemate/browse/user/more-details/${mate._id}`} key={mate._id} className="flex items-center gap-3 hover:bg-white/5 p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors">
            <img
              src={mate.userId?.profilePics?.url || "https://randomuser.me/api/portraits/placeholder.jpg"}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
              alt={mate.userId?.username}
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm line-clamp-1">{mate.userId?.username}</p>
              <p className="text-xs text-neutral-500 line-clamp-1">
                Looking in {mate.location?.lgaOrCountyOrDistrict}, {mate.location?.state}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-semibold text-green-500">₦{mate.budget?.toLocaleString()}</p>
              <p className="text-[10px] text-neutral-500">{mate.userId?.gender}</p>
            </div>
          </Link>
        ))}
        {items.length === 0 && <p className="text-sm text-neutral-500 italic">No suggested housemates found yet.</p>}
      </div>
    </div>
  );

  const renderPopularAreas = (areas) => (
    <div className="px-3 sm:px-4 py-4 sm:py-6 border-b border-white/10">
      <p className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
        <MapPin size={18} className="text-blue-500 flex-shrink-0" /> Popular Areas
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {areas.map((area, i) => (
          <div key={i} className="bg-neutral-800/40 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition" onClick={() => {
              setActiveTab("Near You");
              fetchNearbyByLocation(area.area);
          }}>
            <p className="font-medium text-xs sm:text-sm truncate">{area.area}</p>
            <p className="text-[10px] sm:text-xs text-neutral-500 truncate">{area.state}</p>
            <div className="mt-2 flex justify-between items-center text-[10px] gap-1">
              <span className="text-green-500 font-bold">{area.count} listings</span>
              <span className="text-neutral-400 truncate">avg. ₦{area.avgPrice?.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white container max-w-full lg:max-w-[80%] xl:max-w-[85%] lg:ml-auto">
      {/* SEARCH BAR */}
      <div className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10">
        <div className="flex items-center gap-2 bg-neutral-800/70 border border-white/10 px-3 py-2.5 sm:py-2 rounded-full">
          <Search size={18} className="text-neutral-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search areas, prices..."
            className="bg-transparent w-full outline-none text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          {searchQuery && (
              <X size={18} className="text-neutral-400 cursor-pointer flex-shrink-0" onClick={() => setSearchQuery("")} />
          )}
          <SlidersHorizontal size={18} className="text-neutral-400 flex-shrink-0 hidden sm:block" />
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto px-3 sm:px-4 py-3 border-b border-white/10 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-xs sm:text-sm whitespace-nowrap transition-all font-medium ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-neutral-400 text-sm">Finding the best for you...</p>
        </div>
      ) : (
        <div className="pb-20">
          {activeTab === "For You" && (
            <>
              {/* SPOTLIGHT BANNER */}
              {data.trending.length > 0 && (
                <div className="mt-3 sm:mt-4 px-3 sm:px-4">
                  <Link href={`/find-house/more-details/${data.trending[0]._id}`} className="relative h-40 sm:h-56 w-full rounded-xl sm:rounded-2xl overflow-hidden block group">
                    <img
                      src={data.trending[0].images?.[0]?.url || "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"}
                      alt="Featured"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-6 flex flex-col justify-end">
                      <p className="text-[10px] sm:text-xs text-green-400 font-bold mb-1">🔥 HOT THIS WEEK</p>
                      <p className="text-base sm:text-xl font-bold line-clamp-2">{data.trending[0].title}</p>
                      <p className="text-xs sm:text-sm text-neutral-300 mt-1">₦{data.trending[0].price?.toLocaleString()} • {data.trending[0].interestCount || 0} interests</p>
                    </div>
                  </Link>
                </div>
              )}

              {renderTrendingFeed(data.trending.slice(1, 4))}
              
              {data.popularAreas.length > 0 && renderPopularAreas(data.popularAreas.slice(0, 4))}

              {renderHousemates(data.suggestedHousemates.slice(0, 3))}
            </>
          )}

          {activeTab === "Trending Rentals" && renderTrendingFeed(data.trending)}
          {activeTab === "Near You" && (
            <div className="mt-4 px-3 sm:px-4">
              {locationError && (
                <div className="mb-6 p-4 bg-neutral-800/50 rounded-xl border border-white/10">
                  <p className="text-neutral-400 text-xs sm:text-sm mb-3 text-center">{locationError}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter your city (e.g. Lekki)" 
                        className="bg-neutral-900 border border-white/10 rounded-full px-4 py-2.5 sm:py-2 text-sm w-full outline-none"
                        value={manualLocation}
                        onChange={(e) => setManualLocation(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGetNearby(manualLocation)}
                      />
                      <button 
                        onClick={() => handleGetNearby(manualLocation)}
                        className="bg-green-600 text-white rounded-full px-6 sm:px-4 py-2.5 sm:py-2 text-sm font-medium whitespace-nowrap"
                      >
                          Search
                      </button>
                  </div>
                </div>
              )}
              
              {!locationError && data.nearby.length === 0 && (
                  <div className="p-10 text-center text-neutral-400">
                      <MapPin className="mx-auto mb-4" size={48} />
                      <p className="text-sm">Searching for houses near you...</p>
                  </div>
              )}

              {data.nearby.length > 0 && (
                  <>
                    <p className="text-xs text-neutral-500 mb-4 flex items-center gap-1">
                        <MapPin size={12} /> Results for your current area
                    </p>
                    {renderTrendingFeed(data.nearby)}
                  </>
              )}
            </div>
          )}
          {activeTab === "Popular Areas" && renderPopularAreas(data.popularAreas)}
          {activeTab === "Housemates" && renderHousemates(data.suggestedHousemates)}
          {(activeTab === "Affordable Picks" || activeTab === "Shortlets" || activeTab === "Luxury Homes") && renderTrendingFeed(data.curated)}
        </div>
      )}

      <div className="h-20" />
    </div>
  );
}

