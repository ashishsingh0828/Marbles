import { useRef, useEffect, useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import "./ServiceDetails.css";

/* Fade-in on scroll */
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`ksd-sd-reveal ${className}${visible ? " is-visible" : ""}`}
      style={{ "--delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ksd-sd-arrow">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function StoneCraftIcon({ alt }) {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="2" />
      {alt ? (
        <path d="M8 24C12 18 14 16 18 13S25 10 27 7M10 7C12 12 15 14 19 16S24 21 26 25" strokeDasharray="2 2" />
      ) : (
        <path d="M4 16H28M16 4V28M8 8L24 24M24 8L8 24" />
      )}
    </svg>
  );
}

/* Video Modal Popup */
function VideoModal({ id, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="ksd-sd-modal" role="dialog" aria-modal="true" aria-label="Video Showcase" onClick={onClose}>
      <div className="ksd-sd-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="ksd-sd-modal-close" onClick={onClose} aria-label="Close video">✕</button>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="KSD Homes Service Video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

/* Accordion Component */
function ServiceFaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="ksd-sd-faq-list">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`ksd-sd-acc-item ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="ksd-sd-acc-trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span className="ksd-sd-acc-q">{item.q}</span>
              <span className="ksd-sd-acc-icon">
                <ChevronDownIcon />
              </span>
            </button>
            <div className="ksd-sd-acc-panel">
              <div className="ksd-sd-acc-content">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceDetails({ service, links = [] }) {
  const [playing, setPlaying] = useState(false);
  const closeVideo = useCallback(() => setPlaying(false), []);

  return (
    <section className="ksd-sd-section">
      <div className="ksd-sd-container">
        {/* ================= MAIN COLUMN ================= */}
        <div className="ksd-sd-main">
          {/* Top Hero Image */}
          {service.hero && (
            <Reveal className="ksd-sd-hero-media">
              <div className="ksd-sd-hero-frame">
                <img src={service.hero} alt={service.title} />
                <div className="ksd-sd-hero-badge">
                  <span>KSD Homes Architectural Series</span>
                </div>
              </div>
            </Reveal>
          )}

          {/* Intro Paragraphs */}
          <div className="ksd-sd-intro-text">
            {service.paragraphs && service.paragraphs.length > 0 ? (
              service.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={60 * i} className="ksd-sd-p">
                  {p}
                </Reveal>
              ))
            ) : (
              <p className="ksd-sd-p">{service.shortDescription}</p>
            )}
          </div>

          {/* Strategy / Approach Heading & Text */}
          {service.strategyHeading && (
            <Reveal className="ksd-sd-block">
              <h3 className="ksd-sd-h3">{service.strategyHeading}</h3>
              {service.strategyText && (
                <p className="ksd-sd-p">{service.strategyText}</p>
              )}
            </Reveal>
          )}

          {/* Feature Highlights Grid */}
          {service.features && service.features.length > 0 && (
            <div className="ksd-sd-features-wrap">
              {service.sideImage && (
                <Reveal className="ksd-sd-features-img">
                  <img src={service.sideImage} alt={service.title} loading="lazy" />
                </Reveal>
              )}
              <Reveal className="ksd-sd-features-card" delay={120}>
                {service.features.map((feat, i) => (
                  <div key={i} className="ksd-sd-feature-row">
                    <span className="ksd-sd-feature-icon">
                      <StoneCraftIcon alt={i % 2 === 1} />
                    </span>
                    <div className="ksd-sd-feature-body">
                      <h5>{feat.title}</h5>
                      <p>{feat.text}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          )}

          {/* Process Steps */}
          {service.steps && service.steps.length > 0 && (
            <div className="ksd-sd-process-block">
              <Reveal as="h3" className="ksd-sd-h3">
                {service.processHeading || "Our Four-Stage Creation Process"}
              </Reveal>
              <ol className="ksd-sd-steps">
                {service.steps.map((st, i) => (
                  <Reveal as="li" key={i} delay={i * 90} className="ksd-sd-step-item">
                    <div className="ksd-sd-step-badge">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="ksd-sd-step-text">
                      <h5>{st.title}</h5>
                      <p>{st.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          )}

          {/* Video Player Showcase */}
          {service.video && (
            <div className="ksd-sd-video-block">
              {service.videoHeading && (
                <Reveal as="h3" className="ksd-sd-h3">
                  {service.videoHeading}
                </Reveal>
              )}
              {service.videoText && (
                <Reveal as="p" className="ksd-sd-p">
                  {service.videoText}
                </Reveal>
              )}
              <Reveal className="ksd-sd-video-thumb">
                <img src={service.video.thumb || service.hero} alt="Video showcase" loading="lazy" />
                <button
                  type="button"
                  className="ksd-sd-play-btn"
                  onClick={() => setPlaying(true)}
                  aria-label="Play service presentation video"
                >
                  <span className="ksd-sd-pulse-ring" />
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </Reveal>
            </div>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="ksd-sd-faq-block">
              <h3 className="ksd-sd-h3">
                {service.faqHeading || "Frequently Asked Questions"}
              </h3>
              <ServiceFaqAccordion items={service.faqs} />
            </div>
          )}

          {/* Bottom Action Card */}
          <Reveal className="ksd-sd-bottom-banner" delay={150}>
            <div className="ksd-sd-bottom-content">
              <h4>Ready to elevate your Australian residence?</h4>
              <p>Speak with our Perth builder interior design team today.</p>
            </div>
            <Link to="/contact" className="ksd-btn ksd-btn--orange">
              <span>Book A Consultation</span>
              <ArrowRightIcon />
            </Link>
          </Reveal>
        </div>

        {/* ================= SIDEBAR ================= */}
        <aside className="ksd-sd-sidebar">
          {/* Services Navigation List */}
          {links && links.length > 0 && (
            <Reveal className="ksd-sd-widget ksd-sd-widget-links" delay={60}>
              <h4 className="ksd-sd-widget-title">Architectural Services</h4>
              <ul className="ksd-sd-nav-list">
                {links.map((link) => (
                  <li key={link.href}>
                    <NavLink to={link.href} className={({ isActive }) => `ksd-sd-nav-link ${isActive ? "is-active" : ""}`}>
                      <span>{link.label}</span>
                      <ArrowRightIcon />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Expert Consultation Box */}
          <Reveal className="ksd-sd-widget ksd-sd-cta-widget" delay={120}>
            <div
              className="ksd-sd-cta-bg"
              style={{ backgroundImage: `url(${service.contactImage || service.hero || "/images/ksd-stone-07.jpg"})` }}
            />
            <div className="ksd-sd-cta-overlay" />
            <div className="ksd-sd-cta-inner">
              <div className="ksd-sd-cta-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="ksd-sd-cta-badge">KSD Homes Perth Studio</span>
              <h5>Consult Our Builder &amp; Design Team</h5>
              <p>Discuss architecture, interiors and a complete home solution.</p>
              <a href="tel:+61414029695" className="ksd-sd-cta-phone">
                +61 414 029 695
              </a>
              <Link to="/contact" className="ksd-btn ksd-btn--white">
                <span>Enquire Online</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </Reveal>

          {/* Quality Guarantees */}
          <Reveal className="ksd-sd-widget ksd-sd-guarantees-widget" delay={180}>
            <h4 className="ksd-sd-widget-title">How we work</h4>
            <ul className="ksd-sd-guarantee-list">
              <li>
                <span className="ksd-sd-check-dot" />
                <div>
                  <strong>Licensed Boutique Builder</strong>
                  <p>High-end boutique homes, delivered from our Perth studio.</p>
                </div>
              </li>
              <li>
                <span className="ksd-sd-check-dot" />
                <div>
                  <strong>28+ Years Team Experience</strong>
                  <p>Builder interior design — combined visionary in one team.</p>
                </div>
              </li>
              <li>
                <span className="ksd-sd-check-dot" />
                <div>
                  <strong>A Personal Touch</strong>
                  <p>Every project begins with listening to how you live.</p>
                </div>
              </li>
              <li>
                <span className="ksd-sd-check-dot" />
                <div>
                  <strong>Complete Home Solution</strong>
                  <p>Architecture, interiors, finishes and integration as one.</p>
                </div>
              </li>
            </ul>
          </Reveal>
        </aside>
      </div>

      {playing && service.video?.youtubeId && (
        <VideoModal id={service.video.youtubeId} onClose={closeVideo} />
      )}
    </section>
  );
}
