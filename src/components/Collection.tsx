"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "V 300",
    subtitle: "Tissues",
    description: "An elegant size for living spaces and offices",
    specs: ["4 ply", "18 × 20 cm", "Carton · 5 bundles · 50 boxes"],
    image: "/images/transparent-v-300.png",
    color: "bg-surface-100",
  },
  {
    name: "V 600",
    subtitle: "Tissues",
    description: "A practical balance of quantity and softness",
    specs: ["4 ply", "18 × 20 cm", "Carton · 4 bundles · 32 boxes"],
    image: "/images/transparent-v-600.png",
    color: "bg-surface-100",
  },
  {
    name: "V 2000",
    subtitle: "Tissues",
    description: "The larger format for daily use and hospitality",
    specs: ["5 ply", "17.5 × 17.5 cm", "Carton · 5 bundles"],
    image: "/images/transparent-v-2000.png",
    color: "bg-surface-100",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // 3D rotation like hero
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { rotateY: -12, rotateX: 4 },
      {
        rotateY: 12,
        rotateX: -4,
        duration: 5 + index * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }
    );
  });

  return (
    <div ref={cardRef} className="opacity-0 h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group cursor-pointer h-full flex flex-col items-center text-center"
      >
        {/* Image — open, no container */}
        <div
          className="relative mx-auto"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={imageRef}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-auto h-[280px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Info below image */}
        <div className="mt-6 flex flex-col flex-1 items-center">
          <span className="text-[10px] tracking-[0.2em] text-burgundy-400 font-medium uppercase mb-2">
            0{index + 1}
          </span>
          <h3 className="font-[var(--font-display)] text-2xl font-medium text-cream-50">
            {product.name}
          </h3>
          <span className="text-sm text-warm-gray-400 mt-1">
            {product.subtitle}
          </span>
          <p className="text-sm text-warm-gray-500 mt-3 max-w-[260px]">
            {product.description}
          </p>

          {/* Specs */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6 flex-1">
            {product.specs.map((spec) => (
              <span
                key={spec}
                className="text-xs bg-surface-200 text-warm-gray-400 px-3 py-1.5 rounded-full border border-warm-gray-800"
              >
                {spec}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-burgundy-800 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-burgundy-500 transition-colors duration-300 flex items-center justify-center gap-2 glow-burgundy"
          >
            Choose product
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Collection() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="collection" className="py-24 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-burgundy-950/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-burgundy-400 font-medium uppercase mb-6"
          >
            <span className="w-8 h-[1.5px] bg-burgundy-500" />
            01 · The Collection
            <span className="w-8 h-[1.5px] bg-burgundy-500" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-[var(--font-display)] text-4xl lg:text-5xl font-light text-cream-50 mb-5"
          >
            Choose the <span className="gradient-text italic">V</span> for your
            space
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-warm-gray-500 leading-relaxed"
          >
            Three formats, one restricted identity. Specifications and packing
            come directly from the approved store catalogue.
          </motion.p>
        </div>

        {/* Product row — full width, horizontal scroll on small screens */}
        <div
          className="flex gap-8 overflow-x-auto scrollbar-hide px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, i) => (
            <div key={product.name} className="flex-1 min-w-[280px]">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
