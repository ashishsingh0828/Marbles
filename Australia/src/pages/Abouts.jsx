import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import OurValues from "../components/Values/OurValues";
import OurGallery from "../components/Values/OurGallery";
import Faq from "../components/FAQ/Faq";
import "./Abouts.css";

const TIMELINE = [
  {
    year: "2008",
    title: "Founding in Sydney",
    desc: "Established with a dedication to bringing European quarry-direct natural stone and artisan interior masonry to Australian residential architecture.",
  },
  {
    year: "2014",
    title: "CNC & Waterjet Precision Facility",
    desc: "Invested in state-of-the-art Italian 5-axis digital bridge saws and waterjet technology for sub-millimeter 45° mitered edge fabrication.",
  },
  {
    year: "2019",
    title: "Melbourne & Coastal Expansion",
    desc: "Expanded complete bespoke interior turn-key fitouts to premier suburbs in Melbourne (Toorak, Brighton) and Byron Bay.",
  },
  {
    year: "2026",
    title: "The Premier Luxury Stone Studio",
    desc: "Recognised as Australia's leading studio for high-end residential interior stone, bookmatched living walls, and bespoke marble architecture.",
  },
];

const PHILOSOPHIES = [
  {
    num: "01",
    title: "Organic Materiality",
    desc: "We celebrate natural veining, mineral crystallization, and tactile stone textures rather than synthetic manufactured surfaces.",
  },
  {
    num: "02",
    title: "Spatial Proportions",
    desc: "Every stone slab is scaled and aligned to enhance the natural light and architectural ceiling volume of the home.",
  },
  {
    num: "03",
    title: "Generational Longevity",
    desc: "With clinical calibration and breathable stone sealing, our completed residences retain pristine beauty across decades.",
  },
];

export default function Abouts() {
  return (
    <div className="ksd-about-page">
      <Breadcrumb
        title="About KSD Homes"
        image="/images/ksd-stone-02.jpg"
        labels={{ about: "About Our Studio" }}
      />

      {/* Main Studio Introduction */}
      <section className="ksd-about-intro">
        <div className="ksd-about-intro__container">
          <div className="ksd-about-intro__visual">
            <div className="ksd-about-intro__main-img">
              <img src="/images/ksd-stone-08.jpg" alt="KSD Homes interior studio" />
            </div>
            <div className="ksd-about-intro__sub-img">
              <img src="/images/ksd-stone-09.jpg" alt="Natural stone curation" />
            </div>
            <div className="ksd-about-intro__badge">
              <img src="/images/logo/logo.jpeg" alt="KSD Homes logo" className="ksd-about-intro__logo" />
              <span>Luxury Australian Interiors</span>
            </div>
          </div>

          <div className="ksd-about-intro__content">
            <div className="ksd-about-intro__tag">
              <span className="ksd-about-intro__dot" />
              <span>OUR DESIGN HERITAGE</span>
            </div>

            <h2 className="ksd-about-intro__title">
              Crafting Signature Spaces With Timeless Stone &amp; Visionary Interior Design
            </h2>

            <p className="ksd-about-intro__lead">
              KSD Homes is a multidisciplinary Australian interior architecture and stonemasonry studio dedicated to residences of unparalleled refinement.
            </p>

            <p className="ksd-about-intro__text">
              Our philosophy bridges classical European stonemasonry traditions with contemporary Australian architectural living. By overseeing the entire path — from individual quarry block sourcing in Italy and Greece, through 3D dry-lay vein mapping, to on-site mitered installation — we give homeowners absolute certainty in both aesthetic grandeur and structural precision.
            </p>

            <div className="ksd-about-intro__stats">
              <div className="ksd-about-intro__stat">
                <h3>18+</h3>
                <p>Years in Australia</p>
              </div>
              <div className="ksd-about-intro__stat">
                <h3>250+</h3>
                <p>Curated Residences</p>
              </div>
              <div className="ksd-about-intro__stat">
                <h3>100%</h3>
                <p>Quarry-Direct Stone</p>
              </div>
            </div>

            <div className="ksd-about-intro__action">
              <Link to="/contact" className="ksd-btn">
                <span>Book A Private Consultation</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophies */}
      <section className="ksd-about-phil">
        <div className="ksd-about-phil__container">
          <div className="ksd-about-phil__head">
            <div className="ksd-about-phil__tag">
              <span className="ksd-about-phil__dot" />
              <span>CORE ARCHITECTURAL PILLARS</span>
            </div>
            <h2>The Principles Behind Every KSD Interior</h2>
          </div>

          <div className="ksd-about-phil__grid">
            {PHILOSOPHIES.map((p) => (
              <div key={p.num} className="ksd-phil-card">
                <span className="ksd-phil-card__num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Timeline */}
      <section className="ksd-about-timeline">
        <div className="ksd-about-timeline__container">
          <div className="ksd-about-timeline__head">
            <div className="ksd-about-timeline__tag">
              <span className="ksd-about-timeline__dot" />
              <span>OUR EVOLUTION</span>
            </div>
            <h2>Eighteen Years of Architectural Milestone</h2>
          </div>

          <div className="ksd-about-timeline__grid">
            {TIMELINE.map((t) => (
              <div key={t.year} className="ksd-timeline-card">
                <span className="ksd-timeline-card__year">{t.year}</span>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Curated Gallery */}
      <OurValues />
      <OurGallery />
      <Faq />
    </div>
  );
}
