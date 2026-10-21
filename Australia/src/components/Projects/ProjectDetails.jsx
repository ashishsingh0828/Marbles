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
  return (match ? match[0] : t).slice(0, 160);
}

function Split({ image, caption, text, flip }) {
  if (!image) return null;
  return (
    <Reveal className={`ps-split${flip ? " is-flip" : ""}`}>
      <figure>
        <img src={image} alt={caption || ""} />
      </figure>
      <div className="ps-split__copy">
        {caption && <h2>{caption}</h2>}
        {text && <p>{firstLine(text)}</p>}
      </div>
    </Reveal>
  );
}

function Cover({ image, caption }) {
  if (!image) return null;
  return (
    <Reveal className="ps-cover" as="figure">
      <img src={image} alt={caption || ""} />
      {caption && <figcaption>{caption}</figcaption>}
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
          {frames.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
      )}
    </Reveal>
  );
}

function photoBlocks(photos) {
  const out = [];
  for (let i = 0; i < photos.length; i += 3) {
    const [left, right, cover] = photos.slice(i, i + 3);
    if (left) out.push({ type: "split", flip: false, item: left });
    if (right) out.push({ type: "split", flip: true, item: right });
    if (cover) out.push({ type: "cover", item: cover });
  }
  return out;
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
    ...(home.scenes || []).map((scene) => ({ src: scene.image, caption: scene.caption, text: scene.text })),
    ...(home.gallery || [])
      .filter((src) => !(home.scenes || []).some((scene) => scene.image === src))
      .map((src) => ({ src, caption: "", text: "" })),
  ].filter((item) => item.src && !planSrc.has(item.src));

  const pair = [
    home.beforeImage && { src: home.beforeImage, caption: "Before", text: "As drawn." },
    home.afterImage && { src: home.afterImage, caption: "After", text: "Interior direction." },
  ].filter((item) => item && item.src && !gallery.some((photo) => photo.src === item.src));
  const photos = [...pair, ...gallery];
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
        images={[home.heroImage, photos[0]?.src, photos[1]?.src, photos[2]?.src].filter(Boolean)}
        title={home.title}
      />

      {photoBlocks(photos).map((block) =>
        block.type === "cover" ? (
          <Cover key={block.item.src} image={block.item.src} caption={block.item.caption} />
        ) : (
          <Split
            key={block.item.src}
            flip={block.flip}
            image={block.item.src}
            caption={block.item.caption}
            text={block.item.text}
          />
        )
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

      <Reveal className="ps-end">
        {home.resultTitle && <p className="ps-kicker">{home.resultTitle}</p>}
        {home.resultText && <p>{firstLine(home.resultText)}</p>}
        <div className="ps-end__actions">
          <Link to="/contact" className="ps-enquire">Enquire</Link>
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
