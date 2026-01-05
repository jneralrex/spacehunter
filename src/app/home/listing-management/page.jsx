"use client";

import { Plus, Pencil, Trash2, Eye, Heart, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import HouseForm from "@/components/forms/UploadHouse";
import { editlistedHouse, myListings, deleteHouse, listHouse } from "@/utils/axios/houseEndPoints";
import useHouseStore from "@/utils/store/useHouseStore";
import { toast } from "react-toastify";


export default function HouseManagement() {
  const [houses, setHouses] = useState([]);
  const { error, setHouseError, message, setHouseMessage } = useHouseStore();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState(null);
  const limit = 100;

  const getMyListings = async (currentPage = 1) => {
    try {
      const res = await myListings(currentPage, limit);
      const { data, total } = res;
      console.log("user lisitngs", res)
      setTotalPages(Math.ceil(total / limit));
      setHouses(data);
    } catch (error) {
      console.error(error)
    }
  };


  useEffect(() => {
    getMyListings(page);
  }, []);


  const openDrawer = (house = null) => {
    if (house) {
      const normalized = {
        _id: house._id,
        title: house.title || "",
        price: house.price || "",
        rentType: house.rentType || "",
        currency: house.currency || "",
        status: house.status || "available",
        forSale: house.forSale || false,
        houseType: house.houseType || "apartment",

        bedrooms: house.bedrooms || 1,
        bathrooms: house.bathrooms || 1,
        toilets: house.toilets || 1,
        kitchens: house.kitchens || 1,
        livingRooms: house.livingRooms || 1,
        balconies: house.balconies || 0,
        garage: house.garage || false,

        size: house.size || "",
        yearBuilt: house.yearBuilt || "",
        amenities: house.amenities || [],
        description: house.description || "",

        // FIX LOCATION STRUCTURE
        location: {
          country: house.location?.country || "",
          state: house.location?.state || "",
          lgaOrCountyOrDistrict: house.location?.lgaOrCountyOrDistrict || "",
          streetAddress: house.location?.streetAddress || "",
        },

        // FIX IMAGES
        images: house.images?.map((img) => img.url) || [],

        // FIX CATEGORY IMAGES
        categoryImages: {
          bedrooms: house.categoryImages?.bedrooms?.map(i => i.url) || [],
          kitchens: house.categoryImages?.kitchens?.map(i => i.url) || [],
          toilets: house.categoryImages?.toilets?.map(i => i.url) || [],
          livingRooms: house.categoryImages?.livingRooms?.map(i => i.url) || [],
          garage: house.categoryImages?.garage?.map(i => i.url) || [],
        },
      };

      setEditingHouse(normalized);
    } else {
      setEditingHouse(null);
    }

    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setEditingHouse(null);
    setDrawerOpen(false);
  };

  const handleSubmit = async (fd) => {
    setHouseError(null);
    setHouseMessage(null);
    try {
      if (editingHouse) {
        // EDIT MODE
        const updated = await editlistedHouse(fd, editingHouse._id);

        // update list instantly without refetch
        setHouses((prev) =>
          prev.map((h) => (h._id === updated?.data?._id ? updated.data : h))
        );

        toast.success(message);
      } else {
        // ADD MODE
        const newHouse = await listHouse(fd);
        setHouses((prev) => [newHouse.data, ...prev]);

        toast.success(message);
      }

      closeDrawer();
    } catch (err) {
      toast.error(err?.message || "Operation failed");
    }
  };


  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto relative">
      {/* HEADER */}
      <div className="sticky top-0 bg-neutral-900 pb-3 mb-3 border-b border-white/10 z-50">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="md:text-xl font-semibold">Listing Management</h1>
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 p-2 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition"
            onClick={() => openDrawer()}
          >
            <Plus size={16} />
            Add New Space
          </button>
        </div>
      </div>

      {/* HOUSE LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {houses?.map((house) => (
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
                  className={`px-3 py-1 text-xs rounded-full ${house.status === "available"
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
                  <Eye size={16} /> {house.engagement?.viewCount} views
                </div>

                <div className="flex items-center gap-1 text-neutral-400">
                  <Heart size={16} /> {house.engagement?.interestCount} interests
                </div>

                <div className="flex items-center gap-1 text-neutral-400">
                  <MessageCircle size={16} /> 0 comments
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg text-sm transition"
                  onClick={() => openDrawer(house)}
                >
                  <Pencil size={16} /> Edit
                </button>

                <button className="flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 px-4 py-2 rounded-lg text-sm transition"
                  onClick={() => deleteHouse(house._id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>


      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={`px-4 py-2 rounded border ${page === 1
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
          className={`px-4 py-2 rounded border ${page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white"
            }`}
        >
          Next
        </button>
      </div>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-neutral-900 shadow-lg z-50 transform transition-transform ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h2 className="text-lg font-semibold">
            {editingHouse ? "Edit House" : "Add New House"}
          </h2>
          <button onClick={closeDrawer} className="p-2 hover:bg-neutral-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto h-[calc(100%-64px)]">
          <HouseForm initialData={editingHouse} onSubmit={handleSubmit} />
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      <div className="h-20" />
    </div>
  );
}
