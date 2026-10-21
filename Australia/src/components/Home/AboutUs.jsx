import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../config";
import "./AboutUs.css";

/* adds .is-visible once the section scrolls into view */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

const FEATURES = [
  "Licensed builder for high-end boutique homes",
  "Architecture and interior design as one",
  "Complete home solutions with a personal touch",
];

export default function AboutUs({
  images = {
    top: "/images/ksd-stone-08.jpg",
    bottom: "/images/ksd-stone-09.jpg",
    tall: "/images/ksd-stone-07.jpg",
  },
  founder = { name: "KSD Homes", role: "28+ years team experience · Perth", image: "" },
  learnMoreHref = "/about",
}) {
  const [ref, visible] = useReveal();

  const panels = [
    { key: "top", cls: "about__panel--top", src: images.top, label: "Statuary Marble Living", d: "0.1s" },
    { key: "bottom", cls: "about__panel--bottom", src: images.bottom, label: "Bookmatched Kitchen Island", d: "0.35s" },
    { key: "tall", cls: "about__panel--tall", src: images.tall, label: "Architectural Stone Facade", d: "0.2s" },
  ];

  const swatches = [
    { name: "Dining and light", src: "/images/ksd-stone-03.jpg" },
    { name: "Bedroom direction", src: "/images/ksd-stone-12.jpg" },
    { name: "Joinery", src: "/images/ksd-stone-38.jpg" },
    { name: "Marble wet areas", src: "/images/ksd-stone-40.jpg" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className={`about ${visible ? "is-visible" : ""}`}
      aria-labelledby="about-title"
    >
      <svg className="about__veins" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-40 140 C 240 200, 420 60, 700 140 S 1120 260, 1500 120" />
        <path d="M-20 760 C 200 700, 420 820, 720 760 S 1120 660, 1500 780" />
        <path className="gold" d="M900 -10 C 940 120, 880 200, 960 330" />
      </svg>

      <div className="about__inner">
        {/* Images */}
        <div className="about__media">
          {panels.map((p) => (
            <figure key={p.key} className={`about__panel ${p.cls}`} style={{ "--d": p.d }}>
              <span className="about__panel-line" aria-hidden="true" />
              <div className="about__img">
                <img src={p.src} alt={`${p.label}`} loading="lazy" decoding="async" draggable="false" />
                <span className="about__shine" aria-hidden="true" />
                <figcaption className="about__caption">
                  <i aria-hidden="true" />
                  {p.label}
                </figcaption>
              </div>
            </figure>
          ))}

          {/* Rotating badge with KSD Logo */}
          <Link className="about__badge about__reveal" style={{ "--d": "0.7s" }} to={learnMoreHref} aria-label="Learn about KSD Homes">
            <svg className="about__ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="aboutRingPath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#aboutRingPath" textLength="484" lengthAdjust="spacing">
                  KSD HOMES AUSTRALIA • BESPOKE ARCHITECTURE •{" "}
                </textPath>
              </text>
            </svg>
            <span className="about__badge-core" aria-hidden="true">
              <img
                src={BRAND.logo || "/images/logo/logo.png"}
                alt="KSD Homes"
                style={{ width: "48px", height: "auto", objectFit: "contain", background: "transparent" }}
              />
            </span>
          </Link>
        </div>

        {/* Content */}
        <div className="about__content">
          <span className="about__tag about__reveal" style={{ "--d": "0.1s" }}>
            <i className="about__diamond" aria-hidden="true" />
            ABOUT KSD HOMES AUSTRALIA
          </span>

          <h2 id="about-title" className="about__title about__reveal" style={{ "--d": "0.25s" }}>
            A new Perth builder, backed by 28+ years of team experience
          </h2>

          <p className="about__text about__reveal" style={{ "--d": "0.4s" }}>
            KSD Homes Pty Ltd was founded in 2026 so architecture, licensed boutique building and builder interior design sit with one Perth team. The company is new. The people are not: 28+ years of combined professional experience, delivered as a complete home solution.
          </p>

          <div className="about__quote about__reveal" style={{ "--d": "0.55s" }}>
            <span className="about__quote-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
                <path d="M3 12l9 4.5 9-4.5" />
                <path d="M3 16.5L12 21l9-4.5" />
              </svg>
            </span>
            <p>
              &ldquo;We do not simply build houses. The same team handles architecture, interiors and construction from the first conversation to handover.&rdquo;
            </p>
          </div>

          <ul className="about__stones about__reveal" style={{ "--d": "0.7s" }} aria-label="Signature stones">
            {swatches.map((s) => (
              <li key={s.name}>
                <span className="about__swatch" style={{ backgroundImage: `url("${s.src}")` }} aria-hidden="true" />
                {s.name}
              </li>
            ))}
          </ul>

          <div className="about__foot about__reveal" style={{ "--d": "0.85s" }}>
            <ul className="about__list">
              {FEATURES.map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="about__founder">
              <span className="about__avatar">
                <img src={BRAND.logo || "/images/logo/logo.png"} alt="KSD" style={{ width: "100%", height: "100%", objectFit: "contain", background: "transparent" }} />
              </span>
              <strong>{founder.name}</strong>
              <span>{founder.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
