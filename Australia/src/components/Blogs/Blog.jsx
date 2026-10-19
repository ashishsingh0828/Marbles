import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, siteImage, fmtDate } from "../../api";
import "./Blog.css";

const PAGE_SIZE = 9;

const FALLBACK_POSTS = [
  { id: 1, slug: "architectural-marble-trends-australia", category: "Trends", date: "October 10, 2026", comments: 4, title: "Architectural Marble Trends Transforming Modern Australian Waterfront Homes", image: "/images/ksd-stone-27.jpg" },
  { id: 2, slug: "selecting-calacatta-kitchen-islands", category: "Design Guide", date: "October 02, 2026", comments: 6, title: "Mastering The Art of Mitered Waterfall Islands in Australian Kitchens", image: "/images/ksd-stone-38.jpg" },
  { id: 3, slug: "limestone-travertine-outdoor-alfresco", category: "Outdoor Living", date: "September 24, 2026", comments: 2, title: "Natural Limestone & Travertine: Elevating Sydney & Melbourne Alfresco Spaces", image: "/images/ksd-stone-03.jpg" },
  { id: 4, slug: "bookmatched-feature-walls-luxury-foyers", category: "Interiors", date: "September 15, 2026", comments: 3, title: "Grand Bookmatched Slabs: Turning Foyer Walls into Living Art", image: "/images/ksd-stone-09.jpg" },
  { id: 5, slug: "sustainable-luxury-homebuilding-standards", category: "Construction", date: "September 08, 2026", comments: 1, title: "Sustainable Luxury Home Construction: Australian Climate & Stone Durability", image: "/images/ksd-stone-07.jpg" },
  { id: 6, slug: "precision-stonemasonry-heritage-to-modern", category: "Craftsmanship", date: "August 29, 2026", comments: 5, title: "From Quarry to Finished Residence: The Artisanal Precision Behind KSD Homes", image: "/images/ksd-stone-40.jpg" },
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
