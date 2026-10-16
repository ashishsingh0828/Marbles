import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, asset } from "../../api";
import "./GallerySlider.css";

const BG_IMAGE = "/images/ksd-stone-01.jpg";

const GALLERY_ITEMS = [
  { id: 1, slug: "mosman-coastal-estate", image: "/images/ksd-stone-24.jpg", alt: "Bespoke Residence Marble Living" },
  { id: 2, slug: "toorak-penthouse", image: "/images/ksd-stone-25.jpg", alt: "Luxury Stone Waterfall Island" },
  { id: 3, slug: "vaucluse-contemporary-pavilion", image: "/images/ksd-stone-26.jpg", alt: "Bookmatched Marble Ensuite" },
  { id: 4, slug: "byron-bay-sanctuary", image: "/images/ksd-stone-27.jpg", alt: "Architectural Stone Kitchen Counter" },
  { id: 5, slug: "point-piper-waterfront", image: "/images/ksd-stone-28.jpg", alt: "Polished Travertine Flooring" },
  { id: 6, slug: "brighton-grand-residence", image: "/images/ksd-stone-29.jpg", alt: "Custom Architectural Staircase" },
  { id: 7, slug: "mosman-coastal-estate", image: "/images/ksd-stone-30.jpg", alt: "Calacatta Quartzite Feature Wall" },
  { id: 8, slug: "toorak-penthouse", image: "/images/ksd-stone-31.jpg", alt: "Outdoor Natural Stone Living" },
];

const CLONES = 4;
const AUTOPLAY_MS = 3500;
const TRANSITION_MS = 820;
const DRAG_THRESHOLD = 50;

const getSlidesPerView = () => {
  if (typeof window === "undefined") return 4;
  const width = window.innerWidth;
  if (width >= 1200) return 4;
  if (width >= 992) return 3;
  if (width >= 576) return 2;
  return 1;
};

function useReveal(threshold = 0.15) {
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
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function GallerySlider({ background = BG_IMAGE, items: propItems }) {
  const { data: backendProjects } = useApi("/projects");

  const items = useMemo(() => {
    if (propItems && propItems.length > 0) return propItems;
    if (backendProjects && backendProjects.length > 0) {
      return backendProjects.map((p, idx) => ({
        id: p._id || idx + 1,
        slug: p.slug,
        image: p.image ? asset(p.image) : `/images/ksd-stone-${String((idx % 12) + 21).padStart(2, "0")}.jpg`,
        alt: p.title || "KSD Homes Architectural Project",
      }));
    }
    return GALLERY_ITEMS;
  }, [propItems, backendProjects]);

  const total = items.length;
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);
  const [pos, setPos] = useState(CLONES);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [headRef, headVisible] = useReveal(0.3);
  const [sliderRef, sliderVisible] = useReveal(0.15);

  const startX = useRef(0);
  const moved = useRef(false);

  const extended = useMemo(() => {
    const head = Array.from({ length: CLONES }, (_, i) => items[(total - CLONES + i + total * 2) % total]);
    const tail = Array.from({ length: CLONES }, (_, i) => items[i % total]);
    return [
      ...head.map((item, i) => ({ item, key: `head-${i}`, clone: true })),
      ...items.map((item) => ({ item, key: `main-${item.id}`, clone: false })),
      ...tail.map((item, i) => ({ item, key: `tail-${i}`, clone: true })),
    ];
  }, [items, total]);

  useEffect(() => {
    const handleResize = () => setSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goNext = useCallback(() => {
    setAnimate(true);
    setPos((prev) => Math.min(prev + 1, total + CLONES));
  }, [total]);

  const goPrev = useCallback(() => {
    setAnimate(true);
    setPos((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    if (pos >= CLONES && pos < total + CLONES) return undefined;
    const timer = setTimeout(() => {
      setAnimate(false);
      setPos((prev) => (prev >= total + CLONES ? prev - total : prev + total));
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [pos, total]);

  useEffect(() => {
    if (paused || dragging || total < 2) return undefined;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, dragging, total, goNext]);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX.current = event.clientX;
    moved.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX.current;
    if (Math.abs(delta) > 5) moved.current = true;
    setDragX(delta);
  };

  const finishDrag = (event) => {
    if (!dragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (dragX <= -DRAG_THRESHOLD) goNext();
    else if (dragX >= DRAG_THRESHOLD) goPrev();
    setDragX(0);
    setDragging(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") goNext();
    if (event.key === "ArrowLeft") goPrev();
  };

  return (
    <section className="gallery-section">
      <div
        className="gallery-head"
        style={{ "--gallery-bg": `url("${background}")` }}
      >
        <div
          ref={headRef}
          className={`gallery-head-inner fade-up${headVisible ? " is-visible" : ""}`}
        >
          <div className="gallery-subtitle">
            <span className="line" />
            <span className="text">KSD HOMES PORTFOLIO</span>
            <span className="line" />
          </div>
          <h2 className="gallery-title">Signature Residential Stone Curation</h2>
        </div>
      </div>

      <div
        className="gallery-slider-wrap"
        style={{ "--gallery-bg": `url("${background}")` }}
      >
        <div
          ref={sliderRef}
          className={`gallery-slider${sliderVisible ? " is-visible" : ""}`}
          style={{
            "--spv": slidesPerView,
            "--index": pos,
            "--drag": `${dragX}px`,
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="Marblex gallery"
          tabIndex={0}
        >
          <div
            className={`gallery-viewport${dragging ? " is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onClickCapture={(event) => {
              if (moved.current) {
                event.preventDefault();
                event.stopPropagation();
                moved.current = false;
              }
            }}
          >
            <div className={`gallery-track${dragging || !animate ? " no-transition" : ""}`}>
              {extended.map((entry, extIndex) => (
                <div
                  className="gallery-slide"
                  key={entry.key}
                  aria-hidden={entry.clone ? "true" : undefined}
                  style={{
                    "--slide-delay": `${Math.max(0, Math.min(extIndex - CLONES, 5)) * 0.12}s`,
                  }}
                >
                  <div className="gallery-thumb">
                    {entry.item.slug ? (
                      <Link to={`/projects/${entry.item.slug}`} style={{ display: "block", width: "100%", height: "100%" }}>
                        <img
                          src={entry.item.image}
                          alt={entry.clone ? "" : entry.item.alt}
                          loading="lazy"
                          draggable="false"
                        />
                      </Link>
                    ) : (
                      <img
                        src={entry.item.image}
                        alt={entry.clone ? "" : entry.item.alt}
                        loading="lazy"
                        draggable="false"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySlider;