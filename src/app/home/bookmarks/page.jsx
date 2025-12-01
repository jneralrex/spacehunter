"use client";

import { Plus, Pencil, Trash2, Eye, Heart, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getMyBookmarks, showInterestInHouse } from "@/utils/axios/houseEndPoints";
import { toast } from "react-toastify";

export default function BookmarksPage() {
  const [houses, setHousesBookMarks] = useState([]);
  const [loadingRemove, setLoadingRemove] = useState(null);

  const fetchBookmarks = async () => {
    try {
      const res = await getMyBookmarks();
      setHousesBookMarks(res.houses);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // REMOVE INTEREST FROM A LISTING
  const removeInterest = async (houseId) => {
    setLoadingRemove(houseId);

    try {
      const res = await showInterestInHouse(houseId);

      if (res.action === "removed") {
        // Remove the house from local UI
        setHousesBookMarks((prev) =>
          prev.filter((house) => house._id !== houseId)
        );

        toast.success("Interest removed successfully");
      }
    } catch (err) {
      console.error("Error removing interest:", err);
      toast.error("Failed to remove interest");
    } finally {
      setLoadingRemove(null);
    }
  };

  return (
    <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto">
      <h1 className="text-2xl font-semibold mb-4">My Interests</h1>

      {houses.length === 0 && (
        <p className="text-neutral-400 text-lg mt-10">You haven't shown interest in anything yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {houses.map((house) => (
          <div
            key={house._id}
            className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-44 w-full overflow-hidden">
              <img
                src={house.images?.[0]?.url}
                alt={house.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="p-4 flex flex-col gap-3">
              {/* TITLE + LOCATION + STATUS */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold">{house.title}</p>

                  <p className="text-sm text-neutral-400">
                    {house.location?.streetAddress}, {house.location?.state}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    house.status === "available"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-neutral-700/30 text-neutral-300"
                  }`}
                >
                  {house.status || "available"}
                </span>
              </div>

              {/* PRICE */}
              <p className="font-medium text-green-400">
                {house.currency} {house.price}
              </p>

              {/* STATISTICS */}
              <div className="flex gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1 text-neutral-400">
                  <Eye size={16} /> {house?.viewedBy.length} views
                </div>

                <div className="flex items-center gap-1 text-neutral-400">
                  <Heart size={16} /> {house?.interestCount} interests
                </div>

                <div className="flex items-center gap-1 text-neutral-400">
                  <MessageCircle size={16} /> 0 comments
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  className="flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 px-4 py-2 rounded-lg text-sm transition"
                  onClick={() => removeInterest(house._id)}
                  disabled={loadingRemove === house._id}
                >
                  {loadingRemove === house._id ? (
                    "Removing..."
                  ) : (
                    <>
                      <Trash2 size={16} /> Remove
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
