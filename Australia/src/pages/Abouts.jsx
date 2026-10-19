import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Faq from "../components/FAQ/Faq";
import "./Abouts.css";
import GallerySlider from "../components/GallerSlider/GallerySlider";
import OurValues from "../components/Values/OurValues";
import WhyChooseUs from "../components/Values/WhyChooseUs";
import VideoIntro from "../components/Home/VideoIntro";

const TIMELINE = [
  {
    year: "Now",
    title: "Incorporated in Western Australia",
    desc: "KSD Homes Pty Ltd is established in Perth as a licensed builder for high-end boutique homes, with architecture and interior design at the core of every commission.",
  },
  {
    year: "WA",
    title: "Port Coogee & Western Australia",
    desc: "Current work includes three-storey boutique residences across Western Australia, with Port Coogee among upcoming sites now in design and delivery.",
  },
  {
    year: "Team",
    title: "28+ Years Combined Craft",
    desc: "Our builder and interior design team brings more than twenty-eight years of combined professional experience to every home — without claiming decades as a company.",
  },
  {
    year: "Next",
    title: "Australia, Asia & India",
    desc: "Our vision is to grow KSD Homes as a trusted architecture and design brand across Australia, Asia and India, known for thoughtful, client-centred living environments.",
  },
];

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
    title: "Complete Composition",
    desc: "Architecture, interiors, lighting, furniture and finishes are designed as one — a complete home solution, not disconnected parts.",
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
              <img src="/images/logo/logo.png" alt="KSD Homes logo" className="ksd-about-intro__logo" />
              <span>Architecture &amp; Interior Design</span>
            </div>
          </div>

          <div className="ksd-about-intro__content">
            <div className="ksd-about-intro__tag">
              <span className="ksd-about-intro__dot" />
              <span>OUR DESIGN PHILOSOPHY</span>
            </div>

            <h2 className="ksd-about-intro__title">
              We don&apos;t simply design spaces. We design the way you experience them.
            </h2>

            <p className="ksd-about-intro__lead">
              KSD Homes Pty Ltd is an emerging architecture and design-led brand dedicated to creating thoughtfully designed homes and complete living environments.
            </p>

            <p className="ksd-about-intro__text">
              Incorporated in Australia and based in Perth, we bring together architecture, interior design, innovation, functionality and craftsmanship. Every home should be a reflection of its people, their lifestyle and their aspirations. A KSD home is a carefully composed environment — an oasis of peace, relaxation and personal space — with a customer-centred, personal touch.
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

      {/* Values & Curated Gallery */}
      <VideoIntro/>
   <WhyChooseUs/>
      <OurValues/>
      <GallerySlider/>
      <Faq />
    </div>
  );
}
