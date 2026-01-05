import { create } from "zustand";

const useAdminStore = create((set) => ({
  users: [],
  houses: [],
  roommateSearches: [],
  totalUsers: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  message: null,

  setUsers: (users) => set({ users }),
  setHouses: (houses) => set({ houses }),
  setRoommateSearches: (searches) => set({ roommateSearches: searches }),
  setPagination: (data) => set({
    totalUsers: data.totalUsers || 0,
    totalPages: data.totalPages || 0,
    currentPage: data.currentPage || 1
  }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMessage: (message) => set({ message }),

  clearMessages: () => set({ error: null, message: null }),
}));

export default useAdminStore;
