"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Hosted payment",
    description: "A payment journey separate from card data",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Precise address",
    description: "Pin the delivery point on the map",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Clear tracking",
    description: "A reference from confirmation to delivery",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21M3.375 14.25h3.75a1.125 1.125 0 0 0 1.125-1.125V7.875m0 0a1.125 1.125 0 0 0-1.125-1.125H2.25M8.25 7.875v4.5m0-4.5h4.5a1.125 1.125 0 0 1 1.125 1.125v3.375M12.375 12.75h2.25a1.125 1.125 0 0 1 1.125 1.125V18" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Approved sales unit",
    description: "Each product follows its stored carton pack",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

export default function BuyingJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-[var(--font-display)] text-4xl lg:text-5xl font-light text-cream-50 mb-5"
          >
            A complete <span className="gradient-text italic">buying</span>{" "}
            journey
          </motion.h2>
        </div>

        {/* Connecting line (desktop) */}
        <div className="hidden lg:block relative mb-0">
          <div
            ref={lineRef}
            className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-burgundy-900 via-burgundy-700 to-burgundy-900 origin-left"
          />
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                className="glass-card rounded-2xl p-8 h-full flex flex-col items-center"
              >
                {/* Step number */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full bg-burgundy-950 flex items-center justify-center text-burgundy-400 group-hover:bg-burgundy-800 group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-burgundy-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-semibold text-cream-50 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-warm-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
