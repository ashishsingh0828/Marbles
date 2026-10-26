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
      {
        image: IMG.elevFront,
        caption: "Elevation",
        text: "The street elevation as drawn: rendered masonry planes, deep eaves and a composed arrival sequence.",
        dimensions: "Front elevation",
        features: ["Rendered masonry planes", "Deep eaves", "Composed entry"],
      },
      {
        image: IMG.dining,
        caption: "Dining",
        text: "A long dining table on marble floors, set for family gatherings and lit from the western court.",
        dimensions: "6.4 × 4.8 m",
        features: ["Marble main floors", "Western court light", "Family dining table"],
      },
      {
        image: IMG.diningLight,
        caption: "Light",
        text: "Western Australian light washes the main floor through full-height glazing, changing the rooms through the day.",
        dimensions: "Ground living",
        features: ["Full-height glazing", "Cross-ventilation", "Stone floors"],
      },
      {
        image: IMG.livingOutlook,
        caption: "Outlook",
        text: "Retractable glazing opens living to the pool terrace so indoor and outdoor rooms read as one.",
        dimensions: "8.2 × 5.6 m",
        features: ["Retractable glazing", "Pool terrace", "Alfresco dining"],
      },
      {
        image: IMG.bedroom,
        caption: "Rest",
        text: "Upper rooms for rest, ensuite and a quiet garden outlook, specified with the same material language as the floors below.",
        dimensions: "4.6 × 4.2 m",
        features: ["Ensuite suite", "Garden outlook", "Soft timber joinery"],
      },
      {
        image: IMG.bathroomMarble,
        caption: "Wet areas",
        text: "Book-matched marble carries through floors and wet rooms so the bathrooms feel part of the house, not added later.",
        dimensions: "3.8 × 2.6 m",
        features: ["Book-matched marble", "Walk-in shower", "Heated floors"],
      },
      {
        image: IMG.joinery,
        caption: "Joinery",
        text: "Kitchen joinery is drawn with the plan, hiding services behind calm, handleless fronts and a stone bench.",
        dimensions: "7.2 × 3.4 m",
        features: ["Integrated appliances", "Stone benchtop", "Handleless fronts"],
      },
      {
        image: IMG.livingCalm,
        caption: "Living",
        text: "A quieter living room with acoustic lining and a fireplace recess, planned with the house rather than furnished after.",
        dimensions: "7.8 × 5.2 m",
        features: ["Fireplace recess", "Acoustic lining", "Garden aspect"],
      },
      {
        image: IMG.bedroomWave,
        caption: "Bedroom",
        text: "North light and a walk-in robe on the upper level, with plaster walls kept soft so the room stays calm at night.",
        dimensions: "4.4 × 4.0 m",
        features: ["Walk-in robe", "North light", "Soft plaster walls"],
      },
      {
        image: IMG.bathroom,
        caption: "Stone",
        text: "Honed stone, recessed lighting and a custom vanity keep the wet rooms in the same language as the main floors.",
        dimensions: "3.2 × 2.4 m",
        features: ["Honed stone", "Recessed lighting", "Custom vanity"],
      },
      {
        image: IMG.vanity,
        caption: "Detail",
        text: "Hardware, stone and timber specified together so every vanity and splashback reads as builder interior design, not fit-out.",
        dimensions: "Vanity detail",
        features: ["Custom hardware", "Timber lining", "Stone splashback"],
      },
      {
        image: IMG.cinema,
        caption: "Cinema",
        text: "Fibre-optic edge lighting and acoustic panelling, built for late-night screenings without leaking sound into the house.",
        dimensions: "5.1 × 4.6 m",
        features: ["Acoustic wall panels", "LED edge lighting", "Recliner seating"],
      },
      {
        image: IMG.diningFormal,
        caption: "Formal dining",
        text: "A more formal dining room aligned to the garden, with pendant light and marble underfoot for longer evenings.",
        dimensions: "5.8 × 4.2 m",
        features: ["Pendant lighting", "Marble floor", "Garden alignment"],
      },
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
    banners: [],
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
      {
        image: IMG.livingCalm,
        caption: "Brief",
        text: "The first rooms are drawn as calm volumes — low contrast, garden aspect and space for a family to settle on the coast.",
        dimensions: "Concept living",
        features: ["Garden aspect", "Low-contrast palette", "Settled volumes"],
      },
      {
        image: IMG.livingOutlook,
        caption: "Outlook",
        text: "Outlook and light set the plan: living opens toward the water and the terrace, not a corridor of leftover rooms.",
        dimensions: "8.0 × 5.4 m",
        features: ["Coastal outlook", "Terrace living", "Full-height glass"],
      },
      {
        image: IMG.bedroomTimber,
        caption: "Rest",
        text: "Bedroom language for the upcoming home — timber lining, a quieter palette and morning light from the east.",
        dimensions: "4.5 × 4.1 m",
        features: ["Timber lining", "East light", "Quiet palette"],
      },
      {
        image: IMG.diningLight,
        caption: "Dining",
        text: "A gathering room planned around a long table, with western light and a clear line to outdoor dining.",
        dimensions: "6.2 × 4.6 m",
        features: ["Long dining table", "Western light", "Outdoor alignment"],
      },
      {
        image: IMG.bedroomWarm,
        caption: "Bedroom",
        text: "Warm plaster, soft textiles and a garden window so the upper rooms feel private without shutting out the coast.",
        dimensions: "4.3 × 3.9 m",
        features: ["Warm plaster", "Garden window", "Soft textiles"],
      },
      {
        image: IMG.bathroomModern,
        caption: "Wet areas",
        text: "Stone, timber and a walk-in shower specified as one wet-room language, ready for the drawings to lock in.",
        dimensions: "3.6 × 2.5 m",
        features: ["Stone wet rooms", "Walk-in shower", "Timber lining"],
      },
      {
        image: IMG.joinery,
        caption: "Joinery",
        text: "Joinery is specified with the plan so kitchens and robes sit in the architecture, not as later furniture.",
        dimensions: "6.8 × 3.2 m",
        features: ["Integrated kitchen", "Handleless fronts", "Stone bench"],
      },
      {
        image: IMG.cinema,
        caption: "Cinema",
        text: "A dark, acoustically lined room with recliner seating and concealed lighting for weekend films.",
        dimensions: "5.0 × 4.4 m",
        features: ["Acoustic lining", "Concealed lighting", "Recliner seating"],
      },
      {
        image: IMG.vanity,
        caption: "Detail",
        text: "Vanity, hardware and stone resolve together as the drawings tighten — the same care as a finished KSD home.",
        dimensions: "Vanity detail",
        features: ["Custom vanity", "Specified hardware", "Stone splashback"],
      },
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
  };
}

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
    ? scenePairs.map(([caption, text], i) =>
      sceneFromFallback(fallback.scenes?.[i], gallery[i] || fallback.scenes?.[i]?.image || fallback.image, caption, text)
    )
    : (gallery.length
      ? gallery.map((image, i) => sceneFromFallback(fallback.scenes?.[i], image))
      : (fallback.scenes || []).map((scene) => sceneFromFallback(scene, scene.image)));

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
