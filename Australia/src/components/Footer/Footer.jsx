import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../config";
import BrandLogo from "../BrandLogo";
import "./Footer.css";

const CTA_IMAGE = "/images/ksd-stone-07.jpg";

const EXPLORE_LINKS = [
  { id: "home", label: "Home", to: "/" },
  { id: "about", label: "About", to: "/about" },
  { id: "projects", label: "Projects", to: "/projects" },
  { id: "journey", label: "Design Journey", to: "/design-journey" },
  { id: "services", label: "Services", to: "/services" },
  { id: "journal", label: "Journal", to: "/blogs" },
  { id: "contact", label: "Enquire", to: "/contact" },
];

const EXPERTISE_LINKS = [
  { id: "architecture", label: "Architecture & Design", to: "/services/architecture-design" },
  { id: "interiors", label: "Builder Interior Design", to: "/services/builder-interior-design" },
  { id: "complete", label: "Complete Home Solutions", to: "/services/complete-home-solutions" },
  { id: "build", label: "Licensed Boutique Building", to: "/services/licensed-boutique-building" },
  { id: "outdoor", label: "Indoor–Outdoor Living", to: "/services/indoor-outdoor-living" },
  { id: "materials", label: "Materials & Finishes", to: "/services/materials-finishes" },
];

const SOCIALS = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/ksdhomes" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/ksdhomes" },
];

