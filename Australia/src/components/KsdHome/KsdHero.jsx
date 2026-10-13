import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./KsdHero.css";

const SLIDES = [
  {
    image: "/images/ksd-stone-01.jpg",
    title: "Mosman Waterfront Residence",
    location: "Sydney Harbour, NSW",
    feature: "Bookmatched Calacatta Marble & Cantilevered Terraces",
  },
  {
    image: "/images/ksd-stone-05.jpg",
    title: "Toorak Architectural Penthouse",
    location: "Melbourne, VIC",
    feature: "4-Metre Mitered Waterfall Island & Honed Limestone",
  },
  {
    image: "/images/ksd-stone-06.jpg",
    title: "Byron Bay Modernist Sanctuary",
    location: "Byron Bay, NSW",
    feature: "Roman Travertine Alfresco & Seamless Indoor-Outdoor Flow",
  },
];

export default function KsdHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="ksd-hero">
      <div className="ksd-hero__container">
        <div className="ksd-hero__content">
          <div className="ksd-hero__tag">
            <span className="ksd-hero__dot" />
            <span>LUXURY AUSTRALIAN INTERIOR DESIGN &amp; ARCHITECTURAL STONE</span>
          </div>

          <h1 className="ksd-hero__title">
            Bespoke Luxury Interiors. Signature Marble. Master Stonemasonry.
          </h1>

          <p className="ksd-hero__desc">
            <strong>KSD Homes</strong> is an elite Australian interior design and architectural stonemasonry studio. We craft breathtaking luxury residences, waterfall marble islands, bookmatched statement suites, and refined living environments across Sydney and Melbourne.
          </p>

          <div className="ksd-hero__actions">
            <Link to="/projects" className="ksd-btn">
              <span>View Signature Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/contact" className="ksd-btn ksd-btn--outline">
              <span>Book Consultation</span>
            </Link>
          </div>

          <div className="ksd-hero__stats">
            <div className="ksd-hero__stat-item">
              <span className="ksd-hero__stat-num">250+</span>
              <span className="ksd-hero__stat-lbl">Master Residences Built</span>
            </div>
            <div className="ksd-hero__stat-sep" />
            <div className="ksd-hero__stat-item">
              <span className="ksd-hero__stat-num">18+</span>
              <span className="ksd-hero__stat-lbl">Years Australian Construction</span>
            </div>
            <div className="ksd-hero__stat-sep" />
            <div className="ksd-hero__stat-item">
              <span className="ksd-hero__stat-num">100%</span>
              <span className="ksd-hero__stat-lbl">Hand-Selected Natural Stone</span>
            </div>
          </div>
        </div>

        <div className="ksd-hero__visual">
          <div className="ksd-hero__frame">
            <img
              src={SLIDES[activeSlide].image}
              alt={SLIDES[activeSlide].title}
              className="ksd-hero__img"
            />
            <div className="ksd-hero__overlay-info">
              <span className="ksd-hero__badge-loc">{SLIDES[activeSlide].location}</span>
              <h3>{SLIDES[activeSlide].title}</h3>
              <p>{SLIDES[activeSlide].feature}</p>
            </div>

            <div className="ksd-hero__slide-dots">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`ksd-hero__slide-dot ${activeSlide === idx ? "is-active" : ""}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="ksd-hero__card-float">
            <img src="/images/logo/logo.jpeg" alt="KSD Homes" className="ksd-hero__card-logo" />
            <div>
              <strong>KSD Homes Interior Design</strong>
              <span>Sydney · Melbourne · Gold Coast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
