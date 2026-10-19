import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, siteImage } from "../../api";
import "./Service.css";

const FALLBACK_SERVICES = [
  {
    id: 1,
    number: "01",
    slug: "architecture-design",
    title: "Architecture & Design",
    icon: "layers",
    image: "/images/ksd-stone-07.jpg",
    description: "Form, proportion and how the family lives, resolved before a brick is laid.",
  },
  {
    id: 2,
    number: "02",
    slug: "builder-interior-design",
    title: "Builder Interior Design",
    icon: "tiles",
    image: "/images/ksd-stone-09.jpg",
    description: "Materials, joinery and light considered with the architecture, so every room feels like part of the same home.",
  },
  {
    id: 3,
    number: "03",
    slug: "complete-home-solutions",
    title: "Complete Home Solutions",
    icon: "plank",
    image: "/images/ksd-stone-27.jpg",
    description: "Combined visionary — licensed builder and interior design under one roof. One brief, one team, one finished residence.",
  },
  {
    id: 4,
    number: "04",
    slug: "licensed-boutique-building",
    title: "Licensed Boutique Building",
    icon: "oak",
    image: "/images/ksd-stone-38.jpg",
    description: "High-end Western Australian homes delivered by a licensed builder, with a customer-centred process.",
  },
  {
    id: 5,
    number: "05",
    slug: "indoor-outdoor-living",
    title: "Indoor–Outdoor Living",
    icon: "vein",
    image: "/images/ksd-stone-03.jpg",
    description: "Alfresco, pool and garden composed with the house so Western Australian light and privacy work together.",
  },
  {
    id: 6,
    number: "06",
    slug: "materials-finishes",
    title: "Materials & Finishes",
    icon: "carpet",
    image: "/images/ksd-stone-40.jpg",
    description: "Marble, timber, stone and concrete chosen for climate, touch and how they catch the light.",
  },
];

function useReveal() {
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

  return [ref, visible];
}

function ServiceIcon({ type }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 40,
    height: 40,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (type) {
    case "layers":
      return (
        <svg {...common}>
          <rect x="13" y="3" width="24" height="24" />
          <path d="M9 7H3v30h30v-6" />
          <path d="M13 31H7V11" />
          <path d="M17 3v8H9M37 17H29v-6" />
        </svg>
      );
    case "tiles":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="34" height="34" />
          <rect x="9" y="9" width="22" height="22" />
          <path d="M20 9v22M9 20h22" />
          <path d="M20 14l6 6-6 6-6-6z" />
        </svg>
      );
    case "oak":
      return (
        <svg {...common}>
          <path d="M20 3l8 8-17 17-8-8z" />
          <path d="M31 11l6 6-17 17-6-6" />
          <path d="M16 7l8 8M12 11l8 8M8 15l8 8" />
        </svg>
      );
    case "plank":
      return (
        <svg {...common}>
          <path d="M3 5h34v30H3z" />
          <path d="M3 5v30M13 5v30M23 5v30M33 5v30" />
          <path d="M13 12c3 4 3 12 0 16M23 12c3 4 3 12 0 16" />
        </svg>
      );
    case "carpet":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="34" height="34" />
          <path d="M20 3v34M3 20h34" />
          <path d="M11.5 8l4 4-4 4-4-4zM28.5 8l4 4-4 4-4-4zM11.5 24l4 4-4 4-4-4zM28.5 24l4 4-4 4-4-4z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M3 33l6-24h28v24z" />
          <path d="M13 9v24M19 9v24M25 9v24M31 9v24" />
          <path d="M3 28h34" />
        </svg>
      );
  }
}

function ServiceCard({ service, index }) {
  const [ref, visible] = useReveal();
  const link = `/services/${service.slug || service.id}`;

  return (
    <div
      ref={ref}
      className={`service-item fade-up${visible ? " is-visible" : ""}`}
      style={{ "--delay": `${(index % 3) * 0.15}s` }}
    >
      <Link to={link} className="service-card style2 background-image">
        <div
          className="service-card-bg"
          style={{ backgroundImage: `url("${service.image}")` }}
        />
        <div className="content">
          <div className="number">{service.number}</div>
          <h3>{service.title}</h3>
          <p className="text">{service.description}</p>
          <div className="icon">
            <ServiceIcon type={service.icon || "layers"} />
          </div>
        </div>
      </Link>
    </div>
  );
}

function Service() {
  const { data } = useApi("/services");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const services = (data && data.length > 0)
    ? data.map((s, idx) => ({
        id: s._id || idx + 1,
        number: String(idx + 1).padStart(2, "0"),
        slug: s.slug,
        title: s.title,
        icon: ["layers", "tiles", "plank", "oak", "vein", "carpet"][idx % 6],
        image: siteImage(
          s.image,
          FALLBACK_SERVICES.find((item) => item.slug === s.slug)?.image
            || FALLBACK_SERVICES[idx % FALLBACK_SERVICES.length].image
        ),
        description: s.shortDescription || s.description || "Architecture and builder interior design as one complete home solution.",
      }))
    : FALLBACK_SERVICES;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedServices = services.slice(startIndex, startIndex + pageSize);

  return (
    <section className="service-section">
      <div className="service-container">
        <div className="service-grid">
          {paginatedServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {services.length > pageSize && (
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "30px" }}>
            <nav className="ksd-pagination" aria-label="Page navigation" style={{ display: "flex", gap: "10px" }}>
              {Array.from({ length: Math.ceil(services.length / pageSize) }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  style={{
                    minWidth: "46px",
                    height: "46px",
                    border: "1.5px solid rgba(14, 42, 71, 0.2)",
                    background: currentPage === pg ? "var(--green, #157A3C)" : "#fff",
                    color: currentPage === pg ? "#fff" : "var(--navy, #0E2A47)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={() => setCurrentPage(pg)}
                >
                  {String(pg).padStart(2, "0")}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

export default Service;
