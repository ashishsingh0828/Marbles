import { Link } from "react-router-dom";
import { JOURNEY_INTRO, JOURNEY_STEPS } from "../data/journey";
import "./DesignJourney.css";

export default function DesignJourney() {
  return (
    <article className="dj">
      <header className="dj-hero">
        <img src="/images/ksd-stone-07.jpg" alt="" />
        <div className="dj-hero__shade" />
        <div className="dj-hero__copy">
          <p>{JOURNEY_INTRO.eyebrow}</p>
          <h1>{JOURNEY_INTRO.title}</h1>
          <p className="dj-hero__lead">{JOURNEY_INTRO.text}</p>
        </div>
      </header>

      {JOURNEY_STEPS.map((step, idx) => (
        <section key={step.num} className={`dj-step ${idx % 2 ? "is-flip" : ""}`}>
          <figure className="dj-step__media">
            <img src={step.image} alt={step.title} />
          </figure>
          <div className="dj-step__copy">
            <span>{step.num}</span>
            <h2>{step.title}</h2>
            <p className="dj-step__kicker">{step.kicker}</p>
            <p>{step.text}</p>
          </div>
        </section>
      ))}

      <div className="dj-next">
        <Link to="/projects">
          <span>View our collection</span>
          <strong>Projects</strong>
          <em>In delivery and upcoming homes</em>
        </Link>
        <Link to="/contact">
          <span>Enquire</span>
          <strong>We&apos;d love to hear from you</strong>
          <em>Book a consultation with our Perth team</em>
        </Link>
      </div>
    </article>
  );
}
