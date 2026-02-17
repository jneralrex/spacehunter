"use client";

import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { useForm } from "react-hook-form";
import useLoadingStore from "@/utils/store/useLoading";
import { logUserIn } from "@/utils/axios/authEndPoints";
import useAuthStore from "@/utils/store/useAuthStore";
import { useEffect, useState } from "react";

export default function LandlordSignIn() {
  const { register, handleSubmit } = useForm();
  const router = useRouter(); 
  const { loading, setLoading } = useLoadingStore();
  const { error } = useAuthStore();
  const [showGuestMessage, setShowGuestMessage] = useState(true);
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const user = await logUserIn(formData);
      if (!user) return;
      
      if (user.role === "admin") {
        router.push("/home/admin");
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("Sign-in failed:", error?.response?.data?.error?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    useAuthStore.getState().setError("");
    
    const timer = setTimeout(() => {
      setShowGuestMessage(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {showGuestMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="bg-green-50 border border-blue-200 text-green-800 px-6 py-4 rounded-lg shadow-lg max-w-md">
            <p className="font-semibold text-sm mb-2">👋 Welcome, Guest!</p>
            <p className="text-sm mb-3">
              Prefer to explore first? Use these demo credentials to experience the platform:
            </p>
            <div className="bg-white bg-opacity-70 rounded p-2 text-xs font-mono space-y-1 border border-blue-100">
              <p><span className="font-semibold">Email:</span> testcase@gmail.com</p>
              <p><span className="font-semibold">Password:</span> Testcase14@</p>
            </div>
            <p className="text-xs mt-2">Demo credentials are for testing purposes only, you can also go to the settings page change the role to "owner" to have a feel of the Landlord role.</p>
          </div>
        </div>
      )}
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Sign In</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error + " " + "Please try again."}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="youremail@email.com"
            type="email"
            {...register("email")}
            className="w-full p-3 border rounded-md text-black"
            required
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            required
            className="w-full p-3 border rounded-md text-black"
          />
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-2 rounded-md text-white ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-black">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-green-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
