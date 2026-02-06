"use client";

import { useEffect, useState, useCallback } from "react";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import useHouseStore from "@/utils/store/useHouseStore";
import dynamic from 'next/dynamic';

const AddressVerification = dynamic(() => import('@/components/AddressVerification'), { ssr: false });

export default function HouseForm({ initialData = null, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const { error, setHouseError, message, setHouseMessage } = useHouseStore();

  const [form, setForm] = useState({
    title: "",
    price: "",
    currency: "USD",
    rentType: "monthly",
    forSale: false,
    houseType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    toilets: 1,
    kitchens: 1,
    livingRooms: 1,
    balconies: 0,
    garage: false,
    size: "",
    yearBuilt: "",
    status: "available",
    amenities: "",
    description: "",
    location: {
      country: "",
      state: "",
      lgaOrCountyOrDistrict: "",
      streetAddress: "",
    },
  });

  const [images, setImages] = useState([]);
  const [categoryImages, setCategoryImages] = useState({
    bedrooms: [],
    kitchens: [],
    toilets: [],
    livingRooms: [],
    garage: [],
  });
  const [coordinates, setCoordinates] = useState(null);

  // Sync form with initialData whenever it changes
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        price: initialData.price || "",
        currency: initialData.currency || "USD",
        rentType: initialData.rentType || "monthly",
        forSale: initialData.forSale || false,
        houseType: initialData.houseType || "apartment",
        bedrooms: initialData.bedrooms || 1,
        bathrooms: initialData.bathrooms || 1,
        toilets: initialData.toilets || 1,
        kitchens: initialData.kitchens || 1,
        livingRooms: initialData.livingRooms || 1,
        balconies: initialData.balconies || 0,
        garage: initialData.garage || false,
        size: initialData.size || "",
        yearBuilt: initialData.yearBuilt || "",
        status: initialData.status || "available",
        amenities: initialData.amenities?.join(", ") || "",
        description: initialData.description || "",
        location: {
          country: initialData.location?.country || "",
          state: initialData.location?.state || "",
          lgaOrCountyOrDistrict: initialData.location?.lgaOrCountyOrDistrict || "",
          streetAddress: initialData.location?.streetAddress || "",
        },
      });

      if (initialData.lat && initialData.lng) {
        setCoordinates({ lat: initialData.lat, lng: initialData.lng });
      }

      setImages(initialData.images || []);
      setCategoryImages({
        bedrooms: initialData.categoryImages?.bedrooms || [],
        kitchens: initialData.categoryImages?.kitchens || [],
        toilets: initialData.categoryImages?.toilets || [],
        livingRooms: initialData.categoryImages?.livingRooms || [],
        garage: initialData.categoryImages?.garage || [],
      });
    }
  }, [initialData]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, location: { ...prev.location, [name]: value } }));
  };

  const handleBooleanChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddressDetailsUpdate = useCallback((newDetails) => {
    setForm((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        country: newDetails.country || prev.location.country,
        state: newDetails.state || prev.location.state,
        lgaOrCountyOrDistrict: newDetails.lgaOrCountyOrDistrict || prev.location.lgaOrCountyOrDistrict,
        streetAddress: newDetails.streetAddress || prev.location.streetAddress,
      },
    }));
  }, []);

  const handleAddMainImages = (files) => {
    setImages((prev) => [...prev, ...Array.from(files).slice(0, 10 - prev.length)]);
  };

  const handleRemoveMainImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCategoryImages = (category, files) => {
    setCategoryImages((prev) => ({
      ...prev,
      [category]: [...prev[category], ...Array.from(files).slice(0, 10 - prev[category].length)],
    }));
  };

  const handleRemoveCategoryImage = (category, index) => {
    setCategoryImages((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  // --- Submit ---
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      // Basic fields
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "location" && key !== "amenities") fd.append(key, value);
      });

      fd.append("location", JSON.stringify(form.location));
      fd.append(
        "amenities",
        JSON.stringify(form.amenities.split(",").map((a) => a.trim()))
      );

      if (coordinates) {
        fd.append("lat", coordinates.lat);
        fd.append("lng", coordinates.lng);
      } else {
        console.log("No coordinates to submit");
      }

      if (initialData) {
        fd.append("existingImages", JSON.stringify(initialData.images || []));
        fd.append(
          "existingCategoryImages",
          JSON.stringify(initialData.categoryImages || {})
        );
      }

      images.forEach((file) => fd.append("images", file));

      Object.entries(categoryImages).forEach(([category, files]) => {
        files.forEach((file) => fd.append(category, file));
      });

      onSubmit(fd);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Toast messages ---
  useEffect(() => {
    if (message) {
      toast.success(message);
      setHouseMessage(null);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setHouseError(null);
    }
  }, [error]);

  return (
    <form onSubmit={submit} className="space-y-6 text-white">
      {/* TITLE */}
      <div>
        <label className="block mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
          required
        />
      </div>

      {/* PRICE + CURRENCY */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
          />
        </div>
        <div>
          <label className="block mb-1">Currency</label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
          >
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {/* HOUSE TYPE */}
      <div>
        <label className="block mb-1">House Type</label>
        <select
          name="houseType"
          value={form.houseType}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
        >
          {[
            "apartment",
            "bungalow",
            "duplex",
            "studio",
            "mansion",
            "detached",
            "semi-detached",
            "store",
            "event-centre",
            "office",
          ].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* STATUS */}
      <div>
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="under-construction">Under Construction</option>
        </select>
      </div>

      {/* LOCATION */}
      <div className="space-y-4 rounded-lg border border-white/10 p-4">
        <h3 className="text-lg font-medium">Property Location</h3>
        <div className="grid lg:grid-cols-2 gap-4">
          {["country", "state", "lgaOrCountyOrDistrict", "streetAddress"].map(
            (field) => (
              <div key={field}>
                <label className="block mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  name={field}
                  value={form.location[field]}
                  onChange={handleLocationChange}
                  required
                  className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
                />
              </div>
            )
          )}
        </div>
        <div>
          <label className="block mb-2">Verify Address & Pin on Map</label>
          <AddressVerification
            setCoordinates={setCoordinates}
            onAddressDetailsChange={handleAddressDetailsUpdate}
          />
        </div>
      </div>

      {/* AMENITIES */}
      <div>
        <label className="block mb-1">Amenities</label>
        <input
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          placeholder="wifi, parking, water, electricity"
          className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
        />
      </div>

      {/* NUMERIC FIELDS */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          "bedrooms",
          "bathrooms",
          "toilets",
          "kitchens",
          "livingRooms",
          "balconies",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
            />
          </div>
        ))}
      </div>

      {/* GARAGE */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="garage"
          checked={form.garage}
          onChange={handleBooleanChange}
        />
        Garage Available
      </label>

      {/* SIZE + YEAR BUILT */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Size (e.g 120sqm)</label>
          <input
            name="size"
            value={form.size}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Year Built</label>
          <input
            type="number"
            name="yearBuilt"
            value={form.yearBuilt}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
            required
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 resize-none"
          required
        />
      </div>

      {/* MAIN IMAGES */}
      <div>
        <label className="block mb-1 flex items-center gap-2">
          <Upload size={16} /> Main Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleAddMainImages(e.target.files)}
          className="w-full bg-neutral-900 p-3 rounded-lg border border-white/10"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((file, idx) => (
            <div key={idx} className="relative">
              <img
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg border border-white/20"
              />
              <button
                type="button"
                onClick={() => handleRemoveMainImage(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY IMAGES */}
      {["bedrooms", "kitchens", "toilets", "livingRooms", "garage"].map((category) => (
        <div key={category}>
          <label className="block mb-1 capitalize flex items-center gap-2">
            <Upload size={16} /> {category} Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleAddCategoryImages(category, e.target.files)}
            className="w-full bg-neutral-900 p-3 rounded-lg border border-white/10"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {categoryImages[category].map((file, idx) => (
              <div key={idx} className="relative">
                <img
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-lg border border-white/20"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCategoryImage(category, idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 mt-4 bg-teal-500 rounded-lg text-black text-lg font-medium hover:bg-teal-600 transition flex items-center justify-center"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Submit House"}
      </button>
    </form>
  );
} 