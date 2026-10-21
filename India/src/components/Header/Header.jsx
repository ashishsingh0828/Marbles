import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useApi } from "../../api";
import Logo from "../Logo/Logo";
import "./Header.css";

const icons = {
  chevronDown: "M6 9l6 6 6-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  close: "M6 6l12 12M18 6 6 18",
};

function Icon({ name, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name] || icons.arrow} />
    </svg>
  );
}

export default function Header() {
  const navRef = useRef(null);
  const { pathname } = useLocation();
  const services = useApi("/services").data || [];
  const [stuck, setStuck] = useState(false);
  const [openTop, setOpenTop] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/", end: true },
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "All Architectural Services", href: "/services" },
        ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Journal", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  const closeAll = useCallback(() => {
    setOpenTop(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 35);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (e) =>
      navRef.current && !navRef.current.contains(e.target) && setOpenTop(null);
    const onKeyDown = (e) => e.key === "Escape" && closeAll();
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeAll]);

  useEffect(() => {
    const onResize = () => window.innerWidth > 1024 && setMobileOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isSection = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`header-section${stuck ? " is-stuck" : ""}`}>
      <div className="header-bar">
        <div className="header-inner">
          <Logo />

          <nav
            ref={navRef}
            className={`header-nav${mobileOpen ? " is-open" : ""}`}
            aria-label="Primary"
          >
            <div className="header-nav-head">
              <Logo />
              <button
                type="button"
                className="header-nav-close"
                aria-label="Close menu"
                onClick={closeAll}
              >
                <Icon name="close" />
              </button>
            </div>

            <ul className="header-menu">
              {menuItems.map((item, index) => {
                const isOpen = openTop === index;
                const cls = [
                  "header-item",
                  isOpen && "is-open",
                  isSection(item.href) && "is-current",
                ]
                  .filter(Boolean)
                  .join(" ");

                if (!item.children) {
                  return (
                    <li className={cls} key={item.label}>
                      <NavLink to={item.href} end={item.end} className="header-link">
                        <span>{item.label}</span>
                        <span className="header-link-line" aria-hidden="true" />
                      </NavLink>
                    </li>
                  );
                }

                return (
                  <li
                    className={cls}
                    key={item.label}
                    onMouseEnter={() => window.innerWidth > 1024 && setOpenTop(index)}
                    onMouseLeave={() => window.innerWidth > 1024 && setOpenTop(null)}
                  >
                    <button
                      type="button"
                      className="header-link"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => setOpenTop(isOpen ? null : index)}
                    >
                      <span>{item.label}</span>
                      <Icon name="chevronDown" className="header-link-chevron" />
                      <span className="header-link-line" aria-hidden="true" />
                    </button>
                    <ul className="header-dropdown">
                      <li className="header-dropdown-heading">
                        <span>Architectural Slabs &amp; Services</span>
                      </li>
                      {item.children.map((child) => (
                        <li className="header-subitem" key={child.href}>
                          <NavLink to={child.href} end className="header-sublink">
                            <span>{child.label}</span>
                            <Icon name="arrow" className="header-sublink-arrow" />
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className="header-nav-footer">
              <Link to="/contact" className="ie-btn header-mobile-cta" onClick={closeAll}>
                <span>Enquire</span>
                <span className="ie-btn-arrow">&rarr;</span>
              </Link>
            </div>
          </nav>

          {/* Right Action: Square Hover Button */}
          <div className="header-actions">
            <Link to="/contact" className="ie-btn header-cta">
              <span>Request a Quote</span>
              <span className="ie-btn-arrow">&rarr;</span>
            </Link>

            <button
              type="button"
              className="header-burger"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`header-backdrop${mobileOpen ? " is-active" : ""}`}
        onClick={closeAll}
        aria-hidden="true"
      />
    </header>
  );
}
