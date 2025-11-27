'use client'
import LeftSidebar from "@/components/LeftSideBar";
import MaxWidthWrapperSecond from "@/components/MaxWidthWrapperSecond";
import NotificationLoader from "@/utils/loader/NotificationLoader";
import { useState } from "react";

export default function HomeLayOut({ children }) {
    const [activeTab, setActiveTab] = useState("all");

    const tabs = [
        { key: "all", label: "🏠 All" },
        { key: "houses", label: "🏡 Houses" },
        { key: "housemates", label: "🤝 Housemates" },
        { key: "offices", label: "🏢 Offices" },
        { key: "stores", label: "🛍️ Stores" },
    ];

    return (
        <MaxWidthWrapperSecond>
            <div className="">
                <NotificationLoader/>
                <LeftSidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
               
                <main className="flex-1">{children}</main>
            </div>
        </MaxWidthWrapperSecond>
    );
}
