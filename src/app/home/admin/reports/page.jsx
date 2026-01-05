"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { getAllReports, updateReportStatus } from "@/utils/axios/reportEndPoints";
import useReportStore from "@/utils/store/useReportStore";
import { toast } from "react-toastify";
import { AlertTriangle, CheckCircle, Clock, XCircle, Eye, Loader2, MessageSquare } from "lucide-react";

export default function AdminReports() {
  const { reports, setReports, totalPages, setPagination, loading, setLoading } = useReportStore();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminComments, setAdminComments] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchReports = async (p = 1, st = "") => {
    setLoading(true);
    try {
      const res = await getAllReports(p, 10, st);
      if (res.success) {
        setReports(res.reports);
        setPagination({
          total: res.total,
          totalPages: res.totalPages,
          currentPage: res.currentPage
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(page, status);
  }, [page, status]);

  const handleUpdateStatus = async (reportId, newStatus) => {
    setIsUpdating(true);
    try {
      const res = await updateReportStatus(reportId, newStatus, adminComments);
      if (res.success) {
        toast.success(res.message);
        setAdminComments("");
        setSelectedReport(null);
        fetchReports(page, status);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (st) => {
    switch (st) {
      case "Pending": return <Clock size={16} className="text-yellow-500" />;
      case "Reviewed": return <Eye size={16} className="text-blue-500" />;
      case "Resolved": return <CheckCircle size={16} className="text-green-500" />;
      case "Dismissed": return <XCircle size={16} className="text-neutral-500" />;
      default: return <AlertTriangle size={16} />;
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto p-6 relative">
        <h1 className="text-2xl font-bold mb-6">Report Management</h1>

        {/* Filter */}
        <div className="mb-6">
          <select
            className="bg-neutral-800 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-green-600"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Resolved">Resolved</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-neutral-900/50">
                <th className="p-4">Target</th>
                <th className="p-4">Reporter</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center">
                    <Loader2 className="animate-spin inline-block mr-2" /> Loading reports...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-neutral-400">No reports found.</td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report._id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="p-4">
                      <p className="font-medium text-blue-400 capitalize">{report.targetModel}</p>
                      <p className="text-[10px] text-neutral-500">ID: {report.targetId?._id || report.targetId}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{report.reporter?.username || "Unknown"}</p>
                      <p className="text-[10px] text-neutral-500">{report.reporter?.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-red-600/10 text-red-400 text-xs font-semibold uppercase tracking-wider">
                        {report.reason}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        <span className="text-sm">{report.status}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-neutral-400">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="p-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition flex items-center gap-1 text-xs font-bold"
                      >
                        <Eye size={14} /> VIEW
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for detail view */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-white/20 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <AlertTriangle className="text-red-500" />
                  Report Details
                </h2>
                <button onClick={() => setSelectedReport(null)} className="text-neutral-400 hover:text-white transition">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-neutral-400 uppercase text-[10px] font-bold">Reporter</p>
                    <p>{selectedReport.reporter?.username} ({selectedReport.reporter?.email})</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 uppercase text-[10px] font-bold">Reported Item</p>
                    <p className="capitalize">{selectedReport.targetModel} - {selectedReport.targetId?._id || selectedReport.targetId}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 uppercase text-[10px] font-bold">Reason</p>
                    <p className="text-red-400 font-semibold">{selectedReport.reason}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 uppercase text-[10px] font-bold">Status</p>
                    <p className="flex items-center gap-1">{getStatusIcon(selectedReport.status)} {selectedReport.status}</p>
                  </div>
                </div>

                <div>
                  <p className="text-neutral-400 uppercase text-[10px] font-bold mb-1">Description</p>
                  <div className="bg-neutral-800 p-3 rounded-lg text-sm italic">
                    {selectedReport.description || "No description provided."}
                  </div>
                </div>

                {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                  <div>
                    <p className="text-neutral-400 uppercase text-[10px] font-bold mb-2">Evidence</p>
                    <div className="flex gap-2">
                      {selectedReport.evidence.map((img, i) => (
                        <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="w-24 h-24 rounded border border-white/10 overflow-hidden block">
                          <img src={img.url} className="w-full h-full object-cover" alt="Evidence" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10">
                  <p className="text-neutral-400 uppercase text-[10px] font-bold mb-2">Admin Action</p>
                  <textarea
                    className="w-full bg-neutral-800 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600 mb-4"
                    placeholder="Enter admin comments or notes here..."
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
                    rows={3}
                  />

                  <div className="flex flex-wrap gap-2">
                    {["Reviewed", "Resolved", "Dismissed"].map((st) => (
                      <button
                        key={st}
                        disabled={isUpdating}
                        onClick={() => handleUpdateStatus(selectedReport._id, st)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          st === "Resolved" ? "bg-green-600 hover:bg-green-700 text-white" :
                          st === "Dismissed" ? "bg-red-600 hover:bg-red-700 text-white" :
                          "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {isUpdating ? <Loader2 size={12} className="animate-spin" /> : null}
                        MARK AS {st.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
