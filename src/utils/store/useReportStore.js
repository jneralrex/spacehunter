import { create } from "zustand";

const useReportStore = create((set) => ({
  reports: [],
  currentReport: null,
  totalReports: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  message: null,

  setReports: (reports) => set({ reports }),
  setCurrentReport: (report) => set({ currentReport: report }),
  setPagination: (data) => set({
    totalReports: data.total || 0,
    totalPages: data.totalPages || 0,
    currentPage: data.currentPage || 1
  }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMessage: (message) => set({ message }),

  clearMessages: () => set({ error: null, message: null }),
}));

export default useReportStore;
