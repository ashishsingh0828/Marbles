import { Link } from "react-router-dom";
import { BRAND } from "../../config";
import { IMG } from "../../data/images";
import { mergeHomes } from "../../data/homes";
import { useApi } from "../../api";
import "./HomeSections.css";

const TEAM = [
  { name: "AJ", role: "Builder", note: "Licensed boutique building" },
  { name: "Karl", role: "Interior Design", note: "Builder interior design" },
];

export function Hero() {
  return (
    <section className="ks-hero">
      <img src={IMG.hero} alt="" />
      <div className="ks-hero__shade" />
      <div className="ks-hero__copy">
        <p>Founded 2026 · Perth</p>
        <h1>Building Perth&apos;s finest homes, backed by 28+ years of experience</h1>
        <Link to="/contact" className="ks-btn">Enquire</Link>
      </div>
    </section>
  );
}

export function ExperienceStrip() {
  return (
    <section className="ks-strip" aria-label="Experience">
      <p>28+ years team experience</p>
      <p>Builder + Interior design under one roof</p>
      <p>Licensed Perth builder · ABN {BRAND.abn}</p>
    </section>
  );
}

export function OurStory() {
  return (
    <section className="ks-block">
      <div className="ks-block__copy">
        <p className="ks-kicker">Our story</p>
        <h2>A new Perth builder built on 28 years of experience</h2>
        <p>
          KSD Homes Pty Ltd was founded in 2026 so architecture, interior design and construction could sit with one team.
          The company is new. The people are not: 28+ years of combined professional experience, delivered as a licensed boutique builder in Perth.
        </p>
        <Link to="/about" className="ks-btn ks-btn--ghost">About us</Link>
      </div>
      <figure className="ks-block__media">
        <img src={IMG.diningLight} alt="KSD Homes interior direction" />
      </figure>
    </section>
  );
}

export function SketchToFurnishing() {
  return (
    <section className="ks-block ks-block--flip">
      <div className="ks-block__copy">
        <p className="ks-kicker">From sketch to furnishing</p>
        <h2>Architecture, interior design and build under one roof</h2>
        <p>
          Consultation, design, approvals, build, interiors and handover are one sequence — not a house handed between separate firms.
        </p>
        <Link to="/design-journey" className="ks-btn ks-btn--ghost">Design Journey</Link>
      </div>
      <figure className="ks-block__media">
        <img src={IMG.joinery} alt="Joinery and interior specification" />
      </figure>
    </section>
  );
}

export function FeaturedProjects() {
  const { data } = useApi("/projects");
  const homes = mergeHomes(data).filter((home) => home.featured !== false).slice(0, 3);

  return (
    <section className="ks-featured">
      <div className="ks-featured__intro">
        <p className="ks-kicker">Projects</p>
        <h2>Work by our team</h2>
        <p>Real commissions only. If a collection is still empty, it stays empty until the work is ready.</p>
      </div>
      {homes.length === 0 ? (
        <p className="ks-empty">Coming soon</p>
      ) : (
        <div className="ks-cards">
          {homes.map((home) => (
            <Link key={home.slug} to={`/projects/${home.slug}`} className="ks-card">
              <img src={home.image} alt={home.title} />
              <span>{home.scope || home.status} · {home.suburb} · {home.year || "2026"}</span>
              <strong>{home.title}</strong>
            </Link>
          ))}
        </div>
      )}
      <Link to="/projects" className="ks-btn ks-btn--ghost">View projects</Link>
    </section>
  );
}

export function TeamPreview() {
  return (
    <section className="ks-team">
      <p className="ks-kicker">The team</p>
      <h2>28+ years of combined experience</h2>
      <p className="ks-team__lead">
        KSD is led from Perth by a builder and an interior designer working as one. We do not publish staff photographs until we have consented portraits.
      </p>
      <ul>
        {TEAM.map((person) => (
          <li key={person.name}>
            <b>{person.name}</b>
            <span>{person.role}</span>
            <em>{person.note}</em>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="ks-news">
      <h2>Be first to see our upcoming projects</h2>
      <p>Notes from the Perth studio when there is something worth sharing — no awards we have not earned, no padding.</p>
      <form className="ks-news__form" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor="ks-news-email">Email address</label>
        <input id="ks-news-email" type="email" required placeholder="Email address" />
        <button type="submit" className="ks-btn">Enquire</button>
      </form>
    </section>
  );
}
