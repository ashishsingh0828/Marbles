import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../config";
import "./Faq.css";

const MAIN_IMAGE = "/images/ksd-stone-03.jpg";
const DECO_IMAGE_A = "/images/projects/sharma-plan-02.jpg";
const DECO_IMAGE_B = "/images/ksd-stone-07.jpg";

const ITEMS = [
  {
    id: 1,
    title: "What does KSD Homes design and build?",
    text: "KSD Homes Pty Ltd is a licensed builder for high-end boutique homes in Western Australia. Combined visionary: residential architecture, builder interior design, space planning, furniture and finishes, and complete home solutions — from a new three-storey residence to a thoughtful renovation.",
  },
  {
    id: 2,
    title: "Do you work on new homes and renovations?",
    text: "Yes. We design and deliver new boutique homes as well as renovation and transformation projects. Current work includes three-storey residences in Western Australia, with Port Coogee among upcoming sites.",
  },
  {
    id: 3,
    title: "How does the design process start?",
    text: "Every project begins with listening. We work closely with you to understand lifestyle, preferences and vision, then translate that into architecture and builder interior design that feel personal, practical and lasting. Our team brings 28+ years of combined professional experience.",
  },
  {
    id: 4,
    title: "Where is KSD Homes based?",
    text: "Our studio is at 171 Star Street, Carlisle, Perth WA 6101. Call AJ on +61 414 029 695 (also WhatsApp) or Karl on +61 468 429 212, or email admin@ksdhomes.com.au.",
  },
  {
    id: 5,
    title: "Is KSD Homes a new company?",
    text: "KSD Homes is an emerging brand, incorporated in Australia, under the Eagle Group of Companies. The company is starting its journey in 2026 in Western Australia, with future plans across Australia, Asia and India — while our builder interior design team already carry 28+ years of combined professional experience.",
  },
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

function useCountUp(target, active, duration = 2000) {
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
  }, [active, target, duration]);

  return value;
}

