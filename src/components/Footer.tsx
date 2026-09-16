"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Shop: [
    { label: "All products", href: "#collection" },
    { label: "Cart", href: "#" },
    { label: "Account", href: "#" },
  ],
  Service: [
    { label: "Track order", href: "#" },
    { label: "Business", href: "#business" },
    { label: "FAQ", href: "#" },
  ],
  Information: [
    { label: "About V", href: "#" },
    { label: "Shipping & returns", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-surface-200 text-warm-gray-400 overflow-hidden">
      {/* Gradient top edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-burgundy-700 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-burgundy-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="font-[var(--font-display)] text-5xl font-light text-warm-gray-300">
                V
              </span>
            </motion.div>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium facial tissues for considered everyday spaces.
            </p>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-warm-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Doha · Qatar
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-warm-gray-500 font-medium mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-burgundy-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-warm-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray-600">
            &copy; 2026 V. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-warm-gray-600">
              Qatar Edition
            </span>
            <button className="text-xs text-warm-gray-500 hover:text-burgundy-400 transition-colors border border-warm-gray-700 rounded-full px-3 py-1 hover:border-burgundy-700">
              العربية
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
