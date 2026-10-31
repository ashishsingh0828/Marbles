import { paras, lines, pairs, siteImage } from "../api";
import { IMG } from "./images";

/* ==================================================================
   SITE RULES – edit these three lists, nothing else is needed.
   ================================================================== */

/* Any word listed here is removed from every text field of every project
   (client surnames, suppliers, fabricators, brands). Add more as needed. */
const BLOCKED_TERMS = ["sharma"];

/* Street-name-only titles. Leave "" to keep the current title.
   Example:  residence: "Ocean Drive"  */
const STREET_TITLES = {
  residence: "",
  "port-coogee-residence": "",
};

/* Projects that show ONLY the front and back site photos
   (no extra renders, interiors, plans or gallery photos). */
const ELEVATION_ONLY = new Set(["residence"]);

const SLUG_ALIASES = { "sharma-residence": "residence" };

/* ------------------------------------------------------------------ */

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const BLOCK_RE = BLOCKED_TERMS.length
  ? new RegExp(BLOCKED_TERMS.map(esc).join("|"), "gi")
  : null;

/* removes blocked names and turns every "Upcoming" into "Ongoing" */
export function cleanText(value = "") {
  let t = String(value ?? "");
  if (BLOCK_RE) t = t.replace(BLOCK_RE, "");
  t = t.replace(/\bupcoming\b/gi, (m) => (m[0] === "U" ? "Ongoing" : "ongoing"));
  return t.replace(/\s{2,}/g, " ").replace(/\s+([,.;:])/g, "$1").trim();
}

/* same file = same key, whatever the folder, case or ?query */
export function imgKey(src = "") {
  return String(src || "").split("?")[0].split("#")[0].split("/").pop().toLowerCase();
}

/* indoor / outdoor: explicit tag wins, otherwise judged by the caption only */
const OUTDOOR_CAPTION = /elevation|facade|façade|exterior|outdoor|alfresco|pool|courtyard|landscap|garden|terrace|front|rear|back/i;
export function spaceOf(item = {}) {
  const tag = String(item.space || "").toLowerCase();
  if (tag === "indoor" || tag === "outdoor") return tag;
  return OUTDOOR_CAPTION.test(String(item.caption || "")) ? "outdoor" : "indoor";
}

/* admin lines can end with "| indoor" or "| outdoor" – no backend change needed */
function splitSpace(text = "") {
  const m = String(text).match(/\|\s*(indoor|outdoor)\s*$/i);
  return m
    ? { text: String(text).slice(0, m.index).trim(), space: m[1].toLowerCase() }
    : { text: String(text), space: "" };
}

const FRONT_TEXT = "The street elevation: rendered masonry planes, deep eaves and a composed arrival sequence.";
const BACK_TEXT = "The rear elevation, where the home opens to its garden and outdoor living.";

function elevationScenes(front, back, frontText = "", backText = "") {
  return [
    front && {
      image: front,
      caption: "Front elevation",
      text: frontText || FRONT_TEXT,
      dimensions: "Front elevation",
      features: ["Rendered masonry planes", "Deep eaves", "Composed entry"],
      space: "outdoor",
    },
    back && {
      image: back,
      caption: "Back elevation",
      text: backText || BACK_TEXT,
      dimensions: "Rear elevation",
      features: ["Rear facade", "Outdoor living", "Garden aspect"],
      space: "outdoor",
    },
  ].filter(Boolean);
}

