import { useEffect, useRef, useState } from "react";
import "./WhyChooseUs.css";

function useInView() {
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
}

/* ---------- icons ---------- */
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

/* ---------- content (edit freely) ---------- */
const HEADING = ["Why" , " choose", ""," KSD", "Homes"];

const LEAD =
  "Choose from premium marble and natural stone, with honest guidance from people who handle every slab themselves.";

const GROUPS = [
  {
    title: "Hand-Selected Slabs",
    items: [
      "Italian & Greek quarries",
      "Chosen in person",
      "Continuous vein flow",
    ],
  },
  {
    title: "Bespoke Contracts",
    items: [
      "Fixed-price itemised quote",
      "Inspect your exact slab",
      "Fluoropolymer sealing & care",
    ],
  },
];

const GALLERY = [
  { src: "/images/ksd-stone-39.jpg", alt: "Dark marquina marble slab" },
  { src: "/images/ksd-stone-40.jpg", alt: "Calacatta marble slab with gold veining" },
];

const QUOTE =
  "From selection to installation, they were with us every step of the way. Every vein matched, every joint seamless.";

/* ---------- component ---------- */
export default function WhyChooseUs({
  groups = GROUPS,
  image = "/images/ksd-stone-38.jpg", // large left photo
  imageAlt = "Polished marble kitchen with waterfall island",
  gallery = GALLERY,
  quote = QUOTE,
  lead = LEAD,
  buttonLabel = "Discover more",
  href = "/about",
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
        {/* ---------------- left: big image + caption ---------------- */}
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

        {/* ---------------- right: content ---------------- */}
        <div className="wc__right">
          <span className="wc__pill wc__fade" style={{ "--d": "0ms" }}>
            <i aria-hidden="true" /> Why choose us
          </span>

          {/* words rise in one by one */}
          <h2 id="wc-heading" className="wc__title" aria-label={HEADING.join(" ")}>
            {HEADING.map((w, i) => (
              <span className="wc__word" key={w} aria-hidden="true">
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

          <a
            className="wc__cta wc__fade"
            style={{ "--d": "1800ms" }}
            href={href}
            onClick={onButtonClick}
          >
            <span className="wc__cta-label">{buttonLabel}</span>
            <span className="wc__cta-icon">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}