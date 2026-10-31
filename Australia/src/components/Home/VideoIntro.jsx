import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./VideoIntro.css";

const VIDEO_URL = "";

const HEADING = "Ready To Design The Way You Experience Your Home";

function toEmbed(url) {
  try {
    const u = new URL(url, window.location.origin);
    const host = u.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return { type: "iframe", src: `https://www.youtube.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0` };
    }

    if (host.endsWith("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        return { type: "iframe", src: `${u.origin}${u.pathname}?autoplay=1&rel=0` };
      }
      const id = u.searchParams.get("v");
      if (id) {
        return { type: "iframe", src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` };
      }
    }

    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return { type: "iframe", src: `https://player.vimeo.com/video/${id}?autoplay=1` };
    }

    if (host === "player.vimeo.com") {
      return { type: "iframe", src: `${u.origin}${u.pathname}?autoplay=1` };
    }
  } catch (e) {
    return { type: "video", src: url };
  }

  return { type: "video", src: url };
}

function VideoModal({ url, onClose }) {
  const closeRef = useRef(null);
  const media = toEmbed(url);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    if (closeRef.current) closeRef.current.focus();

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="vi-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Introduction video"
      onClick={onClose}
    >
      <div className="vi-modal__box" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className="vi-modal__close"
          onClick={onClose}
          aria-label="Close video"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>

        {media.type === "iframe" ? (
          <iframe
            src={media.src}
            title="Introduction video"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video src={media.src} controls autoPlay playsInline />
        )}
      </div>
    </div>
  );
}

function AnimatedHeading({ text }) {
  let count = 0;

  return (
    <h2 id="vi-heading" className="vi__title" aria-label={text}>
      <span aria-hidden="true">
        {text.split(" ").map((word, wi) => (
          <React.Fragment key={`${word}-${wi}`}>
            {wi > 0 && " "}
            <span className="vi__word">
              {word.split("").map((ch, ci) => {
                const delay = 0.45 + count * 0.025;
                count += 1;
                return (
                  <span
                    key={ci}
                    className="vi__letter"
                    style={{ transitionDelay: `${delay}s` }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          </React.Fragment>
        ))}
      </span>
    </h2>
  );
}

export default function VideoIntro({
  videoUrl = VIDEO_URL,
  image = "/images/ksd-stone-07.jpg",
}) {
  const sectionRef = useRef(null);
  const playRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
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
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const closeVideo = useCallback(() => {
      setOpen(false);
    if (playRef.current) playRef.current.focus();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`vi ${visible ? "is-visible" : ""}`}
      aria-labelledby="vi-heading"
    >
      <div className="vi__bg" aria-hidden="true">
        <img src={image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="vi__shade" aria-hidden="true" />

      <div className="vi__inner">
        {videoUrl && (
          <div className="vi__play-wrap vi__pop" style={{ "--d": "0.2s" }}>
            <span className="vi__pulse" aria-hidden="true" />
            <span className="vi__pulse vi__pulse--2" aria-hidden="true" />
        <button
          ref={playRef}
          type="button"
              className="vi__play"
          onClick={() => setOpen(true)}
              aria-label="Play KSD Homes introduction video"
          aria-haspopup="dialog"
        >
              <span className="vi__sq vi__sq--1" />
              <span className="vi__sq vi__sq--2" />
              <span className="vi__sq vi__sq--core">
                <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
                  <path d="M1.5 1.2v13.6a.6.6 0 0 0 .9.5l11-6.8a.6.6 0 0 0 0-1L2.4.7a.6.6 0 0 0-.9.5Z" fill="currentColor" />
          </svg>
              </span>
            </button>
          </div>
        )}

        <AnimatedHeading text={HEADING} />

        <p className="vi__sub vi__rise" style={{ "--d": "1.5s" }}>
          Start Your Project Today
        </p>

        <div className="vi__cta vi__rise" style={{ "--d": "1.7s" }}>
          <Link to="/contact" className="vi__btn">
            <span>Book Consultation</span>
            <span className="vi__btn-divider" aria-hidden="true" />
            <svg width="30" height="16" viewBox="0 0 41 26" fill="none" aria-hidden="true">
              <path d="M40.7071 13.7071C41.0976 13.3166 41.0976 12.6834 40.7071 12.2929L34.3431 5.92893C33.9526 5.53841 33.3195 5.53841 32.9289 5.92893C32.5384 6.31946 32.5384 6.95262 32.9289 7.34315L38.5858 13L32.9289 18.6569C32.5384 19.0474 32.5384 19.6805 32.9289 20.0711C33.3195 20.4616 33.9526 20.4616 34.3431 20.0711L40.7071 13.7071ZM0 14H40V12H0V14Z" fill="currentColor" />
            </svg>
          </Link>
        </div>
      </div>

      {open && videoUrl && <VideoModal url={videoUrl} onClose={closeVideo} />}
    </section>
  );
}