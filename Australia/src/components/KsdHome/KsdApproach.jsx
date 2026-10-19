import { Link } from "react-router-dom";
import "./KsdApproach.css";

const ITEMS = [
  {
    num: "01",
    title: "What we do",
    text: "Architecture, interior design and complete home solutions — licensed boutique building for high-end family residences in Western Australia.",
  },
  {
    num: "02",
    title: "How we do it",
    text: "Design and build sit under one roof. One brief, one team, one composition — from first conversation through materials, making and handover.",
  },
  {
    num: "03",
    title: "Why we do it",
    text: "So a house becomes a high-performing, comfortable home that reflects how you live today, and how you will live tomorrow.",
  },
];

export default function KsdApproach() {
  return (
    <section className="ksd-approach">
      <div className="ksd-approach__inner">
        <p className="ksd-approach__eyebrow">Our process</p>
        <h2>Clear from the first visit</h2>
        <div className="ksd-approach__grid">
          {ITEMS.map((item) => (
            <article key={item.num} className="ksd-approach__card">
              <span>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link to="/about" className="ksd-approach__link">
          Read the KSD story
        </Link>
      </div>
    </section>
  );
}
