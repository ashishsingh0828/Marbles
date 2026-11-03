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
  {
    slug: "sydney-interior-living",
    title: "Sydney Interior Living",
    suburb: "Interior Studio",
    shortCode: "",
    featured: true,
    category: "Builder Interior Design",
    status: "Completed",
    collection: "Interior",
    year: "2026",
    scope: "Interior",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "Joinery, living and light composed as one",
    planLabels: [],
    storeys: "",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "Living · Joinery · Media wall",
    image: IMG.intSydney1,
    heroImage: IMG.intSydney1,
    image2: IMG.intSydney3,
    image3: IMG.intSydney5,
    image4: IMG.intSydney7,
    beforeImage: IMG.intSydney1,
    afterImage: IMG.intSydney3,
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: [
      { image: IMG.intSydney1, caption: "Living", text: "A media wall and joinery grid set the living room as a calm, composed volume with garden light.", dimensions: "Living", features: ["Media wall", "Joinery grid", "Garden light"], space: "indoor" },
      { image: IMG.intSydney2, caption: "Lounge", text: "Low seating and a quiet palette keep the room focused on proportion and material.", dimensions: "Lounge", features: ["Low seating", "Quiet palette", "Timber lining"], space: "indoor" },
      { image: IMG.intSydney3, caption: "Kitchen", text: "Island, stone and timber resolved together so the kitchen reads as architecture, not furniture.", dimensions: "Kitchen", features: ["Stone bench", "Island joinery", "Integrated appliances"], space: "indoor" },
      { image: IMG.intSydney4, caption: "Dining", text: "Dining sits in the same material language as living, with clear alignment to outdoor rooms.", dimensions: "Dining", features: ["Dining alignment", "Shared palette", "Outdoor line"], space: "indoor" },
      { image: IMG.intSydney5, caption: "Detail", text: "Hardware, lighting and shelf composition lock in the interior as one set of drawings.", dimensions: "Detail", features: ["Specified hardware", "Shelf lighting", "Finished joinery"], space: "indoor" },
      { image: IMG.intSydney6, caption: "Cabinetry", text: "Handleless fronts and recessed lighting keep storage quiet against the architecture.", dimensions: "Cabinetry", features: ["Handleless fronts", "Recessed lighting", "Integrated storage"], space: "indoor" },
      { image: IMG.intSydney7, caption: "Suite", text: "Bedroom and soft finishes continue the same timber and plaster language upstairs.", dimensions: "Suite", features: ["Timber lining", "Soft textiles", "Quiet plaster"], space: "indoor" },
      { image: IMG.intSydney8, caption: "Finish", text: "Final styling and stone details close the interior brief without competing with the plan.", dimensions: "Finish", features: ["Stone detail", "Styling", "Complete interior"], space: "indoor" },
    ],
    heading: "Interior living composed with the build",
    paragraphs: [
      "Sydney Interior Living is a builder interior design study: joinery, media, kitchen and suite composed as one environment for how a family actually lives.",
    ],
    challengeTitle: "One interior language",
    challengeText:
      "Living, kitchen and rest needed the same material conversation — timber, stone and quiet plaster — without treating joinery as a later add-on.",
    checks: [
      "Media wall and living joinery as architecture",
      "Kitchen island and stone specified with the plan",
      "Bedroom suite in the same timber language",
      "Complete builder interior design under one team",
    ],
    resultTitle: "A finished interior composition",
    resultText:
      "A calm, high-performing interior where joinery, light and finish read as one KSD home environment.",
    banners: [],
  },
  {
    slug: "coastal-kitchen-interior",
    title: "Coastal Kitchen Interior",
    suburb: "Interior Studio",
    shortCode: "",
    featured: true,
    category: "Kitchen & Joinery",
    status: "Completed",
    collection: "Interior",
    year: "2026",
    scope: "Interior",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "Stone, timber and island living",
    planLabels: [],
    storeys: "",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "Kitchen · Island · Dining",
    image: IMG.intUsa1,
    heroImage: IMG.intUsa1,
    image2: IMG.intUsa3,
    image3: IMG.intUsa5,
    image4: IMG.intUsa7,
    beforeImage: IMG.intUsa1,
    afterImage: IMG.intUsa3,
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: [
      { image: IMG.intUsa1, caption: "Kitchen", text: "Open kitchen and dining with a fluted island, stone bench and integrated appliances.", dimensions: "Kitchen", features: ["Fluted island", "Stone bench", "Integrated fridge"], space: "indoor" },
      { image: IMG.intUsa2, caption: "Prep", text: "Prep zones and tall joinery keep worktops clear while the room stays open to living.", dimensions: "Prep", features: ["Tall joinery", "Clear benches", "Open plan"], space: "indoor" },
      { image: IMG.intUsa3, caption: "Bar", text: "A curved bar and island seating turn the kitchen into the social heart of the home.", dimensions: "Bar", features: ["Curved bar", "Island seating", "Dark timber"], space: "indoor" },
      { image: IMG.intUsa4, caption: "Dining", text: "Dining furniture and lighting sit in the same palette as the joinery and stone.", dimensions: "Dining", features: ["Shared palette", "Feature lighting", "Open dining"], space: "indoor" },
      { image: IMG.intUsa5, caption: "Joinery", text: "Dark timber and cream fronts balance contrast without visual noise.", dimensions: "Joinery", features: ["Dark timber", "Cream fronts", "Quiet contrast"], space: "indoor" },
      { image: IMG.intUsa6, caption: "Detail", text: "Shelving, hardware and splashback resolve as one wet-work and display language.", dimensions: "Detail", features: ["Open shelving", "Stone splash", "Specified hardware"], space: "indoor" },
      { image: IMG.intUsa7, caption: "Living edge", text: "The kitchen edge opens to living so conversations and light move freely.", dimensions: "Living edge", features: ["Open edge", "Shared light", "Family living"], space: "indoor" },
      { image: IMG.intUsa8, caption: "Finish", text: "Final appliances and styling complete a kitchen ready for everyday Western Australian living.", dimensions: "Finish", features: ["Appliance finish", "Styling", "Daily living"], space: "indoor" },
    ],
    heading: "A kitchen composed for gathering",
    paragraphs: [
      "Coastal Kitchen Interior brings island, bar, stone and timber together as builder interior design — one brief for cooking, dining and family time.",
    ],
    challengeTitle: "Kitchen as architecture",
    challengeText:
      "The brief asked for a social kitchen that still works hard: storage, appliances and stone as part of the architecture, not a catalogue fit-out.",
    checks: [
      "Fluted island and stone bench",
      "Bar seating integrated with joinery",
      "Tall storage and appliance walls",
      "Open relationship to dining and living",
    ],
    resultTitle: "The heart of the home",
    resultText:
      "A composed kitchen interior that carries KSD’s green-and-orange brand clarity into warm timber, stone and everyday use.",
    banners: [],
  },
  {
    slug: "australian-timber-kitchen",
    title: "Australian Timber Kitchen",
    suburb: "Interior Studio",
    shortCode: "",
    featured: true,
    category: "Kitchen Interior",
    status: "Completed",
    collection: "Interior",
    year: "2026",
    scope: "Interior",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "Light timber, stone and daylight",
    planLabels: [],
    storeys: "",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "U-kitchen · Stone · Daylight",
    image: IMG.intAus1,
    heroImage: IMG.intAus1,
    image2: IMG.intAus3,
    image3: IMG.intAus5,
    image4: IMG.intAus7,
    beforeImage: IMG.intAus1,
    afterImage: IMG.intAus3,
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: [
      { image: IMG.intAus1, caption: "Kitchen", text: "Light timber joinery and white stone under daylight from a wide garden window.", dimensions: "Kitchen", features: ["Light timber", "White stone", "Garden window"], space: "indoor" },
      { image: IMG.intAus2, caption: "Island", text: "A generous island anchors prep and gathering without blocking the room’s light.", dimensions: "Island", features: ["Island gathering", "Clear sightlines", "Stone top"], space: "indoor" },
      { image: IMG.intAus3, caption: "Prep wall", text: "Cooktop, hood and bench run are aligned for an easy cook’s sequence.", dimensions: "Prep wall", features: ["Cook sequence", "Hood alignment", "Bench run"], space: "indoor" },
      { image: IMG.intAus4, caption: "Storage", text: "Handleless drawers and recessed pulls keep the timber plane continuous.", dimensions: "Storage", features: ["Handleless", "Recessed pulls", "Continuous timber"], space: "indoor" },
      { image: IMG.intAus5, caption: "Wet zone", text: "Sink and window pairing bring daylight onto the wet work surface.", dimensions: "Wet zone", features: ["Sink window", "Daylight", "Wet work"], space: "indoor" },
      { image: IMG.intAus6, caption: "Detail", text: "Stone thickness, appliance reveals and lighting are resolved as one detail set.", dimensions: "Detail", features: ["Stone thickness", "Appliance reveal", "Task lighting"], space: "indoor" },
      { image: IMG.intAus7, caption: "Living link", text: "The kitchen opens toward living so the family room and cook space share air and light.", dimensions: "Living link", features: ["Open link", "Shared light", "Family room"], space: "indoor" },
      { image: IMG.intAus8, caption: "Finish", text: "A bright, durable interior finish suited to Western Australian light and daily use.", dimensions: "Finish", features: ["Durable finish", "WA light", "Daily use"], space: "indoor" },
    ],
    heading: "Timber kitchen for Western Australian light",
    paragraphs: [
      "Australian Timber Kitchen is a light, stone-and-timber interior designed for daylight, durable surfaces and easy family cooking.",
    ],
    challengeTitle: "Bright without glare",
    challengeText:
      "The kitchen needed to feel open to the garden while keeping benches practical and joinery warm — timber and stone in balance.",
    checks: [
      "Light timber U-kitchen",
      "Stone benches and island",
      "Garden window wet zone",
      "Open link to living",
    ],
    resultTitle: "Warm, bright and practical",
    resultText:
      "A finished timber kitchen interior that feels local to Western Australian light and how families cook together.",
    banners: [],
  },
  {
    slug: "singapore-suite-interior",
    title: "Suite & Kitchen Interior",
    suburb: "Interior Studio",
    shortCode: "",
    featured: true,
    category: "Complete Interior",
    status: "Completed",
    collection: "Interior",
    year: "2026",
    scope: "Interior",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "Kitchen precision and suite calm",
    planLabels: [],
    storeys: "",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "Kitchen · Suite · Display",
    image: IMG.intSg1,
    heroImage: IMG.intSg1,
    image2: IMG.intSg3,
    image3: IMG.intSg5,
    image4: IMG.intSg7,
    beforeImage: IMG.intSg1,
    afterImage: IMG.intSg3,
    videoUrl: "",
    videoHeading: "",
    videoText: "",
    scenes: [
      { image: IMG.intSg1, caption: "Kitchen", text: "Minimal kitchen with stone island, wood grain and lit display cabinetry.", dimensions: "Kitchen", features: ["Stone island", "Wood grain", "Lit display"], space: "indoor" },
      { image: IMG.intSg2, caption: "Appliance wall", text: "Ovens, coffee and tall timber fronts read as one appliance wall.", dimensions: "Appliance wall", features: ["Oven stack", "Tall timber", "Integrated coffee"], space: "indoor" },
      { image: IMG.intSg3, caption: "Island", text: "Induction and stone thickness keep the island both sculptural and useful.", dimensions: "Island", features: ["Induction", "Stone thickness", "Sculptural island"], space: "indoor" },
      { image: IMG.intSg4, caption: "Display", text: "Glass display with internal lighting turns storage into a quiet feature.", dimensions: "Display", features: ["Glass display", "Internal light", "Wine storage"], space: "indoor" },
      { image: IMG.intSg5, caption: "Suite", text: "Bedroom suite continues soft neutrals and timber for rest after the social kitchen.", dimensions: "Suite", features: ["Soft neutrals", "Timber calm", "Rest"], space: "indoor" },
      { image: IMG.intSg6, caption: "Wet room", text: "Bathroom stone and vanity detail match the kitchen’s material discipline.", dimensions: "Wet room", features: ["Stone wet room", "Vanity detail", "Matched materials"], space: "indoor" },
      { image: IMG.intSg7, caption: "Passage", text: "Circulation stays clear so kitchen, suite and living remain one composition.", dimensions: "Passage", features: ["Clear circulation", "One composition", "Linked rooms"], space: "indoor" },
      { image: IMG.intSg8, caption: "Finish", text: "A complete interior finish across kitchen and suite under one KSD brief.", dimensions: "Finish", features: ["Complete finish", "One brief", "Builder interior"], space: "indoor" },
    ],
    heading: "Kitchen and suite as one interior",
    paragraphs: [
      "Suite & Kitchen Interior pairs precise kitchen joinery with a calm bedroom suite — the same builder interior design language throughout.",
    ],
    challengeTitle: "Social and private rooms together",
    challengeText:
      "The home needed a sharp kitchen for gathering and a quieter suite for rest, without two different design languages.",
    checks: [
      "Stone island and timber kitchen",
      "Lit display cabinetry",
      "Calm suite finishes",
      "Matched wet-room stone",
    ],
    resultTitle: "One language, two moods",
    resultText:
      "A complete interior that holds kitchen energy and suite calm in the same KSD material story.",
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