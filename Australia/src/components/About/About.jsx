import { useEffect, useRef, useState } from "react";
import { BRAND } from "../../config";
import "./About.css";

const MAIN_IMAGE = "/images/ksd-stone-03.jpg";
const TILES_IMAGE = "/images/ksd-stone-04.jpg";

const LIST_ITEMS = [
  "Licensed builder for high-end boutique homes",
  "Residential architecture and interior design",
  "Space planning, finishes and complete home solutions",
  "Customer-centred process with a personal touch",
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView(threshold = 0.15) {
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

function useCountUp(target, active, duration = 2200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    if (prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", children }) {
  const [ref, inView] = useInView(0.12);
  const classes = [
    "ab-reveal",
    `ab-reveal--${variant}`,
    inView ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
}

function SplitHeading({ text }) {
  const [ref, inView] = useInView(0.3);
  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className={`ab-heading ${inView ? "is-visible" : ""}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="ab-word" aria-hidden="true" style={{ "--w": index }}>
            <span>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}

function RotatingBadge({ logo = BRAND.logo || "/images/logo/logo.jpeg" }) {
  return (
    <div className="ab-circle" aria-hidden="true">
      <span className="ab-circle-ring">
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="ab-circle-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
          </defs>
          <text>
            <textPath href="#ab-circle-path" startOffset="0" textLength="496" lengthAdjust="spacing">
              KSD HOMES PTY LTD ✦ ARCHITECTURE & INTERIORS ✦
            </textPath>
          </text>
        </svg>
      </span>
      <span className="ab-circle-core">
        <img src={logo} alt="KSD Homes" />
      </span>
    </div>
  );
}

function StatBadge() {
  const [ref, inView] = useInView(0.4);
  const value = useCountUp(28, inView, 2200);

  return (
    <div ref={ref} className={`ab-stat ${inView ? "is-visible" : ""}`}>
      <span className="ab-stat-number">
        {Math.round(value)}
        <span>+</span>
      </span>
      <span className="ab-stat-label">
        Years Combined
        <br />
        Team Experience
      </span>
    </div>
  );
}

function Signature() {
  return (
    <svg className="ab-sign" xmlns="http://www.w3.org/2000/svg" width="140" height="52" viewBox="0 0 140 52" fill="none" aria-hidden="true">
      <path
        d="M6 34c14-16 28-26 40-26 15 0 8 28-2 36s-16 4-10-8 22-26 44-24 24 16 26 28c1 8 6 12 14 12 12 0 16-10 16-10"
        stroke="#157A3C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CurlyArrow() {
  return (
    <svg className="ab-curl" xmlns="http://www.w3.org/2000/svg" width="86" height="130" viewBox="0 0 86 130" fill="none" aria-hidden="true">
      <path
        className="ab-draw"
        pathLength="1"
        d="M22 126C8 98 14 74 40 66C64 58 70 34 50 22C34 12 18 24 26 40C34 54 62 50 70 28C73 20 72 12 66 4"
      />
      <path className="ab-draw ab-draw--late" pathLength="1" d="M66 4 54 12M66 4l8 12" />
    </svg>
  );
}

export default function About() {
  return (
    <section className="ab-section">
      <svg className="ab-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="ab-shape-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.04Q0,0 0.05,0H0.8Q0.842,0 0.847,0.035L0.995,0.962Q1,1 0.95,1H0.05Q0,1 0,0.96Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="ab-container">
        <div className="ab-top">
          <div className="ab-title-wrap">
            <Reveal variant="up">
              <span className="ab-pill">
                <span className="ab-pill-dot" />
                ABOUT KSD HOMES
              </span>
            </Reveal>
            <SplitHeading text="Architecture, interior design and complete home solutions in Western Australia" />
          </div>
          <Reveal variant="zoom" delay={0.3} className="ab-circle-wrap">
            <RotatingBadge />
          </Reveal>
        </div>

        <div className="ab-body">
          <Reveal variant="left" delay={0.1} className="ab-media">
            <div className="ab-media-shape">
              <img src={MAIN_IMAGE} alt="KSD Homes luxury craftsmanship" loading="lazy" />
            </div>
            <StatBadge />
          </Reveal>

          <div className="ab-content">
            <Reveal variant="up" delay={0.2}>
              <h3 className="ab-lead">
                At KSD Homes we see a home as more than a structure. It is a carefully composed environment that influences how we live, work, relax and connect — designed with form, function, light and a personal touch.
              </h3>
            </Reveal>

            <div className="ab-lower">
              <div className="ab-lower-left">
                <ul className="ab-list">
                  {LIST_ITEMS.map((item, index) => (
                    <Reveal
                      key={item}
                      variant="up"
                      delay={0.3 + index * 0.1}
                      className="ab-list-item"
                    >
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 7 7" fill="currentColor" aria-hidden="true">
                          <path d="M3.5 0L7 3.5L3.5 7L0 3.5L3.5 0Z" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>

                <Reveal variant="up" delay={0.7} className="ab-author">
                  <Signature />
                  <h5>KSD Homes Pty Ltd</h5>
                  <p>Builder &amp; Interior Design · Perth WA</p>
                </Reveal>
              </div>

              <Reveal variant="up" delay={0.6} className="ab-lower-right">
                <CurlyArrow />
                <div className="ab-tiles">
                  <span className="ab-tile-layer ab-tile-layer--2" />
                  <span className="ab-tile-layer ab-tile-layer--1" />
                  <img src={TILES_IMAGE} alt="Natural marble craftsmanship" loading="lazy" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
