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
    text: "KSD Homes is a licensed boutique builder specialising in bespoke luxury residences and multi-storey custom homes across Western Australia. Our integrated approach unites residential architectural drafting, luxury interior design, structural engineering coordination, and high-craftsmanship construction under one unified team.",
  },
  {
    id: 2,
    title: "Do you build custom architectural designs or pre-designed plans?",
    text: "Every KSD home is an individual, site-responsive custom architectural build. We design from a blank canvas to maximize your block's orientation, natural light, coastal breeze, and local council zoning (R-Codes). You can also bring your own external architectural plans for our team to engineer, value-manage, and construct.",
  },
  {
    id: 3,
    title: "Do you manage planning approvals and council permits?",
    text: "Yes, our team handles the complete statutory approvals lifecycle across local Perth councils and the Western Australian Planning Commission (WAPC). This includes Development Applications (DA), R-Code compliance, Design Review Panel submissions, and Building Permits (Certified BA1 applications).",
  },
  {
    id: 4,
    title: "Where are your current project sites located?",
    text: "We construct and transform luxury residences across Perth's premium established suburbs and coastal precincts. Current works include multi-level architectural residences, with Port Coogee among our active ongoing sites.",
  },
  {
    id: 5,
    title: "How does the design and pre-construction process work?",
    text: "We begin with a site appraisal and lifestyle brief, progressing through spatial concept development, 3D architectural visualisation, interior selections, and detailed cost planning. Backed by 28+ years of combined industry expertise, our fixed-price building contracts provide total transparency before on-site construction begins.",
  },
  {
    id: 6,
    title: "Where is the KSD Homes design studio based?",
    text: "Our studio is located at 171 Star Street, Carlisle, Perth WA 6101. Consultations are available by appointment with our architectural and construction team. Direct contact: +61 414 029 695 or email admin@ksdhomes.com.au.",
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
    <Link to="/contact" className="fq-btn">
      <span className="fq-btn-bg" />
      <span className="fq-btn-text"> Discuss Your Project</span>
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
                Architecture, luxury interior design, and turnkey residential construction — backed by over 28 years of combined industry expertise from our Carlisle design studio.
              </p>
            </Reveal>

            <div className="fq-accordion">
              {ITEMS.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <Reveal
                    key={item.id}
                    variant="up"
                    delay={0.15 + index * 0.08}
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