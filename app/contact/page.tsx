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
          <p className="section-label">Get in Touch</p>
          {/* Direct link to your preferred inbox or contact form */}
          <Link 
            className="contact-email" 
            href="https://www.linkedin.com/in/ida-magaan" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Send a direct message <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
        <div className="social-list">
          <p className="section-label">Find me online</p>
          <Link 
            href="https://github.com/fredshekken" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link 
            href="https://www.linkedin.com/in/ida-magaan" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link 
            href="https://www.instagram.com/eethamarie" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Instagram <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}