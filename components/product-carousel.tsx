"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import ImagePlaceholder from "@/components/image-placeholder";
import { PRODUCTS } from "@/components/home-assets";

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") scrollPrev();
    if (event.key === "ArrowRight") scrollNext();
  };

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="product-card" tabIndex={0} onKeyDown={handleKeyDown} aria-label="BeU product catalogue" aria-roledescription="carousel">
      <div className="product-carousel-header">
        <div>
          <p className="eyebrow">The collection</p>
          <h2>Find your frame.</h2>
        </div>
        <div className="carousel-controls">
          <button type="button" className="icon-button" onClick={scrollPrev} aria-label="Previous product">
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          <button type="button" className="icon-button" onClick={scrollNext} aria-label="Next product">
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla-container">
          {PRODUCTS.map((product, index) => (
            <article className="embla-slide" key={product.name} aria-roledescription="slide" aria-label={`${index + 1} of ${PRODUCTS.length}`}>
              <div className="product-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 767px) 80vw, 360px"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <ImagePlaceholder label={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="carousel-footer">
        <div className="carousel-dots" aria-label="Choose a product slide">
          {PRODUCTS.map((product, index) => (
            <button
              type="button"
              className={`carousel-dot ${index === selectedIndex ? "active" : ""}`}
              key={product.name}
              aria-label={`Go to ${product.name}`}
              aria-current={index === selectedIndex}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <a className="primary-button" href="/contact">
          Shop the Collection <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  );
}