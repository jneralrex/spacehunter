"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeedTabs from "@/components/FeedsTab";
import FeedGrid from "@/components/FeedGrid";
import RightSideBar from "@/components/RightSideBar";
import useLoadingStore from "@/utils/store/useLoading";
import { dashBoardListings } from "@/utils/axios/houseEndPoints";


export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [allListings, setAllListings] = useState([]);
  const [allHousemates, setAllHousemates] = useState([]);
  const {loading, setLoading} = useLoadingStore();

  const tabs = [
    { key: "all", label: "All" },
    { key: "houses", label: " Houses" },
    { key: "housemates", label: " Housemates" },
    { key: "offices", label: " Offices" },
    { key: "stores", label: " Stores" },
  ];

 const sections = {
  houses: allListings.map((house) => ({
    id: house._id,
    title: house.title,
    description: `${house.location.streetAddress}, ${house.location.state}`,
    image: house.images?.[0]?.url,
    href: `/find-house/more-details/${house._id}`,
  })),

  housemates: allHousemates.map((mate) => ({
    id: mate._id,
    title: `${mate.user?.username || "Anonymous"} — Looking for a ${mate.apartmentType}`,
    description: `${mate.location.state}, budget ${mate.currency.toUpperCase()} ${mate.budget}`,
    image: "",
    href: `/find-housemate/browse/user/more-details/${mate._id}`,
  })),

  offices: [],
  stores: [],
};



  const getListings = async () => {
  setLoading(true);
  try {
    const response = await dashBoardListings();
    // Extract only the relevant data
    const { houses, roommates } = response.data;

    setAllListings(houses || []);
    setAllHousemates(roommates || []);
  } catch (error) {
    console.error("all listings error", error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    getListings();
  }, []);

  
  return (
    <>
      <main className="min-h-screen text-green-700 container lg:max-w-[85%] max-w-full lg:ml-auto ">

        <div className=" grid grid-cols-1 sm:flex gap-6 items-center">
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
