"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import useAuthStore from "@/utils/store/useAuthStore";

const Navbar = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const [isFindingHousemate, setIsFindingHousemate] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setIsFindingHousemate((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            spacee <span className="text-green-600">hunters</span>
          </Link>

          <div className="h-full flex items-center space-x-2">
            {user ? (
              <>
                <Link
                  href="/auth/logout"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign Out
                </Link>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Dashboard ✨
                  </Link>
                )}
                <Link
                  href="/find-housemate/browse"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Find Housemate
                  <ArrowRight className="ml-1.5 size-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Login
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                {/* Dynamic Sliding Button */}
                <Link
                  href={
                    isFindingHousemate
                      ? "/find-housemate/browse"
                      : "/find-house/browse"
                  }
                  className={buttonVariants({
                    size: "sm",
                    className:
                      "hidden sm:flex items-center gap-1 max-w-[145px] transition-all duration-500",
                  })}
                >
                  {isFindingHousemate ? "Find Housemate" : "Upload House"}
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
