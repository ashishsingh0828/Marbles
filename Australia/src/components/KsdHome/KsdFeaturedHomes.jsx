import { Link } from "react-router-dom";
import { useApi } from "../../api";
import { mergeHomes } from "../../data/homes";
import "./KsdFeaturedHomes.css";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

// Ensures any status marked "Upcoming" or similar displays cleanly as "Ongoing"
function formatStatus(status = "") {
  const s = String(status).trim();
  if (!s || /^upcoming/i.test(s)) return "Ongoing";
  return s;
}

export default function KsdFeaturedHomes() {
  const { data } = useApi("/projects");
  const homes = mergeHomes(data).slice(0, 2);

  return (
    <section className="ksd-featured">
      <div className="ksd-featured__intro">
        <p className="ksd-featured__eyebrow">Selected Residences</p>
        <h2>Architecture and interiors, composed as one</h2>
        <p>
          Each home is an individual architectural statement — engineered and constructed from initial concept to completion for Western Australian coastal light, privacy, and seamless indoor-outdoor living.
        </p>
      </div>

      <div className="ksd-featured__grid">
        {homes.map((home) => (
          <Link
            key={home.slug}
            to={`/projects/${home.slug}`}
            className="ksd-featured__card"
          >
            <img 
              src={home.image || "/images/ksd-stone-07.jpg"} 
              alt={home.title || "KSD Homes Project"} 
              loading="lazy" 
            />
            <div className="ksd-featured__shade" />
            <div className="ksd-featured__copy">
              <span className="ksd-featured__meta">
                {formatStatus(home.status)} {home.location ? `/ ${home.location}` : home.suburb ? `/ ${home.suburb}` : ""}
              </span>
              <h3>{home.title}</h3>
              {home.conceptHeadline && <p>{home.conceptHeadline}</p>}
              <span className="ksd-featured__cta">
                View Project <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}