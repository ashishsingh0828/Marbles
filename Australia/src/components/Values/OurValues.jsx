import React, { useEffect, useRef, useState } from "react";
import "./OurValues.css";

const VALUES = [
  {
    num: "01",
    title: "Quality excellence",
    text: "Every slab is selected, cut and polished under strict quality control, so your stone looks as good in ten years as on day one.",
    img: "/images/ksd-stone-38.jpg",
    alt: "Hand-selected natural marble slab",
  },
  {
    num: "02",
    title: "Integrity & transparency",
    text: "You approve the exact slab before it is cut, with clear pricing, honest timelines and no surprises.",
    img: "/images/ksd-stone-03.jpg",
    alt: "Luxury residence interior finished in natural stone",
  },
  {
    num: "03",
    title: "Innovation & technology",
    text: "Digital templating and precision cutting keep seams tight and veining matched across large surfaces.",
    img: "/images/ksd-stone-04.jpg",
    alt: "Precision stone craftsmanship detail",
  },
];

const HEADING = "Foundational values behind KSD Homes craft";

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
            <span>Our Values</span>
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