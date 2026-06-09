"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import useHouseStore from "@/utils/store/useHouseStore";

export default function FeedGrid({ activeTab, sections }) {
  const { error, setHouseError, message, setHouseMessage } = useHouseStore();

  const allItems = [
    ...sections.houses.map((item) => ({ ...item, type: "house" })),
    ...sections.housemates.map((item) => ({ ...item, type: "housemate" })),
    ...sections.offices.map((item) => ({ ...item, type: "office" })),
    ...sections.stores.map((item) => ({ ...item, type: "store" })),
  ];

  const displayedSections =
    activeTab === "all" ? allItems : sections[activeTab] || [];

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      setHouseError(null);
    }
  }, [error, setHouseError]);

  // Show success/message toast
  useEffect(() => {
    if (message) {
      toast.success(message);
      setHouseMessage(null);
    }
  }, [message, setHouseMessage]);

  return (
    <section className="min-h-screen overflow-y-auto px-2 hide-scrollbar mb-10 md:mb-5 bg-white dark:bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
        >
          {displayedSections.map((section) => (
            <Link href={section.href} key={`${section.type}-${section.id}`} className="block h-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="h-full flex flex-col cursor-pointer shadow-md rounded-2xl overflow-hidden border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg transition-all"
              >
                <div className="relative w-full h-40 bg-slate-100 dark:bg-slate-800 shrink-0">
                  {section.image ? (
                    <Image
                      src={section.image}
                      alt={section.title || "Listing image"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">{section.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{section.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
