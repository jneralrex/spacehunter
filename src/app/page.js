"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { FaHandshake, } from "react-icons/fa";
import { TbDeviceMobileSearch } from "react-icons/tb";
import { JackInTheBox, Roll, Zoom } from "react-awesome-reveal";


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
            <span className="text-green-600">Space</span> or Ideal{" "}
            <span className="text-green-600">Housemate</span>
          </h1>
          <p className="mt-5 text-gray-600 text-lg md:text-xl max-w-[800px] mx-auto ">
            Whether you’re searching for a cozy apartment, a store, top of the art event centre, an office space, or the perfect person
            to share your space with, <strong>SpaceHunter</strong> makes it fast,
            simple, and secure.
          </p>
        </motion.div>

        {/* Info Section */}
        <section className="mt-20 max-w-4xl text-center mx-auto">
          <h2 className="text-4xl md:text-6xl leading-tight font-bold mb-6 text-gray-800">
            Simplify Your Search
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-[600px] mx-auto">
            <strong>SpaceHunter</strong> connects verified renters and homeowners
            in your city. Discover affordable homes, find trusted housemates, and
            enjoy a transparent rental experience — all in one place.
          </p>

          <div className="grid md:grid-cols-2 gap-10 text-left">

            <JackInTheBox
               triggerOnce 
               delay={500} 
               duration={3500} 
               fraction={1}
              >

              <div className="p-6 bg-white/75 backdrop-blur-md border border-green-200 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-green-700 flex items-center gap-2">
                <TbDeviceMobileSearch />
                  Smart House Search
                </h3>
                <p className="text-gray-700">
                  Filter by price, location, and amenities to quickly find homes
                  that match your lifestyle — whether it’s a studio or shared flat.
                </p>
              </div>

              <div className="p-6 bg-white/75 backdrop-blur-md border border-green-200 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-green-700 flex items-center gap-2">
                  <FaHandshake />
                  Trusted Housemate Match
                </h3>
                <p className="text-gray-700">
                  Discover verified housemates with shared interests, budgets, and
                  goals — making co-living easier and safer.
                </p>
              </div>
            </JackInTheBox>

          </div>
        </section>

        {/* Owner Invite Section */}
        <section className="mt-24 max-w-5xl mx-auto text-center bg-white/75 backdrop-blur-md border border-green-200 rounded-3xl shadow-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            <p>Have a Space to Rent Out? </p>
          </motion.h2>
          <p className="text-gray-700 text-[16px] md:text-lg md:max-w-[600px] md:mx-auto mb-8">
            Turn your unused room, apartment, or workspace into income.{" "}
            <strong>SpaceHunter</strong> connects you with trusted renters and
            housemates who are verified and ready to move in. Listing takes just a
            few minutes!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-green-600 text-white p-3 md:px-8  md:py-3 rounded-full font-semibold hover:bg-green-700 transition">
              List My Space
            </button>
            <button className="border border-green-600 text-green-700 p-3  md:px-8  md:py-3 rounded-full font-semibold hover:bg-green-50 transition">
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
        <Roll
          delay={200} 
          duration={1000} 
          fraction={1}
          triggerOnce 
        >
          <section className="mt-20 mx-auto text-center bg-green-600 text-white py-16 px-6 rounded-3xl max-w-4xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Space Hunt Today

            </h2>
            <p className="mb-8 text-lg text-green-100">
              Join thousands already finding their dream homes and housemates with
              <strong> SpaceHunter.</strong>
            </p>

            <Zoom
              delay={1500} 
              duration={1000} 
              fraction={1}
              triggerOnce 
              >
            <Link href='/auth/sign-in'>
              <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition">
                Get Started
              </button>
            </Link>
            </Zoom>
          </section>
        </Roll>
      </MaxWidthWrapper>
    </main>
  );
}
