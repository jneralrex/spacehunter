// src/store/useLoadingStore.js
import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
}));

export default useLoadingStore;
