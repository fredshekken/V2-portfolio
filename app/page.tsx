import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell home-content">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">A considered everyday object</p>
          <h1 className="brand-title">[BRAND NAME]</h1>
          <p className="hero-description">[PRODUCT DESCRIPTION]</p>
          <Link className="primary-button" href="/about">Discover more <span aria-hidden="true">-&gt;</span></Link>
        </div>
        <div className="hero-visual image-frame">
          <Image src="/brand.png" alt="[BRAND NAME] product placeholder" fill priority sizes="(max-width: 767px) 100vw, 50vw" className="object-contain" />
          <span className="image-note">Product image</span>
        </div>
      </section>
      <section className="home-details">
        <div className="detail-block"><p className="section-label">01 / Intent</p><p>Made for quiet routines, clear thinking, and the details that stay with you.</p></div>
        <div className="detail-block"><p className="section-label">02 / Direction</p><p>Replace this placeholder copy with the story, purpose, or offer behind your product brand.</p></div>
      </section>
    </main>
  );
}
