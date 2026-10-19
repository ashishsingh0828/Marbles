import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./KsdStory.css";

const HEADING = [
  { text: "Design and build", accent: false },
  { text: "under one roof", accent: true },
];

const CHECKS = ["Licensed boutique home builder", "Builder interior design"];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <polyline points="7 12.5 10.5 16 17 8.5" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

function AnimatedHeading({ parts }) {
  let count = 0;

  return (
    <h2
      className="ksd-story__heading"
      aria-label={parts.map((p) => p.text).join(" ")}
    >
      {parts.map((part) => (
        <span
          key={part.text}
          className={`ksd-story__part ${part.accent ? "is-accent" : ""}`}
          aria-hidden="true"
        >
          {part.text.split(" ").map((word, wi) => (
            <React.Fragment key={`${word}-${wi}`}>
              {wi > 0 && " "}
              <span className="ksd-story__word">
                {word.split("").map((ch, ci) => {
                  const delay = 0.15 + count * 0.03;
                  count += 1;
                  return (
                    <span
                      key={ci}
                      className="ksd-story__letter"
                      style={{ transitionDelay: `${delay}s` }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            </React.Fragment>
          ))}
        </span>
      ))}
    </h2>
  );
}

export default function KsdStory() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`ksd-story ${visible ? "is-visible" : ""}`}>
      <div className="ksd-story__container">
        <div className="ksd-story__images">
          <span className="ksd-story__dots ksd-story__fade" style={{ "--d": "0.6s" }} aria-hidden="true" />

          <div className="ksd-story__img ksd-story__img--main" style={{ "--d": "0s" }}>
            <img src="/images/ksd-stone-03.jpg" alt="KSD Homes dining and natural light" loading="lazy" />
          </div>

          <div className="ksd-story__img ksd-story__img--sub" style={{ "--d": "0.3s" }}>
            <img src="/images/ksd-stone-07.jpg" alt="Architecture and outlook" loading="lazy" />
          </div>

          <div className="ksd-story__counter ksd-story__fade" style={{ "--d": "1.1s" }}>
            <span className="ksd-story__counter-label">Builder &amp; Design</span>
            <span className="ksd-story__counter-circle">
              <span>One</span>
            </span>
          </div>

          <div className="ksd-story__badge ksd-story__pop" style={{ "--d": "1.3s" }}>
            <span className="ksd-story__badge-num">28+</span>
            <span className="ksd-story__badge-txt">Years Team Experience</span>
          </div>
        </div>

        <div className="ksd-story__content">
          <div className="ksd-story__eyebrow ksd-story__rise" style={{ "--d": "0.1s" }}>
            <span className="ksd-story__eyebrow-line" />
            <span>About KSD Homes</span>
          </div>

          <AnimatedHeading parts={HEADING} />

          <p className="ksd-story__text ksd-story__rise" style={{ "--d": "0.8s" }}>
            KSD Homes Pty Ltd is an emerging architecture and design-led brand in Western Australia. Combined visionary: licensed builder and interior design under one roof, so architecture, materials and how you live are resolved as a single composition — Western, European and Asian expressions, with a cost-effective, customer-centred process.
          </p>

          <div className="ksd-story__row">
            <div className="ksd-story__row-main">
              <ul className="ksd-story__checks ksd-story__rise" style={{ "--d": "1s" }}>
                {CHECKS.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="ksd-story__cta ksd-story__rise" style={{ "--d": "1.15s" }}>
                <Link to="/about" className="ksd-story__btn">
                  <span>Explore Our Design Story</span>
                  <Arrow />
                </Link>
              </div>
            </div>

            <div className="ksd-story__row-side ksd-story__rise" style={{ "--d": "1.3s" }}>
              <Link to="/contact" className="ksd-story__info">
                <span className="ksd-story__info-icon">
                  <PhoneIcon />
                </span>
                <span className="ksd-story__info-body">
                  <span className="ksd-story__info-sub">Need any help?</span>
                  <span className="ksd-story__info-title">Talk to our design team</span>
                </span>
              </Link>

              <div className="ksd-story__info">
                <img
                  src="/images/logo/logo.png"
                  alt="KSD Homes"
                  className="ksd-story__avatar"
                />
                <span className="ksd-story__info-body">
                  <span className="ksd-story__info-title">KSD Homes Pty Ltd</span>
                  <span className="ksd-story__info-sub">Carlisle, Perth WA</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}