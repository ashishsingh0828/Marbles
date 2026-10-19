import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, siteImage } from "../../api";
import "./OurServices.css";

const SERVICES = [
  {
    title: "Luxury Home Construction",
    text: "Architectural custom home building tailored to Australian lifestyle, blending structural precision with natural stone facades and grand layouts.",
    image: "/images/ksd-stone-07.jpg",
    hoverImage: "/images/ksd-stone-08.jpg",
    href: "/services",
  },
  {
    title: "Natural Stone Flooring",
    text: "Polished and honed marble, travertine, and quartzite flooring laid with razor-thin joints for a seamless, enduring finish.",
    image: "/images/ksd-stone-09.jpg",
    hoverImage: "/images/ksd-stone-12.jpg",
    href: "/services",
  },
  {
    title: "Kitchen Benchtops & Islands",
    text: "Custom waterfall kitchen islands, mitred aprons, and stain-resistant sealing engineered from high-grade natural granite and marble.",
    image: "/images/ksd-stone-27.jpg",
    hoverImage: "/images/ksd-stone-38.jpg",
    href: "/services",
  },
  {
    title: "Feature Walls & Ensuites",
    text: "Bookmatched feature walls, fireplace surrounds, and bespoke wellness bathroom stone that transform interiors into architectural works of art.",
    image: "/images/ksd-stone-40.jpg",
    hoverImage: "/images/ksd-stone-43.jpg",
    href: "/services",
  },
];

/* adds .is-visible once the section scrolls into view */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const TITLE = "Transforming Australian spaces with bespoke home construction & stone";

export default function OurServices({
  services: propServices,
  viewAllHref = "/services",
}) {
  const { data: backendServices } = useApi("/services");
  const [ref, visible] = useReveal();
  const words = TITLE.split(" ");

  const services = useMemo(() => {
    if (propServices && propServices.length > 0) return propServices;
    if (backendServices && backendServices.length > 0) {
      return backendServices.slice(0, 4).map((s, idx) => ({
        title: s.title,
        text: s.shortDescription || s.description || "Architectural custom stone and luxury residential building tailored to Australian lifestyle.",
        image: siteImage(s.image, SERVICES[idx % SERVICES.length].image),
        hoverImage: SERVICES[(idx + 1) % SERVICES.length].hoverImage,
        href: `/services/${s.slug || s._id}`,
      }));
    }
    return SERVICES;
  }, [propServices, backendServices]);

  return (
    <section
      ref={ref}
      id="services"
      className={`services ${visible ? "is-visible" : ""}`}
      aria-labelledby="services-title"
    >
      <svg className="services__veins" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-40 120 C 260 180, 460 40, 740 120 S 1140 240, 1500 100" />
        <path d="M-20 780 C 220 720, 440 840, 740 780 S 1140 680, 1500 800" />
        <path className="gold" d="M1000 -10 C 1040 110, 980 190, 1060 320" />
      </svg>

      <div className="services__inner">
        {/* Header */}
        <header className="services__head">
          <div className="services__head-left">
            <span className="services__tag services__fade" style={{ "--d": "0.05s" }}>
              <i aria-hidden="true" />
              ARCHITECTURAL EXPERTISE
            </span>

            <h2 id="services-title" className="services__title" aria-label={TITLE}>
              {words.map((w, i) => (
                <span key={`${w}-${i}`}>
                  <span className="services__word" aria-hidden="true">
                    <span className="services__word-in" style={{ "--w": i }}>
                      {w}
                    </span>
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>
          </div>

          <p className="services__lead services__fade" style={{ "--d": "0.5s" }}>
            From luxury home architectural design to master stone masonry, KSD Homes delivers flawless residential outcomes built to Australian perfection.
          </p>
        </header>

        <span className="services__rule" aria-hidden="true" />

        {/* Cards */}
        <ul className="services__grid">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="services__card services__fade"
              style={{ "--d": `${0.6 + i * 0.16}s` }}
            >
              <div className="services__media">
                <div className="services__imgs">
                  <img
                    className="services__img services__img--base"
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                  <img
                    className="services__img services__img--hover"
                    src={s.hoverImage || s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                  <span className="services__tint" aria-hidden="true" />
                </div>

                <Link className="services__icon" to={s.href} aria-label={`Learn more about ${s.title}`}>
                  <ArrowIcon />
                </Link>
              </div>

              <div className="services__body">
                <h3 className="services__name">
                  <Link to={s.href}>{s.title}</Link>
                </h3>
                <p className="services__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Bottom link */}
        <div className="services__more services__fade" style={{ "--d": "1.3s" }}>
          <Link className="services__all" to={viewAllHref}>
            View all services
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
