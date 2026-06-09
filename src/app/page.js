"use client";
import { motion } from "framer-motion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { FaHandshake, FaShieldAlt, FaListUl } from "react-icons/fa";
import { TbDeviceMobileSearch, TbMapPin, TbBuildingSkyscraper } from "react-icons/tb";
import { MdOutlineApartment } from "react-icons/md";

/* ─── Floating geometric blobs ─── */
const GeoBg = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* large blue orb top-right */}
    <div className="absolute -top-[120px] -right-[120px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_40%_40%,#3b82f633_0%,#3b82f600_70%)] dark:bg-[radial-gradient(circle_at_40%_40%,#3b82f433_0%,#3b82f600_70%)] blur-[60px]" />
    {/* subtle cyan orb bottom-left */}
    <div className="absolute -bottom-[80px] -left-[80px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_60%_60%,#06b6d422_0%,#06b6d400_70%)] dark:bg-[radial-gradient(circle_at_60%_60%,#06b6d422_0%,#06b6d400_70%)] blur-[80px]" />
    {/* decorative grid lines */}
    <svg className="absolute top-0 left-0 w-full h-full opacity-[0.05] dark:opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

/* ─── Geometric accent shapes ─── */
const HexShape = ({ className }) => (
  <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" className={className}>
    <polygon points="50,5 95,28.75 95,86.25 50,110 5,86.25 5,28.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const RingShape = ({ className }) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" />
  </svg>
);