export const FALLBACK_HOMES = [
  {
    slug: "residence",
    title: "Residence",
    suburb: "Residence",
    shortCode: "",
    featured: true,
    category: "Three-Storey Boutique Home",
    status: "In Delivery",
    collection: "Residence",
    year: "2026",
    scope: "Build + Interior",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "The beauty of indoor-outdoor living",
    planLabels: [],
    storeys: "3",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "Three storeys · Pool & alfresco · Marble floors",
    image: IMG.elevFront,
    heroImage: IMG.elevFront,
    image2: "",
    image3: "",
    image4: "",
    beforeImage: IMG.elevFront,
    /* set IMG.elevBack in data/images.js to your real back-elevation photo */
    afterImage: IMG.elevBack || "",
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: elevationScenes(IMG.elevFront, IMG.elevBack || ""),
    heading: "A three-storey boutique home, composed as one",
    paragraphs: [
      "Residence is a three-storey boutique home, with architecture and interiors specified together. Arrival, living and rest, each with a clear purpose.",
    ],
    challengeTitle: "Builder interior design, composed as one",
    challengeText:
      "The brief was a high-performing, comfortable family home with a personal touch: prayer space, guest rooms, master suite, pool and alfresco living, without treating any of these as add-ons. Our licensed builder and interior design team planned the house as a single environment.",
    checks: [
      "Three storeys: undercroft, ground and upper living",
      "Marble main floors with onyx stair and lift core",
      "Alfresco, pool and hardstand for indoor–outdoor living",
      "Dedicated mandir and guest accommodation",
      "Complete home solution: builder interior design and finishes",
    ],
    resultTitle: "The composition of the home",
    resultText:
      "A boutique Western Australian residence where form, function, proportion and material work together. Presented as a private family home, designed for how they live today and tomorrow.",
    banners: [],
  },
  {
    slug: "port-coogee-residence",
    title: "Port Coogee Residence",
    suburb: "Port Coogee",
    shortCode: "",
    featured: true,
    category: "Ongoing · Conceptual design",
    status: "Ongoing",
    collection: "Ongoing",
    year: "2026",
    scope: "Ongoing",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "Conceptual design of an ongoing home",
    planLabels: [],
    storeys: "3",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "Ongoing · Conceptual design & drawings",
    image: IMG.livingOutlook,
    heroImage: IMG.livingOutlook,
    image2: "",
    image3: "",
    image4: "",
    beforeImage: IMG.livingCalm,
    afterImage: IMG.livingOutlook,
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: [
      {
        image: IMG.livingCalm,
        caption: "Brief",
        text: "The first rooms are drawn as calm volumes: low contrast, garden aspect and space for a family to settle on the coast.",
        dimensions: "Concept living",
        features: ["Garden aspect", "Low-contrast palette", "Settled volumes"],
        space: "indoor",
      },
      {
        image: IMG.livingOutlook,
        caption: "Outlook",
        text: "Outlook and light set the plan: living opens toward the water and the terrace, not a corridor of leftover rooms.",
        dimensions: "8.0 × 5.4 m",
        features: ["Coastal outlook", "Terrace living", "Full-height glass"],
        space: "indoor",
      },
      {
        image: IMG.bedroomTimber,
        caption: "Rest",
        text: "Bedroom language for the ongoing home: timber lining, a quieter palette and morning light from the east.",
        dimensions: "4.5 × 4.1 m",
        features: ["Timber lining", "East light", "Quiet palette"],
        space: "indoor",
      },
      {
        image: IMG.diningLight,
        caption: "Dining",
        text: "A gathering room planned around a long table, with western light and a clear line to outdoor dining.",
        dimensions: "6.2 × 4.6 m",
        features: ["Long dining table", "Western light", "Outdoor alignment"],
        space: "indoor",
      },
      {
        image: IMG.bedroomWarm,
        caption: "Bedroom",
        text: "Warm plaster, soft textiles and a garden window so the upper rooms feel private without shutting out the coast.",
        dimensions: "4.3 × 3.9 m",
        features: ["Warm plaster", "Garden window", "Soft textiles"],
        space: "indoor",
      },
      {
        image: IMG.bathroomModern,
        caption: "Wet areas",
        text: "Stone, timber and a walk-in shower specified as one wet-room language, ready for the drawings to lock in.",
        dimensions: "3.6 × 2.5 m",
        features: ["Stone wet rooms", "Walk-in shower", "Timber lining"],
        space: "indoor",
      },
      {
        image: IMG.joinery,
        caption: "Joinery",
        text: "Joinery is specified with the plan so kitchens and robes sit in the architecture, not as later furniture.",
        dimensions: "6.8 × 3.2 m",
        features: ["Integrated kitchen", "Handleless fronts", "Stone bench"],
        space: "indoor",
      },
      {
        image: IMG.cinema,
        caption: "Cinema",
        text: "A dark, acoustically lined room with recliner seating and concealed lighting for weekend films.",
        dimensions: "5.0 × 4.4 m",
        features: ["Acoustic lining", "Concealed lighting", "Recliner seating"],
        space: "indoor",
      },
      {
        image: IMG.vanity,
        caption: "Detail",
        text: "Vanity, hardware and stone resolve together as the drawings tighten, with the same care as a finished KSD home.",
        dimensions: "Vanity detail",
        features: ["Custom vanity", "Specified hardware", "Stone splashback"],
        space: "indoor",
      },
    ],
    heading: "An ongoing boutique home on the Western Australian coast",
    paragraphs: [
      "Port Coogee Residence is an ongoing three-storey home, with a licensed builder and interior design under one roof. Drawings are in development.",
    ],
    challengeTitle: "Designed for the way they will live",
    challengeText:
      "An ongoing coastal site asks for a home that feels private, calm and connected to outdoor living. Our approach is the same as every KSD commission: a personal brief, builder interior design, and a customer-centred process.",
    checks: [
      "Ongoing three-storey boutique home",
      "Western Australia: Port Coogee",
      "Conceptual design and drawings in development",
      "Licensed builder for high-end boutique homes",
      "Client address remains private",
    ],
    resultTitle: "A home still taking form",
    resultText:
      "Port Coogee Residence is in the studio now. It will be delivered as a complete KSD home: architecture, builder interior design, and the way the family experience the space.",
    banners: [],
  },
];

