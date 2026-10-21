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
    beforeImage: IMG.elevFront,
    afterImage: IMG.dining,
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: [
      { image: IMG.elevFront, caption: "Before", text: "The house as drawn." },
      { image: IMG.dining, caption: "After", text: "Interior direction for gathering rooms." },
      { image: IMG.diningLight, caption: "Light", text: "Western Australian light across the main floor." },
      { image: IMG.livingOutlook, caption: "Outlook", text: "Indoor–outdoor living as one composition." },
      { image: IMG.bedroom, caption: "Rest", text: "Upper rooms for rest, ensuite and outlook." },
      { image: IMG.bathroomMarble, caption: "Wet areas", text: "Marble specified for floors and wet rooms." },
      { image: IMG.joinery, caption: "Joinery", text: "Joinery drawn with the plan." },
      { image: IMG.livingCalm, caption: "Living", text: "Calm rooms, considered with the house." },
      { image: IMG.bedroomWave, caption: "Bedroom", text: "Rest and light on the upper level." },
      { image: IMG.bathroom, caption: "Stone", text: "Material language for wet rooms." },
      { image: IMG.vanity, caption: "Detail", text: "Specified with the builder interior design." },
      { image: IMG.cinema, caption: "Cinema", text: "A quieter room in the composition." },
      { image: IMG.diningFormal, caption: "Formal dining", text: "Proportion and material, together." },
    ],
    heading: "A three-storey boutique home, composed as one",
    paragraphs: [
      "Residence is a three-storey boutique home — architecture and interiors specified together. Arrival, living and rest, each with a clear purpose.",
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
    beforeImage: IMG.livingCalm,
    afterImage: IMG.livingOutlook,
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: [
      { image: IMG.livingCalm, caption: "Before", text: "The brief — calm rooms as the concept starts." },
      { image: IMG.livingOutlook, caption: "After", text: "Outlook and light as the home takes form." },
      { image: IMG.bedroomTimber, caption: "Rest", text: "Bedroom language for the upcoming home." },
      { image: IMG.diningLight, caption: "Dining", text: "Gathering rooms as the concept takes form." },
      { image: IMG.bedroomWarm, caption: "Bedroom", text: "Warm rooms for rest and outlook." },
      { image: IMG.bathroomModern, caption: "Wet areas", text: "Material direction for wet rooms." },
      { image: IMG.joinery, caption: "Joinery", text: "Joinery specified with the plan." },
      { image: IMG.cinema, caption: "Cinema", text: "A quieter room in the composition." },
      { image: IMG.vanity, caption: "Detail", text: "Details as the drawings resolve." },
    ],
    heading: "An upcoming boutique home on the Western Australian coast",
    paragraphs: [
      "Port Coogee Residence is an upcoming three-storey home — licensed builder and interior design under one roof. Drawings are in development.",
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
    beforeImage: pickImage(siteImage(p.beforeImage), fallback.beforeImage),
    afterImage: pickImage(siteImage(p.afterImage), imageA, fallback.afterImage),
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
