import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useApi, youtubeId } from "../../api";
import { homeBySlug, mergeHomes, cleanText, imgKey, spaceOf } from "../../data/homes";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./ProjectDetails.css";

const GROUP_LABEL = { indoor: "Interior", outdoor: "Outdoor living" };

function formatStatus(val = "") {
  return cleanText(val) || "Ongoing";
}

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
          <img src={room.image} alt={room.caption || `View ${num}`} loading="lazy" decoding="async" />
        </div>
      </figure>
      <div className="ps-room__copy">
        <p className="ps-room__label">View {num}</p>
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
      <img src={image} alt={caption || "Project banner"} loading="lazy" decoding="async" />
    </Reveal>
  );
}

/* real video only (YouTube or mp4/webm). No image slideshow, so no repeated photos */
function Film({ url, title }) {
  const id = youtubeId(url);
  const file = url && /\.(mp4|webm)(\?|$)/i.test(url) ? url : "";
  if (!id && !file) return null;

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
      ) : (
        <video className="ps-film__video" src={file} autoPlay muted loop playsInline />
      )}
    </Reveal>
  );
}

export default function ProjectDetails() {
  /* hidden "before reveal" styles apply only after mount, so nothing can stay invisible */
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => setReady(true), []);

  const { slug } = useParams();
  const lookup = slug === "sharma-residence" ? "residence" : slug;
  const { data } = useApi(lookup ? `/projects/${lookup}` : null);
  const { data: list } = useApi("/projects");
  const home = homeBySlug(lookup, data);
  if (slug === "sharma-residence") return <Navigate to="/projects/residence" replace />;

  const homes = mergeHomes(list);
  const currentIndex = homes.findIndex((item) => item.slug === home.slug);
  const nextHome = homes[(currentIndex + 1) % Math.max(homes.length, 1)];

  /* one photo = one place on the page */
  const claimed = new Set();
  const claim = (src) => {
    const key = imgKey(src);
    if (!key || claimed.has(key)) return false;
    claimed.add(key);
    return true;
  };
  /* the header image counts as used, except on the front/back showcase */
  if (!home.elevationsOnly) claim(home.heroImage);

  const planKeys = new Set([home.image2, home.image3, home.image4].filter(Boolean).map(imgKey));

  const pairItems = home.elevationsOnly
    ? []
    : [
        home.beforeImage && {
          src: home.beforeImage,
          caption: "Front elevation",
          text: home.beforeText || "The street elevation: rendered masonry planes, deep eaves and a composed arrival sequence.",
          features: ["Rendered masonry planes", "Deep eaves", "Composed entry"],
          dimensions: "Front elevation",
          space: "outdoor",
        },
        home.afterImage && {
          src: home.afterImage,
          caption: "Rear elevation",
          text: home.afterText || "The rear elevation, where the home opens to its garden and outdoor living.",
          features: ["Rear facade", "Outdoor living", "Garden aspect"],
          dimensions: "Rear elevation",
          space: "outdoor",
        },
      ].filter(Boolean);

  const sceneItems = (home.scenes || []).map((scene) => ({
    src: scene.image,
    caption: scene.caption,
    text: scene.text,
    features: scene.features,
    dimensions: scene.dimensions,
    space: scene.space,
  }));

  const extraItems = (home.gallery || [])
    .filter((src) => !sceneItems.some((s) => imgKey(s.src) === imgKey(src)))
    .map((src) => ({ src, caption: "", text: "", features: [], dimensions: "", space: "" }));

  const rooms = [...pairItems, ...sceneItems, ...extraItems]
    .filter((item) => item.src && !planKeys.has(imgKey(item.src)))
    .filter((item) => claim(item.src))
    .map((item) => ({
      image: item.src,
      caption: item.caption,
      text: item.text,
      features: item.features || [],
      dimensions: item.dimensions || "",
      space: spaceOf(item),
    }));

  /* interior photos first, then outdoor, never mixed */
  const indoor = rooms.filter((r) => r.space === "indoor");
  const outdoor = rooms.filter((r) => r.space === "outdoor");
  const ordered = [...indoor, ...outdoor];
  const hasBoth = indoor.length > 0 && outdoor.length > 0;
  const total = ordered.length;

  /* banners and the video can sit between views; positions are kept inside the list */
  const place = (n) => Math.min(Math.max(Number(n) || 1, 1), Math.max(total, 1));
  const banners = (home.banners || []).filter((banner) => banner.src && claim(banner.src));
  const videoPos = Math.min(Math.max(Number(home.videoAfter) || 0, 0), total);

  const plans = home.elevationsOnly
    ? []
    : [
        { src: home.image2, label: (home.planLabels || [])[0] || "Ground" },
        { src: home.image3, label: (home.planLabels || [])[1] || "Upper" },
        { src: home.image4, label: (home.planLabels || [])[2] || "Undercroft" },
      ].filter((plan) => plan.src && claim(plan.src));

  const leadNote = firstLine((home.paragraphs || [])[0] || home.heading || "");

  const facts = [
    home.year && { label: "Year", value: home.year },
    home.scope && { label: "Scope", value: formatStatus(home.scope) },
    home.status && { label: "Status", value: formatStatus(home.status) },
    (home.type || home.category || home.collection) && {
      label: "Type",
      value: cleanText(home.type || home.category || home.collection),
    },
  ].filter(Boolean);

  return (
    <article className={`ps ${ready ? "is-ready" : ""}`}>
      <Breadcrumb
        title={home.title}
        image={home.heroImage}
        labels={{ projects: "Projects", [home.slug]: home.title }}
      />

      <Reveal className="ps-lead">
        <header>
          <p className="ps-kicker">{formatStatus(home.scope || home.status)} · {home.year || "2026"}</p>
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

      {videoPos === 0 && <Film url={home.videoUrl} title={home.title} />}

      {total > 0 && (
        <div className="ps-rooms">
          {ordered.map((room, index) => {
            const startsGroup = hasBoth && (index === 0 || ordered[index - 1].space !== room.space);
            return (
              <div key={`${room.image}-${index}`}>
                {startsGroup && <h3 className="ps-group">{GROUP_LABEL[room.space]}</h3>}
                <Room room={room} index={index} total={total} flip={index % 2 === 1} />
                {videoPos === index + 1 && <Film url={home.videoUrl} title={home.title} />}
                {banners
                  .filter((banner) => place(banner.after) === index + 1)
                  .map((banner) => (
                    <Banner key={`${banner.src}-${banner.after}`} image={banner.src} caption={room.caption} />
                  ))}
              </div>
            );
          })}
        </div>
      )}

      {plans.length > 0 && (
        <Reveal className="ps-plans">
          {plans.map((plan) => (
            <figure key={plan.src}>
              <img src={plan.src} alt={`${home.title} ${plan.label} plan`} loading="lazy" decoding="async" />
              <figcaption>{plan.label}</figcaption>
            </figure>
          ))}
        </Reveal>
      )}

      <Reveal className="ps-cta">
        {home.resultTitle && <p className="ps-kicker">{home.resultTitle}</p>}
        <h2>Want a view like this?</h2>
        <p>
          {home.resultText
            ? firstLine(home.resultText)
            : "Enquire about this project. We will walk you through how this home was specified, from views to finishes."}
        </p>
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