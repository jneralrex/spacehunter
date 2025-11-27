"use client";

import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  allMyRoomateSearchPosts, 
  uploadRoomateRequest 
} from "@/utils/axios/houseMatesEndPoints";

export default function RequestHouseMatePage() {
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      ["country", "state", "lgaOrCountyOrDistrict", "streetAddress"].includes(name)
    ) {
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

  // FETCH POSTS
  const getPosts = async () => {
    try {
      const res = await allMyRoomateSearchPosts();
      console.log("post", res)
      setPosts(res || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const openDrawer = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        location: {
          country: post.location?.country || "",
          state: post.location?.state || "",
          lgaOrCountyOrDistrict: post.location?.lgaOrCountyOrDistrict || "",
          streetAddress: post.location?.streetAddress || "",
        },
        budget: post.budget || "",
        currency: post.currency || "NGN",
        apartmentType: post.apartmentType || "",
        targetPrice: post.targetPrice || "",
      });
    } else {
      setEditingPost(null);
      setFormData({
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
    }

    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingPost(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadRoomateRequest(formData);

      closeDrawer();
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto relative">

      {/* HEADER */}
      <div className="sticky top-0 bg-neutral-900 pb-3 mb-3 border-b border-white/10 z-50">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="md:text-xl font-semibold">Housemate Search Requests</h1>

          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 p-2 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition"
            onClick={() => openDrawer()}
          >
            <Plus size={16} />
            Make a Search
          </button>
        </div>
      </div>

      {/* SEARCH POSTS LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden p-4 flex flex-col gap-3"
          >
            {/* LOCATION */}
            <p className="font-semibold text-lg">
              {post.location?.streetAddress}, {post.location?.state}
            </p>

            <p className="text-neutral-400 text-sm">
              {post.location?.lgaOrCountyOrDistrict}
            </p>

            {/* PRICE */}
            <p className="text-green-400 font-medium">
              {post.currency} {post.budget}
            </p>

            <p className="text-sm text-neutral-300">
              Apartment Type: {post.apartmentType}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-3 mt-2">
              <button
                className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg text-sm transition"
                onClick={() => openDrawer(post)}
              >
                <Pencil size={16} /> Edit
              </button>

              <button
                className="flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 px-4 py-2 rounded-lg text-sm transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DRAWER (Right Side) */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-neutral-900 shadow-lg z-50 transform transition-transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h2 className="text-lg font-semibold">
            {editingPost ? "Edit Search Request" : "Make a Search Request"}
          </h2>
          <button onClick={closeDrawer} className="p-2 hover:bg-neutral-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Form */}
        <div className="p-5 overflow-y-auto h-[calc(100%-64px)]">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* LOCATION */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.location.country}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 mt-1 bg-neutral-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 mt-1 bg-neutral-800 text-white text-sm"
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
                className="w-full border rounded-md px-3 py-2 mt-1 bg-neutral-800 text-white text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.location.streetAddress}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 bg-neutral-800 text-white text-sm"
              />
            </div>

            {/* BUDGET */}
            <div>
              <label className="text-sm font-medium">Budget</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 bg-neutral-800 text-white text-sm"
              />
            </div>

            {/* APARTMENT TYPE */}
            <div>
              <label className="text-sm font-medium">Apartment Type</label>
              <select
                name="apartmentType"
                value={formData.apartmentType}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 bg-neutral-800 text-white text-sm"
              >
                <option value="">Select apartment type</option>
                <option value="self contain">Self Contain</option>
                <option value="1 bedroom">1 Bedroom</option>
                <option value="2 bedroom">2 Bedroom</option>
                <option value="3 bedroom">3 Bedroom</option>
                <option value="shared apartment">Shared Apartment</option>
              </select>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              {editingPost ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* OVERLAY */}
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
