"use client";

import React from "react";
import { usePathname } from "next/navigation";
import useAuthStore from "@/utils/store/useAuthStore";
import ChatWidget from "./ChatWidget"; 

const MainLayout = ({ children }) => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const noNavPaths = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/verify-otp",
    "/auth/resend-otp",
  ];

  const showNav = !noNavPaths.includes(pathname);

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
