"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const formats = [
  {
    name: "V 300",
    ply: "4 ply",
    sheets: "300",
    size: "18 × 20 cm",
    highlight: false,
  },
  {
    name: "V 600",
    ply: "4 ply",
    sheets: "600",
    size: "18 × 20 cm",
    highlight: true,
  },
  {
    name: "V 2000",
    ply: "5 ply",
    sheets: "2000",
    size: "17.5 × 17.5 cm",
    highlight: false,
  },
];

export default function FormatGuide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-300 via-burgundy-950/30 to-surface-300 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-burgundy-400 font-medium uppercase mb-6"
          >
            <span className="w-8 h-[1.5px] bg-burgundy-500" />
            Format Guide
            <span className="w-8 h-[1.5px] bg-burgundy-500" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-[var(--font-display)] text-4xl lg:text-5xl font-light text-cream-50 mb-5"
          >
            Three sizes. A{" "}
            <span className="gradient-text italic">clearer</span> choice.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-warm-gray-400 leading-relaxed"
          >
            Compare sheet count and ply before opening the product page.
          </motion.p>
        </div>

        {/* Format cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {formats.map((format, i) => (
            <motion.div
              key={format.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className={`rounded-2xl p-8 text-center transition-all duration-300 ${
                  format.highlight
                    ? "bg-burgundy-800 text-white shadow-xl glow-burgundy"
                    : "glass-card"
                }`}
              >
                <div
                  className={`text-5xl font-[var(--font-display)] font-light mb-2 ${
                    format.highlight ? "text-white" : "text-burgundy-400"
                  }`}
                >
                  {format.sheets}
                </div>
                <div
                  className={`text-xs tracking-[0.2em] uppercase mb-6 ${
                    format.highlight
                      ? "text-burgundy-200"
                      : "text-warm-gray-500"
                  }`}
                >
                  sheets
                </div>

                <div
                  className={`font-semibold text-lg mb-1 ${
                    format.highlight ? "text-white" : "text-cream-50"
                  }`}
                >
                  {format.name}
                </div>

                <div className="flex flex-col gap-1.5 mt-4">
                  <span
                    className={`text-sm ${
                      format.highlight
                        ? "text-burgundy-200"
                        : "text-warm-gray-400"
                    }`}
                  >
                    {format.ply}
                  </span>
                  <span
                    className={`text-sm ${
                      format.highlight
                        ? "text-burgundy-200"
                        : "text-warm-gray-400"
                    }`}
                  >
                    {format.size}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-6 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    format.highlight
                      ? "bg-white text-burgundy-800 hover:bg-cream-100"
                      : "bg-burgundy-800 text-white hover:bg-burgundy-700 glow-burgundy"
                  }`}
                >
                  View product
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
