import React from "react";
import { Link } from "react-router-dom";
import "./KsdStory.css";

const POINTS = [
  {
    num: "01",
    title: "Curated Luxury Interior Architecture",
    desc: "Complete interior spatial planning, custom cabinetry joinery, mood lighting, and bespoke residential layout curation.",
  },
  {
    num: "02",
    title: "Direct European Stone Provenance",
    desc: "Hand-selected Calacatta, Statuario, Carrara, and travertine with strict block inspection and seamless vein flow.",
  },
  {
    num: "03",
    title: "Sub-Millimeter Mitered Masonry",
    desc: "Precision 45-degree waterfall island joints, bookmatched vertical walls, and invisible hairline floor transitions.",
  },
  {
    num: "04",
    title: "Turnkey Interior Fitouts",
    desc: "From initial concept renderings to final styling, our senior interior directors manage every detail with complete transparency.",
  },
];

export default function KsdStory() {
  return (
    <section className="ksd-story">
      <div className="ksd-story__container">
        <div className="ksd-story__images">
          <div className="ksd-story__img-main">
            <img src="/images/ksd-stone-03.jpg" alt="KSD Homes luxury architectural residence interior" loading="lazy" />
          </div>
          <div className="ksd-story__img-sub">
            <img src="/images/ksd-stone-04.jpg" alt="Natural marble craftsmanship" loading="lazy" />
          </div>
          <div className="ksd-story__badge">
            <span className="ksd-story__badge-years">18+</span>
            <span className="ksd-story__badge-txt">Years of Design Distinction</span>
          </div>
        </div>

        <div className="ksd-story__content">
          <div className="ksd-story__tag">
            <span className="ksd-story__dot" />
            <span>THE KSD HOMES INTERIOR PHILOSOPHY</span>
          </div>

          <h2 className="ksd-story__heading">
            Elevating Australian Residential Interiors With Master Stone Artistry
          </h2>

          <p className="ksd-story__lead">
            We believe a home should inspire emotion, harmony, and timeless prestige through organic textures and balanced natural light.
          </p>

          <p className="ksd-story__text">
            KSD Homes combines visionary Australian interior design with generational stonemasonry. Whether curating a grand harbourfront penthouse, sculpting a four-metre monolithic marble kitchen island, or creating hotel-grade master ensuites, we craft bespoke living environments that reflect understated luxury.
          </p>

          <div className="ksd-story__grid">
            {POINTS.map((pt) => (
              <div key={pt.num} className="ksd-story__item">
                <span className="ksd-story__num">{pt.num}</span>
                <div className="ksd-story__item-body">
                  <h4>{pt.title}</h4>
                  <p>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ksd-story__cta">
            <Link to="/about" className="ksd-btn">
              <span>Explore Our Design Story</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
