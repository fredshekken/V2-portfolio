import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="page-shell page-content contact-content">
      <div className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1 className="page-title">Let&apos;s start a conversation.</h1>
      </div>
      <section className="contact-panel">
        <div>
          <p className="section-label">Email</p>
          <a className="contact-email" href="mailto:hello@example.com">hello@example.com</a>
        </div>
        <div className="social-list">
          <p className="section-label">Find me online</p>
          <Link href="#">LinkedIn <span aria-hidden="true">-&gt;</span></Link>
          <Link href="#">Instagram <span aria-hidden="true">-&gt;</span></Link>
          <Link href="#">Behance <span aria-hidden="true">-&gt;</span></Link>
        </div>
      </section>
    </main>
  );
}
