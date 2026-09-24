"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Frame = { row: number; col: number };

// Reorder or remove frames here. The last row skips its two empty cells.
export const FRAME_ORDER: Frame[] = [
  ...[0, 1, 2, 3, 4].map((col) => ({ row: 0, col })),
  ...[0, 1, 2, 3, 4].map((col) => ({ row: 1, col })),
  ...[0, 1, 2, 3, 4].map((col) => ({ row: 2, col })),
  ...[0, 1, 2, 3, 4].map((col) => ({ row: 3, col })),
  { row: 4, col: 0 },
  { row: 4, col: 1 },
  { row: 4, col: 4 },
];

const SPRITE_URL = "/eyeglasses-spritesheet.jpg";
const GRID_SIZE = 5;

export default function HeroParallax() {
  const heroRef = useRef<HTMLElement>(null);
  const frameRequestRef = useRef<number | null>(null);
  const pendingFrameRef = useRef(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [imageState, setImageState] = useState<"loading" | "ready" | "error">("loading");
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0.6, 0.85], [24, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  const commitFrame = useCallback((nextFrame: number) => {
    pendingFrameRef.current = nextFrame;
    if (frameRequestRef.current !== null) return;
    frameRequestRef.current = window.requestAnimationFrame(() => {
      frameRequestRef.current = null;
      setFrameIndex(pendingFrameRef.current);
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reducedMotion || imageState !== "ready") return;
    const scrubProgress = Math.min(Math.max(progress / 0.75, 0), 1);
    commitFrame(Math.round(scrubProgress * (FRAME_ORDER.length - 1)));
  });

  useEffect(() => {
    const image = new window.Image();
    image.src = SPRITE_URL;
    image.onload = async () => {
      try {
        await image.decode();
        setImageState("ready");
      } catch {
        setImageState("error");
      }
    };
    image.onerror = () => setImageState("error");

    return () => {
      if (frameRequestRef.current !== null) window.cancelAnimationFrame(frameRequestRef.current);
    };
  }, []);

  const frame = FRAME_ORDER[frameIndex];
  const backgroundPosition = `${(frame.col / (GRID_SIZE - 1)) * 100}% ${(frame.row / (GRID_SIZE - 1)) * 100}%`;

  return (
    <section className="hero-sprite" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-sprite-sticky">
        <div
          className={`sprite-stage ${imageState === "ready" ? "sprite-ready" : ""}`}
          role="img"
          aria-label="Rotating view of BeU eyeglasses"
          style={imageState === "ready" ? { backgroundImage: `url(${SPRITE_URL})`, backgroundPosition } : undefined}
        >
          {imageState === "error" && <p className="sprite-error">The eyeglasses preview is unavailable.</p>}
        </div>
        <motion.div className={`hero-heading ${imageState === "ready" ? "" : "hero-heading-hidden"}`} style={{ y: reducedMotion ? 0 : textY, opacity: reducedMotion ? 1 : textOpacity }}>
          <p className="eyebrow">Designed by BeUs</p>
          <h1 id="hero-title">Be Your Best View, Be U</h1>
        </motion.div>
      </div>
    </section>
  );
}
