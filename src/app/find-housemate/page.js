"use client";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

// ─── animation helpers ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── data ────────────────────────────────────────────────────────────────────
const features = [
  {
    title: "Smart Matching",
    description:
      "Our algorithm pairs you with housemates who share your lifestyle, budget, and daily habits.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Verified Profiles",
    description:
      "Every account is ID-checked and reviewed. Connect with real people — no scams, no fakes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Secure & Safe",
    description:
      "End-to-end encrypted messages, report tools, and 24/7 moderation keep every interaction safe.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "HouseMatters helped me find a great housemate in less than a week. The matching felt genuinely personal.",
    name: "Sarah O.",
    role: "Found a housemate in Lagos",
    initials: "SO",
  },
  {
    quote:
      "Super easy to use and very reliable. The verified profiles gave me total peace of mind.",
    name: "John D.",
    role: "Listed his spare room",
    initials: "JD",
  },
  {
    quote:
      "I was nervous about sharing my flat, but HouseMatters made the whole process feel safe and simple.",
    name: "Amara K.",
    role: "Found housemate in Abuja",
    initials: "AK",
  },
];

const steps = [
  { num: "01", label: "Create Your Profile", desc: "Tell us your lifestyle, budget, and preferences in under 3 minutes." },
  { num: "02", label: "Browse Matches", desc: "See curated housemate profiles ranked by compatibility score." },
  { num: "03", label: "Connect & Move In", desc: "Chat securely, agree terms, and move in — all within HouseMatters." },
];

// ─── component ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Floating geometric blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[120px] -right-[120px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_40%_40%,#3b82f633_0%,#3b82f600_70%)] dark:bg-[radial-gradient(circle_at_40%_40%,#3b82f433_0%,#3b82f600_70%)] blur-[60px]" />
        <div className="absolute -bottom-[80px] -left-[80px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_60%_60%,#06b6d422_0%,#06b6d400_70%)] dark:bg-[radial-gradient(circle_at_60%_60%,#06b6d422_0%,#06b6d400_70%)] blur-[80px]" />
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.05] dark:opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

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
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_#3b82f6] dark:shadow-[0_0_8px_#60a5fa] animate-pulse" />
                Housemate Matching Platform
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
                Housemate.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12 font-light"
            >
              Easily connect with like-minded people and find the ideal housemate to share your space — 
              <strong className="text-slate-900 font-semibold"> verified, matched, and stress-free.</strong>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/find-housemate/browse"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                Browse Housemates
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-blue-600 text-blue-600 hover:text-blue-700 hover:border-blue-700 font-bold rounded-full transition-all duration-200 hover:bg-blue-50"
              >
                Create Profile
              </Link>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      <hr className="border-t border-slate-200" />

      {/* ──────────── STATS STRIP ──────────── */}
      <section className="py-16 px-6">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { num: "12K+", label: "Active Profiles" },
              { num: "94%", label: "Match Satisfaction" },
              { num: "7 Days", label: "Avg. Time to Match" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">{s.num}</div>
                <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      <hr className="border-t border-slate-200" />

      {/* ──────────── FEATURES SECTION ──────────── */}
      <section className="py-24 px-6">
        <MaxWidthWrapper>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">Why SpaceHunter</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                Built for <span className="text-blue-600">real</span> people, real living.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Every feature is designed around trust, safety, and genuine compatibility — not just clicks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 gap-6"
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-900">{f.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      <hr className="border-t border-slate-200" />

      {/* ──────────── HOW IT WORKS ──────────── */}
      <section className="py-24 px-6">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">The Process</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Three steps to <span className="text-blue-600">your match.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-1 border border-slate-200 rounded-xl overflow-hidden bg-slate-100">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-white p-12 text-center hover:bg-blue-50 transition-colors duration-300"
              >
                <div className="text-6xl font-black text-slate-200 mb-4">{s.num}</div>
                <h3 className="font-bold text-lg mb-3 text-slate-900">{s.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ──────────── PROFILE + TESTIMONIALS ──────────── */}
      <section className="py-24 px-6">
        <MaxWidthWrapper>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Profile Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">Live Preview</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-12">
                Profiles that <span className="text-blue-600">speak for you.</span>
              </h2>
              <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    AK
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900">Amara K.</div>
                    <div className="text-sm text-slate-500">Lagos, Nigeria — Looking in VI</div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 flex items-center justify-between">
                  <span className="text-sm text-slate-600 font-medium">Compatibility score</span>
                  <span className="text-2xl font-black text-blue-600">94%</span>
                </div>
                <div className="text-sm text-slate-600 mb-4 font-medium">Budget: N80,000 – N120,000 / mo</div>
                <div className="flex flex-wrap gap-2">
                  {["Non-smoker", "Early riser", "Quiet lifestyle", "WFH", "Pet-friendly", "Clean"].map((t) => (
                    <span key={t} className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">User Stories</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-12">
                What our <span className="text-blue-600">community</span> says.
              </h2>
              <div className="space-y-6">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-slate-600 text-base leading-relaxed italic mb-6">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-xs text-blue-600">
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ──────────── CTA SECTION ──────────── */}
      <section className="py-32 px-6">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-16 md:p-24 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-blue-100 text-xs font-bold tracking-widest uppercase mb-4">Ready?</p>
              <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Start your search <span className="text-blue-200">today.</span>
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                Create a free profile and get matched with verified housemates in your city — in days, not weeks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-blue-50 text-blue-600 font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Started — It's Free
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/find-housemate/browse"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white hover:border-blue-100 text-white hover:text-blue-50 font-bold rounded-full transition-all duration-200"
                >
                  Browse Housemates
                </Link>
              </div>
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}