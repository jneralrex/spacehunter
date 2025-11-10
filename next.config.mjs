/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Add more if needed:
      // { protocol: "https", hostname: "example.com" },
    ],
  },};

export default nextConfig;
