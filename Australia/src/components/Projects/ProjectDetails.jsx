import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useApi, youtubeId } from "../../api";
import { homeBySlug, mergeHomes } from "../../data/homes";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./ProjectDetails.css";

function useInView(threshold = 0.16) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ className, as: Tag = "section", children }) {
  const [ref, visible] = useInView();
  return (
    <Tag ref={ref} className={`${className}${visible ? " is-in" : ""}`}>
      {children}
    </Tag>
  );
}

function firstLine(text = "") {
  const t = String(text).trim();
  if (!t) return "";
  const match = t.match(/^[^.!?]+[.!?]?/);
  return (match ? match[0] : t).slice(0, 220);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function Room({ room, index, total, flip }) {
  const num = pad(index + 1);
  const of = pad(total);
  const features = (room.features || []).filter(Boolean).slice(0, 3);
  if (!room.image) return null;

  return (
    <Reveal className={`ps-room${flip ? " is-flip" : ""}`}>
      <figure className="ps-room__media">
        <div className="ps-room__frame">
          <img src={room.image} alt={room.caption || `Room ${num}`} />
        </div>
      </figure>
      <div className="ps-room__copy">
        <p className="ps-room__label">Room {num}</p>
        <p className="ps-room__count">{num} / {of}</p>
        {room.caption && <h2>{room.caption}</h2>}
        {room.text && <p className="ps-room__text">{room.text}</p>}
        {room.dimensions && <p className="ps-room__dim">{room.dimensions}</p>}
        {features.length > 0 && (
          <ul className="ps-room__features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

function Banner({ image, caption }) {
  if (!image) return null;
  return (
    <Reveal className="ps-banner" as="figure">
      <img src={image} alt={caption || "Project banner"} />
    </Reveal>
  );
}

function Film({ url, images, title }) {
  const id = youtubeId(url);
  const file = url && /\.(mp4|webm)(\?|$)/i.test(url) ? url : "";
  const frames = (images || []).filter(Boolean).slice(0, 4);
  if (!id && !file && !frames.length) return null;

  return (
    <Reveal className="ps-film">
      {id ? (
        <div className="ps-film__frame">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : file ? (
        <video className="ps-film__video" src={file} autoPlay muted loop playsInline />
      ) : (
        <div className="ps-film__reel" aria-hidden="true">
          {frames.map((src, i) => (
            <img key={`${src}-${i}`} src={src} alt="" />
          ))}
        </div>
      )}
    </Reveal>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const lookup = slug === "sharma-residence" ? "residence" : slug;
  const { data } = useApi(lookup ? `/projects/${lookup}` : null);
  const { data: list } = useApi("/projects");
  const home = homeBySlug(lookup, data);
  if (slug === "sharma-residence") return <Navigate to="/projects/residence" replace />;

  const homes = mergeHomes(list);
  const currentIndex = homes.findIndex((item) => item.slug === home.slug);
  const nextHome = homes[(currentIndex + 1) % Math.max(homes.length, 1)];

  const planSrc = new Set([home.image2, home.image3, home.image4].filter(Boolean));
  const gallery = [
    ...(home.scenes || []).map((scene) => ({
      src: scene.image,
      caption: scene.caption,
      text: scene.text,
      features: scene.features,
      dimensions: scene.dimensions,
    })),
    ...(home.gallery || [])
      .filter((src) => !(home.scenes || []).some((scene) => scene.image === src))
      .map((src) => ({ src, caption: "", text: "", features: [], dimensions: "" })),
  ].filter((item) => item.src && !planSrc.has(item.src));

  const pair = [
    home.beforeImage && {
      src: home.beforeImage,
      caption: "Elevation",
      text: "The street elevation as drawn: rendered masonry planes, deep eaves and a composed arrival sequence.",
      features: ["Rendered masonry planes", "Deep eaves", "Composed entry"],
      dimensions: "Front elevation",
    },
    home.afterImage && {
      src: home.afterImage,
      caption: "Dining",
      text: "A long dining table on marble floors, set for family gatherings and lit from the western court.",
      features: ["Marble main floors", "Western court light", "Family dining table"],
      dimensions: "6.4 × 4.8 m",
    },
  ].filter((item) => item && item.src && !gallery.some((photo) => photo.src === item.src));

  const rooms = [...pair, ...gallery].map((item) => ({
    image: item.src,
    caption: item.caption,
    text: item.text,
    features: item.features || [],
    dimensions: item.dimensions || "",
  }));
  const banners = (home.banners || []).filter((banner) => banner.src);

  const leadNote = firstLine((home.paragraphs || [])[0] || home.heading || "");
  const facts = [
    home.year && { label: "Year", value: home.year },
    home.scope && { label: "Scope", value: home.scope },
    home.status && { label: "Status", value: home.status },
    home.suburb && { label: "Place", value: home.suburb },
  ].filter(Boolean);
  const plans = [
    { src: home.image2, label: (home.planLabels || [])[0] || "Ground" },
    { src: home.image3, label: (home.planLabels || [])[1] || "Upper" },
    { src: home.image4, label: (home.planLabels || [])[2] || "Undercroft" },
  ].filter((plan) => plan.src);

  return (
    <article className="ps">
      <Breadcrumb
        title={home.title}
        image={home.heroImage}
        labels={{ projects: "Projects", [home.slug]: home.title }}
      />

      <Reveal className="ps-lead">
        <header>
          <p className="ps-kicker">{home.scope || home.status} · {home.year || "2026"}</p>
          <h1>{home.title}</h1>
          <p className="ps-sub">{home.conceptHeadline || home.heading}</p>
        </header>
        <div className="ps-lead__copy">
          {leadNote && <p>{leadNote}</p>}
          {facts.length > 0 && (
            <ul className="ps-facts">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>

      <Film
        url={home.videoUrl}
        images={[home.heroImage, rooms[0]?.image, rooms[1]?.image, rooms[2]?.image].filter(Boolean)}
        title={home.title}
      />

      {rooms.length > 0 && (
        <div className="ps-rooms">
          {rooms.map((room, index) => (
            <div key={`${room.image}-${index}`}>
              <Room
                room={room}
                index={index}
                total={rooms.length}
                flip={index % 2 === 1}
              />
              {banners
                .filter((banner) => Number(banner.after) === index + 1)
                .map((banner) => (
                  <Banner key={`${banner.src}-${banner.after}`} image={banner.src} caption={room.caption} />
                ))}
            </div>
          ))}
        </div>
      )}

      {plans.length > 0 && (
        <Reveal className="ps-plans">
          {plans.map((plan) => (
            <figure key={plan.src}>
              <img src={plan.src} alt={`${home.title} ${plan.label} plan`} />
              <figcaption>{plan.label}</figcaption>
            </figure>
          ))}
        </Reveal>
      )}

      <Reveal className="ps-cta">
        {home.resultTitle && <p className="ps-kicker">{home.resultTitle}</p>}
        <h2>Want a room like this?</h2>
        <p>
          {home.resultText
            ? firstLine(home.resultText)
            : "Enquire about this project — we will walk you through how this home was specified, from rooms to finishes."}
        </p>
        <p className="ps-cta__prompt">Enquire about this project</p>
        <div className="ps-cta__actions">
          <Link to="/contact" className="ps-enquire">Enquire about this project</Link>
          {nextHome && nextHome.slug !== home.slug && (
            <Link to={`/projects/${nextHome.slug}`} className="ps-next">
              Next · {nextHome.title}
            </Link>
          )}
        </div>
      </Reveal>
    </article>
  );
}
