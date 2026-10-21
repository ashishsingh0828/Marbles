import { Link, Navigate, useParams } from "react-router-dom";
import { useApi } from "../../api";
import { homeBySlug } from "../../data/homes";
import "./ProjectDetails.css";

function chunks(items) {
  const out = [];
  let i = 0;
  let full = true;
  while (i < items.length) {
    if (full) {
      out.push({ type: "full", items: items.slice(i, i + 1) });
      i += 1;
    } else {
      out.push({ type: "pair", items: items.slice(i, i + 2) });
      i += 2;
    }
    full = !full;
  }
  return out;
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const lookup = slug === "sharma-residence" ? "residence" : slug;
  const { data } = useApi(lookup ? `/projects/${lookup}` : null);
  const home = homeBySlug(lookup, data);
  if (slug === "sharma-residence") return <Navigate to="/projects/residence" replace />;

  const gallery = [
    ...(home.scenes || []).map((scene) => ({ src: scene.image, caption: scene.caption, text: scene.text })),
    ...(home.gallery || [])
      .filter((src) => !(home.scenes || []).some((scene) => scene.image === src))
      .map((src) => ({ src, caption: "", text: "" })),
  ].filter((item) => item.src);
  const rows = chunks(gallery);
  const plans = [
    { src: home.image2, label: (home.planLabels || [])[0] || "Ground" },
    { src: home.image3, label: (home.planLabels || [])[1] || "Upper" },
    { src: home.image4, label: (home.planLabels || [])[2] || "Undercroft" },
  ].filter((plan) => plan.src);

  return (
    <article className="ps">
      <header className="ps-hero">
        <img src={home.heroImage} alt={home.title} />
        <div className="ps-hero__shade" />
        <div className="ps-hero__copy">
          <p className="ps-kicker">{home.suburb} · {home.year || "2026"}</p>
          <h1>{home.title}</h1>
          <p className="ps-hero__concept">{home.conceptHeadline}</p>
        </div>
      </header>

      <div className="ps-body">
        <p className="ps-kicker">{home.scope || home.status}</p>
        <h2>{home.heading}</h2>
        {(home.paragraphs || []).map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      {rows.map((row, idx) => (
        <div key={idx} className={`ps-gallery ps-gallery--${row.type}`}>
          {row.items.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.caption || home.title} />
              {(item.caption || item.text) && (
                <figcaption>
                  {item.caption && <strong>{item.caption}</strong>}
                  {item.text && <p>{item.text}</p>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ))}

      {plans.length > 0 && (
        <div className="ps-gallery ps-gallery--pair">
          {plans.map((plan) => (
            <figure key={plan.src}>
              <img src={plan.src} alt={`${home.title} ${plan.label} plan`} />
              <figcaption><strong>{plan.label}</strong></figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="ps-end">
        <p>{home.resultText}</p>
        <Link to="/contact" className="ps-enquire">Enquire</Link>
      </div>
    </article>
  );
}
