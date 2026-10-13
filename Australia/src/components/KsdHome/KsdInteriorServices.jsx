import React from "react";
import { Link } from "react-router-dom";
import "./KsdInteriorServices.css";

const INTERIOR_SERVICES = [
  {
    num: "01",
    title: "Luxury Kitchen & Waterfall Islands",
    desc: "Seamless 45° mitered edge Calacatta and Statuario waterfall islands, integrated stone sinks, and bookmatched splashbacks.",
    img: "/images/ksd-stone-16.jpg",
    link: "/services",
  },
  {
    num: "02",
    title: "Master Ensuite & Wellness Sanctuaries",
    desc: "Floor-to-ceiling slab bathrooms, custom-carved stone basins, walk-in rain showers, and anti-slip honed travertine surfaces.",
    img: "/images/ksd-stone-17.jpg",
    link: "/services",
  },
  {
    num: "03",
    title: "Bookmatched Living Statement Walls",
    desc: "Mirror-cut natural marble slabs creating symmetrical art pieces for penthouse living rooms, fireplaces, and entry foyers.",
    img: "/images/ksd-stone-18.jpg",
    link: "/services",
  },
  {
    num: "04",
    title: "Architectural Flooring & Inlays",
    desc: "Large-format calibrated stone tiles, tight hairline joints, brass metal inlays, and custom entryway medallions.",
    img: "/images/ksd-stone-19.jpg",
    link: "/services",
  },
  {
    num: "05",
    title: "Alfresco & Terrace Entertaining",
    desc: "Seamless indoor-outdoor transitions with salt-safe Australian coastal limestone, outdoor kitchen tops, and BBQ surrounds.",
    img: "/images/ksd-stone-20.jpg",
    link: "/services",
  },
  {
    num: "06",
    title: "Bespoke Custom Furniture & Hearth",
    desc: "Artisan-sculpted monolithic dining tables, fluted stone plinths, cantilevered stair treads, and modern fireplace hearths.",
    img: "/images/ksd-stone-21.jpg",
    link: "/services",
  },
];

export default function KsdInteriorServices() {
  return (
    <section className="ksd-interior-services">
      <div className="ksd-interior-services__container">
        <div className="ksd-interior-services__head">
          <div className="ksd-interior-services__head-left">
            <div className="ksd-interior-services__tag">
              <span className="ksd-interior-services__dot" />
              <span>BESPOKE INTERIOR DISCIPLINES</span>
            </div>
            <h2 className="ksd-interior-services__title">
              Crafting Exceptional Interior Environments
            </h2>
          </div>
          <p className="ksd-interior-services__head-desc">
            Every project begins with a deep study of spatial proportion, natural light, and material harmony — executed with artisan stonemasonry.
          </p>
        </div>

        <div className="ksd-interior-services__grid">
          {INTERIOR_SERVICES.map((item) => (
            <div key={item.num} className="ksd-service-card">
              <div className="ksd-service-card__thumb">
                <img src={item.img} alt={item.title} loading="lazy" />
                <span className="ksd-service-card__num">{item.num}</span>
              </div>
              <div className="ksd-service-card__body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link to={item.link} className="ksd-service-card__link">
                  <span>Explore Discipline</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="ksd-interior-services__foot">
          <Link to="/services" className="ksd-btn">
            <span>View All Interior Stone Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
