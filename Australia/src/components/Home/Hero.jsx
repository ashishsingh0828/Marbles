import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const SLIDES = [
  {
    id: "bespoke-residence",
    name: "Architectural Living",
    note: "Grand custom residences & master stonework",
    title: "Crafting Australia's finest luxury homes & timeless stone architecture",
    text: "At KSD Homes, we combine master custom construction with hand-selected natural marble, granite, and stone — engineered for generations of distinction.",
    theme: "dark",
    scrim: "10, 24, 40",
    image: "/images/ksd-stone-07.jpg",
  },
  {
    id: "stone-living",
    name: "Statement Slabs",
    note: "Bookmatched feature walls & floors",
    title: "Hand-selected natural stone slabs for spectacular interior spaces",
    text: "Direct-imported Italian and exotic natural marble, precision-cut and dry-lay aligned for continuous veining across expansive living spaces.",
    theme: "dark",
    scrim: "15, 30, 48",
    image: "/images/ksd-stone-02.jpg",
  },
  {
    id: "kitchen-ensuite",
    name: "Kitchens & Ensuites",
    note: "Bespoke benchtops & waterfall islands",
    title: "Precision stonework for kitchens, vanities & wellness ensuites",
    text: "Seamless waterfall edges, mitred stone aprons, and stain-sealed natural surfaces crafted to sub-millimeter tolerances by master stonemasons.",
    theme: "dark",
    scrim: "12, 28, 44",
    image: "/images/ksd-stone-09.jpg",
  },
  {
    id: "master-craft",
    name: "Australian Quality",
    note: "Turnkey delivery & certified standards",
    title: "Enduring architectural excellence built for Australian lifestyles",
    text: "From concept design and stone sourcing through to turnkey handover, our master builders ensure unmatched quality and transparent communication.",
    theme: "dark",
    scrim: "14, 26, 42",
    image: "/images/ksd-stone-07.jpg",
  },
];

const pad = (n) => String(n + 1).padStart(2, "0");

export default function Hero({
  slides = SLIDES,
  exploreHref = "/projects",
  quoteHref = "/contact",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const onPointerDown = (e) => {
    touchX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
  };

  return (
    <section
      className={`hero ${paused ? "is-paused" : ""}`}
      data-theme={slides[index].theme}
      aria-roledescription="carousel"
      aria-label="KSD Homes Australia"
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setPaused(true);
      }}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      {slides.map((s, i) => {
        const active = i === index;
        const Title = i === 0 ? "h1" : "h2";
        return (
          <div
            key={s.id}
            className={`hero__slide ${active ? "is-active" : ""}`}
            data-theme={s.theme}
            style={{ "--scrim": s.scrim }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
          >
            <img
              className="hero__photo"
              src={s.image}
              alt={s.title}
              decoding="async"
              draggable="false"
            />
            <div className="hero__scrim" />

            <div className="hero__inner">
              <div className="hero__content">
                <span className="hero__badge">
                  <i className="hero__diamond" aria-hidden="true" />
                  KSD HOMES AUSTRALIA · BESPOKE ARCHITECTURE &amp; STONE
                </span>

                <Title className="hero__title">{s.title}</Title>

                <span className="hero__rule" aria-hidden="true" />

                <p className="hero__text">{s.text}</p>

                <div className="hero__actions">
                  <Link className="hero__btn hero__btn--solid" to={exploreHref}>
                    Explore Projects
                  </Link>
                  <Link className="hero__btn hero__btn--ghost" to={quoteHref}>
                    Request Consultation
                  </Link>
                </div>
              </div>

              <div className="hero__caption">
                <strong>{s.name}</strong>
                <span>{s.note}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Frame */}
      <div className="hero__frame" aria-hidden="true" />

      {/* Controls */}
      <div className="hero__bar">
        <ol className="hero__tabs">
          {slides.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={`hero__tab ${i === index ? "is-active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Show ${s.name}`}
                aria-current={i === index}
              >
                <span className="hero__tab-line">
                  {i === index && (
                    <span
                      key={`fill-${index}`}
                      className="hero__tab-fill"
                      onAnimationEnd={(e) => {
                        if (e.animationName === "heroFill") next();
                      }}
                    />
                  )}
                </span>
                <span className="hero__tab-num">{pad(i)}</span>
                <span className="hero__tab-name">{s.name}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="hero__arrows">
          <button
            type="button"
            className="hero__arrow"
            onClick={prev}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="hero__arrow"
            onClick={next}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
