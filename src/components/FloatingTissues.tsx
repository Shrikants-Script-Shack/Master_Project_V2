"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TissueShape {
  el: HTMLDivElement;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
  drift: number;
  wobbleSpeed: number;
  wobbleAmount: number;
}

export default function FloatingTissues() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const TISSUE_COUNT = 6;
    const tissues: TissueShape[] = [];

    // Create tissue DOM elements
    for (let i = 0; i < TISSUE_COUNT; i++) {
      const el = document.createElement("div");
      const size = 30 + Math.random() * 50;

      // Warm brown/cream palette for tissue feel
      const browns = [
        [210, 180, 140], // tan
        [222, 197, 160], // warm cream
        [193, 154, 107], // camel
        [235, 220, 198], // pale linen
        [180, 150, 115], // warm brown
      ];
      const [r, g, b] = browns[Math.floor(Math.random() * browns.length)];

      el.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size * 0.65}px;
        pointer-events: none;
        z-index: 1;
        border-radius: 4px 4px 8px 8px;
        background: linear-gradient(
          ${135 + Math.random() * 90}deg,
          rgba(${r}, ${g}, ${b}, ${0.03 + Math.random() * 0.04}),
          rgba(255, 253, 248, ${0.02 + Math.random() * 0.03})
        );
        box-shadow: 0 2px 8px rgba(${r}, ${g}, ${b}, 0.03);
        backdrop-filter: blur(1px);
        border: 1px solid rgba(255, 250, 240, 0.1);
      `;

      container.appendChild(el);

      tissues.push({
        el,
        x: Math.random() * window.innerWidth,
        y: -100 - Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.8,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.4,
        wobbleSpeed: 0.3 + Math.random() * 0.8,
        wobbleAmount: 10 + Math.random() * 20,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;

      tissues.forEach((t) => {
        t.y += t.speed;
        t.x += t.drift + Math.sin(time * t.wobbleSpeed) * 0.3;
        t.rotation += t.drift * 0.5;

        const wobbleX = Math.sin(time * t.wobbleSpeed) * t.wobbleAmount;
        const wobbleRotate =
          Math.sin(time * t.wobbleSpeed * 0.7) * 15;

        // Reset when below viewport
        if (t.y > window.innerHeight + 150) {
          t.y = -120;
          t.x = Math.random() * window.innerWidth;
        }

        // Wrap horizontally
        if (t.x > window.innerWidth + 100) t.x = -80;
        if (t.x < -100) t.x = window.innerWidth + 80;

        gsap.set(t.el, {
          x: t.x + wobbleX,
          y: t.y,
          rotation: t.rotation + wobbleRotate,
          scale: t.scale,
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      tissues.forEach((t) => t.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    />
  );
}
