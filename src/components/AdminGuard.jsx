"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/store/useAuthStore";

export default function AdminGuard({ children }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/home");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null; 
  }

  return children;
}
