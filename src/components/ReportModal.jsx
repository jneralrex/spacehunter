"use client";

import { useState } from "react";
import { X, AlertTriangle, Upload, Loader2 } from "lucide-react";
import { createReport } from "@/utils/axios/reportEndPoints";
import { toast } from "react-toastify";

export default function ReportModal({ isOpen, onClose, targetModel, targetId }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(false);

  const reasons = [
    "Spam",
    "Fraud/Scam",
    "Inappropriate Content",
    "Harassment",
    "Misinformation",
    "Other"
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + evidence.length > 3) {
      toast.error("You can only upload up to 3 evidence images.");
      return;
    }
    setEvidence([...evidence, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      toast.error("Please select a reason for reporting.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("targetModel", targetModel);
      formData.append("targetId", targetId);
      formData.append("reason", reason);
      formData.append("description", description);
      evidence.forEach((file) => {
        formData.append("evidence", file);
      });

      const res = await createReport(formData);
      if (res.success) {
        toast.success(res.message);
        onClose();
        // Reset state
        setReason("");
        setDescription("");
        setEvidence([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-md rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-5 border-b border-white/10 flex justify-between items-center text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Report {targetModel}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-white">
          <div>
            <label className="block text-sm font-medium mb-1">Reason for reporting</label>
            <select
              className="w-full bg-neutral-800 border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-red-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">Select a reason</option>
              {reasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description (Optional)</label>
            <textarea
              className="w-full bg-neutral-800 border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-red-500 min-h-[100px]"
              placeholder="Provide more details about your report..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Evidence Images (Max 3)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {evidence.map((file, i) => (
                <div key={i} className="relative w-16 h-16 rounded border border-white/10 overflow-hidden">
                  <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Preview" />
                  <button
                    type="button"
                    onClick={() => setEvidence(evidence.filter((_, idx) => idx !== i))}
                    className="absolute top-0 right-0 bg-red-600 p-0.5 rounded-bl"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              {evidence.length < 3 && (
                <label className="w-16 h-16 rounded border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-800 transition">
                  <Upload size={16} className="text-neutral-500" />
                  <span className="text-[10px] text-neutral-500">Upload</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            SUBMIT REPORT
          </button>
        </form>
      </div>
    </div>
  );
}
