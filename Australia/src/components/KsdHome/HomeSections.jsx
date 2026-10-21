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
        <p>Founded 2026 · Perth</p>
        <h1>Building Perth&apos;s finest homes, backed by 28+ years of experience</h1>
        <Link to="/contact" className="ks-btn">Enquire</Link>
      </div>
    </section>
  );
}

export function ExperienceStrip() {
  return (
    <section className="ks-strip" aria-label="Experience">
      <p>28+ years team experience</p>
      <p>Builder + Interior design under one roof</p>
      <p>Licensed Perth builder · ABN {BRAND.abn}</p>
    </section>
  );
}

export function OurStory() {
  return (
    <section className="ks-block">
      <div className="ks-block__copy">
        <p className="ks-kicker">Our story</p>
        <h2>A new Perth builder built on 28 years of experience</h2>
        <p>
          KSD Homes Pty Ltd was founded in 2026 so architecture, interior design and construction could sit with one team.
          The company is new. The people are not: 28+ years of combined professional experience, delivered as a licensed boutique builder in Perth.
        </p>
        <Link to="/about" className="ks-btn ks-btn--ghost">About us</Link>
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
          Consultation, design, approvals, build, interiors and handover are one sequence — not a house handed between separate firms.
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
        <p className="ks-kicker">Projects</p>
        <h2>Work by our team</h2>
        <p>Real commissions only. If a collection is still empty, it stays empty until the work is ready.</p>
      </div>
      {homes.length === 0 ? (
        <p className="ks-empty">Coming soon</p>
      ) : (
        <div className="ks-cards">
          {homes.map((home) => (
            <Link key={home.slug} to={`/projects/${home.slug}`} className="ks-card">
              <img src={home.image} alt={home.title} />
              <span>{home.scope || home.status} · {home.suburb} · {home.year || "2026"}</span>
              <strong>{home.title}</strong>
            </Link>
          ))}
        </div>
      )}
      <Link to="/projects" className="ks-btn ks-btn--ghost">View projects</Link>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="ks-news">
      <h2>Be first to see our upcoming projects</h2>
      <p>Notes from the Perth studio when there is something worth sharing — no awards we have not earned, no padding.</p>
      <form className="ks-news__form" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor="ks-news-email">Email address</label>
        <input id="ks-news-email" type="email" required placeholder="Email address" />
        <button type="submit" className="ks-btn">Enquire</button>
      </form>
    </section>
  );
}
