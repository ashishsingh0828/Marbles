import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi, asset, paras, lines } from "../../api";
import "./ProjectDetails.css";

const PROJECTS = {
  "sharma-residence": {
    title: "Sharma Residence",
    category: "Three-Storey Boutique Home",
    client: "Sharma Residence",
    date: "In delivery",
    location: "Western Australia",
    heroImage: "/images/projects/sharma-plan-02.jpg",
    image2: "/images/projects/sharma-plan-01.jpg",
    image3: "/images/projects/sharma-plan-03.jpg",
    heading: "A three-storey boutique home composed as one complete living environment",
    paragraphs: [
      "Sharma Residence is a three-storey boutique home designed as a complete composition — architecture, interiors, materials and how the family lives, considered together. In the spirit of a carefully resolved Western Australian residence, every level has a clear purpose: arrival, living, and rest.",
      "The ground floor gathers daily life around a 210 sqm marble main floor, a 45 sqm marble entrance, and a 90 sqm colour-concrete alfresco opening to a 32 sqm pool. A 30 sqm onyx staircase and lift connect the home vertically, so movement through the house feels calm and continuous.",
      "Below, the undercroft holds store and cellar, marble and carpeted support spaces, and pool plant. Above, an 180 sqm marble main floor includes a 15 sqm marble mandir, ensuites and balconies. Materials are selected for how they feel underfoot and how they catch Western Australian light — marble, onyx, pool tiles and concrete, each in its right place.",
    ],
    challengeTitle: "Architecture & interior, designed as one",
    challengeText:
      "The brief was a high-performing, comfortable family home with a personal touch: prayer space, guest rooms, master suite, pool and alfresco living, without treating any of these as add-ons. Our builder and interior design team planned the house as a single environment.",
    checks: [
      "Three storeys: undercroft, ground and upper living",
      "Marble main floors with onyx stair and lift core",
      "Alfresco, pool and hardstand for indoor–outdoor living",
      "Dedicated mandir and guest accommodation",
      "Complete home solution — architecture, interiors and finishes",
    ],
    resultTitle: "The composition of the home",
    resultText:
      "A boutique Western Australian residence where form, function, proportion and material work together. We do not publish the client’s street address. Sharma Residence is presented as a private family home, designed for how they live today and tomorrow.",
  },
  "port-coogee-residence": {
    title: "Port Coogee Residence",
    category: "Upcoming Western Australia",
    client: "Private residence",
    date: "Upcoming",
    location: "Western Australia",
    heroImage: "/images/projects/sharma-plan-03.jpg",
    image2: "/images/projects/sharma-plan-02.jpg",
    image3: "/images/projects/sharma-plan-01.jpg",
    heading: "An upcoming three-storey boutique home on the Western Australian coast",
    paragraphs: [
      "Port Coogee Residence is an upcoming KSD Homes commission in Western Australia — a three-storey boutique home conceived with the same design language as our current work: architecture and interior design as one complete home solution.",
      "The project continues our focus on coastal Western Australian living — light, proportion, indoor–outdoor connection, and materials chosen for climate and comfort. Like all KSD homes, it begins with listening to how the household wants to live.",
      "Drawings, interiors and specification are in development with our licensed builder and interior design team. We will share the home as a finished composition when it is ready — without publishing the client’s address.",
    ],
    challengeTitle: "Designed for the way they will live",
    challengeText:
      "An upcoming coastal site asks for a home that feels private, calm and connected to outdoor living. Our approach is the same as every KSD commission: a personal brief, a complete composition, and a customer-centred process.",
    checks: [
      "Upcoming three-storey boutique home",
      "Western Australia — Port Coogee",
      "Architecture and interior design together",
      "Licensed builder for high-end boutique homes",
      "Client address remains private",
    ],
    resultTitle: "A home still taking form",
    resultText:
      "Port Coogee Residence is in the studio now. It will be delivered as a complete KSD home: architecture, interiors and the way the family experience the space — designed for tomorrow as much as today.",
  },
};

const FALLBACK_PROJECT = PROJECTS["sharma-residence"];

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
  const { data } = useApi(slug && !PROJECTS[slug] ? `/projects/${slug}` : null);
  const local = PROJECTS[slug] || (!data ? FALLBACK_PROJECT : null);

  const p = local || {
    title: data.title,
    category: data.category || "Boutique Home",
    client: data.client || "Private residence",
    date: data.date || "Western Australia",
    location: "Western Australia",
    heroImage: data.heroImage ? asset(data.heroImage) : (data.imageA ? asset(data.imageA) : FALLBACK_PROJECT.heroImage),
    image2: data.imageA ? asset(data.imageA) : FALLBACK_PROJECT.image2,
    image3: data.imageB ? asset(data.imageB) : FALLBACK_PROJECT.image3,
    heading: data.heading || data.subtitle || data.title,
    paragraphs: data.paragraphs ? paras(data.paragraphs) : (data.content ? paras(data.content) : FALLBACK_PROJECT.paragraphs),
    challengeTitle: data.factsTitle || "Architecture & interior, designed as one",
    challengeText: data.factsText || FALLBACK_PROJECT.challengeText,
    checks: data.checks ? lines(data.checks) : FALLBACK_PROJECT.checks,
    resultTitle: "The composition of the home",
    resultText: data.result || FALLBACK_PROJECT.resultText,
  };

  const infoItems = [
    { label: "Project:", value: p.title },
    { label: "Type:", value: p.category },
    { label: "Client:", value: p.client },
    { label: "Status:", value: p.date },
    { label: "Region:", value: "Western Australia" },
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
              <img src={p.image2} alt={`${p.title} floor plan`} />
            </Reveal>
            <Reveal className="thumb" delay={0.25}>
              <img src={p.image3} alt={`${p.title} upper level`} />
            </Reveal>
          </div>
        </div>

        <div className="preview-area" style={{ marginTop: "40px" }}>
          <Reveal className="preview-item-wrap" delay={0.1}>
            <Link to="/contact" className="preview-item">
              <div className="content">
                <h3>Plan Your Boutique Home</h3>
                <p>Speak with our Perth builder and interior design team</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