const pickImage = (...candidates) => candidates.find(Boolean) || "";

const WEAK_COPY = /quieter room in the composition|as drawn\.?$|interior direction|as the concept|considered with the house|specified with the builder|material language for wet rooms|proportion and material|together\.?$/i;

function isWeakCopy(text = "") {
  const t = String(text).trim();
  return !t || t.length < 36 || WEAK_COPY.test(t);
}

function sceneFromFallback(fallbackScene = {}, image, caption, text) {
  return {
    image: image || fallbackScene.image || "",
    caption: caption || fallbackScene.caption || "",
    text: isWeakCopy(text) ? (fallbackScene.text || text || "") : text,
    dimensions: fallbackScene.dimensions || "",
    features: Array.isArray(fallbackScene.features) ? fallbackScene.features : [],
    space: "",
  };
}

function displaySlug(slug = "") {
  return SLUG_ALIASES[slug] || slug;
}

export function mapHome(p = {}, idx = 0) {
  const rawSlug = displaySlug(p.slug || "");
  const idxFromSlug = FALLBACK_HOMES.findIndex((h) => h.slug === rawSlug);
  const fallback = FALLBACK_HOMES[idxFromSlug >= 0 ? idxFromSlug : (idx % FALLBACK_HOMES.length)];
  const slugKey = rawSlug || fallback.slug;
  /* front/back-only mode: by slug above, OR by the "Show only front and back photos"
     switch in admin (so it still works if the project title/slug is changed) */
  const elevOnly = ELEVATION_ONLY.has(slugKey) || p.frontBackOnly === true || p.frontBackOnly === "true";

  const imageA = siteImage(p.imageA);
  const imageB = siteImage(p.imageB);
  const hero = siteImage(p.heroImage);
  const planA = siteImage(p.floorPlanA);
  const planB = siteImage(p.floorPlanB);
  const planC = siteImage(p.floorPlanC);
  const gallery = ["galleryA", "galleryB", "galleryC", "galleryD", "galleryE", "galleryF", "galleryG", "galleryH"]
    .map((key) => siteImage(p[key]))
    .filter(Boolean);

  const front = pickImage(siteImage(p.beforeImage), fallback.beforeImage);
  const back = elevOnly
    ? pickImage(siteImage(p.afterImage), fallback.afterImage)
    : pickImage(siteImage(p.afterImage), imageA, fallback.afterImage);

  const scenePairs = p.scenes ? pairs(p.scenes) : [];
  let scenes;
  if (elevOnly) {
    scenes = elevationScenes(front, back, cleanText(p.beforeText), cleanText(p.afterText));
  } else if (scenePairs.length) {
    scenes = scenePairs.map(([caption, text], i) => {
      const s = splitSpace(text);
      return { ...sceneFromFallback(fallback.scenes?.[i], gallery[i] || fallback.scenes?.[i]?.image || fallback.image, caption, s.text), space: s.space };
    });
  } else if (gallery.length) {
    scenes = gallery.map((image, i) => sceneFromFallback(fallback.scenes?.[i], image));
  } else {
    scenes = (fallback.scenes || []).map((scene) => ({ ...sceneFromFallback(scene, scene.image), space: scene.space || "" }));
  }
  scenes = scenes.map((s) => ({
    ...s,
    caption: cleanText(s.caption),
    text: cleanText(s.text),
    dimensions: cleanText(s.dimensions),
    features: (s.features || []).map(cleanText).filter(Boolean),
  }));

  const storeys = p.storeys || fallback.storeys || "";
  const category = cleanText(p.category || p.projectType || fallback.category);
  const status = cleanText(p.status || p.date || fallback.status);
  const location = cleanText(p.location || fallback.location);
  const title = STREET_TITLES[slugKey] || cleanText(p.title) || fallback.title;

  return {
    id: p._id || rawSlug || fallback.slug,
    slug: rawSlug || fallback.slug,
    title,
    suburb: STREET_TITLES[slugKey] || cleanText(p.suburb || fallback.suburb) || title,
    shortCode: p.shortCode || fallback.shortCode || "",
    featured: p.featured !== undefined ? !!p.featured : (fallback.featured !== false),
    collection: cleanText(p.collection || fallback.collection || status),
    year: p.year || p.date || fallback.year || "2026",
    scope: cleanText(p.scope || fallback.scope || ""),
    planLabels: p.planLabels
      ? lines(p.planLabels)
      : (fallback.planLabels || ["Ground", "Upper", "Undercroft"]),
    category,
    status,
    location,
    client: "Private residence",
    conceptHeadline: cleanText(p.conceptHeadline || fallback.conceptHeadline),
    storeys,
    beds: p.beds || "",
    baths: p.baths || "",
    cars: p.cars || "",
    floorArea: cleanText(p.floorArea || fallback.floorArea || ""),
    specLine: cleanText(
      p.specLine ||
      [storeys && `${storeys} storey${String(storeys) === "1" ? "" : "s"}`, category, status]
        .filter(Boolean)
        .join(" · ")
    ),
    image: elevOnly ? pickImage(front, fallback.image) : pickImage(imageA, hero, fallback.image),
    heroImage: elevOnly ? pickImage(front, fallback.heroImage) : pickImage(hero, imageA, fallback.heroImage),
    image2: elevOnly ? "" : pickImage(planA, imageB, fallback.image2),
    image3: elevOnly ? "" : pickImage(planB, fallback.image3),
    image4: elevOnly ? "" : pickImage(planC, fallback.image4),
    gallery: elevOnly
      ? [front, back].filter(Boolean)
      : (gallery.length ? gallery : (fallback.scenes || []).map((s) => s.image)),
    scenes,
    videoUrl: p.videoUrl || fallback.videoUrl || "",
    videoAfter: Number(p.videoAfter) || Number(fallback.videoAfter) || 0,
    videoHeading: cleanText(p.videoHeading || fallback.videoHeading || ""),
    videoText: cleanText(p.videoText || fallback.videoText || ""),
    beforeImage: front,
    afterImage: back,
    beforeText: cleanText(p.beforeText || ""),
    afterText: cleanText(p.afterText || ""),
    elevationsOnly: elevOnly,
    heading: cleanText(p.heading || p.subtitle || fallback.heading),
    paragraphs: (p.paragraphs ? paras(p.paragraphs) : fallback.paragraphs).map(cleanText),
    challengeTitle: cleanText(p.factsTitle || fallback.challengeTitle),
    challengeText: cleanText(p.factsText || fallback.challengeText),
    checks: (p.checks ? lines(p.checks) : fallback.checks).map(cleanText).filter(Boolean),
    overlayCaption: cleanText(p.overlayCaption || fallback.overlayCaption || ""),
    resultTitle: cleanText(p.resultTitle || fallback.resultTitle),
    resultText: cleanText(p.result || p.resultText || fallback.resultText),
    banners: [
      { src: siteImage(p.bannerA), after: Number(p.bannerAfterA) || 3 },
      { src: siteImage(p.bannerB), after: Number(p.bannerAfterB) || 6 },
      { src: siteImage(p.bannerC), after: Number(p.bannerAfterC) || 9 },
    ].filter((banner) => banner.src),
  };
}

