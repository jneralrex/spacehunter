"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const HouseManagement = () => {
  const [houses, setHouses] = useState([
    {
      id: 1,
      title: "Luxury Apartment",
      location: "Lagos, Nigeria",
      price: "$1,500/month",
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 2,
      title: "Modern Duplex",
      location: "Abuja, Nigeria",
      price: "$2,000/month",
      bedrooms: 4,
      bathrooms: 3,
    },
  ]);

  const handleEdit = (id) => {
    console.log("Edit house:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete house:", id);
    setHouses(houses.filter((house) => house.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">House Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Bedrooms</th>
              <th className="p-3 text-left">Bathrooms</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => (
              <tr key={house.id} className="border-t">
                <td className="p-3">{house.title}</td>
                <td className="p-3">{house.location}</td>
                <td className="p-3">{house.price}</td>
                <td className="p-3">{house.bedrooms}</td>
                <td className="p-3">{house.bathrooms}</td>
                <td className="p-3 flex items-center justify-center gap-3">
                  <button onClick={() => handleEdit(house.id)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(house.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseManagement;
