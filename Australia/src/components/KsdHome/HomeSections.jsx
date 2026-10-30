import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../config";
import { IMG } from "../../data/images";
import { mergeHomes } from "../../data/homes";
import { useApi } from "../../api";
import "./HomeSections.css";

const HERO_VIDEO = "/Image/hero.mp4";
const HERO_FRAMES = [IMG.hero, IMG.heroTwo, IMG.heroThree, IMG.heroFour];
const FRAME_MS = 5200;

export function Hero() {
  const canvasRef = useRef(null);
  const [fileReady, setFileReady] = useState(false);

  useEffect(() => {
    const probe = document.createElement("video");
    const onReady = () => setFileReady(true);
    const onError = () => setFileReady(false);
    probe.muted = true;
    probe.preload = "auto";
    probe.addEventListener("canplay", onReady);
    probe.addEventListener("error", onError);
    probe.src = HERO_VIDEO;
    probe.load();
    return () => {
      probe.removeEventListener("canplay", onReady);
      probe.removeEventListener("error", onError);
      probe.src = "";
    };
  }, []);

  useEffect(() => {
    if (fileReady) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;
    const frames = HERO_FRAMES.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    let raf;
    const started = performance.now();
    const draw = (now) => {
      const cycle = FRAME_MS * frames.length;
      const t = (now - started) % cycle;
      const index = Math.floor(t / FRAME_MS);
      const progress = (t % FRAME_MS) / FRAME_MS;
      const img = frames[index];
      if (img && img.complete && img.naturalWidth) {
        const zoom = 1 + progress * 0.1;
        const cover = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight) * zoom;
        const width = img.naturalWidth * cover;
        const height = img.naturalHeight * cover;
        ctx.drawImage(img, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [fileReady]);

  return (
    <section className="ks-hero">
      {fileReady ? (
        <video
          className="ks-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster={IMG.hero}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : (
        <canvas ref={canvasRef} className="ks-hero__video" aria-hidden="true" />
      )}
      <div className="ks-hero__shade" />
      <div className="ks-hero__copy">
        <p>Boutique Custom Builders · Perth, WA</p>
        <h1>Bespoke custom homes in Perth, backed by 28+ years of experience</h1>
        <Link to="/contact" className="ks-btn">Discuss Your Project</Link>
      </div>
    </section>
  );
}

export function ExperienceStrip() {
  return (
    <section className="ks-strip" aria-label="Experience">
      <p>28+ years of team experience</p>
      <p>Architecture, interior design and construction in one team</p>
      <p>Licensed Perth boutique builder · ABN {BRAND.abn}</p>
    </section>
  );
}

export function OurStory() {
  return (
    <section className="ks-block">
      <div className="ks-block__copy">
        <p className="ks-kicker">Our Story</p>
        <h2>Architectural precision meets boutique residential craftsmanship</h2>
        <p>
          KSD Homes brings architectural design, interior planning, and premium construction together in one dedicated Perth studio. With 28+ years of combined industry experience, we deliver complete, site-responsive homes from the first sketch to final handover.
        </p>
        <Link to="/about" className="ks-btn ks-btn--ghost">About Us</Link>
      </div>
      <figure className="ks-block__media">
        <img src={IMG.diningLight} alt="Dining room with chandelier and timber joinery designed by KSD Homes" />
      </figure>
    </section>
  );
}

export function SketchToFurnishing() {
  return (
    <section className="ks-block ks-block--flip">
      <div className="ks-block__copy">
        <p className="ks-kicker">From sketch to furnishing</p>
        <h2>Architecture, interior design and construction under one roof</h2>
        <p>
          Consultation, design, approvals, construction, interiors and handover run as one continuous process, so you get a cohesive home without handovers between separate firms.
        </p>
        <Link to="/design-journey" className="ks-btn ks-btn--ghost">Design Journey</Link>
      </div>
      <figure className="ks-block__media">
        <img src={IMG.joinery} alt="Custom timber joinery and TV unit" />
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
        <p className="ks-kicker">Portfolio</p>
        <h2>Curated Residential Projects</h2>
        <p>A selection of custom homes designed and built to suit Western Australia&apos;s lifestyle and landscape.</p>
      </div>
      {homes.length === 0 ? (
        <p className="ks-empty">No projects to show right now.</p>
      ) : (
        <div className="ks-cards">
          {homes.map((home) => (
            <Link key={home.slug} to={`/projects/${home.slug}`} className="ks-card">
              <img src={home.image} alt={home.title} />
              <span>{home.scope || home.status} · {home.suburb}</span>
              <strong>{home.title}</strong>
            </Link>
          ))}
        </div>
      )}
      <Link to="/projects" className="ks-btn ks-btn--ghost">View All Projects</Link>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="ks-news">
      <h2>Follow our ongoing projects</h2>
      <p>Updates from our Perth studio on active site progress, design concepts, and private commissions across Western Australia.</p>
      <form className="ks-news__form" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor="ks-news-email">Email address</label>
        <input id="ks-news-email" type="email" required placeholder="Email address" />
        <button type="submit" className="ks-btn">Subscribe</button>
      </form>
    </section>
  );
}