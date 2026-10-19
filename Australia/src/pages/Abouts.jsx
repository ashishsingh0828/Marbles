import React from "react";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/Values/WhyChooseUs";
import "./Abouts.css";
import "./DesignJourney.css";

const PHILOSOPHIES = [
  {
    num: "01",
    title: "Form & Function",
    desc: "Every home is composed around proportion, light, materials, colour, texture and technology so the space feels comfortable, timeless and purposeful.",
  },
  {
    num: "02",
    title: "A Personal Touch",
    desc: "Every project begins with listening. We collaborate closely so the architecture reflects how you live, not a generic template.",
  },
  {
    num: "03",
    title: "Under one roof",
    desc: "Architecture, licensed boutique building and builder interior design sit with the same team from first conversation to handover.",
  },
];

export default function Abouts() {
  return (
    <div className="ksd-about-page">
      <header className="dj-hero ksd-about-hero">
        <img src="/images/ksd-stone-07.jpg" alt="" />
        <div className="dj-hero__shade" />
        <div className="dj-hero__copy">
          <p>About us</p>
          <h1>KSD is a name that stands for thoughtfully designed homes in Perth</h1>
          <p className="dj-hero__lead">
            We do not simply build houses. The best outcome is when the same team handles the entire process — architecture, builder interior design, and licensed boutique construction — from the earliest stages to completion.
          </p>
        </div>
      </header>

      <section className="ksd-about-intro">
        <div className="ksd-about-intro__container">
          <div className="ksd-about-intro__visual">
            <div className="ksd-about-intro__main-img">
              <img src="/images/ksd-stone-03.jpg" alt="KSD Homes dining and light" />
            </div>
            <div className="ksd-about-intro__sub-img">
              <img src="/images/ksd-stone-09.jpg" alt="KSD Homes bedroom interior direction" />
            </div>
            <div className="ksd-about-intro__badge">
              <img src="/images/logo/logo.png" alt="KSD Homes logo" className="ksd-about-intro__logo" />
              <span>Builder Interior Design</span>
            </div>
          </div>

          <div className="ksd-about-intro__content">
            <div className="ksd-about-intro__tag">
              <span className="ksd-about-intro__dot" />
              <span>THE KSD WAY</span>
            </div>

            <h2 className="ksd-about-intro__title">
              Combined visionary: architecture, builder interior design and complete homes.
            </h2>

            <p className="ksd-about-intro__lead">
              KSD Homes Pty Ltd is an emerging architecture and design-led brand dedicated to creating thoughtfully designed homes and complete living environments.
            </p>

            <p className="ksd-about-intro__text">
              Incorporated in Western Australia and based in Carlisle, Perth, we bring together architecture, builder interior design, innovation and craftsmanship — a brand of the Eagle Group of Companies. The company starts its journey in 2026. The team already carries 28+ years of combined professional experience. Designing and building a home is one of the most important investments of a lifetime, so it matters that you have the right team on your side.
            </p>

            <div className="ksd-about-intro__stats">
              <div className="ksd-about-intro__stat">
                <h3>28+</h3>
                <p>Years Team Experience</p>
              </div>
              <div className="ksd-about-intro__stat">
                <h3>WA</h3>
                <p>Licensed Boutique Builder</p>
              </div>
              <div className="ksd-about-intro__stat">
                <h3>One</h3>
                <p>Complete Home Solution</p>
              </div>
            </div>

            <div className="ksd-about-intro__action">
              <Link to="/design-journey" className="ksd-btn">
                <span>Design Journey</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ksd-about-philo">
        <div className="ksd-about-philo__inner">
          {PHILOSOPHIES.map((item) => (
            <article key={item.num}>
              <span>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <div className="dj-next">
        <Link to="/projects">
          <span>Collection</span>
          <strong>View our projects</strong>
          <em>In delivery and upcoming homes</em>
        </Link>
        <Link to="/contact">
          <span>Enquire</span>
          <strong>We&apos;d love to hear from you</strong>
          <em>Book a consultation with our Perth team</em>
        </Link>
      </div>
    </div>
  );
}
