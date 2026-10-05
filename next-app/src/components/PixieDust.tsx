"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; born: number; driftX: number; driftY: number; size: number };

/** A small, short-lived leaf-light trail that never captures pointer or touch input. */
export default function PixieDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sparks: Spark[] = [];
    let frame = 0;
    let lastPoint: { x: number; y: number } | undefined;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const addSparks = (x: number, y: number, count: number) => {
      if (reducedMotion.matches) return;
      const now = performance.now();
      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * 0.65;
        sparks.push({
          x: x + (Math.random() - 0.5) * 5,
          y: y + (Math.random() - 0.5) * 5,
          born: now,
          driftX: Math.cos(angle) * speed,
          driftY: Math.sin(angle) * speed - 0.25,
          size: 1 + Math.random() * 1.8,
        });
      }
      if (sparks.length > 48) sparks.splice(0, sparks.length - 48);
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const draw = (now: number) => {
      frame = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index];
        const age = now - spark.born;
        if (age > 760) {
          sparks.splice(index, 1);
          continue;
        }
        const fade = 1 - age / 760;
        const x = spark.x + spark.driftX * age;
        const y = spark.y + spark.driftY * age;
        context.globalAlpha = fade * 0.72;
        context.fillStyle = "#d8ef9a";
        context.shadowColor = "#bce978";
        context.shadowBlur = 9;
        context.beginPath();
        context.ellipse(x, y, spark.size, spark.size * 0.68, -0.5, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (sparks.length) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (!lastPoint || Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y) >= 34) {
        addSparks(event.clientX, event.clientY, 2);
        lastPoint = { x: event.clientX, y: event.clientY };
      }
    };
    const onPointerDown = (event: PointerEvent) => addSparks(event.clientX, event.clientY, event.pointerType === "touch" ? 7 : 5);
    const onMotionPreference = () => {
      if (reducedMotion.matches) {
        sparks.length = 0;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    reducedMotion.addEventListener("change", onMotionPreference);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      reducedMotion.removeEventListener("change", onMotionPreference);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixie-dust-layer" aria-hidden="true" />;
}
