import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BRAND } from "../../config";
import "./Header.css";

const MENU = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`ksd-header ${stuck ? "is-stuck" : ""}`}>
      {/* Top Concierge Strip */}
      <div className="ksd-topbar">
        <div className="ksd-topbar-inner">
          <div className="ksd-topbar-info">
            <span className="ksd-topbar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {BRAND.address}
            </span>
            <span className="ksd-topbar-sep">•</span>
            <span className="ksd-topbar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {BRAND.hours}
            </span>
          </div>
          <div className="ksd-topbar-contact">
            <a href={`tel:${BRAND.phoneHref || BRAND.phone}`} className="ksd-topbar-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {BRAND.phone}
            </a>
            <span className="ksd-topbar-sep">•</span>
            <a href={`mailto:${BRAND.email}`} className="ksd-topbar-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="ksd-nav-wrap">
        <div className="ksd-nav-inner">
          <Link to="/" className="ksd-brand-logo" aria-label="KSD Homes Home">
            <img src={BRAND.logo || "/images/logo/logo.jpeg"} alt="KSD Homes Logo" className="ksd-logo-img" />
          </Link>

          <nav className="ksd-desktop-nav" aria-label="Main navigation">
            <ul className="ksd-nav-list">
              {MENU.map((item) => (
                <li key={item.href} className="ksd-nav-item">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => `ksd-nav-link ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ksd-nav-actions">
            <Link to="/contact" className="ksd-cta-btn">
              <span>GET A QUOTE</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </Link>

            <button
              type="button"
              className={`ksd-burger ${mobileOpen ? "is-open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="ksd-burger-bar" />
              <span className="ksd-burger-bar" />
              <span className="ksd-burger-bar" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`ksd-mobile-drawer ${mobileOpen ? "is-open" : ""}`}>
        <div className="ksd-mobile-panel">
          <div className="ksd-mobile-header">
            <img src={BRAND.logo || "/images/logo/logo.jpeg"} alt="KSD Homes" className="ksd-mobile-logo" />
            <button
              type="button"
              className="ksd-mobile-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className="ksd-mobile-links">
            {MENU.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `ksd-mobile-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ksd-mobile-footer">
            <Link to="/contact" className="ksd-cta-btn ksd-mobile-cta" onClick={closeMenu}>
              <span>GET A QUOTE</span>
            </Link>
            <div className="ksd-mobile-contact">
              <p><strong>Sydney Showroom &amp; Office:</strong></p>
              <p>{BRAND.address}</p>
              <p>Phone: <a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a></p>
              <p>Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
