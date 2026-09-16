"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const sliderRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(1);
      return;
    }
    setScrollProgress(el.scrollLeft / maxScroll);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-start overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-burgundy-900/40 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-burgundy-950/60 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-surface-50/30 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(107,29,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(107,29,42,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full"
      >
        {/* ── Text (centered) ── */}
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-burgundy-400 font-medium uppercase">
              <span className="w-8 h-[1.5px] bg-burgundy-500" />
              V · Premium Facial Tissues
              <span className="w-8 h-[1.5px] bg-burgundy-500" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] text-cream-50 mt-6"
          >
            Quiet by design.{" "}
            <span className="gradient-text">Softness you</span> can feel.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-warm-gray-400 max-w-xl mx-auto leading-relaxed mt-6"
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
              className="glass-card px-8 py-3.5 rounded-full text-sm font-medium text-warm-gray-300 hover:text-burgundy-400 transition-all"
            >
              Explore the collection
            </motion.a>
          </motion.div>
        </div>

        {/* ── Horizontal Product Slider ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-4 pb-8"
        >
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 min-w-[280px] cursor-pointer text-center"
              >
                {/* Image — open, no container */}
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
                      className="w-auto h-[220px] object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </div>

                {/* Name below */}
                <h3 className="font-[var(--font-display)] text-lg font-medium text-cream-50 mt-4">
                  {product.name}
                </h3>
                <p className="text-[11px] text-warm-gray-500 mt-1 tracking-wider uppercase">
                  {product.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div className="max-w-xs mx-auto mt-6 h-[2px] bg-warm-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-burgundy-500 rounded-full"
              style={{ width: `${Math.max(scrollProgress * 100, 10)}%` }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
