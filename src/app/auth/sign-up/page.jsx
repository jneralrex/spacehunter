"use client";

import { useState } from "react";
import Link from "next/link";
import { regUser } from "@/utils/axios/authEndPoints";
import useLoadingStore from "@/utils/store/useLoading";
import useAuthStore from "@/utils/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LandlordSignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { loading, setLoading } = useLoadingStore();
  const { error, setError } = useAuthStore();
  const { message, setMessage } = useAuthStore();
  const router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up...", form);
    setError(null);
    setMessage(null);
    setLoading(true)
    try {

      const confirm = await regUser(form);

      if(error) return
      router.push("/auth/verify-otp")
      console.log("Registered user:", confirm);

    } catch (error) {
      console.error("error", error);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {error ? (<span className="text-red-700">{error}</span>
        ) : (<span className="text-green-700">{message}</span>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-3 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-3 border rounded-md"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border rounded-md"
          />
          <button disabled={loading} type="submit" className={`${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600"} w-full  text-white py-2 rounded-md`}>
            {loading ? "  Signing up" : "Sign up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-green-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
