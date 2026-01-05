"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { getAllHouses, suspendHouse, unsuspendHouse, deleteHouse } from "@/utils/axios/adminEndPoints";
import useAdminStore from "@/utils/store/useAdminStore";
import { toast } from "react-toastify";
import { Search, Home, Trash2, Eye, Ban, CheckCircle, Loader2 } from "lucide-react";

export default function AdminHouses() {
  const { houses, setHouses, totalPages, currentPage, setPagination, loading, setLoading } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const fetchHouses = async (p = 1, s = "", st = "") => {
    setLoading(true);
    try {
      const res = await getAllHouses(p, 10, s, st);
      if (res.success) {
        setHouses(res.houses);
        setPagination({
          totalUsers: res.totalHouses, // reuse the field for houses total
          totalPages: res.totalPages,
          currentPage: res.currentPage
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch houses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses(page, searchTerm, status);
  }, [page, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchHouses(1, searchTerm, status);
  };

  const handleSuspend = async (id, isSuspended) => {
    try {
      const res = isSuspended ? await unsuspendHouse(id) : await suspendHouse(id);
      if (res.success) {
        toast.success(res.message);
        fetchHouses(page, searchTerm, status);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this house?")) return;
    try {
      const res = await deleteHouse(id);
      if (res.success) {
        toast.success(res.message);
        fetchHouses(page, searchTerm, status);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto p-6">
        <h1 className="text-2xl font-bold mb-6">House Management</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Search houses by title..."
                className="w-full bg-neutral-800 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-green-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
              Search
            </button>
          </form>

          <select
            className="bg-neutral-800 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-green-600"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <Loader2 className="animate-spin inline-block mb-2" size={32} />
              <p>Loading houses...</p>
            </div>
          ) : houses.length === 0 ? (
            <div className="col-span-full py-20 text-center text-neutral-400">
              No houses found.
            </div>
          ) : (
            houses.map((house) => (
              <div key={house._id} className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden hover:border-green-600/50 transition flex flex-col">
                <div className="relative h-48 w-full bg-neutral-700">
                  {house.images?.[0]?.url ? (
                    <img src={house.images[0].url} alt={house.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                      <Home size={48} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      house.isSuspended ? "bg-red-600 text-white" : "bg-green-600 text-white"
                    }`}>
                      {house.isSuspended ? "Suspended" : "Active"}
                    </span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase bg-blue-600 text-white`}>
                      {house.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold line-clamp-1">{house.title}</h3>
                  <p className="text-sm text-neutral-400 mb-2">
                    {house.location?.streetAddress}, {house.location?.state}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <div>
                      <p className="text-green-500 font-bold">${house.price}</p>
                      <p className="text-[10px] text-neutral-500">Owner: {house.userId?.username}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSuspend(house._id, house.isSuspended)}
                        title={house.isSuspended ? "Unsuspend" : "Suspend"}
                        className={`p-2 rounded-lg transition ${
                          house.isSuspended ? "bg-green-600/20 text-green-400 hover:bg-green-600/30" : "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30"
                        }`}
                      >
                        {house.isSuspended ? <CheckCircle size={18} /> : <Ban size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(house._id)}
                        title="Delete House"
                        className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
