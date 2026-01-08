'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useAuthStore from "@/utils/store/useAuthStore";

export default function WithLayout({ children }) {
  const { user } = useAuthStore();

  return (
    <>
      {(!user || !user.id) && <Navbar />}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
