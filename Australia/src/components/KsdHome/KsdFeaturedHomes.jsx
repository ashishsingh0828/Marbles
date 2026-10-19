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

export default function KsdFeaturedHomes() {
  const { data } = useApi("/projects");
  const homes = mergeHomes(data).slice(0, 2);

  return (
    <section className="ksd-featured">
      <div className="ksd-featured__intro">
        <p className="ksd-featured__eyebrow">Our homes</p>
        <h2>Designed and built as one composition</h2>
        <p>
          Each KSD home is named for the life it holds — architecture and interior design under one roof, resolved for Western Australian light, privacy and how the family actually lives.
        </p>
      </div>

      <div className="ksd-featured__grid">
        {homes.map((home) => (
          <Link
            key={home.slug}
            to={`/projects/${home.slug}`}
            className="ksd-featured__card"
          >
            <img src={home.image} alt={home.title} loading="lazy" />
            <div className="ksd-featured__shade" />
            <div className="ksd-featured__copy">
              <span className="ksd-featured__meta">
                {home.status} / {home.location}
              </span>
              <h3>{home.title}</h3>
              <p>{home.conceptHeadline}</p>
              <span className="ksd-featured__cta">
                View this home <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
