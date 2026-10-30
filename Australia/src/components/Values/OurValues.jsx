import React, { useEffect, useRef, useState } from "react";
import "./OurValues.css";

const VALUES = [
  {
    num: "01",
    title: "Client-Centred Collaboration",
    text: "We design and build around your lifestyle and priorities, creating homes with privacy, good proportions, and lasting comfort.",
    img: "/Image/products/tiles-textures/stone-tile-06.jpg",
    alt: "Home cinema room designed around the way a family lives",
  },
  {
    num: "02",
    title: "Architectural Integrity",
    text: "Every project responds to Western Australia's coastal climate and natural light. We listen from the first brief so form and function work together.",
    img: "/Image/products/slabs/stone-slab-14.jpg",
    alt: "Light-filled bathroom with floor-to-ceiling windows and freestanding bath",
  },
  {
    num: "03",
    title: "Unified Turnkey Delivery",
    text: "Architecture, engineering coordination, interior design, and quality finishes are managed under one roof, so the whole home feels consistent.",
    img: "/Image/banners/kitchen/kitchen-banner-04.jpg",
    alt: "Bedroom with custom timber joinery and a curved TV unit",
  },
];

const HEADING = "The principles behind every KSD home";

function AnimatedHeading({ text }) {
  let count = 0;

  return (
    <h2 id="ov-heading" className="ov__title" aria-label={text}>
      <span aria-hidden="true">
        {text.split(" ").map((word, wi) => (
          <React.Fragment key={`${word}-${wi}`}>
            {wi > 0 && " "}
            <span className="ov__word">
              {word.split("").map((ch, ci) => {
                const delay = 0.15 + count * 0.03;
                count += 1;
                return (
                  <span
                    key={ci}
                    className="ov__letter"
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
    </h2>
  );
}

export default function OurValues() {
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`ov ${visible ? "is-visible" : ""}`}
      aria-labelledby="ov-heading"
    >
      <div className="ov__container">
        <div className="ov__head">
          <div className="ov__eyebrow ov__rise" style={{ "--d": "0.05s" }}>
            <span className="ov__eyebrow-icon" aria-hidden="true" />
            <span>Our Principles</span>
            <span className="ov__eyebrow-icon" aria-hidden="true" />
          </div>
          <AnimatedHeading text={HEADING} />
        </div>

        <div className="ov__grid">
          {VALUES.map((v, i) => (
            <article
              key={v.num}
              className="ov__card ov__rise"
              style={{ "--d": `${0.6 + i * 0.2}s` }}
            >
              <div className="ov__thumb">
                <span className="ov__ring" aria-hidden="true" />
                <div className="ov__photo">
                  <img src={v.img} alt={v.alt} loading="lazy" decoding="async" />
                </div>
                <span className="ov__num ov__pop" style={{ "--d": `${1 + i * 0.2}s` }}>
                  {v.num}
                </span>
              </div>

              <h3 className="ov__name">{v.title}</h3>
              <p className="ov__text">{v.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}