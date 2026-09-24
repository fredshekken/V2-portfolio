"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImagePlaceholder from "@/components/image-placeholder";

// /public/hero-glasses.png (transparent PNG). The frame below has a fixed
// aspect ratio, so the layout no longer depends on the file's intrinsic size.
const HERO_SRC = "/hero-glasses.png";
const HERO_WIDTH = 837;
const HERO_HEIGHT = 374;

// One shared reveal range. The glow and the heading both read the same
// --reveal value (0 to 1), so they always fade in together.
// Starts almost immediately on scroll, finishes after 40% of a viewport height.
const REVEAL_START_PX = 4;
const REVEAL_END_VH = 0.4;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function HeroParallax() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const end = Math.max(window.innerHeight * REVEAL_END_VH, REVEAL_START_PX + 1);
      const raw = (window.scrollY - REVEAL_START_PX) / (end - REVEAL_START_PX);
      const progress = Math.min(1, Math.max(0, raw));
      root.style.setProperty("--reveal", easeOutCubic(progress).toFixed(3));
    };

    // Keep the sticky offset equal to the real navbar height.
    const syncHeaderHeight = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      if (header) {
        document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      syncHeaderHeight();
      onScroll();
    };

    syncHeaderHeight();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-parallax" aria-label="BeU hero">
      <div className="hero-sticky">
        <div className="hero-image-wrap">
          <div className="hero-image-frame">
            <div className="hero-glow" aria-hidden="true" />
            {imageFailed ? (
              <div className="hero-image-fallback">
                <ImagePlaceholder label="BeU eyeglasses" />
              </div>
            ) : (
              <Image
                className="hero-image-asset"
                src={HERO_SRC}
                alt="BeU eyeglasses"
                width={HERO_WIDTH}
                height={HERO_HEIGHT}
                sizes="(max-width: 767px) 92vw, 820px"
                priority
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>

        <div className="hero-heading">
          <p className="eyebrow">BeUs presents</p>
          <h1>Be Your Best View, Be U</h1>
        </div>
      </div>
    </section>
  );
}