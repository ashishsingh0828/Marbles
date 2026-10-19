import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../api";
import { mergeHomes } from "../../data/homes";
import "./KsdHero.css";

const AUTOPLAY_MS = 5200;
const SPEED_MS = 700;

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

function slidesFrom(homes) {
  const featured = homes.slice(0, 2).map((home) => ({
    image: home.heroImage || home.image,
    eyebrow: `${home.status} / ${home.location}`,
    lines: [home.title],
    concept: home.conceptHeadline,
    primary: { to: `/projects/${home.slug}`, label: "View project" },
    secondary: { to: "/contact", label: "Book consultation" },
  }));

  return [
    {
      image: "/images/ksd-stone-06.jpg",
      eyebrow: "Combined visionary · Perth",
      lines: ["Architecture.", "Builder Interior Design.", "Complete Home Solutions."],
      concept: "Licensed boutique builder. Design and build under one roof.",
      primary: { to: "/projects", label: "View our projects" },
      secondary: { to: "/contact", label: "Book consultation" },
    },
    ...featured,
  ];
}

export default function KsdHero() {
  const { data } = useApi("/projects");
  const slides = useMemo(() => slidesFrom(mergeHomes(data)), [data]);
  const total = slides.length;
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

  const track = [...slides, slides[0]];

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
        {track.map((slide, pos) => {
          const Title = pos === 0 ? "h1" : "div";
          const tab = pos === index ? 0 : -1;

          return (
            <div
              key={`${slide.lines[0]}-${pos}`}
              className="ksd-hero__slide"
              aria-hidden={pos === 0 ? undefined : true}
            >
              <img
                src={slide.image}
                alt=""
                className="ksd-hero__img"
                loading={pos === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="ksd-hero__shade" />

              <div className="ksd-hero__container">
                {slide.eyebrow && (
                  <p className="ksd-hero__eyebrow">{slide.eyebrow}</p>
                )}
                <Title className="ksd-hero__title">
                  {slide.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </Title>
                {slide.concept && (
                  <p className="ksd-hero__concept">{slide.concept}</p>
                )}

                <div className="ksd-hero__actions">
                  <Link
                    to={slide.primary.to}
                    className="ksd-hero__btn ksd-hero__btn--solid"
                    tabIndex={tab}
                  >
                    <span>{slide.primary.label}</span>
                    <Arrow />
                  </Link>
                  <Link
                    to={slide.secondary.to}
                    className="ksd-hero__btn ksd-hero__btn--light"
                    tabIndex={tab}
                  >
                    <span>{slide.secondary.label}</span>
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
