import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi, siteImage, fmtDate, paras } from "../../api";
import "./BlogDetails.css";

const FALLBACK_BLOG = {
  title: "Architectural Marble Trends Transforming Modern Australian Waterfront Homes",
  author: "KSD Homes Design Editorial",
  date: "October 10, 2026",
  category: "Architectural Trends",
  heroImage: "/images/ksd-stone-27.jpg",
  image2: "/images/ksd-stone-03.jpg",
  image3: "/images/ksd-stone-09.jpg",
  paragraphs: [
    "From Sydney's iconic harbour foreshores to the expansive coastal estates of Byron Bay and Melbourne's elite inner suburbs, luxury Australian residential architecture is undergoing a profound evolution. Natural stone has transcended purely functional flooring to become the primary artistic centerpiece of the modern home.",
    "Today's discerning Australian homeowners and architects are demanding monolithic Calacatta waterfall kitchen islands, continuous bookmatched living room statement walls, and seamless indoor-to-outdoor transitions using slip-resistant honed limestone and travertine.",
    "At KSD Homes, our direct quarry selection process guarantees that every slab imported into Australia meets exacting criteria for density, crystalline purity, and striking vein geometry suited to our unique natural light.",
  ],
  quote: "Natural stone possesses an authentic permanence and organic elegance that engineered materials simply cannot replicate in luxury Australian living.",
  conclusion: "Whether embarking on a full custom architectural build or a transformative master interior renovation, partnering with master builders and stonemasons ensures an enduring architectural heirloom.",
};

const CATEGORIES = [
  { id: 1, name: "Custom Home Building", count: "14" },
  { id: 2, name: "Calacatta & Statuario Marble", count: "18" },
  { id: 3, name: "Mitered Waterfall Islands", count: "12", active: true },
  { id: 4, name: "Outdoor Limestone & Travertine", count: "09" },
  { id: 5, name: "Architectural Feature Walls", count: "11" },
];

const SIDEBAR_TAGS = [
  { id: 1, name: "Sydney Luxury Homes" },
  { id: 2, name: "Bookmatched Marble", active: true },
  { id: 3, name: "Natural Stone Flooring" },
  { id: 4, name: "Custom Stonemasonry" },
  { id: 5, name: "Waterfall Islands" },
];

const POST_TAGS = [
  { id: 1, name: "Luxury Home Build" },
  { id: 2, name: "Natural Stone", active: true },
  { id: 3, name: "Australian Architecture" },
];

const INITIAL_COMMENTS = [
  {
    id: 1,
    name: "Lachlan Mitchell",
    date: "October 08, 2026 at 11:20 am",
    avatar: "/images/logo/logo.jpeg",
    text: "The bookmatched marble feature wall installed in our Mosman residence by KSD Homes is an absolute work of art. The vein alignment across the staircase is perfection.",
  },
  {
    id: 2,
    name: "Sophie Henderson",
    date: "October 09, 2026 at 3:45 pm",
    avatar: "/images/logo/logo.jpeg",
    text: "Exceptional quality stone and seamless execution. The mitered edges on our 4-metre kitchen island are flawless.",
  },
];

const INITIAL_FORM = { name: "", email: "", message: "" };

function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", children }) {
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

  const variantClass = variant === "left" ? "fade-left" : variant === "right" ? "fade-right" : "fade-up";

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${className}${visible ? " is-visible" : ""}`}
      style={{ "--delay": `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="30" viewBox="0 0 38 30" fill="none" aria-hidden="true">
      <path d="M0 17.1429C0 7.67143 6.08 0 15.2 0V5.71429C9.88 5.71429 6.84 9.12857 6.84 14.8286H15.2V30H0V17.1429ZM22.8 17.1429C22.8 7.67143 28.88 0 38 0V5.71429C32.68 5.71429 29.64 9.12857 29.64 14.8286H38V30H22.8V17.1429Z" fill="currentColor" />
    </svg>
  );
}

function formatNow() {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();
  return `${date} at ${time}`;
}

