import React, { useEffect, useRef, useState } from "react";
import "./ClientFeedback.css";

const TESTIMONIALS = [
  {
    name: "David & Sarah Miller",
    role: "Vaucluse Residence, Sydney",
    rating: 5,
    avatar: "",
    text: "Working with KSD Homes transformed our entire living space. The bespoke interior layout, 4-metre mitered Calacatta kitchen island, and bookmatched living room wall exceeded every expectation.",
  },
  {
    name: "Harrison Wright",
    role: "Luxury Penthouse Owner, Melbourne",
    rating: 5,
    avatar: "",
    text: "KSD Homes delivers interior stone craftsmanship at the highest tier in Australia. Their spatial planning, adherence to timeline, and flawless stone finishing are simply extraordinary.",
  },
  {
    name: "Amelia Hart",
    role: "Senior Interior Architect, Sydney",
    rating: 5,
    avatar: "",
    text: "I regularly collaborate with KSD Homes on high-end residential interiors. The slabs arrive immaculate, the joints are calibrated to sub-millimeter precision, and our clients are always thrilled.",
  },
];

const HEADING = [
  { text: "What our clients say", accent: false },
  { text: "about working with us", accent: true },
];

const SPEED_MS = 1000;

const StarRow = () => (
  <>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z" />
      </svg>
    ))}
  </>
);

const Stars = ({ rating }) => (
  <span className="tt__stars" role="img" aria-label={`Rated ${rating} out of 5`}>
    <span className="tt__stars-row">
      <StarRow />
    </span>
    <span
      className="tt__stars-row tt__stars-fill"
      style={{ width: `${(Math.max(0, Math.min(5, rating)) / 5) * 100}%` }}
    >
      <StarRow />
    </span>
  </span>
);

function AnimatedHeading({ parts }) {
  let count = 0;

  return (
    <h2
      id="tt-heading"
      className="tt__title"
      aria-label={parts.map((p) => p.text).join(" ")}
    >
      {parts.map((part) => (
        <span
          key={part.text}
          className={`tt__part ${part.accent ? "is-accent" : ""}`}
          aria-hidden="true"
        >
          {part.text.split(" ").map((word, wi) => (
            <React.Fragment key={`${word}-${wi}`}>
              {wi > 0 && " "}
              <span className="tt__word">
                {word.split("").map((ch, ci) => {
                  const delay = 0.2 + count * 0.03;
                  count += 1;
                  return (
                    <span
                      key={ci}
                      className="tt__letter"
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
      ))}
    </h2>
  );
}

function useCountUp(target, start, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return undefined;
    }

    let raf;
    const t0 = performance.now();

    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

export default function ClientFeedback({
  items = TESTIMONIALS,
  image = "/images/ksd-stone-08.jpg",
  imageAlt = "Calm living interior",
  interval = 5000,
}) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const drag = useRef({ active: false, startX: 0 });
  const draggingRef = useRef(false);

  const total = items.length;
  const loop = total > 1;
  const slides = loop ? [items[total - 1], ...items, items[0]] : items;

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(loop ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);

  const average = total
    ? items.reduce((sum, t) => sum + (Number(t.rating) || 0), 0) / total
    : 0;
  const counted = useCountUp(average, visible);

  useEffect(() => {
    const node = sectionRef.current;
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAnimate(false);
    setIndex(total > 1 ? 1 : 0);
  }, [total]);

  useEffect(() => {
    if (animate) return undefined;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(id);
  }, [animate]);

  useEffect(() => {
    if (!loop) return undefined;
    if (index !== 0 && index !== total + 1) return undefined;

    const t = setTimeout(() => {
      if (draggingRef.current) return;
      setAnimate(false);
      setIndex(index === 0 ? total : 1);
    }, SPEED_MS + 60);

    return () => clearTimeout(t);
  }, [index, total, loop]);

  const next = () => {
    setAnimate(true);
    setIndex((i) => Math.min(i + 1, total + 1));
  };

  const prev = () => {
    setAnimate(true);
    setIndex((i) => Math.max(i - 1, 0));
  };

  useEffect(() => {
    if (!loop || !visible || dragging) return undefined;
    const t = setTimeout(next, interval);
    return () => clearTimeout(t);
  }, [index, loop, visible, dragging, interval]);

  const onPointerDown = (e) => {
    if (!loop) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { active: true, startX: e.clientX };
    draggingRef.current = true;
    setDragging(true);
    setDragX(0);
    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    setDragX(e.clientX - drag.current.startX);
  };

  const finishDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    draggingRef.current = false;

    const width = stageRef.current ? stageRef.current.offsetWidth : 0;
    const threshold = Math.min(90, width * 0.15);

    if (dragX < -threshold) next();
    else if (dragX > threshold) prev();

    setDragX(0);
    setDragging(false);
  };

  const onKeyDown = (e) => {
    if (!loop) return;
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <section
      ref={sectionRef}
      className={`tt ${visible ? "is-visible" : ""}`}
      aria-labelledby="tt-heading"
    >
      <div className="tt__media">
        <div className="tt__img">
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
        </div>
      </div>

      <div className="tt__content">
        <span className="tt__mark" aria-hidden="true">“</span>

        <div className="tt__eyebrow tt__rise" style={{ "--d": "0.1s" }}>
          <span className="tt__eyebrow-line" />
          <span>Client Testimonials</span>
        </div>

        <AnimatedHeading parts={HEADING} />

        <div
          ref={stageRef}
          className={`tt__stage tt__rise ${loop ? "is-draggable" : ""} ${dragging ? "is-dragging" : ""}`}
          style={{ "--d": "0.9s" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <div
            className={`tt__track ${animate && !dragging ? "" : "is-instant"}`}
            style={{ transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)` }}
          >
            {slides.map((t, pos) => {
              const real = loop ? (pos - 1 + total) % total : pos;

              return (
                <article
                  key={`${t.name}-${pos}`}
                  className="tt__slide"
                  aria-hidden={pos !== index}
                  aria-roledescription="slide"
                  aria-label={`${real + 1} of ${total}`}
                >
                  <Stars rating={t.rating} />

                  <blockquote className="tt__text">
                    <p>{t.text}</p>
                  </blockquote>

                  <footer className="tt__author">
                    <span className="tt__avatar">
                      {t.avatar ? (
                        <img src={t.avatar} alt="" loading="lazy" decoding="async" draggable={false} />
                      ) : (
                        <b>{t.name.charAt(0)}</b>
                      )}
                    </span>
                    <span className="tt__who">
                      <cite>{t.name}</cite>
                      <small>{t.role}</small>
                    </span>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>

        <div className="tt__rating tt__rise" style={{ "--d": "1.2s" }}>
          <span className="tt__rating-num">{counted.toFixed(1)}</span>
          <Stars rating={average} />
          <span className="tt__rating-txt">
            Based on {total} client {total === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>
    </section>
  );
}