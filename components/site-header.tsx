"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { HOME_ASSETS } from "@/components/home-assets";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasLogo, setHasLogo] = useState(true);

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link className="wordmark" href="/" aria-label="BeU home">
          {hasLogo ? <Image className="logo-image" src={HOME_ASSETS.logo} alt="BeU logo" width={44} height={44} onError={() => setHasLogo(false)} /> : <span className="logo-fallback">BeU</span>}
          <span className="logo-wordmark">BeU</span>
        </Link>
        <div className="header-actions">
          <nav aria-label="Main navigation" className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {links.map((link) => (
              <Link className={pathname === link.href ? "active" : ""} key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <button className="menu-toggle" type="button" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