/* ─── Feature card data ─── */
const features = [
  {
    icon: TbDeviceMobileSearch,
    title: "Smart Space Search",
    desc: "Filter by price, location, and amenities to find spaces that match your lifestyle — studios, offices, event halls, and more.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FaHandshake,
    title: "Trusted Housemate Match",
    desc: "Meet verified housemates with shared interests and budgets. Co-living made safer and genuinely enjoyable.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: FaShieldAlt,
    title: "Verified Listings",
    desc: "Every listing is reviewed. Every renter is screened. Transparent pricing with zero hidden surprises.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: TbMapPin,
    title: "City-Wide Coverage",
    desc: "Discover thousands of listings across your city — from cozy apartments to premium workspaces.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
];

/* ─── Stat data ─── */
const stats = [
  { value: "12K+", label: "Active Listings" },
  { value: "98%", label: "Verified Renters" },
  { value: "4.9", label: "Avg. Rating" },
  { value: "3 min", label: "Avg. Match Time" },
];

/* ─── Space type pills ─── */
const spaceTypes = [
  { icon: MdOutlineApartment, label: "Apartments" },
  { icon: TbBuildingSkyscraper, label: "Offices" },
  { icon: FaListUl, label: "Event Centres" },
  { icon: TbMapPin, label: "Shared Flats" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100">
      <GeoBg />

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Floating decorative shapes */}
      <HexShape className="absolute top-[14%] right-[8%] w-[90px] text-blue-200/50 dark:text-blue-400/20 hidden md:block" />
      <RingShape className="absolute bottom-[20%] left-[5%] w-[110px] text-indigo-200/50 dark:text-indigo-400/20 hidden md:block" />
      <HexShape className="absolute bottom-[30%] right-[4%] w-[55px] text-cyan-200/50 dark:text-cyan-400/20 hidden md:block" />

      {/* ──────────── HERO ──────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <MaxWidthWrapper>
          <div className="relative z-10 max-w-4xl mx-auto text-center">

            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_#3b82f6] dark:shadow-[0_0_8px_#60a5fa]" />
                Smart Space Rentals
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8"
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Space.
              </span>
              <br />
              Meet Your Ideal{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                Housemate.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10 font-light"
            >
              Apartments, offices, event centres, shared flats — 
              <strong className="text-slate-900 dark:text-slate-100 font-semibold italic"> SpaceHunter </strong> 
              connects you with verified spaces and trusted people. Fast, simple, and secure.
            </motion.p>

            {/* Space type pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-2.5 justify-center mb-12"
            >
              {spaceTypes.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all cursor-default shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/auth/sign-in">
                <button className="px-8 py-4 rounded-full bg-blue-600 dark:bg-blue-600 text-white dark:text-white font-bold text-base hover:bg-blue-700 dark:hover:bg-blue-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 active:scale-[0.98] transition-all">
                  Start Hunting Spaces
                </button>
              </Link>
              <Link href="/house-upload">
                <button className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 font-bold text-base hover:bg-blue-50 dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  List Your Space
                </button>
              </Link>
            </motion.div>
          </div>
        </MaxWidthWrapper>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* ──────────── STATS STRIP ──────────── */}
      <section className="px-6 pb-20 -mt-10 relative z-20">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/30"
          >
            {stats.map(({ value, label }, i) => (
              <div key={label} className="bg-white dark:bg-slate-900 p-8 text-center group border-b dark:border-slate-800 md:border-b-0">
                <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                  {value}
                </div>
                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* ──────────── FEATURES ──────────── */}
      <section className="px-6 py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Why SpaceHunter
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Everything you need,<br />
              <span className="text-blue-600 dark:text-blue-400">nothing you don't.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">{title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {desc}
                </p>
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ──────────── CTA BAND ──────────── */}
      <section className="px-6 py-24">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 overflow-hidden text-center shadow-2xl shadow-blue-600/30"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border border-white/10" />
            
            <div className="relative z-10">
              <h2 className="text-white/80 text-xs font-black uppercase tracking-[0.3em] mb-6">
                Join the community
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Start Your Space Hunt Today
              </h3>
              <p className="text-lg text-blue-100 max-w-xl mx-auto mb-10 font-light">
                Join thousands already finding their dream homes and housemates with SpaceHunter.
              </p>
              <Link href="/auth/sign-in">
                <button className="px-10 py-5 bg-white dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full font-black text-lg hover:bg-blue-50 dark:hover:bg-blue-800 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 dark:shadow-black/40">
                  Get Started Free
                </button>
              </Link>
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* ──────────── LIST YOUR SPACE ──────────── */}
      <section className="px-6 py-24 bg-slate-50/50 dark:bg-slate-900/30">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4">
                For Landlords and Owners
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 tracking-tight leading-tight">
                Have a Space to<br />
                <span className="text-blue-600 dark:text-blue-400">Rent Out?</span>
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 font-light leading-relaxed">
                Turn your unused room, apartment, or workspace into steady income. SpaceHunter connects you with
                verified, ready-to-move-in renters. Listing takes just a few minutes.
              </p>
              <Link href="/house-upload">
                <button className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-full font-bold hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
                  List Your Space Now
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 relative overflow-hidden">
                <div className="space-y-4">
                  {[
                    { label: "2-Bed Apartment", loc: "Lagos Island", price: "NGN 180k / mo", tag: "Available", color: "text-green-600", bg: "bg-green-50" },
                    { label: "Private Office", loc: "Victoria Island", price: "NGN 95k / mo", tag: "Hot", color: "text-orange-600", bg: "bg-orange-50" },
                    { label: "Shared Flat Room", loc: "Lekki Phase 1", price: "NGN 60k / mo", tag: "New", color: "text-blue-600", bg: "bg-blue-50" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group hover:border-blue-200 dark:hover:border-blue-600 transition-colors">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.label}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{item.loc}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-blue-600 dark:text-blue-400 text-sm">{item.price}</div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.bg} ${item.color}`}>
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-bold group hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-500 dark:hover:text-blue-400 transition-all cursor-pointer">
                    + Add your listing here
                  </div>
                </div>
              </div>
              {/* Floating accents */}
              <HexShape className="absolute -top-8 -right-8 w-20 h-20 text-blue-100 dark:text-blue-900/50 animate-bounce" />
              <RingShape className="absolute -bottom-8 -left-8 w-16 h-16 text-indigo-100 dark:text-indigo-900/50 animate-pulse" />
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-sm font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
          SpaceHunter — Find spaces. Meet people. Live better.
        </p>
      </footer>
    </main>
  );
}
