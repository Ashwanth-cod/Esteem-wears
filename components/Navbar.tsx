"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Catalogue", href: "/catalogue" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    .nav-root {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      transition: background 0.4s ease, box-shadow 0.4s ease;
    }
    .nav-root.scrolled {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      box-shadow: 0 2px 24px rgba(0,0,0,0.07);
    }
    .nav-root.top {
      background: transparent;
    }
    .nav-link {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      position: relative;
      transition: opacity 0.2s ease;
      letter-spacing: 0.01em;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 1.5px;
      background: currentColor;
      transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
    }
    .nav-link:hover::after { width: 100%; }
    .nav-link:hover { opacity: 0.7; }
    .nav-logo {
      font-family: 'Playfair Display', serif;
      font-weight: 800;
      font-size: 22px;
      text-decoration: none;
      letter-spacing: -0.02em;
    }
    .nav-cta {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 24px;
      border-radius: 50px;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      letter-spacing: 0.02em;
    }
    .nav-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 4px;
      background: none;
      border: none;
    }
    .hamburger span {
      display: block;
      height: 1.5px;
      width: 24px;
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    .mobile-menu {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 99;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 36px;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .mobile-nav-link {
      font-family: 'Playfair Display', serif;
      font-size: 36px;
      font-weight: 700;
      text-decoration: none;
      transition: opacity 0.2s ease;
    }
    .mobile-nav-link:hover { opacity: 0.5; }
    @media (max-width: 640px) {
      .desktop-links { display: none !important; }
      .hamburger { display: flex !important; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Mobile Menu */}
      <div
        className="mobile-menu"
        style={{
          background: "#1a1a1a",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: "28px",
            right: "28px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            fontSize: "28px",
            lineHeight: 1,
          }}
        >
          ✕
        </button>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="mobile-nav-link"
            style={{ color: "#fff" }}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/catalogue"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            padding: "14px 36px",
            borderRadius: "50px",
            background: "#d4b896",
            color: "#1a1a1a",
            textDecoration: "none",
            marginTop: "12px",
          }}
        >
          Shop Now
        </Link>
      </div>

      {/* Main Nav */}
      <nav
        className={`nav-root ${scrolled ? "scrolled" : "top"}`}
        style={{
          padding: scrolled ? "12px 48px" : "20px 48px",
          transition: "padding 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            className="nav-logo"
            style={{ color: scrolled ? "#1a1a1a" : "#fff" }}
          >
            Esteem Innerwears
          </Link>

          <div
            className="desktop-links"
            style={{ display: "flex", gap: "36px", alignItems: "center" }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link"
                style={{ color: scrolled ? "#1a1a1a" : "#fff" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/catalogue"
              className="nav-cta desktop-links"
              style={{
                background: scrolled ? "#1a1a1a" : "#fff",
                color: scrolled ? "#fff" : "#1a1a1a",
              }}
            >
              Shop Now
            </Link>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span style={{ background: scrolled ? "#1a1a1a" : "#fff" }} />
              <span style={{ background: scrolled ? "#1a1a1a" : "#fff" }} />
              <span
                style={{
                  background: scrolled ? "#1a1a1a" : "#fff",
                  width: "16px",
                }}
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
