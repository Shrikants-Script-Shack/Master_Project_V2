"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const LAYERS = [
  {
    label: "Layer 1",
    title: "Soft Touch Surface",
    desc: "Ultra-smooth outer layer for a gentle feel on skin",
    color: "#F5F0E8",
    accent: "rgba(107, 29, 42, 0.15)",
  },
  {
    label: "Layer 2",
    title: "Absorbent Core",
    desc: "High-density fiber core that locks in moisture",
    color: "#EDE6DB",
    accent: "rgba(107, 29, 42, 0.12)",
  },
  {
    label: "Layer 3",
    title: "Structural Support",
    desc: "Reinforced middle layer that maintains tissue shape",
    color: "#E5DCCE",
    accent: "rgba(107, 29, 42, 0.10)",
  },
  {
    label: "Layer 4",
    title: "Gentle Base",
    desc: "Soft finishing layer — comfort from every side",
    color: "#DDD3C3",
    accent: "rgba(107, 29, 42, 0.08)",
  },
];

export default function PlyExploder() {
  const [exploded, setExploded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-300 via-surface-200 to-surface-300 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-burgundy-950/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-burgundy-400 font-medium uppercase mb-6"
          >
            <span className="w-8 h-[1.5px] bg-burgundy-500" />
            Layer View
            <span className="w-8 h-[1.5px] bg-burgundy-500" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-[var(--font-display)] text-4xl lg:text-5xl font-light text-cream-50 mb-5"
          >
            4 layers,{" "}
            <span className="gradient-text italic">engineered softness</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-warm-gray-500 leading-relaxed"
          >
            Each ply serves a purpose. Tap to separate and explore what makes V
            tissue exceptional.
          </motion.p>
        </div>

        {/* Main content — layers + info */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: 3D Layer Stack */}
          <div className="flex-1 flex justify-center">
            <div
              className="relative"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                animate={{
                  rotateX: exploded ? 45 : 20,
                  rotateZ: exploded ? -8 : -5,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-[300px] sm:w-[380px]"
              >
                {LAYERS.map((layer, i) => {
                  const isActive = activeLayer === i;
                  const stackedY = i * 8;
                  const explodedY = i * 65;

                  return (
                    <motion.div
                      key={layer.label}
                      animate={{
                        y: exploded ? explodedY : stackedY,
                        scale: isActive ? 1.05 : 1,
                        translateZ: isActive ? 30 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        delay: exploded ? i * 0.06 : (LAYERS.length - 1 - i) * 0.06,
                      }}
                      onHoverStart={() => exploded && setActiveLayer(i)}
                      onHoverEnd={() => setActiveLayer(null)}
                      onClick={() => exploded && setActiveLayer(isActive ? null : i)}
                      className="absolute inset-x-0 cursor-pointer"
                      style={{
                        zIndex: LAYERS.length - i,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Layer slab */}
                      <div
                        className="w-full rounded-lg relative overflow-hidden"
                        style={{
                          height: "40px",
                          background: `linear-gradient(135deg, ${layer.color}, ${layer.color}ee)`,
                          boxShadow: isActive
                            ? `0 8px 30px rgba(107, 29, 42, 0.25), 0 0 0 2px rgba(107, 29, 42, 0.4)`
                            : `0 4px 12px rgba(0,0,0,0.15)`,
                          border: isActive
                            ? "1px solid rgba(107, 29, 42, 0.5)"
                            : "1px solid rgba(255,255,255,0.3)",
                          transition: "box-shadow 0.3s, border 0.3s",
                        }}
                      >
                        {/* Texture lines */}
                        <div className="absolute inset-0 opacity-30">
                          {Array.from({ length: 4 }).map((_, j) => (
                            <div
                              key={j}
                              className="absolute h-[0.5px]"
                              style={{
                                background: `rgba(0,0,0,0.08)`,
                                top: `${25 + j * 18}%`,
                                left: "8%",
                                right: "8%",
                              }}
                            />
                          ))}
                        </div>

                        {/* Layer label on the slab */}
                        <AnimatePresence>
                          {exploded && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: 0.2 + i * 0.05 }}
                              className="absolute inset-0 flex items-center justify-between px-4"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center"
                                  style={{
                                    background: "rgba(107, 29, 42, 0.8)",
                                    color: "#fff",
                                  }}
                                >
                                  {i + 1}
                                </span>
                                <span className="text-[11px] font-medium text-surface-300">
                                  {layer.title}
                                </span>
                              </div>
                              <span className="text-[10px] text-surface-200/60 font-medium tracking-wider uppercase">
                                PLY {i + 1}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* V watermark when stacked */}
                        {!exploded && i === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-[var(--font-display)] font-light text-surface-300/15 select-none">
                              V
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Side face (3D depth) */}
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-b-lg origin-bottom"
                        style={{
                          height: "10px",
                          background: `linear-gradient(180deg, ${layer.color}cc, ${layer.color}88)`,
                          transform: "rotateX(-90deg) translateZ(0px)",
                          borderBottom: "1px solid rgba(0,0,0,0.1)",
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Spacer for layout height */}
                <div
                  style={{
                    height: exploded
                      ? `${(LAYERS.length - 1) * 65 + 50}px`
                      : `${(LAYERS.length - 1) * 8 + 50}px`,
                    transition: "height 0.5s ease",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Right: Info panel + toggle */}
          <div className="flex-1 max-w-md">
            {/* Toggle button */}
            <motion.button
              onClick={() => {
                setExploded(!exploded);
                setActiveLayer(null);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mb-8 bg-burgundy-800 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-burgundy-600 transition-colors glow-burgundy flex items-center gap-3"
            >
              <motion.svg
                animate={{ rotate: exploded ? 180 : 0 }}
                transition={{ duration: 0.4 }}
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
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </motion.svg>
              {exploded ? "Assemble layers" : "Separate layers"}
            </motion.button>

            {/* Layer details */}
            <AnimatePresence mode="wait">
              {activeLayer !== null ? (
                <motion.div
                  key={`layer-${activeLayer}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-burgundy-800 text-white text-xs font-bold flex items-center justify-center">
                      {activeLayer + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-cream-50">
                        {LAYERS[activeLayer].title}
                      </h3>
                      <span className="text-[10px] tracking-[0.2em] text-burgundy-400 uppercase">
                        {LAYERS[activeLayer].label}
                      </span>
                    </div>
                  </div>
                  <p className="text-warm-gray-400 text-sm leading-relaxed ml-11">
                    {LAYERS[activeLayer].desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {exploded ? (
                    <p className="text-warm-gray-500 text-sm">
                      Hover or tap a layer to see details
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {LAYERS.map((layer, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-sm"
                            style={{ background: layer.color }}
                          />
                          <span className="text-sm text-warm-gray-400">
                            {layer.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
