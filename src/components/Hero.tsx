"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    name: "V 300",
    subtitle: "50 boxes · 4 ply",
    image: "/images/transparent-v-300.png",
  },
  {
    name: "V 600",
    subtitle: "32 boxes · 4 ply",
    image: "/images/transparent-v-600.png",
  },
  {
    name: "V 2000",
    subtitle: "5 bundles · 5 ply",
    image: "/images/transparent-v-2000.png",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background subtle tint */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-burgundy-50/30 rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-burgundy-50/20 rounded-full blur-[180px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(107,29,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(107,29,42,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full">
        {/* Text (centered) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-burgundy-700 font-medium uppercase">
              <span className="w-8 h-[1.5px] bg-burgundy-700" />
              V · Premium Facial Tissues
              <span className="w-8 h-[1.5px] bg-burgundy-700" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[var(--font-display)] text-3xl sm:text-5xl lg:text-7xl font-light leading-[1.1] text-warm-gray-100 mt-6"
          >
            Quiet by design.{" "}
            <span className="gradient-text">Softness you</span> can feel.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-warm-gray-400 max-w-xl mx-auto leading-relaxed mt-4 sm:mt-6"
          >
            Three V tissue formats made from pure paper pulp, presented in matte
            snow white with a restrained burgundy detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <motion.a
              href="#collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-burgundy-700 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-burgundy-600 transition-all glow-burgundy flex items-center gap-2"
            >
              Shop now
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
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </motion.a>
            <motion.a
              href="#collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-8 py-3.5 rounded-full text-sm font-medium text-warm-gray-400 hover:text-burgundy-700 transition-all"
            >
              Explore the collection
            </motion.a>
          </motion.div>
        </div>

        {/* Products row — images + names only */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -10 }}
                className={`cursor-pointer text-center ${i === 2 ? "col-span-2 sm:col-span-1 max-w-[200px] sm:max-w-none mx-auto" : ""}`}
              >
                <div
                  className="relative flex items-center justify-center"
                  style={{ perspective: "800px" }}
                >
                  <motion.div
                    animate={{ rotateY: [-8, 8, -8], rotateX: [3, -3, 3] }}
                    transition={{
                      duration: 5 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-auto h-[160px] sm:h-[220px] object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </div>

                <h3 className="font-[var(--font-display)] text-base sm:text-lg font-medium text-warm-gray-100 mt-3 sm:mt-4">
                  {product.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-warm-gray-500 mt-1 tracking-wider uppercase">
                  {product.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
