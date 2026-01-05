"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { getAllUsers, suspendUser, unsuspendUser, deleteUser } from "@/utils/axios/adminEndPoints";
import useAdminStore from "@/utils/store/useAdminStore";
import { toast } from "react-toastify";
import { Search, UserMinus, UserCheck, Trash2, Loader2 } from "lucide-react";

export default function AdminUsers() {
  const { users, setUsers, totalPages, currentPage, setPagination, loading, setLoading } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const fetchUsers = async (p = 1, s = "") => {
    setLoading(true);
    try {
      const res = await getAllUsers(p, 10, s);
      if (res.success) {
        setUsers(res.users);
        setPagination({
          totalUsers: res.totalUsers,
          totalPages: res.totalPages,
          currentPage: res.currentPage
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, searchTerm);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(1, searchTerm);
  };

  const handleSuspend = async (id, isBlocked) => {
    try {
      const res = isBlocked ? await unsuspendUser(id) : await suspendUser(id);
      if (res.success) {
        toast.success(res.message);
        fetchUsers(page, searchTerm);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user? This action is permanent.")) return;
    try {
      const res = await deleteUser(id);
      if (res.success) {
        toast.success(res.message);
        fetchUsers(page, searchTerm);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto p-6">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search by username or email..."
              className="w-full bg-neutral-800 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-green-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
            Search
          </button>
        </form>

        {/* Table */}
        <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-neutral-900/50">
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center">
                    <Loader2 className="animate-spin inline-block mr-2" /> Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-neutral-400">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden">
                          {user.profilePics?.url ? (
                            <img src={user.profilePics.url} alt={user.username} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold uppercase">
                              {user.username[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-xs text-neutral-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="capitalize px-2 py-1 rounded bg-blue-600/20 text-blue-400 text-xs font-semibold">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.isBlocked ? (
                        <span className="px-2 py-1 rounded bg-red-600/20 text-red-400 text-xs font-semibold">Suspended</span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-green-600/20 text-green-400 text-xs font-semibold">Active</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-neutral-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSuspend(user._id, user.isBlocked)}
                          title={user.isBlocked ? "Unsuspend" : "Suspend"}
                          className={`p-2 rounded-lg transition ${
                            user.isBlocked ? "bg-green-600/20 text-green-400 hover:bg-green-600/30" : "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30"
                          }`}
                        >
                          {user.isBlocked ? <UserCheck size={18} /> : <UserMinus size={18} />}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          title="Delete User"
                          className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-4">
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
