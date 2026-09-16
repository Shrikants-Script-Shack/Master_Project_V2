"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function HotelsBusiness() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="business"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Dark background panel */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-surface-100 -skew-y-1 scale-105 origin-top-left border-y border-warm-gray-800/30"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef} className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-burgundy-400 font-medium uppercase"
            >
              <span className="w-8 h-[1.5px] bg-burgundy-400" />
              03 · Hotels & Business
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-[var(--font-display)] text-3xl lg:text-4xl font-light text-white leading-snug"
            >
              Supply shaped around your{" "}
              <span className="text-burgundy-400 italic">operation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-warm-gray-400 leading-relaxed"
            >
              Share your business profile and expected volume so the sales team
              can review the inquiry and prepare the relevant commercial offer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-burgundy-800 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-burgundy-700 transition-all glow-burgundy"
              >
                Request a commercial offer
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
              </motion.button>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/transparent-v-600.png"
                alt="V 600 Tissues for business"
                width={600}
                height={600}
                className="w-full h-auto"
              />
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-warm-gray-900/30 to-transparent" />
            </div>

            {/* Business badge */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 glass-card-dark text-white px-5 py-3 rounded-xl"
            >
              <div className="text-xs tracking-[0.15em] uppercase font-medium">
                B2B Supply
              </div>
              <div className="text-[10px] text-warm-gray-400 mt-0.5">
                Hotels · Offices · Hospitality
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
