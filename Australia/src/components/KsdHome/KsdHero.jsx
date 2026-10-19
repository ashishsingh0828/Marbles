import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./KsdHero.css";

const SLIDES = [
  "/images/ksd-stone-01.jpg",
  "/images/ksd-stone-05.jpg",
  "/images/ksd-stone-06.jpg",
];

const AUTOPLAY_MS = 4000;
const SPEED_MS = 700;

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

export default function KsdHero() {
  const total = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [curtain, setCurtain] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((i) => Math.min(i + 1, total));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    if (index !== total) return undefined;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, SPEED_MS + 60);
    return () => clearTimeout(t);
  }, [index, total]);

  useEffect(() => {
    if (animate) return undefined;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const slides = [...SLIDES, SLIDES[0]];

  return (
    <section className="ksd-hero">
      {curtain && (
        <div
          className="ksd-hero__curtain"
          aria-hidden="true"
          onAnimationEnd={() => setCurtain(false)}
        />
      )}

      <div
        className={`ksd-hero__track ${animate ? "" : "is-instant"}`}
        style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
      >
        {slides.map((src, pos) => {
          const Title = pos === 0 ? "h1" : "div";
          const tab = pos === index ? 0 : -1;

          return (
            <div
              key={pos}
              className="ksd-hero__slide"
              aria-hidden={pos === 0 ? undefined : true}
            >
              <img
                src={src}
                alt=""
                className="ksd-hero__img"
                loading="eager"
                decoding="async"
              />
              <div className="ksd-hero__shade" />

              <div className="ksd-hero__container">
                <Title className="ksd-hero__title">
                  <span>Architecture.</span>
                  <span>Interior Design.</span>
                  <span>Complete Home Solutions.</span>
                </Title>

                <div className="ksd-hero__actions">
                  <Link
                    to="/projects"
                    className="ksd-hero__btn ksd-hero__btn--solid"
                    tabIndex={tab}
                  >
                    <span>View Signature Projects</span>
                    <Arrow />
                  </Link>
                  <Link
                    to="/contact"
                    className="ksd-hero__btn ksd-hero__btn--light"
                    tabIndex={tab}
                  >
                    <span>Book Consultation</span>
                    <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}