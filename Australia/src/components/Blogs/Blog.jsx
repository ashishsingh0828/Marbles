import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, siteImage, fmtDate } from "../../api";
import "./Blog.css";

const PAGE_SIZE = 9;

const FALLBACK_POSTS = [
  {
    id: 1,
    slug: "timber-and-stone-bathroom-design-trends",
    category: "Design Trends",
    date: "10 October 2026",
    comments: 4,
    title: "Timber Vanities and Natural Tones: Bathroom Design Trends in Australian Homes",
    image: "/Image/banners/hero/hero-banner-03.jpg",
  },
  {
    id: 2,
    slug: "planning-a-family-kitchen-island",
    category: "Kitchen Design",
    date: "2 October 2026",
    comments: 6,
    title: "Planning a Kitchen Island That Works Hard for Busy Family Life",
    image: "/Image/banners/living-room/living-banner-02.jpg",
  },
  {
    id: 3,
    slug: "alfresco-kitchens-australian-outdoor-living",
    category: "Outdoor Living",
    date: "24 September 2026",
    comments: 2,
    title: "Designing Alfresco Kitchens That Connect Your Home to the Outdoors",
    image: "/Image/banners/living-room/living-banner-03.jpg",
  },
  {
    id: 4,
    slug: "feature-walls-for-living-rooms",
    category: "Interiors",
    date: "15 September 2026",
    comments: 3,
    title: "Feature Walls That Give Your Living Room Warmth and Character",
    image: "/Image/products/slabs/stone-slab-04.jpg",
  },
  {
    id: 5,
    slug: "from-floor-plan-to-handover",
    category: "Construction",
    date: "8 September 2026",
    comments: 1,
    title: "From Floor Plan to Handover: How We Deliver a Turnkey Custom Home in Perth",
    image: "/Image/projects/sharma-residence/floor-plan-02.jpg",
  },
  {
    id: 6,
    slug: "designing-a-home-cinema-room",
    category: "Home Entertainment",
    date: "29 August 2026",
    comments: 5,
    title: "Designing a Home Cinema Room: Lighting, Acoustics and Seating",
    image: "/Image/banners/general/banner-wide-03.jpg",
  },
];

function Reveal({ delay = 0, className = "", children }) {
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
    <div
      ref={ref}
      className={`bl-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--delay": `${delay}s` }}
    >
      {children}
    </div>
  );
}

function ReadMoreIcon() {
  return (
    <span className="bl-rm-icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="62" height="36" viewBox="0 0 62 36" fill="none">
        <circle className="bl-ring-base" cx="44" cy="18" r="17" />
        <circle className="bl-ring-fill" cx="44" cy="18" r="17" transform="rotate(180 44 18)" />
        <path className="bl-rm-arrow" d="M0 18H47M41.5 12.5 47 18l-5.5 5.5" />
      </svg>
    </span>
  );
}

function PageArrow({ direction }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "prev" ? <path d="M13 8H3M7.5 3.5 3 8l4.5 4.5" /> : <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" />}
    </svg>
  );
}

function Blog() {
  const { data } = useApi("/blogs");
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const posts = (data && data.length > 0)
    ? data.map((b, idx) => ({
        id: b._id || idx + 1,
        slug: b.slug,
        category: b.category || "Architecture",
        date: fmtDate(b.publishedAt || b.createdAt || new Date()),
        comments: 2,
        title: b.title,
        image: siteImage(b.image, FALLBACK_POSTS[idx % FALLBACK_POSTS.length].image),
      }))
    : FALLBACK_POSTS;

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const visiblePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (next) => {
    if (next < 1 || next > totalPages || next === page) return;
    setPage(next);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section className="bl-section">
      <div className="bl-container">
        <div className="bl-divider" />
        <div className="bl-grid" ref={gridRef}>
          {visiblePosts.map((post, index) => {
            const link = `/blogs/${post.slug || post.id}`;
            return (
              <Reveal key={`${page}-${post.id}`} delay={(index % 3) * 0.15}>
                <article className="bl-card">
                  <Link to={link} className="bl-thumb">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <span className="bl-badge">{post.category}</span>
                  </Link>
                  <div className="bl-content">
                    <div className="bl-meta">
                      <span>{post.date}</span>
                      <span className="bl-sep">|</span>
                      <span>{post.comments} Comments</span>
                    </div>
                    <h3 className="bl-title">
                      <Link to={link}>{post.title}</Link>
                    </h3>
                    <Link to={link} className="bl-readmore">
                      <ReadMoreIcon />
                      <span className="bl-rm-text">Read More</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {totalPages > 1 && (
          <Reveal delay={0.1} className="bl-pagination-wrap">
            <nav className="bl-pagination" aria-label="Blog pagination">
              <button
                type="button"
                className="bl-page-btn"
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <PageArrow direction="prev" />
              </button>
              {pages.map((number) => (
                <button
                  key={number}
                  type="button"
                  className={`bl-page-btn${number === page ? " is-active" : ""}`}
                  onClick={() => goTo(number)}
                  aria-label={`Page ${number}`}
                  aria-current={number === page ? "page" : undefined}
                >
                  {String(number).padStart(2, "0")}
                </button>
              ))}
              <button
                type="button"
                className="bl-page-btn"
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <PageArrow direction="next" />
              </button>
            </nav>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default Blog;