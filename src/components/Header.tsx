"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const announcements = [
  "QATAR EDITION",
  "Delivery across Qatar",
  "V / 2026",
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#collection" },
  { label: "Track order", href: "#" },
  { label: "About", href: "#" },
  { label: "Business", href: "#business" },
  { label: "FAQ", href: "#" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > 100);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: hidden ? -40 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-burgundy-950 text-cream-200 text-xs tracking-[0.25em] font-medium py-2.5 relative z-50 overflow-hidden border-b border-burgundy-900/50"
      >
        <div className="absolute inset-0 shimmer opacity-20" />
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <span className="hidden sm:block">QATAR EDITION</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentAnnouncement}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="sm:hidden block text-center w-full"
            >
              {announcements[currentAnnouncement]}
            </motion.span>
          </AnimatePresence>
          <span className="hidden sm:block uppercase">
            Delivery across Qatar
          </span>
          <span className="hidden sm:block">V / 2026</span>
        </div>
      </motion.div>

      {/* Main Nav */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-card shadow-lg"
            : "bg-surface-300/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-warm-gray-400 hover:text-burgundy-400 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-burgundy-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Logo */}
          <a href="#" className="flex flex-col items-center gap-0.5 group">
            <motion.span
              className="font-[var(--font-display)] text-4xl lg:text-5xl font-light text-warm-gray-300 group-hover:text-burgundy-400 transition-colors duration-500"
              whileHover={{ scale: 1.05 }}
            >
              V
            </motion.span>
            <span className="text-[10px] tracking-[0.3em] text-warm-gray-500 uppercase">
              Premium facial tissues
            </span>
          </a>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="text-sm text-warm-gray-400 hover:text-burgundy-400 transition-colors border border-warm-gray-700 rounded-full px-4 py-1.5 hover:border-burgundy-700">
              Arabic
            </button>
            <button className="text-sm text-warm-gray-400 hover:text-burgundy-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
            <motion.a
              href="#collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-burgundy-800 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-burgundy-700 transition-colors flex items-center gap-2 glow-burgundy"
            >
              Shop V
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-warm-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden glass-card border-t border-warm-gray-800"
            >
              <nav className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-warm-gray-400 hover:text-burgundy-400 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#collection"
                  className="bg-burgundy-800 text-white text-sm font-medium px-6 py-2.5 rounded-full text-center hover:bg-burgundy-700 transition-colors mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Shop V
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
