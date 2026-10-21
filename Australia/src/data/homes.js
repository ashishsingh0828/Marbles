import { paras, lines, pairs, siteImage } from "../api";
import { IMG } from "./images";

const PLAN = {
  ground: IMG.planGround,
  upper: IMG.planUpper,
  under: IMG.planUnder,
};
const SLUG_ALIASES = { "sharma-residence": "residence" };

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
    planLabels: ["Ground", "Upper", "Undercroft"],
    storeys: "3",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "Marble main floors · 210 sqm ground",
    specLine: "Three storeys · Pool & alfresco · Marble floors",
    image: IMG.dining,
    heroImage: IMG.dining,
    image2: PLAN.ground,
    image3: PLAN.upper,
    image4: PLAN.under,
    videoUrl: "",
    videoHeading: "Walk through the composition",
    videoText: "A film of this residence will sit here once photography is complete. Until then, the drawings below are the true record of the home.",
    scenes: [
      { image: PLAN.ground, caption: "Ground floor plan", text: "Daily life gathers around a 210 sqm marble main floor, a 45 sqm marble entrance, and a 90 sqm colour-concrete alfresco opening to a 32 sqm pool." },
      { image: PLAN.upper, caption: "Upper floor plan", text: "An 180 sqm marble main floor includes a 15 sqm marble mandir, ensuites and balconies — rest, prayer and outlook on one level." },
      { image: PLAN.under, caption: "Undercroft plan", text: "Store, cellar, support spaces and pool plant below, connected by a 30 sqm onyx staircase and lift." },
      { image: IMG.dining, caption: "Interior direction — dining", text: "Builder interior design direction for gathering rooms. These interiors are studio references, not finished photography of this house." },
      { image: IMG.bedroom, caption: "Interior direction — rest", text: "Upper-level rooms are planned for rest, ensuite and outlook, with joinery and light specified with the architecture." },
      { image: IMG.bathroomMarble, caption: "Interior direction — marble wet areas", text: "Marble is specified on the plans for main floors and wet rooms. This is the material language, not a photograph of the completed ensuite." },
    ],
    heading: "A three-storey boutique home composed as one complete living environment",
    paragraphs: [
      "Residence is a three-storey boutique home designed as a complete composition — architecture, builder interior design, materials and how the family lives, considered together. Every level has a clear purpose: arrival, living, and rest.",
      "The ground floor gathers daily life around a 210 sqm marble main floor, a 45 sqm marble entrance, and a 90 sqm colour-concrete alfresco opening to a 32 sqm pool. A 30 sqm onyx staircase and lift connect the home vertically, so movement through the house feels calm and continuous.",
      "We do not publish the client’s street address. The drawings here are the project: pool, alfresco, marble floors, mandir and undercroft, resolved as one private family home.",
    ],
    challengeTitle: "Builder interior design, composed as one",
    challengeText:
      "The brief was a high-performing, comfortable family home with a personal touch: prayer space, guest rooms, master suite, pool and alfresco living, without treating any of these as add-ons. Our licensed builder and interior design team planned the house as a single environment.",
    checks: [
      "Three storeys: undercroft, ground and upper living",
      "Marble main floors with onyx stair and lift core",
      "Alfresco, pool and hardstand for indoor–outdoor living",
      "Dedicated mandir and guest accommodation",
      "Complete home solution — builder interior design and finishes",
    ],
    resultTitle: "The composition of the home",
    resultText:
      "A boutique Western Australian residence where form, function, proportion and material work together. Presented as a private family home — designed for how they live today and tomorrow.",
  },
  {
    slug: "port-coogee-residence",
    title: "Port Coogee Residence",
    suburb: "Port Coogee",
    shortCode: "",
    featured: true,
    category: "Upcoming · Conceptual design",
    status: "Upcoming",
    collection: "Upcoming",
    year: "2026",
    scope: "Upcoming",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "Conceptual design of an upcoming home",
    planLabels: [],
    storeys: "3",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "Upcoming · Conceptual design & drawings",
    image: IMG.livingOutlook,
    heroImage: IMG.livingOutlook,
    image2: "",
    image3: "",
    image4: "",
    videoUrl: "",
    videoHeading: "Drawings as the home takes form",
    videoText: "Port Coogee is in concept. We will publish this home’s own drawing set as it is resolved — plans that belong to this project, not another.",
    scenes: [
      { image: IMG.livingOutlook, caption: "Conceptual outlook", text: "Light, proportion and indoor–outdoor living for a coastal Western Australian site. Drawings are in development with our builder interior design team." },
      { image: IMG.livingCalm, caption: "Conceptual living", text: "Calm rooms and Western Australian light, composed as one with the architecture." },
      { image: IMG.bedroomTimber, caption: "Conceptual rest", text: "Bedroom language for the upcoming home — studio direction, not a finished photograph of this site." },
    ],
    heading: "An upcoming three-storey boutique home on the Western Australian coast",
    paragraphs: [
      "Port Coogee Residence is an upcoming KSD Homes commission in Western Australia — a three-storey boutique home conceived with the same combined visionary: licensed builder and interior design under one roof.",
      "The project is in conceptual design. Drawings, interiors and specification are in development with our Perth team. We will share this home as a finished composition when it is ready — without publishing the client’s address.",
      "Until then, the page is honest about where the work sits: an upcoming coastal residence, designed for light, privacy and indoor–outdoor living.",
    ],
    challengeTitle: "Designed for the way they will live",
    challengeText:
      "An upcoming coastal site asks for a home that feels private, calm and connected to outdoor living. Our approach is the same as every KSD commission: a personal brief, builder interior design, and a customer-centred process.",
    checks: [
      "Upcoming three-storey boutique home",
      "Western Australia — Port Coogee",
      "Conceptual design and drawings in development",
      "Licensed builder for high-end boutique homes",
      "Client address remains private",
    ],
    resultTitle: "A home still taking form",
    resultText:
      "Port Coogee Residence is in the studio now. It will be delivered as a complete KSD home: architecture, builder interior design, and the way the family experience the space.",
  },
];

