import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, asset } from "../../api";
import "./Service.css";

const FALLBACK_SERVICES = [
  {
    id: 1,
    number: "01",
    slug: "architectural-home-building",
    title: "Architectural Home Building",
    icon: "layers",
    image: "/images/ksd-stone-15.jpg",
    description: "Master-crafted bespoke luxury residences, modern estates, and custom builds engineered to the highest Australian standards.",
  },
  {
    id: 2,
    number: "02",
    slug: "luxury-stone-flooring",
    title: "Luxury Natural Stone Flooring",
    icon: "tiles",
    image: "/images/ksd-stone-16.jpg",
    description: "Large-format imported Italian & Greek marble tiles, dry-laid with tight hairline joints and continuous vein alignment.",
  },
  {
    id: 3,
    number: "03",
    slug: "waterfall-islands-vanities",
    title: "Waterfall Islands & Vanities",
    icon: "plank",
    image: "/images/ksd-stone-17.jpg",
    description: "CNC waterjet fabricated natural quartzite, Calacatta marble, and granite kitchen islands with 45° mitered edges.",
  },
  {
    id: 4,
    number: "04",
    slug: "bookmatched-feature-walls",
    title: "Bookmatched Feature Walls",
    icon: "oak",
    image: "/images/ksd-stone-18.jpg",
    description: "Grand floor-to-ceiling vertical marble slab installations for luxury entry foyers, penthouse living, and hotel suites.",
  },
  {
    id: 5,
    number: "05",
    slug: "facades-alfresco-paving",
    title: "Facades & Alfresco Paving",
    icon: "vein",
    image: "/images/ksd-stone-19.jpg",
    description: "Premium travertine, granite, and limestone exterior cladding, pool copings, and outdoor architectural entertaining pavilions.",
  },
  {
    id: 6,
    number: "06",
    slug: "custom-stonemasonry",
    title: "Custom Stonemasonry & Detailing",
    icon: "carpet",
    image: "/images/ksd-stone-20.jpg",
    description: "Artisanal stonemasonry, cantilevered stone staircases, carved fireplace hearths, and precision brass inlay details.",
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
        image: s.image ? asset(s.image) : `/images/ksd-stone-${String((idx % 10) + 15).padStart(2, "0")}.jpg`,
        description: s.shortDescription || s.description || "Premium architectural stone and luxury construction craftsmanship.",
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
