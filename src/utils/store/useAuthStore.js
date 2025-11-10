import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      message: null,
      email: null,
      error: null,

      // Actions
      setTokens: ({ accessToken }) =>
        set({ accessToken }),
      setUser: (user) => set({ user }),
      setEmail: (email) => set({ email }),
      setMessage: (message) => set({ message }),
      setError: (error) => set({error}),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage", // saves in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;