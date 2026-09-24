import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-inner">
        <div className="footer-menu">
          <p className="eyebrow">Explore</p>
          <nav aria-label="Footer navigation" className="footer-links">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="copyright">Copyright 2026</p>
      </div>
    </footer>
  );
}
