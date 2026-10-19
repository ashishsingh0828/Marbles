import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useApi, youtubeId } from "../../api";
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
      className={`ps-fade ${className}${visible ? " is-visible" : ""}`}
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
  const lookup = slug === "sharma-residence" ? "residence" : slug;
  const { data } = useApi(lookup ? `/projects/${lookup}` : null);
  const { data: all } = useApi("/projects");
  const home = homeBySlug(lookup, data);
  if (slug === "sharma-residence") return <Navigate to="/projects/residence" replace />;
  const specs = specsOf(home);
  const others = mergeHomes(all).filter((h) => h.slug && h.slug !== home.slug);
  const next = others[0] || FALLBACK_HOMES.find((h) => h.slug !== home.slug) || FALLBACK_HOMES[0];
  const yt = youtubeId(home.videoUrl || "");
  const planLabels = home.planLabels || ["Ground", "Upper", "Undercroft"];
  const plans = [
    { src: home.image2, label: planLabels[0] || "Ground" },
    { src: home.image3, label: planLabels[1] || "Upper" },
    { src: home.image4, label: planLabels[2] || "Undercroft" },
  ].filter((p) => p.src);
  const scenes = home.scenes || [];
  const extraGallery = (home.gallery || []).filter((src) => !scenes.some((s) => s.image === src));

  return (
    <article className="ps">
      <header className="ps-hero">
        <img src={home.heroImage} alt={home.title} />
        <div className="ps-hero__shade" />
        <div className="ps-hero__copy">
          <p className="ps-kicker">{home.status} / {home.suburb || home.title}</p>
          <h1>
            <span>{home.suburb || home.title}</span>
            {home.shortCode ? <em>{home.shortCode}</em> : null}
          </h1>
          <p className="ps-hero__concept">{home.conceptHeadline}</p>
          <Link to="/contact" className="ps-hero__enquire">Enquire</Link>
        </div>
      </header>

      {specs.length > 0 && (
        <ul className="ps-specs">
          {specs.slice(0, 6).map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </ul>
      )}

      <div className="ps-body">
        <Reveal className="ps-story" delay={0.08}>
          <p className="ps-kicker">{home.category}</p>
          <h2>{home.heading}</h2>
          {home.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>
      </div>

      {(yt || home.videoHeading || home.videoText) && (
        <section className="ps-film">
          <Reveal className="ps-film__intro" delay={0.08}>
            <p className="ps-kicker">Film</p>
            {home.videoHeading && <h2>{home.videoHeading}</h2>}
            {home.videoText && <p>{home.videoText}</p>}
          </Reveal>
          {yt ? (
            <Reveal className="ps-film__frame" delay={0.12}>
              <iframe
                src={`https://www.youtube.com/embed/${yt}`}
                title={home.videoHeading || `${home.title} film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Reveal>
          ) : (
            <Reveal className="ps-film__still" delay={0.12}>
              <img src={home.heroImage} alt="" />
            </Reveal>
          )}
        </section>
      )}

      {scenes.map((scene, idx) => (
        <figure key={`${scene.caption}-${idx}`} className="ps-scene">
          <Reveal className="ps-scene__media" delay={0.06}>
            <img src={scene.image} alt={scene.caption || home.title} />
          </Reveal>
          <Reveal className="ps-scene__copy" delay={0.1}>
            {scene.caption && <h3>{scene.caption}</h3>}
            {scene.text && <p>{scene.text}</p>}
          </Reveal>
        </figure>
      ))}

      {extraGallery.length > 0 && (
        <section className="ps-grid-wrap">
          <Reveal as="h2" className="ps-grid-title" delay={0.08}>Project photography</Reveal>
          <div className="ps-grid">
            {extraGallery.map((src) => (
              <Reveal key={src} className="ps-grid__item" delay={0.08}>
                <img src={src} alt={`${home.title} photography`} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="ps-body">
        <Reveal className="ps-approach" delay={0.08}>
          <p className="ps-kicker">How we composed it</p>
          <h2>{home.challengeTitle}</h2>
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
          <div className="ps-plans">
            <Reveal as="h2" delay={0.08}>Plans</Reveal>
            <div className="ps-plans__grid">
              {plans.map((plan, idx) => (
                <Reveal key={plan.src} className="ps-plans__item" delay={0.08 + idx * 0.06}>
                  <img src={plan.src} alt={`${home.title} ${plan.label} plan`} />
                  <span>{plan.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal className="ps-result" delay={0.08}>
          <p className="ps-kicker">Why this project</p>
          <h2>{home.resultTitle}</h2>
          <p>{home.resultText}</p>
        </Reveal>
      </div>

      <div className="ps-next">
        <Link to={`/projects/${next.slug}`} className="ps-next__project">
          <span>Next project</span>
          <strong>{next.suburb || next.title}</strong>
          <em>{next.status} / {next.suburb || next.location}</em>
        </Link>
        <Link to="/contact" className="ps-next__enquire">
          Enquire
          <small>We&apos;d love to hear from you</small>
        </Link>
      </div>
    </article>
  );
}

export default ProjectDetails;
