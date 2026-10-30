import { Fragment, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

// Uses the widescreen architectural hero banner
const DEFAULT_BG = "/Image/banners/hero/hero-banner-01.jpg";

const formatSegment = (segment) => {
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    decoded = segment;
  }
  return decoded
    .replace(/\.(html?|php)$/i, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

function ChevronsRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m2.5 3 5 5-5 5" />
      <path d="m8.5 3 5 5-5 5" />
    </svg>
  );
}

function Breadcrumb({ title, image = DEFAULT_BG, labels = {}, homeLabel = "Home" }) {
  const { pathname } = useLocation();

  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => ({
      key: `${segment}-${index}`,
      label: labels[segment] || formatSegment(segment),
      path: `/${segments.slice(0, index + 1).join("/")}`,
    }));
  }, [pathname, labels]);

  const heading = title || (crumbs.length ? crumbs[crumbs.length - 1].label : homeLabel);

  return (
    <section className="breadcumb-section">
      <div
        className="breadcumb-wrapper"
        style={{ "--breadcumb-bg": `url("${image}")` }}
      >
        <div className="breadcumb-container">
          <div className="breadcumb-content" key={pathname}>
            <h1 className="breadcumb-title">{heading}</h1>
            <nav aria-label="Breadcrumb">
              <ul className="breadcumb-menu">
                <li>
                  {crumbs.length ? (
                    <Link to="/">{homeLabel}</Link>
                  ) : (
                    <span className="active" aria-current="page">
                      {homeLabel}
                    </span>
                  )}
                </li>
                {crumbs.map((crumb, index) => {
                  const isLast = index === crumbs.length - 1;
                  return (
                    <Fragment key={crumb.key}>
                      <li className="breadcumb-separator" aria-hidden="true">
                        <ChevronsRight />
                      </li>
                      <li>
                        {isLast ? (
                          <span className="active" aria-current="page">
                            {crumb.label}
                          </span>
                        ) : (
                          <Link to={crumb.path}>{crumb.label}</Link>
                        )}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb;