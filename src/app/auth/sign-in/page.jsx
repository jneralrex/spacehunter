"use client";

import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { useForm } from "react-hook-form";
import useLoadingStore from "@/utils/store/useLoading";
import { logUserIn } from "@/utils/axios/authEndPoints";

export default function LandlordSignIn() {
  const { register, handleSubmit } = useForm();
  const router = useRouter(); 
  const { loading, setLoading } = useLoadingStore();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const user = await logUserIn(formData);
      if (!user) return;
      router.push("/home");
    } catch (error) {
      console.error("Sign-in failed:", error?.response?.data?.error?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="youremail@email.com"
            type="email"
            {...register("email")}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            required
            className="w-full p-3 border rounded-md"
          />
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-2 rounded-md text-white ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-green-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
