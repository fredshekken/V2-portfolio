import HeroParallax from "@/components/hero-parallax";
import ImageWithFallback from "@/components/image-with-fallback";
import ProductCarousel from "@/components/product-carousel";
import ImagePlaceholder from "@/components/image-placeholder";
import { HOME_ASSETS } from "@/components/home-assets";

export default function Home() {
  return (
    <main>
      <HeroParallax />
      <section className="marquee" aria-label="BeU benefits">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>Diverse Frame Selection</span><i aria-hidden="true" />
            <span>Complimentary Eyewear Kit (case + microfiber cloth)</span><i aria-hidden="true" />
            <span>7-Day Free Return</span><i aria-hidden="true" />
            <span>1-Year Warranty</span><i aria-hidden="true" />
            <span>5-Year Warranty on Smart Glasses</span><i aria-hidden="true" />
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span>Diverse Frame Selection</span><i aria-hidden="true" />
            <span>Complimentary Eyewear Kit (case + microfiber cloth)</span><i aria-hidden="true" />
            <span>7-Day Free Return</span><i aria-hidden="true" />
            <span>1-Year Warranty</span><i aria-hidden="true" />
            <span>5-Year Warranty on Smart Glasses</span><i aria-hidden="true" />
          </div>
        </div>
      </section>
      <section className="page-shell home-cards" aria-label="Explore BeU">
        <article className="lifestyle-card">
          <ImageWithFallback
            src={HOME_ASSETS.lifestyle}
            alt="BeU eyewear lifestyle"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            fallback={<ImagePlaceholder label="BeU lifestyle image" />}
          />
          <div className="lifestyle-overlay">
            <h2>BeU, Be You.</h2>
            <p>Eyewear that fits your style and your screen time.</p>
          </div>
        </article>
        <ProductCarousel />
      </section>
    </main>
  );
}
