import { Link, Navigate, useParams } from "react-router-dom";
import { useApi, youtubeId } from "../../api";
import { homeBySlug, mergeHomes, specsOf } from "../../data/homes";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./ProjectDetails.css";

function Split({ image, caption, text, kicker, flip }) {
  if (!image) return null;
  return (
    <section className={`ps-split${flip ? " is-flip" : ""}`}>
      <figure>
        <img src={image} alt={caption || ""} />
      </figure>
      <div className="ps-split__copy">
        {kicker && <p className="ps-kicker">{kicker}</p>}
        {caption && <h2>{caption}</h2>}
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

function Cover({ image, caption }) {
  if (!image) return null;
  return (
    <figure className="ps-cover">
      <img src={image} alt={caption || ""} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Film({ url, images, title, heading, text }) {
  const id = youtubeId(url);
  const frames = (images || []).filter(Boolean).slice(0, 4);
  if (!id && !frames.length) return null;

  return (
    <section className="ps-film">
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
        <div className="ps-film__reel" aria-hidden="true">
          {frames.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
      )}
      {(heading || text) && (
        <div className="ps-film__copy">
          {heading && <h2>{heading}</h2>}
          {text && <p>{text}</p>}
        </div>
      )}
    </section>
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

  const gallery = [
    ...(home.scenes || []).map((scene) => ({ src: scene.image, caption: scene.caption, text: scene.text })),
    ...(home.gallery || [])
      .filter((src) => !(home.scenes || []).some((scene) => scene.image === src))
      .map((src) => ({ src, caption: "", text: "" })),
  ].filter((item) => item.src);

  const [first, second, third, ...rest] = gallery;
  const specs = specsOf(home);
  const checks = home.checks || [];
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

      <section className="ps-info">
        <p className="ps-kicker">{home.scope || home.status} · {home.year || "2026"} · {home.suburb}</p>
        <h2>{home.heading || home.conceptHeadline || home.title}</h2>
        {(home.paragraphs || []).slice(0, 2).map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        {specs.length > 0 && (
          <ul className="ps-specs">
            {specs.map((spec) => (
              <li key={spec.label}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Split
        image={first?.src || home.heroImage}
        caption={first?.caption || home.conceptHeadline}
        text={first?.text || (home.paragraphs || [])[0]}
        kicker={home.suburb}
      />

      <Split
        flip
        image={second?.src}
        caption={second?.caption || home.challengeTitle}
        text={second?.text || home.challengeText}
        kicker="Builder interior design"
      />

      {checks.length > 0 && (
        <section className="ps-checks">
          <p className="ps-kicker">The brief</p>
          <h2>{home.challengeTitle || "Resolved as one home"}</h2>
          <ul>
            {checks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <Film
        url={home.videoUrl}
        images={[home.heroImage, first?.src, second?.src, third?.src].filter(Boolean)}
        title={home.title}
        heading={home.videoHeading}
        text={home.videoText}
      />

      {third && (
        <Cover image={third.src} caption={third.caption} />
      )}

      {rest.map((item, idx) =>
        idx % 3 === 1 ? (
          <Cover key={item.src} image={item.src} caption={item.caption} />
        ) : (
          <Split
            key={item.src}
            flip={idx % 2 === 1}
            image={item.src}
            caption={item.caption}
            text={item.text}
            kicker={idx % 2 === 0 ? "Composition" : "Interior direction"}
          />
        )
      )}

      {plans.length > 0 && (
        <section className="ps-plans">
          {plans.map((plan) => (
            <figure key={plan.src}>
              <img src={plan.src} alt={`${home.title} ${plan.label} plan`} />
              <figcaption>{plan.label}</figcaption>
            </figure>
          ))}
        </section>
      )}

      {(home.paragraphs || []).slice(2).map((paragraph) => (
        <p className="ps-more" key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}

      <div className="ps-end">
        {home.resultTitle && <p className="ps-kicker">{home.resultTitle}</p>}
        <p>{home.resultText}</p>
        <div className="ps-end__actions">
          <Link to="/contact" className="ps-enquire">Enquire</Link>
          {nextHome && nextHome.slug !== home.slug && (
            <Link to={`/projects/${nextHome.slug}`} className="ps-next">
              Next · {nextHome.title}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
