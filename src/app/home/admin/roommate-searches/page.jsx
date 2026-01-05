"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { getAllRoommateSearches, suspendRoommateSearch, unsuspendRoommateSearch, deleteRoommateSearch } from "@/utils/axios/adminEndPoints";
import useAdminStore from "@/utils/store/useAdminStore";
import { toast } from "react-toastify";
import { Search, User, Trash2, Ban, CheckCircle, Loader2, MapPin, DollarSign } from "lucide-react";

export default function AdminRoommateSearches() {
  const { roommateSearches, setRoommateSearches, totalPages, currentPage, setPagination, loading, setLoading } = useAdminStore();
  const [page, setPage] = useState(1);

  const fetchSearches = async (p = 1) => {
    setLoading(true);
    try {
      const res = await getAllRoommateSearches(p, 10);
      if (res.success) {
        setRoommateSearches(res.searches);
        setPagination({
          totalUsers: res.totalSearches, // reuse field
          totalPages: res.totalPages,
          currentPage: res.currentPage
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch searches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearches(page);
  }, [page]);

  const handleSuspend = async (id, isSuspended) => {
    try {
      const res = isSuspended ? await unsuspendRoommateSearch(id) : await suspendRoommateSearch(id);
      if (res.success) {
        toast.success(res.message);
        fetchSearches(page);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this roommate search?")) return;
    try {
      const res = await deleteRoommateSearch(id);
      if (res.success) {
        toast.success(res.message);
        fetchSearches(page);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Roommate Search Management</h1>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <Loader2 className="animate-spin inline-block mb-2" size={32} />
              <p>Loading searches...</p>
            </div>
          ) : roommateSearches.length === 0 ? (
            <div className="col-span-full py-20 text-center text-neutral-400">
              No roommate searches found.
            </div>
          ) : (
            roommateSearches.map((search) => (
              <div key={search._id} className="bg-neutral-800 border border-white/10 rounded-xl p-5 hover:border-green-600/50 transition flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center">
                      <User size={24} className="text-neutral-400" />
                    </div>
                    <div>
                      <p className="font-semibold">{search.userId?.username}</p>
                      <p className="text-xs text-neutral-400">{search.userId?.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    search.isSuspended ? "bg-red-600 text-white" : "bg-green-600 text-white"
                  }`}>
                    {search.isSuspended ? "Suspended" : "Active"}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-500" />
                    <span>Budget: <span className="text-white font-medium">${search.budget}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" />
                    <span className="line-clamp-1">Location: {search.location?.state}, {search.location?.country}</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-700 text-neutral-200 capitalize">
                      {search.apartmentType}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                   <p className="text-[10px] text-neutral-500 italic">
                    Posted on {new Date(search.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSuspend(search._id, search.isSuspended)}
                      title={search.isSuspended ? "Unsuspend" : "Suspend"}
                      className={`p-2 rounded-lg transition ${
                        search.isSuspended ? "bg-green-600/20 text-green-400 hover:bg-green-600/30" : "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30"
                      }`}
                    >
                      {search.isSuspended ? <CheckCircle size={18} /> : <Ban size={18} />}
                    </button>
                    <button
                      onClick={() => handleDelete(search._id)}
                      title="Delete"
                      className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition"
                    >
                      <Trash2 size={18} />
                    </button>
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