export function mergeHomes(apiList) {
  const fromApi = Array.isArray(apiList) && apiList.length
    ? apiList.map((item, idx) => mapHome(item, idx))
    : [];
  const seen = new Set();
  const homes = [];
  FALLBACK_HOMES.forEach((home, i) => {
    const apiHit = fromApi.find((item) => item.slug === home.slug);
    homes.push(apiHit || mapHome({ slug: home.slug }, i));
    seen.add(home.slug);
  });
  fromApi.forEach((item) => {
    if (item.slug && !seen.has(item.slug)) {
      homes.push(item);
      seen.add(item.slug);
    }
  });
  return homes;
}

export function homeBySlug(slug, apiItem) {
  const resolved = displaySlug(slug);
  const idx = FALLBACK_HOMES.findIndex((h) => h.slug === resolved);
  /* Only merge API data when it matches this slug — avoids showing the previous project while navigating. */
  const apiSlug = apiItem?.slug ? displaySlug(apiItem.slug) : "";
  if (apiItem && apiSlug && apiSlug === resolved) {
    return mapHome({ ...apiItem, slug: resolved }, idx >= 0 ? idx : 0);
  }
  return mapHome({ slug: idx >= 0 ? resolved : "" }, idx >= 0 ? idx : 0);
}

export function specsOf(home) {
  return [
    home.storeys && { label: "Storeys", value: home.storeys },
    home.beds && { label: "Beds", value: home.beds },
    home.baths && { label: "Baths", value: home.baths },
    home.cars && { label: "Cars", value: home.cars },
    home.floorArea && { label: "Composition", value: home.floorArea },
    home.category && { label: "Type", value: home.category },
    home.status && { label: "Status", value: home.status },
    home.location && { label: "Region", value: home.location },
  ].filter(Boolean);
}