const pickImage = (...candidates) => candidates.find(Boolean) || "";

function displayTitle(title = "") {
  return /sharma/i.test(title) ? "Residence" : title;
}

function displaySlug(slug = "") {
  return SLUG_ALIASES[slug] || slug;
}

export function mapHome(p = {}, idx = 0) {
  const rawSlug = displaySlug(p.slug || "");
  const idxFromSlug = FALLBACK_HOMES.findIndex((h) => h.slug === rawSlug);
  const fallback = FALLBACK_HOMES[idxFromSlug >= 0 ? idxFromSlug : (idx % FALLBACK_HOMES.length)];
  const imageA = siteImage(p.imageA);
  const imageB = siteImage(p.imageB);
  const hero = siteImage(p.heroImage);
  const planA = siteImage(p.floorPlanA);
  const planB = siteImage(p.floorPlanB);
  const planC = siteImage(p.floorPlanC);
  const gallery = ["galleryA", "galleryB", "galleryC", "galleryD", "galleryE", "galleryF", "galleryG", "galleryH"]
    .map((key) => siteImage(p[key]))
    .filter(Boolean);
  const scenePairs = p.scenes ? pairs(p.scenes) : [];
  const scenes = scenePairs.length
    ? scenePairs.map(([caption, text], i) => ({
      caption,
      text,
      image: gallery[i] || fallback.scenes?.[i]?.image || fallback.image,
    }))
    : (gallery.length
      ? gallery.map((image, i) => ({ image, caption: fallback.scenes?.[i]?.caption || "", text: fallback.scenes?.[i]?.text || "" }))
      : fallback.scenes || []);

  const storeys = p.storeys || fallback.storeys || "";
  const category = p.category || p.projectType || fallback.category;
  const status = p.status || p.date || fallback.status;
  const location = p.location || fallback.location;

  return {
    id: p._id || p.slug || fallback.slug,
    slug: rawSlug || fallback.slug,
    title: displayTitle(p.title || fallback.title),
    suburb: p.suburb || fallback.suburb || displayTitle(p.title || fallback.title),
    shortCode: p.shortCode || fallback.shortCode || "",
    featured: p.featured !== undefined ? !!p.featured : (fallback.featured !== false),
    collection: p.collection || fallback.collection || status,
    year: p.year || p.date || fallback.year || "2026",
    scope: p.scope || fallback.scope || "",
    planLabels: p.planLabels
      ? lines(p.planLabels)
      : (fallback.planLabels || ["Ground", "Upper", "Undercroft"]),
    category,
    status,
    location,
    client: p.client || "Private residence",
    conceptHeadline: p.conceptHeadline || fallback.conceptHeadline,
    storeys,
    beds: p.beds || "",
    baths: p.baths || "",
    cars: p.cars || "",
    floorArea: p.floorArea || fallback.floorArea || "",
    specLine:
      p.specLine ||
      [storeys && `${storeys} storey${String(storeys) === "1" ? "" : "s"}`, category, status]
        .filter(Boolean)
        .join(" · "),
    image: pickImage(imageA, hero, fallback.image),
    heroImage: pickImage(hero, imageA, fallback.heroImage),
    image2: pickImage(planA, imageB, fallback.image2),
    image3: pickImage(planB, fallback.image3),
    image4: pickImage(planC, fallback.image4),
    gallery: gallery.length ? gallery : (fallback.scenes || []).map((s) => s.image),
    scenes,
    videoUrl: p.videoUrl || fallback.videoUrl || "",
    videoHeading: p.videoHeading || fallback.videoHeading || "",
    videoText: p.videoText || fallback.videoText || "",
    heading: p.heading || p.subtitle || fallback.heading,
    paragraphs: p.paragraphs ? paras(p.paragraphs) : fallback.paragraphs,
    challengeTitle: p.factsTitle || fallback.challengeTitle,
    challengeText: p.factsText || fallback.challengeText,
    checks: p.checks ? lines(p.checks) : fallback.checks,
    overlayCaption: p.overlayCaption || fallback.overlayCaption || "",
    resultTitle: p.resultTitle || fallback.resultTitle,
    resultText: p.result || p.resultText || fallback.resultText,
  };
}

export function mergeHomes(apiList) {
  const fromApi = Array.isArray(apiList) && apiList.length
    ? apiList.map((item, idx) => mapHome(item, idx))
    : [];
  const seen = new Set();
  const homes = [];
  FALLBACK_HOMES.forEach((home) => {
    const apiHit = fromApi.find((item) => item.slug === home.slug);
    homes.push(apiHit || home);
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
  if (apiItem) return mapHome({ ...apiItem, slug: resolved, title: displayTitle(apiItem.title) }, idx >= 0 ? idx : 0);
  return FALLBACK_HOMES[idx] || FALLBACK_HOMES[0];
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
