"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import useAuthStore from "@/utils/store/useAuthStore";
import ChatWidget from "./ChatWidget"; 
import { getCurrentUser } from "@/utils/axios/userEndPoints";

const MainLayout = ({ children }) => {
  const { user, accessToken, setUser } = useAuthStore();
  const pathname = usePathname();

  const noNavPaths = [
    "/",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/verify-otp",
    "/auth/resend-otp",
  ];

  const showNav = !noNavPaths.includes(pathname);

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken && !user) {
        try {
          const res = await getCurrentUser();
          setUser(res.user);
        } catch (error) {
          console.error("Failed to fetch user in layout:", error);
        }
      }
    };
    fetchUser();
  }, [accessToken, user, setUser]);

  return (
    <>
      <div className="flex justify-between">
        <main className="flex-1">
            {children}
        </main>
      </div>
      {showNav && user && <ChatWidget />}
    </>
  );
};

export default MainLayout;