function Reveal({ variant = "up", delay = 0, className = "", children }) {
  const [ref, inView] = useInView(0.12);

  return (
    <div
      ref={ref}
      className={`fq-reveal fq-reveal--${variant}${inView ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--delay": `${delay}s` }}
    >
      {children}
    </div>
  );
}

function SplitHeading({ text }) {
  const [ref, inView] = useInView(0.3);
  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className={`fq-heading${inView ? " is-visible" : ""}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="fq-word" aria-hidden="true" style={{ "--w": index }}>
            <span>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}

function BrandMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="46" viewBox="0 0 56 64" fill="none" aria-hidden="true">
      <path
        d="M43.7701 45.0612C40.5517 47.6735 36.046 49.6327 31.5402 49.6327C21.2414 49.6327 14.1609 41.7959 14.1609 31.3469C14.1609 20.898 21.2414 13.7143 31.5402 13.7143C36.046 13.7143 40.5517 15.0204 43.7701 18.2857L45.7012 20.2449L56 10.449L53.4253 8.48979C47.6322 3.26529 39.9081 0 31.5402 0C13.5173 0 0 13.7143 0 32C0 50.2857 13.5173 64 31.5402 64C39.9081 64 47.6322 60.7347 53.4253 55.5102L56 53.551L45.7012 43.102L43.7701 45.0612Z"
        fill="#6D1731"
      />
      <path
        d="M30.8966 42.4488C36.5845 42.4488 41.1954 37.7706 41.1954 31.9998C41.1954 26.229 36.5845 21.5508 30.8966 21.5508C25.2087 21.5508 20.5977 26.229 20.5977 31.9998C20.5977 37.7706 25.2087 42.4488 30.8966 42.4488Z"
        fill="#D1A65F"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function RatingCard() {
  const [ref, inView] = useInView(0.4);

  return (
    <div
      ref={ref}
      className={`fq-rating${inView ? " is-visible" : ""}`}
      role="img"
      aria-label="28 plus years team experience, licensed boutique builder, Perth"
    >
      <span className="fq-rating-logo">
        <img
          src={BRAND.logo || "/images/logo/logo.png"}
          alt="KSD Homes"
          style={{ width: "42px", height: "auto", objectFit: "contain", background: "#fff" }}
        />
      </span>
      <div className="fq-rating-body">
        <div className="fq-rating-top">
          <span className="fq-rating-number">
            28+
            <span> yrs</span>
          </span>
        </div>
        <p>Team experience · Licensed boutique builder · Perth WA</p>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M11.6432 3.92039C11.6432 3.60973 11.3913 3.35789 11.0807 3.35788L6.01815 3.35784C5.70749 3.35784 5.45565 3.60968 5.45565 3.92034C5.45564 4.231 5.70748 4.48284 6.01814 4.48284L10.5181 4.48288V8.98287C10.5181 9.29354 10.7699 9.54538 11.0806 9.54538C11.3913 9.54538 11.6431 9.29354 11.6431 8.98287L11.6432 3.92039ZM4.31892 11.4775L11.4784 4.31813L10.683 3.52263L3.52344 10.682L4.31892 11.4775Z" />
    </svg>
  );
}

function LearnMoreButton() {
  return (
    <Link
      to="/contact"
      className="fq-btn"
    >
      <span className="fq-btn-bg" />
      <span className="fq-btn-text">Book Consultation</span>
      <span className="fq-btn-icon">
        <ArrowIcon />
      </span>
    </Link>
  );
}

function Faq() {
  const [openId, setOpenId] = useState(1);
  const [sectionRef, sectionInView] = useInView(0.1);

  return (
    <section ref={sectionRef} className={`fq-section${sectionInView ? " is-visible" : ""}`}>
      <div className="fq-deco" aria-hidden="true">
        <div className="fq-deco-tile fq-deco-tile--b">
          <img src={DECO_IMAGE_B} alt="" loading="lazy" />
        </div>
        <div className="fq-deco-tile fq-deco-tile--a">
          <img src={DECO_IMAGE_A} alt="" loading="lazy" />
        </div>
      </div>

      <div className="fq-container">
        <div className="fq-grid">
          <Reveal variant="left" className="fq-media-wrap">
            <div className="fq-media">
              <div className="fq-media-image">
                <img src={MAIN_IMAGE} alt="Marble bathroom interior" loading="lazy" />
              </div>
              <RatingCard />
            </div>
          </Reveal>

          <div className="fq-content">
            <Reveal variant="up" delay={0}>
              <span className="fq-pill">
                <span className="fq-pill-dot" />
                Frequently Asked Questions
              </span>
            </Reveal>

            <SplitHeading text="Thoughtful answers for your home" />

            <Reveal variant="up" delay={0.1}>
              <p className="fq-text">
                Architecture, builder interior design and complete home solutions — with a customer-centred
                approach and a personal touch from our Perth studio.
              </p>
            </Reveal>

            <div className="fq-accordion">
              {ITEMS.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <Reveal
                    key={item.id}
                    variant="up"
                    delay={0.15 + index * 0.1}
                    className={`fq-acc-item${isOpen ? " is-open" : ""}`}
                  >
                    <h3 className="fq-acc-heading">
                      <button
                        type="button"
                        id={`fq-heading-${item.id}`}
                        className="fq-acc-toggle"
                        aria-expanded={isOpen}
                        aria-controls={`fq-panel-${item.id}`}
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                      >
                        <span className="fq-acc-title">
                          {index + 1}. {item.title}
                        </span>
                        <span className="fq-acc-icon" aria-hidden="true">
                          <span />
                          <span />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`fq-panel-${item.id}`}
                      className="fq-acc-panel"
                      role="region"
                      aria-labelledby={`fq-heading-${item.id}`}
                    >
                      <div className="fq-acc-panel-inner">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal variant="up" delay={0.6} className="fq-btn-wrap">
              <LearnMoreButton />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;