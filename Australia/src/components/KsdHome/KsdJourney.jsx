import { Link } from "react-router-dom";
import { JOURNEY_INTRO, JOURNEY_STEPS } from "../../data/journey";
import "./KsdJourney.css";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

export default function KsdJourney() {
  return (
    <section className="ksd-journey">
      <div className="ksd-journey__intro">
        <p className="ksd-journey__eyebrow">{JOURNEY_INTRO.eyebrow}</p>
        <h2>{JOURNEY_INTRO.title}</h2>
        <p>{JOURNEY_INTRO.text}</p>
        <Link to="/design-journey" className="ksd-journey__link">
          <span>Design Journey</span>
          <Arrow />
        </Link>
      </div>

      <div className="ksd-journey__steps">
        {JOURNEY_STEPS.map((step) => (
          <Link key={step.num} to="/design-journey" className="ksd-journey__card">
            <img src={step.image} alt="" loading="lazy" />
            <div className="ksd-journey__shade" />
            <div className="ksd-journey__copy">
              <span>{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.kicker}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
