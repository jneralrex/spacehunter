"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <main className="font-sans bg-gradient-to-b from-white via-white/80 to-green-50 min-h-screen px-6 py-20 flex flex-col items-center justify-center text-center text-gray-800">
      <MaxWidthWrapper>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find Your Perfect{" "}
            <span className="text-green-600">Home</span> or Ideal{" "}
            <span className="text-green-600">Housemate</span> 🏠
          </h1>
          <p className="mt-5 text-gray-600 text-lg md:text-xl">
            Whether you’re searching for a cozy apartment or the perfect person
            to share your space with, <strong>SpaceHunter</strong> makes it fast,
            simple, and secure.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 w-full max-w-3xl mx-auto bg-white/75 backdrop-blur-md border border-green-200 shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3"
        >
          <select className="p-3 bg-transparent border border-green-300 rounded-lg text-gray-800 w-full sm:w-1/4 outline-none focus:ring-2 focus:ring-green-500">
            <option>Find a House</option>
            <option>Find a Housemate</option>
          </select>
          <input
            type="text"
            placeholder="Enter location..."
            className="p-3 bg-transparent border border-green-300 rounded-lg w-full sm:flex-1 outline-none placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Budget range (₦)"
            className="p-3 bg-transparent border border-green-300 rounded-lg w-full sm:w-1/4 outline-none placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto hover:bg-green-700 transition font-semibold">
            Search
          </button>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 mx-auto max-w-2xl"
        >
          <Image
            src="/housemate.png"
            alt="House and Housemates"
            width={700}
            height={400}
            className="rounded-xl opacity-95"
          />
        </motion.div>

        {/* Info Section */}
        <section className="mt-20 max-w-4xl text-center mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-green-700">
            Simplify Your Search
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            <strong>SpaceHunter</strong> connects verified renters and homeowners
            in your city. Discover affordable homes, find trusted housemates, and
            enjoy a transparent rental experience — all in one place.
          </p>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="p-6 bg-white/75 backdrop-blur-md border border-green-200 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-green-700">
                🔍 Smart House Search
              </h3>
              <p className="text-gray-700">
                Filter by price, location, and amenities to quickly find homes
                that match your lifestyle — whether it’s a studio or shared flat.
              </p>
            </div>

            <div className="p-6 bg-white/75 backdrop-blur-md border border-green-200 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-green-700">
                🤝 Trusted Housemate Match
              </h3>
              <p className="text-gray-700">
                Discover verified housemates with shared interests, budgets, and
                goals — making co-living easier and safer.
              </p>
            </div>
          </div>
        </section>

        {/* Owner Invite Section */}
        <section className="mt-24 max-w-5xl mx-auto text-center bg-white/75 backdrop-blur-md border border-green-200 rounded-3xl shadow-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-green-700"
          >
            Have a House or Space to Rent Out? 🏡
          </motion.h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            Turn your unused room, apartment, or workspace into income.{" "}
            <strong>SpaceHunter</strong> connects you with trusted renters and
            housemates who are verified and ready to move in. Listing takes just a
            few minutes!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
              List My Space
            </button>
            <button className="border border-green-600 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition">
              Learn More
            </button>
          </div>

          <div className="mt-10 flex justify-center">
            <Image
              src="/house-1.jpeg"
              alt="List Your Space Illustration"
              width={600}
              height={350}
              className="rounded-lg opacity-95"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 mx-auto text-center bg-green-600 text-white py-16 px-6 rounded-3xl max-w-4xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Space Hunt Today 🚀
          </h2>
          <p className="mb-8 text-lg text-green-100">
            Join thousands already finding their dream homes and housemates with
            <strong> SpaceHunter.</strong>
          </p>
          <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition">
            Get Started
          </button>
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
