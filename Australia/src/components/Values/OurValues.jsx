import React, { useEffect, useRef, useState } from "react";
import "./OurValues.css";

const VALUES = [
  {
    num: "01",
    title: "Customer-centred innovation",
    text: "We enrol products and interiors into the environment around how you live — an oasis of peace, relaxation and personal space.",
    img: "/images/ksd-stone-38.jpg",
    alt: "Thoughtfully designed KSD Homes interior",
  },
  {
    num: "02",
    title: "A personal touch",
    text: "Successful architecture is created through a strong relationship between the designer, the client and the space. We listen first.",
    img: "/images/ksd-stone-03.jpg",
    alt: "Boutique home living environment",
  },
  {
    num: "03",
    title: "Complete composition",
    text: "Architecture, interiors, lighting, materials, furniture and technology are designed together as one integrated home solution.",
    img: "/images/ksd-stone-04.jpg",
    alt: "Integrated architecture and interior detailing",
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