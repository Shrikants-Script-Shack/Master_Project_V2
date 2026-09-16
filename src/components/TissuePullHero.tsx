"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-driven tissue pull: as the user scrolls past the hero,
 * a tissue visually rises out of the product box slot.
 * Built entirely with CSS shapes — no extra images needed.
 */
export default function TissuePullHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  // Tissue pull: starts tucked inside the box, rises as you scroll
  const tissueY = useTransform(scrollYProgress, [0, 0.5], [0, -180]);
  const tissueRotate = useTransform(scrollYProgress, [0, 0.5], [0, -3]);
  const tissueScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.95, 1, 1.02]);
  const tissueOpacity = useTransform(scrollYProgress, [0, 0.05, 0.45, 0.6], [0.6, 1, 1, 0]);

  // Subtle box lift as tissue pulls
  const boxY = useTransform(scrollYProgress, [0, 0.3], [0, 3]);

  // Second tissue peeking behind
  const tissue2Y = useTransform(scrollYProgress, [0.1, 0.5], [0, -90]);
  const tissue2Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.5, 0.6], [0, 0.4, 0.4, 0]);

  return (
    <div
      ref={wrapperRef}
      className="absolute right-[5%] lg:right-[10%] bottom-[15%] z-20 pointer-events-none hidden lg:block"
    >
      <div className="relative w-[200px] h-[280px]">
        {/* Shadow under box */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160px] h-[20px] bg-warm-gray-900/10 rounded-full blur-md" />

        {/* Second tissue (peeking behind) */}
        <motion.div
          style={{ y: tissue2Y, opacity: tissue2Opacity }}
          className="absolute top-[30px] left-1/2 -translate-x-1/2 z-[1]"
        >
          <div
            className="w-[100px] h-[140px] relative"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(250,247,242,0.9) 100%)",
              borderRadius: "4px 4px 20px 20px",
              boxShadow: "0 2px 20px rgba(107,29,42,0.08)",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            {/* Fold lines */}
            <div className="absolute top-[20%] left-[15%] right-[15%] h-[1px] bg-warm-gray-200/40" />
            <div className="absolute top-[45%] left-[10%] right-[10%] h-[1px] bg-warm-gray-200/30" />
          </div>
        </motion.div>

        {/* Main tissue being pulled */}
        <motion.div
          style={{
            y: tissueY,
            rotate: tissueRotate,
            scale: tissueScale,
            opacity: tissueOpacity,
          }}
          className="absolute top-[20px] left-1/2 -translate-x-1/2 z-[2]"
        >
          <div
            className="w-[110px] h-[160px] relative"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 60%, #F3EDE3 100%)",
              borderRadius: "6px 6px 24px 24px",
              boxShadow:
                "0 8px 40px rgba(107,29,42,0.12), 0 2px 10px rgba(0,0,0,0.06)",
              border: "1px solid rgba(255,255,255,0.9)",
            }}
          >
            {/* Tissue texture — subtle fold lines */}
            <div className="absolute inset-0 overflow-hidden rounded-[6px_6px_24px_24px]">
              <div className="absolute top-[15%] left-[12%] right-[12%] h-[1px] bg-warm-gray-200/50" />
              <div className="absolute top-[35%] left-[8%] right-[8%] h-[1px] bg-warm-gray-200/40" />
              <div className="absolute top-[55%] left-[15%] right-[15%] h-[1px] bg-warm-gray-200/30" />
              <div className="absolute top-[75%] left-[10%] right-[10%] h-[1px] bg-warm-gray-200/20" />

              {/* Softness glow */}
              <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/80 to-transparent" />
            </div>

            {/* V watermark on tissue */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-burgundy-200/20 text-4xl font-[var(--font-display)] font-light select-none">
              V
            </div>
          </div>
        </motion.div>

        {/* Tissue box */}
        <motion.div
          style={{ y: boxY }}
          className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-[3]"
        >
          {/* Box body */}
          <div
            className="w-[160px] h-[90px] relative"
            style={{
              background:
                "linear-gradient(180deg, #2A2520 0%, #1E1B17 100%)",
              borderRadius: "8px",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Burgundy accent line */}
            <div className="absolute top-[55%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-burgundy-800 to-transparent" />

            {/* V branding on box */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-warm-gray-600 text-2xl font-[var(--font-display)] font-light select-none">
              V
            </div>

            {/* Opening slot */}
            <div
              className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[60px] h-[12px]"
              style={{
                background:
                  "linear-gradient(180deg, #1A1714 0%, #151210 100%)",
                borderRadius: "0 0 30px 30px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
              }}
            />

            {/* Box bottom label */}
            <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 text-[7px] tracking-[0.15em] text-warm-gray-400 uppercase whitespace-nowrap">
              Premium tissue
            </div>
          </div>
        </motion.div>

        {/* Scroll hint pulse ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-[55px] left-1/2 -translate-x-1/2 w-[180px] h-[100px] border border-burgundy-300/20 rounded-xl z-0"
        />
      </div>
    </div>
  );
}
