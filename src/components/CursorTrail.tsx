"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

/**
 * Soft cursor trail — tiny tissue-like particles spawn at the cursor
 * position, float, wobble, and fade out like delicate fabric confetti.
 * Only active on pointer devices (hidden on touch).
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on touch-only devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let animationId: number;
    let spawnCounter = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const spawnParticle = () => {
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Only spawn when cursor is moving (with threshold)
      if (speed < 3) return;

      // Spawn rate scales with speed, but cap it
      const count = Math.min(Math.floor(speed / 15), 3);

      for (let i = 0; i < count; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.5;
        const ejectionSpeed = 0.3 + Math.random() * 0.8;

        particles.push({
          x: mouseX + (Math.random() - 0.5) * 10,
          y: mouseY + (Math.random() - 0.5) * 10,
          vx: -Math.cos(angle) * ejectionSpeed + (Math.random() - 0.5) * 0.5,
          vy: -Math.sin(angle) * ejectionSpeed + Math.random() * 0.3 - 0.5,
          life: 1,
          maxLife: 40 + Math.random() * 30,
          size: 4 + Math.random() * 8,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    const drawParticle = (p: Particle) => {
      const alpha = p.life * 0.35;
      if (alpha <= 0) return;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = alpha;

      // Draw tissue-like rectangle shape
      const w = p.size;
      const h = p.size * 0.6;
      const radius = 2;

      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, radius);

      // Warm brown/cream tissue fill
      ctx.fillStyle = `rgba(210, 180, 140, ${alpha * 0.9})`;
      ctx.fill();

      // Warm brown border
      ctx.strokeStyle = `rgba(180, 150, 115, ${alpha * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Tiny fold line on the tissue
      ctx.beginPath();
      ctx.moveTo(-w * 0.3, 0);
      ctx.lineTo(w * 0.3, 0);
      ctx.strokeStyle = `rgba(160, 130, 95, ${alpha * 0.4})`;
      ctx.lineWidth = 0.3;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      spawnCounter++;
      if (spawnCounter % 2 === 0) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics: gravity + drift + damping
        p.vy += 0.015; // gentle gravity
        p.vx *= 0.99; // air resistance
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= 1 / p.maxLife;

        // Wobble
        p.x += Math.sin(p.rotation * 2) * 0.3;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawParticle(p);
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}
