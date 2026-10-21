import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../api";
import { mergeHomes } from "../../data/homes";
import "./Project.css";

const FILTERS = ["Residence", "Interior", "Upcoming"];

function labelOf(home) {
  const collection = String(home.collection || "").toLowerCase();
  const status = String(home.status || "").toLowerCase();
  if (collection.includes("upcoming") || status.includes("upcoming")) return "Upcoming";
  if (collection === "interior" || collection.startsWith("interior")) return "Interior";
  return "Residence";
}

export default function Project({ variant = "page" }) {
  const { data } = useApi("/projects");
  const [filter, setFilter] = useState("Residence");
  const homes = mergeHomes(data);

  const filtered = useMemo(
    () => homes.filter((home) => labelOf(home) === filter),
    [homes, filter]
  );
  const shown = variant === "home" ? filtered.slice(0, 3) : filtered;

  return (
    <section className={`homes-section ${variant === "home" ? "is-home" : ""}`}>
      <div className="homes-intro">
        <p>Projects</p>
        <h2>Residence, interiors and upcoming work</h2>
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

      {shown.length === 0 ? (
        <p className="homes-empty">Coming soon</p>
      ) : (
        <div className="homes-grid">
          {shown.map((home) => (
            <article key={home.slug} className="home-card">
              <Link to={`/projects/${home.slug}`} className="home-card__link" aria-label={`View ${home.title}`}>
                <img src={home.image} alt={home.title} loading="lazy" />
                <div className="home-card__copy">
                  <span>
                    {/completed|delivered/i.test(home.status)
                      ? `Delivered by our team · ${home.year || "2026"} · ${home.suburb}`
                      : `${home.status} · ${home.year || "2026"} · ${home.suburb}`}
                  </span>
                  <h3>{home.title}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {variant === "home" && (
        <div className="homes-more">
          <Link to="/projects">View all projects</Link>
        </div>
      )}
    </section>
  );
}
