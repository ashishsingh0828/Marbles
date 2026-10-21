import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import BrandLogo from "../BrandLogo";
import "./Header.css";

const MENU = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Design Journey", href: "/design-journey" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => { close(); }, [pathname, close]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const overlay = (
    <div className={`ksd-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
      <nav className="ksd-overlay-nav" aria-label="Site">
        {MENU.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) => `ksd-overlay-link${isActive ? " is-active" : ""}`}
            tabIndex={open ? 0 : -1}
            onClick={close}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <header className={`ksd-header${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
        <div className="ksd-nav-inner">
          <Link to="/" className="ksd-brand-logo" aria-label="KSD Homes Home">
            <BrandLogo className="ksd-logo-img" />
          </Link>

          <div className="ksd-nav-actions">
            <Link to="/contact" className="ksd-cta-btn">Enquire</Link>
            <button
              type="button"
              className={`ksd-burger${open ? " is-open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {createPortal(overlay, document.body)}
    </>
  );
}
