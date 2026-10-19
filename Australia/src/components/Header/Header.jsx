import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BRAND } from "../../config";
import "./Header.css";

const MENU = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Homes", href: "/projects" },
  { label: "Journal", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const OVERLAY_ROUTES = ["/"];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = OVERLAY_ROUTES.includes(pathname);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  // Close drawer on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Sticky state
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll + Esc to close while the mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, closeMenu]);

  return (
    <header
      className={`ksd-header ${isHome ? "is-home" : ""} ${stuck ? "is-stuck" : ""}`}
    >
     
      {/* Main navbar: logo left, menu centre, button right */}
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
              <span>Get a Quote</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>
            </Link>

            <button
              type="button"
              className={`ksd-burger ${mobileOpen ? "is-open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <span className="ksd-burger-bar" />
              <span className="ksd-burger-bar" />
              <span className="ksd-burger-bar" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`ksd-mobile-drawer ${mobileOpen ? "is-open" : ""}`} onClick={closeMenu}>
        <div className="ksd-mobile-panel" onClick={(e) => e.stopPropagation()}>
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
              <span>Get a Quote</span>
            </Link>
            <div className="ksd-mobile-contact">
              <p><strong>Perth Studio:</strong></p>
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