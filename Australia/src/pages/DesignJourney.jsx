import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { JOURNEY_INTRO, JOURNEY_STEPS } from "../data/journey";
import "./DesignJourney.css";

/* reveal once when an element scrolls into view (no scroll listeners) */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen];
}

/* splits "From Initial Brief to Turnkey Handover" into two animated lines.
   Reads the existing `title` field, so the data file stays untouched. */
function splitTitle(title = "") {
  const i = title.indexOf(" to ");
  return i > 0 ? [title.slice(0, i), title.slice(i + 1)] : [title];
}

function Step({ step, idx }) {
  const [ref, seen] = useInView();

  return (
    <section
      ref={ref}
      id={`stage-${step.num}`}
      className={`dj-step ${idx % 2 ? "is-flip" : ""} ${seen ? "is-in" : ""}`}
    >
      <figure className="dj-step__media">
        <img src={step.image} alt={step.title} loading="lazy" decoding="async" />
      </figure>
      <div className="dj-step__copy">
        <span className="dj-rv" style={{ "--d": "0.1s" }}>{step.num}</span>
        <h2 className="dj-rv" style={{ "--d": "0.22s" }}>{step.title}</h2>
        <p className="dj-step__kicker dj-rv" style={{ "--d": "0.34s" }}>{step.kicker}</p>
        <p className="dj-step__text dj-rv" style={{ "--d": "0.46s" }}>{step.text}</p>
      </div>
    </section>
  );
}

export default function DesignJourney() {
  /* the hidden "before reveal" styles only apply once this class is set,
     so nothing can ever stay invisible if scripts fail */
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => setReady(true), []);

  const goTo = (e, num) => {
    const el = document.getElementById(`stage-${num}`);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <article className={`dj ${ready ? "is-ready" : ""}`}>
      <header className="dj-hero">
        <img src="/images/ksd-stone-07.jpg" alt="" />
        <div className="dj-hero__shade" />
        <div className="dj-hero__copy">
          <p className="dj-hero__eyebrow">{JOURNEY_INTRO.eyebrow}</p>
          <h1>
            {splitTitle(JOURNEY_INTRO.title).map((line, i) => (
              <span className="dj-line" key={line}>
                <span style={{ "--i": i }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="dj-hero__lead">{JOURNEY_INTRO.text}</p>

          <nav className="dj-rail" aria-label="Stages">
            {JOURNEY_STEPS.map((s) => (
              <a key={s.num} href={`#stage-${s.num}`} onClick={(e) => goTo(e, s.num)}>
                <b>{s.num}</b>
                <span>{s.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {JOURNEY_STEPS.map((step, idx) => (
        <Step key={step.num} step={step} idx={idx} />
      ))}

      <div className="dj-next">
        <Link to="/projects">
          <span>View our collection</span>
          <strong>Projects</strong>
          <em>In delivery and upcoming homes</em>
        </Link>
        <Link to="/contact" className="is-dark">
          <span>Enquire</span>
          <strong>We&apos;d love to hear from you</strong>
          <em>Book a consultation with our Perth team</em>
        </Link>
      </div>
    </article>
  );
}