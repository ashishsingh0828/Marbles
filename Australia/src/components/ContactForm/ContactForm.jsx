import { useEffect, useRef, useState } from "react";
import { sendContact } from "../../api";
import { BRAND } from "../../config";
import "./ContactForm.css";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapQuery)}&output=embed`;
const IMAGE_SRC = "/images/ksd-stone-27.jpg";

const INFO_ITEMS = [
  {
    id: "office",
    icon: "office",
    title: "Perth Studio",
    lines: [{ text: BRAND.address }],
  },
  {
    id: "phone",
    icon: "phone",
    title: "Phone & WhatsApp",
    lines: [
      { text: `${BRAND.phoneLabel}: ${BRAND.phone}`, href: BRAND.phoneHref },
      { text: `${BRAND.phoneKarlLabel}: ${BRAND.phoneKarl}`, href: BRAND.phoneKarlHref },
      { text: "WhatsApp", href: BRAND.whatsappHref },
    ],
  },
  {
    id: "email",
    icon: "mail",
    title: "Email Our Consultants",
    lines: [
      { text: BRAND.email, href: `mailto:${BRAND.email}` },
    ],
  },
];

const INITIAL_FORM = { name: "", email: "", phone: "", scope: "", message: "" };

function useReveal(threshold = 0.12) {
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

function InfoIcon({ type }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 19,
    height: 19,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
  };

  if (type === "office") {
    return (
      <svg {...common}>
        <path d="M12 2.5 1.5 12H5v9h5.5v-6h3v6H19v-9h3.5L12 2.5Z" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [infoRef, infoVisible] = useReveal();
  const [mapRef, mapVisible] = useReveal();
  const [imageRef, imageVisible] = useReveal();
  const [formRef, formVisible] = useReveal();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      await sendContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.scope || "Website Enquiry",
        message: form.message,
      });
      setIsSuccess(true);
      setStatusMsg("Thank you! Your enquiry has been received. Our team will contact you shortly.");
      setForm(INITIAL_FORM);
    } catch (err) {
      setIsSuccess(false);
      setStatusMsg(err.message || "Failed to send message. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-contact">
      <div className="mx-contact-grid">
        <div
          ref={infoRef}
          className={`mx-cell mx-info ${infoVisible ? "is-visible" : ""}`}
        >
          <span className="mx-label mx-item" style={{ "--i": 0 }}>
            <span className="mx-label-line" />
            CONNECT WITH KSD HOMES
          </span>
          <h2 className="mx-heading mx-item" style={{ "--i": 1 }}>
            Start Your Custom Home Journey
          </h2>
          <p className="mx-text mx-item" style={{ "--i": 2 }}>
            Planning a boutique home, a renovation, or a complete interior fit-out? Speak with our Perth builder and interior design team. Every project begins with listening.
          </p>
          <ul className="mx-info-list">
            {INFO_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className="mx-info-item mx-item"
                style={{ "--i": 3 + index }}
              >
                <span className="mx-info-icon">
                  <InfoIcon type={item.icon} />
                </span>
                <div className="mx-info-body">
                  <h3>{item.title}</h3>
                  {item.lines.map((line, lineIndex) =>
                    line.href ? (
                      <a
                        key={`${item.id}-${lineIndex}`}
                        href={line.href}
                        className="mx-info-line"
                      >
                        {line.text}
                      </a>
                    ) : (
                      <span
                        key={`${item.id}-${lineIndex}`}
                        className="mx-info-line"
                      >
                        {line.text}
                      </span>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={mapRef}
          className={`mx-cell mx-map${mapVisible ? " is-visible" : ""}`}
        >
          <div className="mx-map-frame mx-item mx-item--right" style={{ "--i": 0 }}>
            <iframe
              title="KSD Homes Perth Studio"
              src={MAP_SRC}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div
          ref={imageRef}
          className={`mx-cell mx-image ${imageVisible ? "is-visible" : ""}`}
        >
          <div className="mx-image-box mx-item mx-item--left" style={{ "--i": 0 }}>
            <img src={IMAGE_SRC} alt="KSD Homes architectural natural stone" loading="lazy" />
          </div>
        </div>

        <div
          ref={formRef}
          className={`mx-cell mx-form-cell ${formVisible ? "is-visible" : ""}`}
        >
          <h2 className="mx-heading mx-form-title mx-item" style={{ "--i": 0 }}>
            We&apos;d love to hear from you
          </h2>
          <p className="mx-form-text mx-item" style={{ "--i": 1 }}>
            For personalised assistance and to begin a complete KSD home, write to our Perth team.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mx-fields-grid">
              <div className="mx-field mx-item" style={{ "--i": 2 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name *"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="mx-field mx-item" style={{ "--i": 3 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="mx-field mx-item" style={{ "--i": 4 }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone or WhatsApp (e.g. +61 414 029 695)"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
              <div className="mx-field mx-item" style={{ "--i": 5 }}>
                <input
                  type="text"
                  name="scope"
                  placeholder="Project Scope (e.g. New Home, Interior Design, Renovation)"
                  value={form.scope}
                  onChange={handleChange}
                />
              </div>
              <div className="mx-field mx-field-full mx-item" style={{ "--i": 6 }}>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about the home you want to design and build... *"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mx-btn-wrap mx-item" style={{ "--i": 7 }}>
              <button type="submit" className="mx-btn" disabled={loading}>
                {loading ? "Sending Enquiry..." : "Submit Consultation Request"}
              </button>
            </div>
            {statusMsg && (
              <p
                className={`mx-status is-visible ${isSuccess ? "is-success" : "is-error"}`}
                role="status"
                style={{
                  marginTop: "16px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: isSuccess ? "#157A3C" : "#E53E3E",
                }}
              >
                {statusMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
