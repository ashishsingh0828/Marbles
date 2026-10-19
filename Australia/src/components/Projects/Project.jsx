import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../api";
import { mergeHomes } from "../../data/homes";
import "./Project.css";

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
            {home.status} / {home.location}
          </span>
          <h3>{home.title}</h3>
          <p>{home.specLine || home.conceptHeadline}</p>
          <span className="home-card__cta">
            View this home <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}

function Project() {
  const { data } = useApi("/projects");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const homes = mergeHomes(data);
  const startIndex = (currentPage - 1) * pageSize;
  const page = homes.slice(startIndex, startIndex + pageSize);
  const pages = Math.ceil(homes.length / pageSize);

  return (
    <section className="homes-section">
      <div className="homes-intro">
        <p>Our homes</p>
        <h2>Boutique residences, resolved as complete compositions</h2>
      </div>
      <div className="homes-grid">
        {page.map((home, index) => (
          <ProjectCard key={home.id || home.slug} home={home} index={index} />
        ))}
      </div>

      {pages > 1 && (
        <nav className="homes-pages" aria-label="Homes pages">
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
    </section>
  );
}

export default Project;
