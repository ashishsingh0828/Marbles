import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, asset } from "../../api";
import "./Project.css";

const FALLBACK_PROJECTS = [
  { id: 1, slug: "sharma-residence", title: "Sharma Residence", category: "Three-Storey Boutique Home", image: "/images/projects/sharma-elev-01.jpg" },
  { id: 2, slug: "port-coogee-residence", title: "Port Coogee Residence", category: "Upcoming Western Australia", image: "/images/projects/sharma-elev-02.jpg" },
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

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="16"
      viewBox="0 0 26 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal();
  const link = `/projects/${project.slug || project.id}`;

  return (
    <div
      ref={ref}
      className={`project-item fade-up${visible ? " is-visible" : ""}`}
      style={{ "--delay": `${(index % 3) * 0.15}s` }}
    >
      <div className="project-card style4">
        <div className="project-thumb">
          <img src={project.image} alt={project.title} loading="lazy" />
          <div className="content">
            <Link to={link} className="project-title-wrap">
              <span className="project-line" />
              <h3>{project.title}</h3>
            </Link>
            <div className="btn-wrap">
              <Link
                to={link}
                className="link-btn style3"
                aria-label={`View ${project.title}`}
              >
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Project() {
  const { data } = useApi("/projects");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const fromApi = (data && data.length > 0)
    ? data.map((p, idx) => ({
        id: p._id || `api-${idx + 1}`,
        slug: p.slug,
        title: p.title,
        category: p.category || "Boutique Home",
        image: p.imageA ? asset(p.imageA) : (p.image ? asset(p.image) : `/images/ksd-stone-${String((idx % 12) + 21).padStart(2, "0")}.jpg`),
      }))
    : [];
  const seen = new Set(FALLBACK_PROJECTS.map((p) => p.slug));
  const projects = [
    ...FALLBACK_PROJECTS,
    ...fromApi.filter((p) => p.slug && !seen.has(p.slug)),
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  return (
    <section className="project-section">
      <div className="project-container">
        <div className="project-grid">
          {paginatedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length > pageSize && (
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "30px" }}>
            <nav className="ksd-pagination" aria-label="Page navigation" style={{ display: "flex", gap: "10px" }}>
              {Array.from({ length: Math.ceil(projects.length / pageSize) }, (_, i) => i + 1).map((pg) => (
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

export default Project;
