import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
   {/* Hero Section */}
   <section className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/hero-house.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h1 className="text-4xl font-bold leading-tight">
            Rent Out Your Home <br /> <span className="text-green-400">Hassle-Free</span>
          </h1>
          <p className="mt-4 text-lg">
            List your property in minutes and connect with verified tenants.
          </p>
          <Link
          href="/auth/sign-in"
          className={buttonVariants({ size: "lg", className: "mt-6 inline-flex gap-2" })}
          >
            Upload Your House <ArrowRight className="ml-1.5 size-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <MaxWidthWrapper>
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800">Why List With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {/* Feature 1 */}
            <div className="p-6 bg-white shadow-md rounded-lg text-center">
              <Image
                src="/icons/rent.svg"
                alt="Easy Listing"
                width={64}
                height={64}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">Easy Listing</h3>
              <p className="text-gray-600 mt-2">
                List your house in just a few simple steps.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white shadow-md rounded-lg text-center">
              <Image
                src="/icons/verified-tenants.svg"
                alt="Verified Tenants"
                width={64}
                height={64}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">Verified Tenants</h3>
              <p className="text-gray-600 mt-2">
                Get matched with reliable and trustworthy renters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white shadow-md rounded-lg text-center">
              <Image
                src="/icons/fast-approvals.svg"
                alt="Fast Approvals"
                width={64}
                height={64}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">Fast Approvals</h3>
              <p className="text-gray-600 mt-2">
                Your property gets listed instantly for quick bookings.
              </p>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>

      {/* Call to Action Section */}
      <section className="bg-green-600 py-12 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to Rent Out Your House?</h2>
        <p className="mt-2 text-lg">Join thousands of homeowners who trust us.</p>
        <Link
          href="/auth/sign-in"
          className={buttonVariants({ size: "lg", className: "mt-4 inline-flex gap-2 text-green-600" })}
        >
          Upload Your House <ArrowRight className="ml-1.5 size-5" />
        </Link>
      </section>
    </div>
  );
}
