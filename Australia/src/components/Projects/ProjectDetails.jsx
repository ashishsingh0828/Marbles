import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi, asset, paras, lines } from "../../api";
import "./ProjectDetails.css";

const FALLBACK_PROJECT = {
  title: "The Mosman Coastal Estate",
  category: "Sydney Luxury Home Build",
  client: "Private Coastal Residence",
  date: "October 2026",
  location: "Mosman, Sydney NSW",
  heroImage: "/images/ksd-stone-21.jpg",
  image2: "/images/ksd-stone-22.jpg",
  image3: "/images/ksd-stone-23.jpg",
  heading: "Architectural Waterfront Villa with Bookmatched Calacatta Marble & Custom Stonemasonry",
  paragraphs: [
    "A bespoke multi-level architectural luxury estate overlooking Sydney Harbour, showcasing structural excellence, seamless indoor-outdoor transitions, and master stonemasonry.",
    "Every natural stone slab was hand-selected and dry-laid with millimetre-tight hairline joints, featuring precision 45-degree mitered waterfall kitchen counters and floor-to-ceiling bookmatched bathroom suites.",
    "Engineered with premium thermal insulation, custom acoustic framing, and commercial-grade anodized glazing suited to Australian coastal conditions.",
  ],
  challengeTitle: "The Architectural Challenge",
  challengeText: "Navigating complex steep-slope coastal terrain while delivering floating cantilevered stone balconies, integrated infinity pool copings, and sub-millimeter stone vein alignment.",
  checks: [
    "Precision 45° mitered waterfall island joints",
    "Continuous vein alignment across living hall & terrace",
    "High-grade Australian coastal stone sealing",
    "Turnkey custom building & structural compliance",
  ],
  resultTitle: "The Result of Project",
  resultText: "A breathtaking architectural home built to the highest Australian residential standards, blending natural stone grandeur with modern coastal lifestyle.",
};

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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.5 4.5 6.5 11.5 3 8" />
    </svg>
  );
}

function ProjectDetails() {
  const { slug } = useParams();
  const { data } = useApi(slug ? `/projects/${slug}` : null);

  const p = data ? {
    title: data.title,
    category: data.category || "Luxury Build",
    client: data.client || "KSD Homes Client",
    date: data.date || "2026",
    location: data.location || "Sydney, NSW, Australia",
    heroImage: data.image ? asset(data.image) : FALLBACK_PROJECT.heroImage,
    image2: data.gallery && data.gallery[0] ? asset(data.gallery[0]) : FALLBACK_PROJECT.image2,
    image3: data.gallery && data.gallery[1] ? asset(data.gallery[1]) : FALLBACK_PROJECT.image3,
    heading: data.subtitle || data.title,
    paragraphs: data.content ? paras(data.content) : (data.description ? [data.description] : FALLBACK_PROJECT.paragraphs),
    challengeTitle: "Our Challenge & Execution",
    challengeText: data.challenge || FALLBACK_PROJECT.challengeText,
    checks: data.highlights ? lines(data.highlights) : FALLBACK_PROJECT.checks,
    resultTitle: "The Result of Project",
    resultText: data.result || FALLBACK_PROJECT.resultText,
  } : FALLBACK_PROJECT;

  const infoItems = [
    { label: "Project Category:", value: p.category },
    { label: "Client:", value: p.client },
    { label: "Project Date:", value: p.date },
    { label: "Location:", value: p.location },
  ];

  return (
    <section className="project-details-section">
      <div className="project-details-container">
        <div className="project-details-items">
          <Reveal className="details-image" delay={0.1}>
            <img src={p.heroImage} alt={p.title} />
          </Reveal>

          <div className="details-top">
            <div className="details-content">
              <Reveal as="p" className="title-text" delay={0.2}>
                {p.category}
              </Reveal>
              <Reveal as="h3" delay={0.3}>
                {p.heading}
              </Reveal>
              <div className="text1">
                {p.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <Reveal className="project-catagory" delay={0.3}>
              <h3>Project Information</h3>
              <ul>
                {infoItems.map((item) => (
                  <li key={item.label}>
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="details-block" delay={0.1}>
            <h3 className="title1">{p.challengeTitle}</h3>
            <p>{p.challengeText}</p>
          </Reveal>

          <div className="check-grid">
            <Reveal as="ul" className="list" delay={0.15}>
              {p.checks.map((item, idx) => (
                <li key={idx}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal className="details-block block-result" delay={0.1}>
            <h3 className="title1">{p.resultTitle}</h3>
            <p>{p.resultText}</p>
          </Reveal>

          <div className="project-group-thumb">
            <Reveal className="thumb" delay={0.1}>
              <img src={p.image2} alt="Project detail feature one" />
            </Reveal>
            <Reveal className="thumb" delay={0.25}>
              <img src={p.image3} alt="Project detail feature two" />
            </Reveal>
          </div>
        </div>

        <div className="preview-area" style={{ marginTop: "40px" }}>
          <Reveal className="preview-item-wrap" delay={0.1}>
            <Link to="/contact" className="preview-item">
              <div className="content">
                <h3>Plan Your Custom Project</h3>
                <p>Speak with our senior Australian building team</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
