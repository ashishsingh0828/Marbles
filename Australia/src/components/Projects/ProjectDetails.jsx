import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../../api";
import { FALLBACK_HOMES, homeBySlug, mergeHomes, specsOf } from "../../data/homes";
import "./ProjectDetails.css";

function Reveal({ as: Tag = "div", delay = 0, className = "", children }) {
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

  return (
    <Tag
      ref={ref}
      className={`fade-up ${className}${visible ? " is-visible" : ""}`}
      style={{ "--delay": `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.5 4.5 6.5 11.5 3 8" />
    </svg>
  );
}

function ProjectDetails() {
  const { slug } = useParams();
  const { data } = useApi(slug ? `/projects/${slug}` : null);
  const { data: all } = useApi("/projects");
  const home = homeBySlug(slug, data);
  const specs = specsOf(home);
  const others = mergeHomes(all).filter((h) => h.slug && h.slug !== home.slug);
  const next = others[0] || FALLBACK_HOMES.find((h) => h.slug !== home.slug) || FALLBACK_HOMES[0];
  const plans = [
    { src: home.image2, label: "Ground" },
    { src: home.image3, label: "Upper" },
    { src: home.image4, label: "Undercroft" },
  ].filter((p) => p.src);

  return (
    <article className="home-detail">
      <header className="home-detail__hero">
        <img src={home.heroImage} alt={home.title} />
        <div className="home-detail__shade" />
        <div className="home-detail__hero-copy">
          <p className="home-detail__eyebrow">
            {home.status} / {home.location}
          </p>
          <h1>{home.title}</h1>
          <p className="home-detail__concept">{home.conceptHeadline}</p>
          {specs.length > 0 && (
            <ul className="home-detail__specs">
              {specs.slice(0, 6).map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="home-detail__body">
        <Reveal className="home-detail__story" delay={0.1}>
          <p className="home-detail__kicker">{home.category}</p>
          <h2>{home.heading}</h2>
          {home.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal className="home-detail__approach" delay={0.15}>
          <h3>{home.challengeTitle}</h3>
          <p>{home.challengeText}</p>
          <ul>
            {home.checks.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {plans.length > 0 && (
          <div className="home-detail__plans">
            <Reveal as="h3" delay={0.1}>Plans</Reveal>
            <div className="home-detail__plan-grid">
              {plans.map((plan, idx) => (
                <Reveal key={plan.src} className="home-detail__plan" delay={0.1 + idx * 0.08}>
                  <img src={plan.src} alt={`${home.title} ${plan.label} plan`} />
                  <span>{plan.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal className="home-detail__result" delay={0.1}>
          <h3>{home.resultTitle}</h3>
          <p>{home.resultText}</p>
        </Reveal>

        <div className="home-detail__next">
          <Link to={`/projects/${next.slug}`} className="home-detail__next-home">
            <span>Next home</span>
            <strong>{next.title}</strong>
            <em>{next.status} / {next.location}</em>
          </Link>
          <Link to="/contact" className="home-detail__enquire">
            Plan your boutique home
            <small>Speak with our Perth builder and interior design team</small>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectDetails;
