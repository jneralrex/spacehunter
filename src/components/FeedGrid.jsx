"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FeedGrid({ activeTab, sections }) {
  const allItems = [
    ...sections.houses.map((item) => ({ ...item, type: "house" })),
    ...sections.housemates.map((item) => ({ ...item, type: "housemate" })),
    ...sections.offices.map((item) => ({ ...item, type: "office" })),
    ...sections.stores.map((item) => ({ ...item, type: "store" })),
  ];

  const displayedSections =
    activeTab === "all" ? allItems : sections[activeTab] || [];

  return (
    <section className="min-h-screen overflow-y-auto px-2 hide-scrollbar mb-10 md:mb-5">
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
            <Link href={section.href} key={`${section.type}-${section.id}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden border border-green-100 hover:shadow-lg transition-all"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">{section.title}</h2>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
