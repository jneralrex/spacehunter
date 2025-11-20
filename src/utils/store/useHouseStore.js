import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHouseStore = create(
  persist(
    (set) => ({
      message: null,
      error: null,

      // Actions
      setHouseMessage: (message) => set({ message }),
      setHouseError: (error) => set({ error }),
      
    }),
    {
      name: "house-storage", // saves in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useHouseStore;