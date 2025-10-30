"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";

export default function LandlordSignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter(); // Initialize router

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing in...", form);

    // Simulate authentication (Replace with actual API request)
    setTimeout(() => {
      router.push("/home"); // Navigate to /manage
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">
            Sign In
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