function BlogDetails() {
  const { slug } = useParams();
  const { data } = useApi(slug ? `/blogs/${slug}` : null);
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [form, setForm] = useState(INITIAL_FORM);
  const messageRef = useRef(null);

  const parsedParagraphs = data
    ? (data.introText || data.secondText
        ? [data.introText, data.secondText].filter(Boolean)
        : (data.paragraphs
            ? paras(data.paragraphs)
            : (data.content
                ? paras(data.content)
                : (data.description ? [data.description] : FALLBACK_BLOG.paragraphs))))
    : FALLBACK_BLOG.paragraphs;

  const post = data ? {
    title: data.title,
    author: data.author || "KSD Homes Editorial",
    date: fmtDate(data.publishedAt || data.date || data.createdAt || new Date()),
    category: data.category || "Architecture",
    heroImage: siteImage(data.heroImage, siteImage(data.image, FALLBACK_BLOG.heroImage)),
    image2: siteImage(data.galleryA, siteImage(data.gallery?.[0], FALLBACK_BLOG.image2)),
    image3: siteImage(data.galleryB, siteImage(data.gallery?.[1], FALLBACK_BLOG.image3)),
    paragraphs: parsedParagraphs,
    quote: data.excerpt || data.quote || FALLBACK_BLOG.quote,
    conclusion: data.conclusion || data.secondHeading || FALLBACK_BLOG.conclusion,
  } : FALLBACK_BLOG;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const entry = {
      id: Date.now(),
      name: form.name.trim(),
      date: formatNow(),
      avatar: "/images/logo/logo.jpeg",
      text: form.message.trim(),
    };
    setComments((prev) => [...prev, entry]);
    setForm(INITIAL_FORM);
  };

  return (
    <section className="bd-section">
      <div className="bd-container">
        <div className="bd-layout">
          <aside className="bd-sidebar">
            <Reveal variant="left" delay={0.05} className="bd-widget">
              <div className="bd-wid-title">
                <h3>Search Articles</h3>
              </div>
              <form className="bd-search" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search architecture articles..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button type="submit" aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </form>
            </Reveal>

            <Reveal variant="left" delay={0.1} className="bd-widget">
              <div className="bd-wid-title">
                <h3>Categories</h3>
              </div>
              <ul className="bd-categories">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link to="/blogs" className={cat.active ? "active" : undefined}>
                      <span className="dot" />
                      <span>{cat.name}</span>
                      <span className="count">({cat.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="left" delay={0.15} className="bd-widget">
              <div className="bd-wid-title">
                <h3>Popular Tags</h3>
              </div>
              <div className="bd-tagcloud">
                {SIDEBAR_TAGS.map((tag) => (
                  <Link key={tag.id} to="/blogs" className={tag.active ? "active" : undefined}>
                    {tag.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </aside>

          <div className="bd-main">
            <article className="bd-post">
              <Reveal variant="up" className="bd-featured">
                <div className="bd-zoom">
                  <img src={post.heroImage} alt={post.title} />
                </div>
              </Reveal>

              <div className="bd-post-content">
                <Reveal as="ul" variant="up" delay={0.05} className="bd-post-list">
                  <li>
                    <UserIcon />
                    {post.author}
                  </li>
                  <li>
                    <TagIcon />
                    {post.category}
                  </li>
                </Reveal>

                <Reveal as="h3" variant="up" delay={0.1} className="bd-post-title">
                  {post.title}
                </Reveal>

                {post.paragraphs.map((p, idx) => (
                  <Reveal as="p" variant="up" delay={0.12 + idx * 0.05} key={idx}>
                    {p}
                  </Reveal>
                ))}

                <div className="bd-group-img">
                  <Reveal variant="left" delay={0.1}>
                    <div className="bd-details-image bd-zoom">
                      <img src={post.image2} alt="KSD Homes Australian Stone Project 1" loading="lazy" />
                    </div>
                  </Reveal>
                  <Reveal variant="right" delay={0.25}>
                    <div className="bd-details-image bd-zoom">
                      <img src={post.image3} alt="KSD Homes Australian Stone Project 2" loading="lazy" />
                    </div>
                  </Reveal>
                </div>

                <Reveal variant="up" delay={0.1} className="bd-hilight">
                  <p>{post.quote}</p>
                  <span className="bd-quote">
                    <QuoteIcon />
                  </span>
                </Reveal>

                <Reveal as="p" variant="up" delay={0.1} className="bd-last-text">
                  {post.conclusion}
                </Reveal>
              </div>
            </article>

            <Reveal variant="up" className="bd-tag-share">
              <div className="bd-post-tags">
                <h6>Tags:</h6>
                {POST_TAGS.map((tag) => (
                  <Link key={tag.id} to="/blogs" className={tag.active ? "active" : undefined}>
                    {tag.name}
                  </Link>
                ))}
              </div>
            </Reveal>

            <div className="bd-comments">
              <Reveal variant="up" className="bd-comments-heading">
                <h3>{String(comments.length).padStart(2, "0")} Comments</h3>
              </Reveal>
              {comments.map((comment) => (
                <Reveal variant="up" className="bd-comment" key={comment.id}>
                  <div className="bd-comment-image">
                    <img src={comment.avatar} alt={comment.name} style={{ width: "60px", height: "60px", objectFit: "contain", borderRadius: "50%", background: "#fff", border: "1px solid #e0e0e0" }} />
                  </div>
                  <div className="bd-comment-body">
                    <div className="bd-comment-top">
                      <div>
                        <h5>{comment.name}</h5>
                        <span className="bd-comment-date">{comment.date}</span>
                      </div>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="bd-comment-form">
              <Reveal as="h3" variant="up" delay={0.05} className="bd-form-title">
                Leave A Comment
              </Reveal>
              <form onSubmit={handleSubmit}>
                <div className="bd-form-row">
                  <Reveal variant="up" delay={0.1} className="bd-form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                    />
                  </Reveal>
                  <Reveal variant="up" delay={0.15} className="bd-form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                    />
                  </Reveal>
                </div>
                <Reveal variant="up" delay={0.2} className="bd-form-group">
                  <textarea
                    ref={messageRef}
                    name="message"
                    rows={6}
                    placeholder="Write Comment *"
                    value={form.message}
                    onChange={handleFormChange}
                    required
                  />
                </Reveal>
                <Reveal variant="up" delay={0.25} className="bd-form-submit">
                  <button type="submit" className="bd-btn">
                    <span>Post Comment</span>
                  </button>
                </Reveal>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
