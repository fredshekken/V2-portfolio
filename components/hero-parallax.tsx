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

const GRID_SIZE = 5;

export default function HeroParallax() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const framePositionRef = useRef(0);
  const frameRequestRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0, cellWidth: 0, cellHeight: 0, dpr: 1 });
  const reducedMotion = useReducedMotion();
  const [imageState, setImageState] = useState<"loading" | "ready" | "error">("loading");
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0.6, 0.85], [24, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const { width, height, cellWidth, cellHeight, dpr } = dimensionsRef.current;
    if (!canvas || !image || !width || !height || !cellWidth || !cellHeight) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const scale = Math.min(width / cellWidth, height / cellHeight);
    const drawWidth = cellWidth * scale;
    const drawHeight = cellHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;
    const position = framePositionRef.current;
    const currentIndex = Math.floor(position);
    const nextIndex = Math.min(currentIndex + 1, FRAME_ORDER.length - 1);
    const alpha = position - currentIndex;
    const currentFrame = FRAME_ORDER[currentIndex];
    const nextFrame = FRAME_ORDER[nextIndex];

    context.globalAlpha = 1;
    context.drawImage(image, currentFrame.col * cellWidth, currentFrame.row * cellHeight, cellWidth, cellHeight, drawX, drawY, drawWidth, drawHeight);
    if (alpha > 0 && nextIndex !== currentIndex) {
      context.globalAlpha = alpha;
      context.drawImage(image, nextFrame.col * cellWidth, nextFrame.row * cellHeight, cellWidth, cellHeight, drawX, drawY, drawWidth, drawHeight);
    }
    context.globalAlpha = 1;
  }, []);

  const requestDraw = useCallback(() => {
    if (frameRequestRef.current !== null) return;
    frameRequestRef.current = window.requestAnimationFrame(() => {
      frameRequestRef.current = null;
      drawFrame();
    });
  }, [drawFrame]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reducedMotion) return;
    const scrubProgress = Math.min(Math.max(progress / 0.75, 0), 1);
    framePositionRef.current = scrubProgress * (FRAME_ORDER.length - 1);
    requestDraw();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const resizeCanvas = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dimensionsRef.current = { ...dimensionsRef.current, width: rect.width, height: rect.height, dpr };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      requestDraw();
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(stage);
    resizeCanvas();

    const image = new window.Image();
    image.src = "/eyeglasses-spritesheet.jpg";
    image.onload = async () => {
      try {
        await image.decode();
        imageRef.current = image;
        dimensionsRef.current = { ...dimensionsRef.current, cellWidth: image.naturalWidth / GRID_SIZE, cellHeight: image.naturalHeight / GRID_SIZE };
        stage.style.aspectRatio = `${image.naturalWidth / GRID_SIZE} / ${image.naturalHeight / GRID_SIZE}`;
        setImageState("ready");
        requestDraw();
      } catch {
        setImageState("error");
      }
    };
    image.onerror = () => setImageState("error");

    return () => {
      observer.disconnect();
      if (frameRequestRef.current !== null) window.cancelAnimationFrame(frameRequestRef.current);
    };
  }, [requestDraw]);

  useEffect(() => {
    if (reducedMotion && imageState === "ready") {
      framePositionRef.current = 0;
      requestDraw();
    }
  }, [imageState, reducedMotion, requestDraw]);

  return (
    <section className="hero-sprite" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-sprite-sticky">
        <div className="sprite-stage" ref={stageRef}>
          <canvas ref={canvasRef} className="sprite-canvas" role="img" aria-label="Rotating view of BeU eyeglasses" />
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
