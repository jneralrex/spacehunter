import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingOverlay from "@/components/LoadingOverlay";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spaceehunters - Rent & Buy space with Ease | Verified Listings",
  description:
    "Find affordable houses, apartments, and rental spaces. Verified listings with high-quality images, amenities & pricing. Buy, rent, or invest in real estate today!",
  keywords: [
    "rent houses",
    "rent event centre",
    "rent apartments",
    "rent offices",
    "rent studios",
    "rent stores",
     "buy event centre",
    "buy apartments",
    "rent offices",
    "buy studios",
    "buy stores",
    "buy homes",
    "real estate",
    "rental apartments",
    "verified listings",
    "cheap houses",
    "luxury apartments",
    "property for sale",
  ],
  author: "Spaceehunters",
  creator: "Spaceehunters",
  publisher: "Spaceehunters",
  applicationName: "Spaceehunters",
  robots: "index, follow",
  openGraph: {
    title: "Spaceehunters - Rent & Buy Homes",
    description:
      "Find affordable houses, verified property listings with images, amenities, and pricing.",
    url: "https://spaceehunters.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://spaceehunters.vercel.app/find-housemate/housematters-preview.png",
        width: 1200,
        height: 630,
        alt: "HouseMatters Find affordable houses, apartments, and rental spaces. Verified listings with high-quality images, amenities & pricing. Buy, rent, or invest in real estate today!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@housematters",
    title: "HouseMatters - Rent & Buy Homes",
    description: "Find your dream home with verified listings and affordable rentals.",
    images: ["https://spaceehunters.vercel.app/housematters-preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000]`}
      >
        <LoadingOverlay/>
        {children}
      </body>
    </html>
  );
}
