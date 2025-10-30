"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FeedTabs from "@/components/FeedsTab";
import FeedGrid from "@/components/FeedGrid";
import RightSideBar from "@/components/RightSideBar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";


export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: "All" },
    { key: "houses", label: " Houses" },
    { key: "housemates", label: " Housemates" },
    { key: "offices", label: " Offices" },
    { key: "stores", label: " Stores" },
  ];

  const sections = {
    houses: [
      {
        id: 1,
        title: "2-Bedroom Apartment in Ikeja",
        description: "Spacious and modern apartment close to the city center.",
        image: "/house-1.jpeg",
        href: "/find-house/more-details/1",
      },
      {
        id: 2,
        title: "Luxury Duplex in Lekki",
        description: "Fully furnished home with 24/7 power and security.",
        image: "/house-2.jpeg",
        href: "/find-house/more-details/2",
      },
    ],
    housemates: [
      {
        id: 1,
        title: "Sarah O. — Looking for a flatmate in Surulere",
        description: "2-bedroom apartment, ₦150k per month, female preferred.",
        image: "/images/user-2.png",
        href: "/find-housemate/browse/user/more-details/1",
      },
      {
        id: 2,
        title: "John D. — Looking for a flatmate in Abuja",
        description: "Work-from-home professional looking for a quiet place.",
        image: "/images/user-1.png",
        href: "/find-housemate/browse/user/more-details/2",
      },
    ],
    offices: [
      {
        id: 1,
        title: "Coworking Space - Yaba",
        description: "Flexible plans for startups and freelancers.",
        image: "/images/office.jpg",
        href: "/find-house/more-details/1",
      },
    ],
    stores: [
      {
        id: 1,
        title: "Shop for Rent in Ikeja Plaza",
        description: "Perfect for fashion or electronics business.",
        image: "/images/store.jpg",
        href: "/stores/1",
      },
    ],
  };

  return (
    <>
      <main className="min-h-screen text-green-700 max-w-[1000px] ml-auto sm:bg-green-300 md:bg-red-300 lg:bg-blue-300 xl:bg-amber-300">

        <div className=" grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6 items-center">
          <section className="max-h-screen overflow-y-auto hide-scrollbar grid grid-cols-1 md:ml-6">
            <header className="sticky top-0 bg-white/80 backdrop-blur-lg py-4 md:rounded-b-lg border-b border-green-100 z-10 overflow-x-auto overflow-y-hidden h-[60px] max-w-[800px] flex items-center lg:m-auto px-3">
              <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            </header>
           <div className="">
             <FeedGrid activeTab={activeTab} sections={sections} />
           </div>
          </section>
          <RightSideBar router={router} />
        </div>
      </main>
    </>
  );
}
