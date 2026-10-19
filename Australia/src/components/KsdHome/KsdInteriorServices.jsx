import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, siteImage } from "../../api";
import "./KsdInteriorServices.css";

const Icon = ({ children }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const INTERIOR_SERVICES = [
  {
    num: "01",
    title: "Architecture & Design",
    desc: "A complete composition — form, proportion and how the family lives, resolved before a brick is laid.",
    img: "/images/ksd-stone-07.jpg",
    link: "/services/architecture-design",
    icon: (
      <Icon>
        <path d="M3 10h18" />
        <path d="M5 10v9" />
        <path d="M19 10v9" />
        <path d="M7 10V7h10v3" />
        <path d="M10 7V5.5a2 2 0 0 1 4 0" />
      </Icon>
    ),
  },
  {
    num: "02",
    title: "Builder Interior Design",
    desc: "Materials, joinery and light considered with the architecture, so every room feels like part of the same home.",
    img: "/images/ksd-stone-09.jpg",
    link: "/services/builder-interior-design",
    icon: (
      <Icon>
        <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z" />
        <path d="M6 12V6a2 2 0 0 1 4 0" />
        <path d="M7 19l-1 2" />
        <path d="M17 19l1 2" />
      </Icon>
    ),
  },
  {
    num: "03",
    title: "Complete Home Solutions",
    desc: "Combined visionary — licensed builder and interior design under one roof. One brief, one team, one finished residence.",
    img: "/images/ksd-stone-27.jpg",
    link: "/services/complete-home-solutions",
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="16" />
        <path d="M12 6.5l5.5 5.5-5.5 5.5L6.5 12z" />
      </Icon>
    ),
  },
  {
    num: "04",
    title: "Licensed Boutique Building",
    desc: "High-end Western Australian homes delivered by a licensed builder, with a customer-centred process.",
    img: "/images/ksd-stone-38.jpg",
    link: "/services/licensed-boutique-building",
    icon: (
      <Icon>
        <rect x="3" y="3" width="8" height="8" />
        <rect x="13" y="3" width="8" height="8" />
        <rect x="3" y="13" width="8" height="8" />
        <rect x="13" y="13" width="8" height="8" />
      </Icon>
    ),
  },
  {
    num: "05",
    title: "Indoor–Outdoor Living",
    desc: "Alfresco, pool and garden composed with the house so Western Australian light and privacy work together.",
    img: "/images/ksd-stone-03.jpg",
    link: "/services/indoor-outdoor-living",
    icon: (
      <Icon>
        <circle cx="12" cy="9" r="3.5" />
        <path d="M12 2v1.5M12 14.5V16M5 9H3.5M20.5 9H19M7 4l1 1M17 4l-1 1M7 14l1-1M17 14l-1-1" />
        <path d="M4 21h16" />
      </Icon>
    ),
  },
  {
    num: "06",
    title: "Materials & Finishes",
    desc: "Marble, timber, stone and concrete chosen for climate, touch and how they catch the light — each in its right place.",
    img: "/images/ksd-stone-40.jpg",
    link: "/services/materials-finishes",
    icon: (
      <Icon>
        <path d="M3 9h18" />
        <path d="M5 9v10" />
        <path d="M19 9v10" />
        <path d="M8 9v4" />
        <path d="M16 9v4" />
      </Icon>
    ),
  },
];

const HEADING = "Architecture, builder interior design and complete homes";

const Arrow = () => (
  <svg width="22" height="14" viewBox="0 0 26 16" fill="none" aria-hidden="true">
    <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="currentColor" />
  </svg>
);

const ButtonArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

function AnimatedHeading({ text }) {
  let count = 0;

  return (
    <h2 className="ksd-svc__title" aria-label={text}>
      <span aria-hidden="true">
        {text.split(" ").map((word, wi) => (
          <React.Fragment key={`${word}-${wi}`}>
            {wi > 0 && " "}
            <span className="ksd-svc__word">
              {word.split("").map((ch, ci) => {
                const delay = 0.15 + count * 0.03;
                count += 1;
                return (
                  <span
                    key={ci}
                    className="ksd-svc__letter"
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
    </h2>
  );
}

export default function KsdInteriorServices() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
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
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { data: backendServices } = useApi("/services");

  const services = useMemo(() => {
    if (backendServices && backendServices.length > 0) {
      return backendServices.slice(0, 6).map((s, idx) => ({
        num: String(idx + 1).padStart(2, "0"),
        title: s.title,
        desc: s.shortDescription || s.description || "Architecture and builder interior design as one complete home solution.",
        img: siteImage(s.image, INTERIOR_SERVICES[idx % INTERIOR_SERVICES.length].img),
        link: `/services/${s.slug || s._id}`,
        icon: INTERIOR_SERVICES[idx % INTERIOR_SERVICES.length].icon,
      }));
    }
    return INTERIOR_SERVICES;
  }, [backendServices]);

  return (
    <section ref={ref} className={`ksd-svc ${visible ? "is-visible" : ""}`}>
      <div className="ksd-svc__container">
        <div className="ksd-svc__head">
          <div className="ksd-svc__eyebrow ksd-svc__rise" style={{ "--d": "0.05s" }}>
            <span className="ksd-svc__eyebrow-icon" aria-hidden="true" />
            <span>Our Services</span>
            <span className="ksd-svc__eyebrow-icon" aria-hidden="true" />
          </div>
          <AnimatedHeading text={HEADING} />
        </div>

        <div className="ksd-svc__grid">
          {services.map((item, i) => (
            <Link
              key={item.num}
              to={item.link}
              className="ksd-svc__card ksd-svc__rise"
              style={{ "--d": `${0.5 + (i % 3) * 0.15 + Math.floor(i / 3) * 0.2}s` }}
              aria-label={item.title}
            >
              <div className="ksd-svc__media">
                <img src={item.img} alt="" loading="lazy" decoding="async" />
              </div>

              <div className="ksd-svc__tab" aria-hidden="true">
                {item.icon}
              </div>

              <div className="ksd-svc__panel">
                <div className="ksd-svc__row">
                  <h3 className="ksd-svc__name">{item.title}</h3>
                  <Arrow />
                </div>
                <div className="ksd-svc__descwrap">
                  <div className="ksd-svc__descin">
                    <p className="ksd-svc__desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="ksd-svc__foot ksd-svc__rise" style={{ "--d": "0.9s" }}>
          <Link to="/services" className="ksd-svc__btn">
            <span>View All Services</span>
            <ButtonArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}