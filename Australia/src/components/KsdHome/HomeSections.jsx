import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../config";
import { IMG } from "../../data/images";
import { mergeHomes } from "../../data/homes";
import { useApi } from "../../api";
import "./HomeSections.css";

const HERO_FRAMES = [IMG.hero, IMG.diningLight, IMG.joinery, IMG.bathroomMarble];
const FRAME_MS = 5200;

export function Hero() {
  const canvasRef = useRef(null);
  const [fileReady, setFileReady] = useState(false);

  useEffect(() => {
    const probe = document.createElement("video");
    const onReady = () => setFileReady(true);
    probe.muted = true;
    probe.preload = "auto";
    probe.addEventListener("canplay", onReady);
    probe.addEventListener("error", () => setFileReady(false));
    probe.src = "/images/hero.mp4";
    probe.load();
    return () => {
      probe.removeEventListener("canplay", onReady);
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
        const scale = 1 + progress * 0.1;
        const width = canvas.width * scale;
        const height = canvas.height * scale;
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
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <canvas ref={canvasRef} className="ks-hero__video" aria-hidden="true" />
      )}
      <div className="ks-hero__shade" />
      <div className="ks-hero__copy">
        <p>Boutique Custom Builders · Perth WA</p>
        <h1>Crafting Perth&apos;s finest bespoke homes, backed by 28+ years of expertise</h1>
        <Link to="/contact" className="ks-btn">Discuss Your Project</Link>
      </div>
    </section>
  );
}

export function ExperienceStrip() {
  return (
    <section className="ks-strip" aria-label="Experience">
      <p>28+ years team experience</p>
      <p>Architecture + Builder Interior Design united</p>
      <p>Licensed Perth boutique builder · ABN {BRAND.abn}</p>
    </section>
  );
}

export function OurStory() {
  return (
    <section className="ks-block">
      <div className="ks-block__copy">
        <p className="ks-kicker">Our Story</p>
        <h2>Architectural precision united with boutique residential craftsmanship</h2>
        <p>
          KSD Homes brings bespoke architectural design, interior planning, and premium construction together under one dedicated Perth studio. Backed by 28+ years of combined industry mastery, we deliver complete, site-responsive residential solutions from first sketch to final handover.
        </p>
        <Link to="/about" className="ks-btn ks-btn--ghost">About Us</Link>
      </div>
      <figure className="ks-block__media">
        <img src={IMG.diningLight} alt="KSD Homes interior direction" />
      </figure>
    </section>
  );
}

export function SketchToFurnishing() {
  return (
    <section className="ks-block ks-block--flip">
      <div className="ks-block__copy">
        <p className="ks-kicker">From sketch to furnishing</p>
        <h2>Architecture, interior design and build under one roof</h2>
        <p>
          Consultation, design, approvals, build, interiors and handover are one continuous sequence — delivering a cohesive home without handoffs between disconnected firms.
        </p>
        <Link to="/design-journey" className="ks-btn ks-btn--ghost">Design Journey</Link>
      </div>
      <figure className="ks-block__media">
        <img src={IMG.joinery} alt="Joinery and interior specification" />
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
        <p>A selection of custom residences designed and engineered to complement Western Australia&apos;s lifestyle and landscape.</p>
      </div>
      {homes.length === 0 ? (
        <p className="ks-empty">Projects currently loading</p>
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
      <p>Direct updates from our Carlisle studio on active site progress, architectural concepts, and private commissions across Western Australia.</p>
      <form className="ks-news__form" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor="ks-news-email">Email address</label>
        <input id="ks-news-email" type="email" required placeholder="Enter your email address" />
        <button type="submit" className="ks-btn">Subscribe</button>
      </form>
    </section>
  );
}