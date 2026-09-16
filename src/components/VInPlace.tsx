"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function VInPlace() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden group order-2 lg:order-1">
            <motion.div style={{ scale: imageScale, y: imageY }}>
              <Image
                src="/images/lifestyle-updated.png"
                alt="V 300 tissues in a quiet living space"
                width={800}
                height={600}
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-warm-gray-900/40 via-transparent to-transparent" />

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute bottom-6 left-6 glass-card-dark px-5 py-3 rounded-xl text-white"
            >
              <span className="text-xs tracking-[0.2em] uppercase">
                V in place
              </span>
            </motion.div>
          </div>

          {/* Text */}
          <div ref={textRef} className="space-y-8 order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-burgundy-400 font-medium uppercase"
            >
              <span className="w-8 h-[1.5px] bg-burgundy-500" />
              02 · V in Place
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-[var(--font-display)] text-3xl lg:text-4xl font-light text-cream-50 leading-snug"
            >
              A quiet detail for home, majlis and hospitality spaces
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-warm-gray-400 leading-relaxed"
            >
              The snow-white pack and burgundy line give V a clean presence that
              sits naturally in considered interiors while comfort remains
              central.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <motion.a
                href="#collection"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-burgundy-800 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-burgundy-500 transition-all glow-burgundy"
              >
                Discover V 300
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
