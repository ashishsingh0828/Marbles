import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../api";
import { mergeHomes } from "../../data/homes";
import "./Project.css";

const FILTERS = ["All", "In Delivery", "Upcoming"];

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

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  );
}

function ProjectCard({ home, index }) {
  const [ref, visible] = useReveal();
  const link = `/projects/${home.slug || home.id}`;
  const name = home.suburb || home.title;

  return (
    <article
      ref={ref}
      className={`home-card fade-up${visible ? " is-visible" : ""}`}
      style={{ "--delay": `${(index % 2) * 0.12}s` }}
    >
      <Link to={link} className="home-card__link" aria-label={`View ${home.title}`}>
        <img src={home.image} alt={home.title} loading="lazy" />
        <div className="home-card__shade" />
        <div className="home-card__copy">
          <span className="home-card__meta">
            {home.status} / {name}
          </span>
          <h3>
            {name}
            {home.shortCode ? <em>{home.shortCode}</em> : null}
          </h3>
          <p>{home.conceptHeadline || home.specLine}</p>
          <span className="home-card__cta">
            View project <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}

function Project({ variant = "page" }) {
  const { data } = useApi("/projects");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = variant === "home" ? 4 : 6;
  const homes = mergeHomes(data);

  const filtered = useMemo(() => {
    if (filter === "All") return homes;
    return homes.filter((home) => {
      const bucket = home.collection || home.status || "";
      if (filter === "Upcoming") return /upcoming/i.test(bucket);
      return /delivery|built|completed/i.test(bucket);
    });
  }, [homes, filter]);

  const startIndex = (currentPage - 1) * pageSize;
  const page = filtered.slice(startIndex, startIndex + pageSize);
  const pages = Math.ceil(filtered.length / pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <section className={`homes-section ${variant === "home" ? "is-home" : ""}`}>
      <div className="homes-intro">
        <p>View our collection</p>
        <h2>Recently composed residences, and a glimpse of homes taking shape</h2>
      </div>

      <div className="homes-filters" role="tablist" aria-label="Project collection">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            className={filter === item ? "is-on" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="homes-grid">
        {page.map((home, index) => (
          <ProjectCard key={home.id || home.slug} home={home} index={index} />
        ))}
      </div>

      {pages > 1 && (
        <nav className="homes-pages" aria-label="Projects pages">
          {Array.from({ length: pages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              type="button"
              className={currentPage === pg ? "is-on" : ""}
              onClick={() => setCurrentPage(pg)}
            >
              {String(pg).padStart(2, "0")}
            </button>
          ))}
        </nav>
      )}

      {variant === "home" && (
        <div className="homes-more">
          <Link to="/projects">View all projects</Link>
        </div>
      )}
    </section>
  );
}

export default Project;
