"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const layers = [
  {
    label: "Outer Shield",
    desc: "Smooth protective surface",
    stat: "DENSITY 98.2%",
    color: "#F5F3F0",
    border: "#E8E2D8",
  },
  {
    label: "Absorption Core",
    desc: "Maximum moisture capture",
    stat: "ABSRB 340 ml/m²",
    color: "#EDE8E0",
    border: "#DDD5C9",
  },
  {
    label: "Softness Layer",
    desc: "Pure pulp comfort",
    stat: "SOFT INDEX 9.4",
    color: "#E5DED4",
    border: "#D5CEC2",
  },
  {
    label: "Base Layer",
    desc: "Structural integrity",
    stat: "TENSILE 4.8 kN",
    color: "#DDD5C9",
    border: "#CCC4B6",
  },
];

export default function HeroPlyAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const front = container.querySelector<HTMLElement>(".tissue-front");
      const sideGroup = container.querySelector<HTMLElement>(".side-group");
      const layerEls = container.querySelectorAll<HTMLElement>(".ply-layer");
      const labelEls = container.querySelectorAll<HTMLElement>(".ply-label");
      const scanLines = container.querySelectorAll<HTMLElement>(".scan-line");
      const connectorDots = container.querySelectorAll<HTMLElement>(".connector-dot");
      const connectorPaths = container.querySelectorAll<HTMLElement>(".connector-path");
      const headerText = container.querySelector<HTMLElement>(".ply-header");
      const badge = container.querySelector<HTMLElement>(".ply-badge");

      if (!front || !sideGroup) return;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      // ── Initial state ──
      tl.set(front, { opacity: 1, scaleX: 1, rotateY: 0, rotateX: 0 });
      tl.set(sideGroup, { opacity: 0 });
      tl.set(layerEls, { y: 0, opacity: 1, scale: 1, boxShadow: "none" });
      tl.set(labelEls, { opacity: 0, x: 30, scale: 0.9 });
      tl.set(scanLines, { scaleX: 0, opacity: 0 });
      tl.set(connectorDots, { scale: 0, opacity: 0 });
      tl.set(connectorPaths, { scaleX: 0, opacity: 0 });
      tl.set(headerText, { opacity: 0, y: 10 });
      tl.set(badge, { opacity: 1 });

      // ── Phase 1: Front view — gentle 3D idle ──
      tl.to(front, {
        rotateY: 8,
        rotateX: -3,
        duration: 1.8,
        ease: "sine.inOut",
      });

      tl.to(front, {
        rotateY: -5,
        rotateX: 2,
        duration: 1.2,
        ease: "sine.inOut",
      });

      // ── Phase 2: Squeeze to thin edge ──
      tl.to(badge, { opacity: 0, duration: 0.3 }, "-=0.2");

      tl.to(front, {
        scaleX: 0.03,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power2.in",
      });

      tl.set(sideGroup, { opacity: 1 });
      tl.set(front, { opacity: 0 });

      // Flash header
      tl.to(headerText, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "<");
      tl.to(headerText, { opacity: 0, duration: 0.3 }, "+=0.6");

      // ── Phase 3: Spread layers ──
      tl.to(layerEls, {
        y: (_i: number) => (_i - 1.5) * 55,
        duration: 1,
        ease: "back.out(1.3)",
        stagger: 0.08,
      });

      // ── Phase 4: Focus each layer with HUD effect ──
      layerEls.forEach((layer, i) => {
        const label = labelEls[i];
        const scanLine = scanLines[i];
        const dot = connectorDots[i];
        const path = connectorPaths[i];

        // Scan line sweeps across the layer
        tl.set(scanLine, { opacity: 1, scaleX: 0, transformOrigin: "left center" });
        tl.to(scanLine, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        // Highlight + glow
        tl.to(
          layer,
          {
            scale: 1.18,
            boxShadow:
              "0 0 25px rgba(107, 29, 42, 0.5), 0 0 50px rgba(107, 29, 42, 0.2), inset 0 0 15px rgba(107, 29, 42, 0.1)",
            duration: 0.4,
            ease: "power2.out",
          },
          "<0.1"
        );

        // Dim others
        tl.to(
          Array.from(layerEls).filter((_, j) => j !== i),
          { opacity: 0.15, scale: 0.85, duration: 0.4 },
          "<"
        );

        // Connector dot pops
        tl.to(
          dot,
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(3)" },
          "-=0.2"
        );

        // Connector path extends
        tl.to(
          path,
          { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.1"
        );

        // Label slides in with scale
        tl.to(
          label,
          { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power2.out" },
          "-=0.15"
        );

        // Scan line fades
        tl.to(scanLine, { opacity: 0.3, duration: 0.3 }, "-=0.2");

        // Hold
        tl.to({}, { duration: 1.2 });

        // Dismiss: label, connector, scan
        tl.to(label, { opacity: 0, x: -15, scale: 0.9, duration: 0.25 });
        tl.to(path, { scaleX: 0, opacity: 0, duration: 0.2 }, "<");
        tl.to(dot, { scale: 0, opacity: 0, duration: 0.2 }, "<");
        tl.to(scanLine, { opacity: 0, scaleX: 0, duration: 0.2 }, "<");

        tl.to(layer, { scale: 1, boxShadow: "none", duration: 0.3 }, "<");
        tl.to(
          Array.from(layerEls).filter((_, j) => j !== i),
          { opacity: 1, scale: 1, duration: 0.3 },
          "<"
        );
      });

      // ── Phase 5: Collapse ──
      tl.to(layerEls, {
        y: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // ── Phase 6: Back to front ──
      tl.set(front, { opacity: 1, scaleX: 0.03 });
      tl.set(sideGroup, { opacity: 0 });

      tl.to(front, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.to(badge, { opacity: 1, duration: 0.3 }, "-=0.3");

      tl.to(front, {
        rotateY: -6,
        rotateX: 3,
        duration: 1.5,
        ease: "sine.inOut",
      });

      tl.to(front, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Header text */}
      <div className="ply-header absolute top-6 left-1/2 -translate-x-1/2 text-center opacity-0 z-20">
        <span className="text-xs tracking-[0.3em] text-burgundy-400 font-medium uppercase">
          4 layers of quality
        </span>
      </div>

      {/* ══ FRONT FACE ══ */}
      <div
        className="tissue-front absolute"
        style={{ width: 320, height: 220, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #F5F3F0, #E8E2D8)",
            boxShadow:
              "0 25px 70px rgba(0,0,0,0.35), 0 0 50px rgba(107, 29, 42, 0.12), inset 0 2px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-[1px]"
                style={{
                  top: `${10 + i * 8}%`,
                  background:
                    "linear-gradient(90deg, transparent 5%, rgba(180,160,140,0.4) 30%, rgba(180,160,140,0.5) 50%, rgba(180,160,140,0.4) 70%, transparent 95%)",
                }}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span
              className="font-[var(--font-display)] text-7xl font-light leading-none"
              style={{ color: "rgba(107, 29, 42, 0.18)" }}
            >
              V
            </span>
            <span
              className="text-[8px] tracking-[0.25em] uppercase font-medium mt-1"
              style={{ color: "rgba(107, 29, 42, 0.15)" }}
            >
              Premium Facial Tissues
            </span>
          </div>
          <div
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            }}
          />
        </div>
        <div
          className="absolute -right-2 top-[15%] bottom-[15%] w-[6px] rounded-r-sm"
          style={{
            background:
              "linear-gradient(180deg, #F5F3F0, #DDD5C9, #CCC4B6, #F5F3F0)",
            boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
          }}
        />
        <div className="ply-badge absolute -bottom-5 left-1/2 -translate-x-1/2 bg-burgundy-800 text-white text-[10px] tracking-[0.2em] uppercase px-5 py-2 rounded-full font-medium shadow-lg whitespace-nowrap">
          4-ply premium
        </div>
      </div>

      {/* ══ SIDE VIEW (layers) ══ */}
      <div className="side-group absolute flex flex-col items-center justify-center opacity-0" style={{ left: -100 }}>
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="ply-layer relative"
            style={{
              width: 220,
              height: 44,
              borderRadius: 10,
              background: `linear-gradient(90deg, ${layer.color}, ${layer.border})`,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow:
                "0 2px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
              marginTop: i === 0 ? 0 : 2,
            }}
          >
            {/* Layer number */}
            <div
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-burgundy-300/30"
              style={{
                background: "rgba(107, 29, 42, 0.15)",
                color: "#9B2C3F",
              }}
            >
              {i + 1}
            </div>

            {/* Scan line overlay */}
            <div
              className="scan-line absolute inset-0 rounded-[10px] pointer-events-none opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(107, 29, 42, 0.25) 40%, rgba(107, 29, 42, 0.4) 50%, rgba(107, 29, 42, 0.25) 60%, transparent)",
                transformOrigin: "left center",
              }}
            />

            {/* Connector dot (right edge) */}
            <div
              className="connector-dot absolute -right-3 top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full opacity-0"
              style={{
                background: "radial-gradient(circle, #D4364F, #6B1D2A)",
                boxShadow:
                  "0 0 8px rgba(212, 54, 79, 0.8), 0 0 20px rgba(212, 54, 79, 0.4)",
              }}
            />

            {/* Connector path (dot to label) */}
            <div
              className="connector-path absolute top-1/2 -translate-y-1/2 opacity-0"
              style={{
                left: "calc(100% + 8px)",
                width: 25,
                height: 2,
                transformOrigin: "left center",
                background:
                  "linear-gradient(90deg, rgba(212, 54, 79, 0.8), rgba(212, 54, 79, 0.3))",
                borderRadius: 1,
              }}
            />

            {/* HUD Label at end of arrow */}
            <div
              className="ply-label absolute top-1/2 -translate-y-1/2 opacity-0"
              style={{ left: "calc(100% + 38px)" }}
            >
              <div
                className="relative px-3 py-2 whitespace-nowrap"
                style={{
                  background: "rgba(15, 13, 12, 0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(212, 54, 79, 0.3)",
                  borderRadius: 8,
                }}
              >
                {/* Top-left bracket corner */}
                <div
                  className="absolute -top-[1px] -left-[1px] w-3 h-3"
                  style={{
                    borderTop: "2px solid #D4364F",
                    borderLeft: "2px solid #D4364F",
                    borderRadius: "8px 0 0 0",
                  }}
                />
                {/* Bottom-right bracket corner */}
                <div
                  className="absolute -bottom-[1px] -right-[1px] w-3 h-3"
                  style={{
                    borderBottom: "2px solid #D4364F",
                    borderRight: "2px solid #D4364F",
                    borderRadius: "0 0 8px 0",
                  }}
                />
                {/* Glow edge */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 15px rgba(212, 54, 79, 0.08), 0 0 20px rgba(212, 54, 79, 0.15)",
                  }}
                />
                <div className="text-[11px] font-semibold text-cream-50 tracking-wide">
                  {layer.label}
                </div>
                <div className="text-[9px] text-warm-gray-400 mt-0.5">
                  {layer.desc}
                </div>
                <div
                  className="text-[8px] mt-1.5 font-mono tracking-widest"
                  style={{ color: "#D4364F" }}
                >
                  ▸ {layer.stat}
                </div>
              </div>
            </div>

            {/* Texture */}
            <div className="absolute inset-0 rounded-[10px] overflow-hidden opacity-20">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="absolute w-full h-[1px]"
                  style={{
                    top: `${25 + j * 25}%`,
                    background:
                      "linear-gradient(90deg, transparent, rgba(180,160,140,0.5), transparent)",
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] tracking-wider text-warm-gray-600/50 uppercase font-medium">
                Layer {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
