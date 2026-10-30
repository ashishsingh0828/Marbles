import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./WhyChooseUs.css";

const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.12) setInView(true);
        else if (!e.isIntersecting) setInView(false);
      },
      { threshold: [0, 0.12] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
};

const IconChat = () => (
  <svg
    viewBox="0 0 48 48"
    width="44"
    height="44"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 6h26a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H17l-8 7v-7H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z" />
    <path d="M38 17h4a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3h-3v6l-7-6H21a3 3 0 0 1-3-3v-1" />
    <path d="M10 13h18M10 19h13" />
  </svg>
);

const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const HEADING = ["Why", "Choose", "KSD", "Homes"];

const LEAD =
  "Architecture, interior design, and construction come together in one Perth studio. We design site-responsive homes around natural light, flowing spaces, and the way you live, and we deliver them with clear contracts and dedicated care.";

const GROUPS = [
  {
    title: "Integrated Architecture & Build",
    items: [
      "Licensed boutique custom home builder",
      "28+ years of combined team experience",
      "Architecture, interior joinery and construction in one team",
    ],
  },
  {
    title: "A Client-Centred Approach",
    items: [
      "Site-responsive design for Western Australian conditions",
      "Council and planning approvals managed for you",
      "Fixed-price contracts and a smooth handover",
    ],
  },
];

const GALLERY = [
  { src: "/Image/banners/kitchen/kitchen-banner-03.jpg", alt: "Plan view of a custom bedroom layout with timber flooring and a curved feature wall" },
  { src: "/Image/products/slabs/stone-slab-11.jpg", alt: "Bathroom with glass shower screen, lit wall niches and floating vanity" },
];

const QUOTE =
  "“One team looks after the design, the interiors, and the build, so nothing gets lost between the drawings and your finished home.”";

export default function WhyChooseUs({
  groups = GROUPS,
  image = "/Image/products/slabs/stone-slab-12.jpg",
  imageAlt = "Custom bathroom with marble feature wall, timber vanity and chandelier",
  gallery = GALLERY,
  quote = QUOTE,
  lead = LEAD,
  buttonLabel = "Discuss Your Project",
  href = "/contact",
  onButtonClick,
}) {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`wc ${inView ? "is-visible" : ""}`}
      aria-labelledby="wc-heading"
    >
      <div className="wc__inner">
        <div className="wc__left">
          <figure className="wc__media wc__shine-box" style={{ "--d": "0ms" }}>
            <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
          </figure>

          <div className="wc__quote" style={{ "--d": "700ms" }}>
            <span className="wc__quote-icon">
              <IconChat />
            </span>
            <p>{quote}</p>
          </div>
        </div>

        <div className="wc__right">
          <span className="wc__pill wc__fade" style={{ "--d": "0ms" }}>
            <i aria-hidden="true" /> Why Choose Us
          </span>

          <h2 id="wc-heading" className="wc__title" aria-label={HEADING.join(" ")}>
            {HEADING.map((w, i) => (
              <span className="wc__word" key={`${w}-${i}`} aria-hidden="true">
                <span style={{ "--i": i }}>{w}</span>{" "}
              </span>
            ))}
          </h2>

          <span className="wc__rule" aria-hidden="true">
            <b />
            <i />
          </span>

          <p className="wc__lead wc__fade" style={{ "--d": "700ms" }}>
            {lead}
          </p>

          <div className="wc__groups">
            {groups.map((g, gi) => (
              <div className="wc__group" key={g.title}>
                <h3
                  className="wc__group-title wc__fade"
                  style={{ "--d": `${850 + gi * 200}ms` }}
                >
                  {g.title}
                </h3>
                <ul className="wc__checks">
                  {g.items.map((item, ii) => (
                    <li
                      className="wc__fade"
                      key={item}
                      style={{ "--d": `${980 + gi * 200 + ii * 110}ms` }}
                    >
                      <span className="wc__tick" aria-hidden="true">
                        <IconCheck />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="wc__gallery">
            {gallery.map((g, i) => (
              <figure
                className="wc__thumb wc__shine-box"
                key={g.src}
                style={{ "--d": `${1400 + i * 180}ms` }}
              >
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>

          <Link
            className="wc__cta wc__fade"
            style={{ "--d": "1800ms" }}
            to={href}
            onClick={onButtonClick}
          >
            <span className="wc__cta-label">{buttonLabel}</span>
            <span className="wc__cta-icon">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}