const LEGAL_LINKS = [
  { id: "privacy", label: "Privacy Policy", to: "#" },
  { id: "terms", label: "Terms & Conditions", to: "#" },
  { id: "licence", label: "WA Licensed Builder", to: "/contact" },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Logo() {
  return (
    <Link to="/" className="ft-logo" aria-label="KSD Homes Home">
      <BrandLogo className="ft-logo-img" />
    </Link>
  );
}

function SocialIcon({ type }) {
  const fillProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
  };

  if (type === "instagram") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (type === "pinterest") {
    return (
      <svg {...fillProps}>
        <path d="M12 2a10 10 0 0 0-3.64 19.31c-.09-.82-.17-2.08.03-2.98l1.2-5.08s-.3-.61-.3-1.51c0-1.41.82-2.47 1.84-2.47.87 0 1.29.65 1.29 1.43 0 .87-.55 2.18-.84 3.39-.24 1.01.51 1.84 1.5 1.84 1.8 0 3.19-1.9 3.19-4.64 0-2.43-1.75-4.12-4.24-4.12-2.89 0-4.58 2.17-4.58 4.4 0 .87.33 1.81.75 2.32a.3.3 0 0 1 .07.29l-.28 1.15c-.04.18-.15.22-.34.13-1.27-.59-2.06-2.44-2.06-3.93 0-3.2 2.33-6.14 6.71-6.14 3.52 0 6.26 2.51 6.26 5.86 0 3.5-2.2 6.31-5.26 6.31-1.03 0-1.99-.53-2.32-1.16l-.63 2.41c-.23.88-.85 1.98-1.26 2.65A10 10 0 1 0 12 2Z" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg {...fillProps}>
        <path d="M14 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H11v7H8v-7H6v-3h2V9a4 4 0 0 1 4-4h2v3Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg {...fillProps}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    );
  }

  return (
    <svg {...fillProps}>
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8ZM9.7 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function ContactIcon({ type }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (type === "pin") {
    return (
      <svg {...common}>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M5 4h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.4 20 4 13.6 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
      </svg>
    );
  }

  if (type === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 7h17M12.5 1.5 18 7l-5.5 5.5" />
    </svg>
  );
}

function CtaButton({ to, children }) {
  return (
    <Link to={to} className="ft-btn">
      <span className="ft-btn-bg" />
      <span className="ft-btn-text">{children}</span>
      <span className="ft-btn-arrow">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [rootRef, inView] = useInView(0.08);

  useEffect(() => {
    if (!subscribed) return undefined;
    const timer = setTimeout(() => setSubscribed(false), 5000);
    return () => clearTimeout(timer);
  }, [subscribed]);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={rootRef} className={`ft ${inView ? "is-visible" : ""}`}>
      {/* Pre-footer Architectural CTA Banner */}
      <div className="ft-cta" style={{ "--ft-cta-bg": `url("${CTA_IMAGE}")` }}>
        <div className="ft-container ft-cta-inner">
          <div className="ft-cta-copy">
            <span className="ft-eyebrow ft-item" style={{ "--i": 0 }}>
              <span className="ft-eyebrow-line" />
              FROM SKETCH TO FURNISHING
            </span>
            <h2 className="ft-cta-title ft-item" style={{ "--i": 1 }}>
              Align yourself with the right team
            </h2>
          </div>
          <div className="ft-cta-action ft-item" style={{ "--i": 2 }}>
            <CtaButton to="/contact">Enquire</CtaButton>
          </div>
        </div>
      </div>

      <div className="ft-main">
        <div className="ft-container ft-main-inner">
          <div className="ft-newsletter">
            <div className="ft-newsletter-copy ft-item" style={{ "--i": 0 }}>
              <h3>KSD Homes Design Notes</h3>
              <p>
                Occasional notes on boutique home design, interiors and Western Australian living — when we have something worth sharing.
              </p>
            </div>
            <form className="ft-newsletter-form ft-item" style={{ "--i": 1 }} onSubmit={handleSubscribe}>
              <div className="ft-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  aria-label="Email address"
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
              <p className={`ft-feedback ${subscribed ? "is-visible" : ""}`} role="status">
                {subscribed ? "Thank you. You are subscribed to our design journal." : ""}
              </p>
            </form>
          </div>

          <span className="ft-line" />

          <div className="ft-columns">
            <div className="ft-col ft-col--brand ft-item" style={{ "--i": 0 }}>
              <Logo />
              <p className="ft-about">
                {BRAND.about}
              </p>
              <div className="ft-socials">
                {SOCIALS.map((social) => (
                  <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <SocialIcon type={social.id} />
                  </a>
                ))}
              </div>
            </div>

            <div className="ft-col ft-item" style={{ "--i": 1 }}>
              <h4 className="ft-col-title">Navigation</h4>
              <ul className="ft-links">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-col ft-item" style={{ "--i": 2 }}>
              <h4 className="ft-col-title">Our Expertise</h4>
              <ul className="ft-links">
                {EXPERTISE_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-col ft-col--contact ft-item" style={{ "--i": 3 }}>
              <h4 className="ft-col-title">Perth Studio</h4>
              <ul className="ft-contact">
                <li>
                  <span className="ft-contact-icon">
                    <ContactIcon type="pin" />
                  </span>
                  <span className="ft-contact-text">
                    {BRAND.address}
                  </span>
                </li>
                <li>
                  <span className="ft-contact-icon">
                    <ContactIcon type="phone" />
                  </span>
                  <a className="ft-contact-text" href={BRAND.phoneHref}>
                    {BRAND.phoneLabel} {BRAND.phone}
                  </a>
                </li>
                <li>
                  <span className="ft-contact-icon">
                    <ContactIcon type="phone" />
                  </span>
                  <a className="ft-contact-text" href={BRAND.phoneKarlHref}>
                    {BRAND.phoneKarlLabel} {BRAND.phoneKarl}
                  </a>
                </li>
                <li>
                  <span className="ft-contact-icon">
                    <ContactIcon type="mail" />
                  </span>
                  <a className="ft-contact-text" href={`mailto:${BRAND.email}`}>
                    {BRAND.email}
                  </a>
                </li>
                <li>
                  <span className="ft-contact-icon">
                    <ContactIcon type="clock" />
                  </span>
                  <span className="ft-contact-text">
                    {BRAND.hours}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="ft-wordmark ft-item" style={{ "--i": 4 }} aria-hidden="true">
            KSD HOMES
          </div>

          <span className="ft-line ft-line--bottom" />

          <div className="ft-bottom">
            <p className="ft-copy">
              &copy; {new Date().getFullYear()} {BRAND.legalName} (ABN {BRAND.abn}). Founded 2026. Licensed boutique builder, Perth. A brand of the {BRAND.group}.
            </p>
            <p className="ft-copy">
              KSD Homes acknowledges the Traditional Owners of the land on which we live and work, and pays respect to Elders past and present.
            </p>
            <ul className="ft-legal">
              {LEGAL_LINKS.map((link) => (
                <li key={link.id}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="ft-totop"
              onClick={scrollTop}
              aria-label="Scroll back to top"
            >
              <span>Back To Top</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
