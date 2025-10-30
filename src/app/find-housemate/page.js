import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6">
      <MaxWidthWrapper>
       {/* Hero Section */}
       <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find Your Perfect <span className="text-blue-600 dark:text-blue-400">Housemate</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Easily connect with like-minded people and find the ideal housemate to share your space.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="find-housmate/browse"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Browse Housemates
          </Link>
          <Link
            href="/signup"
            className="bg-gray-200 dark:bg-gray-800 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Create Profile
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <Image src={feature.icon} alt={feature.title} width={50} height={50} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold">What Our Users Say</h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm">
              <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.quote}"</p>
              <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold">Start Your Search Today</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Create a free profile and find the right housemate today!
        </p>
        <Link href="/signup">
          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>
      </MaxWidthWrapper>
     

      {/* Footer */}
      {/* <footer className="mt-16 text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} HouseMatters. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

// Feature Data
const features = [
  {
    icon: "/match.png",
    title: "Smart Matching",
    description: "Find housemates with similar interests and lifestyles.",
  },
  {
    icon: "/verified.svg",
    title: "Verified Profiles",
    description: "Connect with real people. No scams, no fakes.",
  },
  {
    icon: "/safety.svg",
    title: "Secure & Safe",
    description: "We prioritize safety and ensure a smooth experience.",
  },
];

// Testimonials Data
const testimonials = [
  {
    quote: "HouseMatters helped me find a great housemate in less than a week!",
    name: "Sarah O.",
  },
  {
    quote: "Super easy to use and very reliable. Highly recommended!",
    name: "John D.",
  },
  {
    quote: "Super easy to use and very reliable. Highly recommended!",
    name: "John D.",
  },
];
