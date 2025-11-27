"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allMyRoomateSearchPosts, uploadRoomateRequest } from "@/utils/axios/houseMatesEndPoints";

export default function RequestHouseMate() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: {
      country: "",
      state: "",
      lgaOrCountyOrDistrict: "",
      streetAddress: "",
    },
    budget: "",
    currency: "NGN",
    apartmentType: "",
    targetPrice: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
      document.body.style.pointerEvents = "none"; 
    } else {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["country", "state", "lgaOrCountyOrDistrict", "streetAddress"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        
        const res = await uploadRoomateRequest(formData);
        
    } catch (error) {
        
    }

    setIsOpen(false);
  };

  const getMyHousemateSearchePosts = async() => {
    try {
      const res = await allMyRoomateSearchPosts();

      console.log("my searches",res)
      
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    getMyHousemateSearchePosts();
  }, []);



  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-8 bg-green-600 text-white py-3 px-4 rounded-full font-semibold transition max-w-[200px]"
      >
        Request Housemate
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay that blocks clicks behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-auto"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md pointer-events-auto"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Request a Housemate
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Location Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.location.country}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.location.state}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                      placeholder="e.g. Lagos"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">LGA / District</label>
                  <input
                    type="text"
                    name="lgaOrCountyOrDistrict"
                    value={formData.location.lgaOrCountyOrDistrict}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    placeholder="e.g. Ikeja"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.location.streetAddress}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    placeholder="e.g. Allen Avenue"
                  />
                </div>

                {/* Other Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Budget</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Target Price</label>
                    <input
                      type="number"
                      name="targetPrice"
                      value={formData.targetPrice}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Apartment Type</label>
                  <select
                    name="apartmentType"
                    value={formData.apartmentType}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                  >
                    <option value="">Select apartment type</option>
                    <option value="self contain">Self Contain</option>
                    <option value="1 bedroom">1 Bedroom</option>
                    <option value="2 bedroom">2 Bedroom</option>
                    <option value="3 bedroom">3 Bedroom</option>
                    <option value="shared apartment">Shared Apartment</option>
                  </select>
                </div>

                {/* Submit + Close */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-md text-gray-600 border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
