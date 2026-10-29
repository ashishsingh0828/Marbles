import { useEffect, useRef, useState } from "react";
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
  "Licensed boutique builder for high-end custom homes",
  "Seamless integration of architecture and interior design",
  "Turnkey residential delivery with dedicated client focus",
];

export default function AboutUs({
  images = {
    top: "/images/ksd-stone-08.jpg",
    bottom: "/images/ksd-stone-09.jpg",
    tall: "/images/ksd-stone-07.jpg",
  },
  founder = { name: "KSD Homes", role: "28+ years team experience, Perth WA", image: "" },
  learnMoreHref = "/about",
}) {
  const [ref, visible] = useReveal();

  const panels = [
    { key: "top", cls: "about__panel--top", src: images.top, label: "Statuary Marble Living", d: "0.1s" },
    { key: "bottom", cls: "about__panel--bottom", src: images.bottom, label: "Bookmatched Kitchen Island", d: "0.35s" },
    { key: "tall", cls: "about__panel--tall", src: images.tall, label: "Architectural Stone Facade", d: "0.2s" },
  ];

  const swatches = [
    { name: "Dining and light", src: "/images/ksd-stone-15.jpg" },
    { name: "Bedroom direction", src: "/images/ksd-stone-12.jpg" },
    { name: "Custom joinery", src: "/images/ksd-stone-38.jpg" },
    { name: "Marble wet areas", src: "/images/ksd-stone-40.jpg" },
  ];

  const logo = BRAND.logo || "/images/logo/logo.png";

  return (
    <section
      ref={ref}
      id="about"
      className={`about ${visible ? "is-visible" : ""}`}
      aria-labelledby="about-title"
    >
      <div className="about__inner">
        {/* Images */}
        <div className="about__media">
          {panels.map((p) => (
            <figure key={p.key} className={`about__panel ${p.cls}`} style={{ "--d": p.d }}>
              <span className="about__panel-line" aria-hidden="true" />
              <div className="about__img">
                <img src={p.src} alt={p.label} loading="lazy" decoding="async" draggable="false" />
                <span className="about__shine" aria-hidden="true" />
                <figcaption className="about__caption">
                  <i aria-hidden="true" />
                  {p.label}
                </figcaption>
              </div>
            </figure>
          ))}

          {/* Rotating badge with KSD logo */}
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
              <img src={logo} alt="" />
            </span>
          </Link>
        </div>

        {/* Content */}
        <div className="about__content">
          <span className="about__tag about__reveal" style={{ "--d": "0.1s" }}>
            <i className="about__diamond" aria-hidden="true" />
            About KSD Homes Australia
          </span>

          <h2 id="about-title" className="about__title about__reveal" style={{ "--d": "0.25s" }}>
            Bespoke Western Australian Architecture &amp; Boutique Construction
          </h2>

          <p className="about__text about__reveal" style={{ "--d": "0.4s" }}>
            KSD Homes unites luxury residential architecture, builder interior design, and bespoke craftsmanship within one Perth-based multidisciplinary studio. Backed by more than 28 years of combined construction and design mastery, we engineer tailored, site-responsive homes from initial concept drafting through to master handover.
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
              &ldquo;We do not simply build houses. The same team directs architecture, materiality, and construction from the very first conversation to handover.&rdquo;
            </p>
          </div>

          <ul className="about__stones about__reveal" style={{ "--d": "0.7s" }} aria-label="Signature interior features">
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
                <img src={founder.image || logo} alt="KSD Homes" />
              </span>
              <strong>{founder.name}</strong>
              <span>{founder.role}</span>
            </div>
          </div>

          <Link className="about__cta about__reveal" style={{ "--d": "1s" }} to={learnMoreHref}>
            Discuss your project
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}