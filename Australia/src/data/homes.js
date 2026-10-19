import { asset, paras, lines } from "../api";

const STONE = (n) => `/images/ksd-stone-${String(n).padStart(2, "0")}.jpg`;

export const FALLBACK_HOMES = [
  {
    slug: "sharma-residence",
    title: "Sharma Residence",
    category: "Three-Storey Boutique Home",
    status: "In Delivery",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "The beauty of indoor-outdoor living",
    storeys: "3",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "Marble main floors · 210 sqm ground",
    specLine: "Three storeys · Pool & alfresco · Marble floors",
    image: STONE(1),
    heroImage: STONE(1),
    image2: "/images/projects/sharma-plan-02.jpg",
    image3: "/images/projects/sharma-plan-03.jpg",
    image4: "/images/projects/sharma-plan-01.jpg",
    heading: "A three-storey boutique home composed as one complete living environment",
    paragraphs: [
      "Sharma Residence is a three-storey boutique home designed as a complete composition — architecture, interiors, materials and how the family lives, considered together. In the spirit of a carefully resolved Western Australian residence, every level has a clear purpose: arrival, living, and rest.",
      "The ground floor gathers daily life around a 210 sqm marble main floor, a 45 sqm marble entrance, and a 90 sqm colour-concrete alfresco opening to a 32 sqm pool. A 30 sqm onyx staircase and lift connect the home vertically, so movement through the house feels calm and continuous.",
      "Below, the undercroft holds store and cellar, marble and carpeted support spaces, and pool plant. Above, an 180 sqm marble main floor includes a 15 sqm marble mandir, ensuites and balconies. Materials are selected for how they feel underfoot and how they catch Western Australian light — marble, onyx, pool tiles and concrete, each in its right place.",
    ],
    challengeTitle: "Architecture & interior, designed as one",
    challengeText:
      "The brief was a high-performing, comfortable family home with a personal touch: prayer space, guest rooms, master suite, pool and alfresco living, without treating any of these as add-ons. Our builder and interior design team planned the house as a single environment.",
    checks: [
      "Three storeys: undercroft, ground and upper living",
      "Marble main floors with onyx stair and lift core",
      "Alfresco, pool and hardstand for indoor–outdoor living",
      "Dedicated mandir and guest accommodation",
      "Complete home solution — architecture, interiors and finishes",
    ],
    resultTitle: "The composition of the home",
    resultText:
      "A boutique Western Australian residence where form, function, proportion and material work together. We do not publish the client’s street address. Sharma Residence is presented as a private family home, designed for how they live today and tomorrow.",
  },
  {
    slug: "port-coogee-residence",
    title: "Port Coogee Residence",
    category: "Upcoming Western Australia",
    status: "Upcoming",
    location: "Western Australia",
    client: "Private residence",
    conceptHeadline: "A coastal home still taking form",
    storeys: "3",
    beds: "",
    baths: "",
    cars: "",
    floorArea: "",
    specLine: "Upcoming · Three storeys · Coastal WA",
    image: STONE(5),
    heroImage: STONE(5),
    image2: "/images/projects/sharma-plan-02.jpg",
    image3: "/images/projects/sharma-plan-03.jpg",
    image4: "/images/projects/sharma-plan-01.jpg",
    heading: "An upcoming three-storey boutique home on the Western Australian coast",
    paragraphs: [
      "Port Coogee Residence is an upcoming KSD Homes commission in Western Australia — a three-storey boutique home conceived with the same design language as our current work: architecture and interior design as one complete home solution.",
      "The project continues our focus on coastal Western Australian living — light, proportion, indoor–outdoor connection, and materials chosen for climate and comfort. Like all KSD homes, it begins with listening to how the household wants to live.",
      "Drawings, interiors and specification are in development with our licensed builder and interior design team. We will share the home as a finished composition when it is ready — without publishing the client’s address.",
    ],
    challengeTitle: "Designed for the way they will live",
    challengeText:
      "An upcoming coastal site asks for a home that feels private, calm and connected to outdoor living. Our approach is the same as every KSD commission: a personal brief, a complete composition, and a customer-centred process.",
    checks: [
      "Upcoming three-storey boutique home",
      "Western Australia — Port Coogee",
      "Architecture and interior design together",
      "Licensed builder for high-end boutique homes",
      "Client address remains private",
    ],
    resultTitle: "A home still taking form",
    resultText:
      "Port Coogee Residence is in the studio now. It will be delivered as a complete KSD home: architecture, interiors and the way the family experience the space — designed for tomorrow as much as today.",
  },
];

const pickImage = (...candidates) => candidates.find(Boolean) || "";

export function mapHome(p = {}, idx = 0) {
  const fallback = FALLBACK_HOMES[idx % FALLBACK_HOMES.length];
  const imageA = p.imageA ? asset(p.imageA) : "";
  const imageB = p.imageB ? asset(p.imageB) : "";
  const hero = p.heroImage ? asset(p.heroImage) : "";
  const planA = p.floorPlanA ? asset(p.floorPlanA) : "";
  const planB = p.floorPlanB ? asset(p.floorPlanB) : "";
  const planC = p.floorPlanC ? asset(p.floorPlanC) : "";

  const storeys = p.storeys || fallback.storeys || "";
  const category = p.category || p.projectType || fallback.category;
  const status = p.status || p.date || fallback.status;
  const location = p.location || fallback.location;

  return {
    id: p._id || p.slug || fallback.slug,
    slug: p.slug || fallback.slug,
    title: p.title || fallback.title,
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
    heading: p.heading || p.subtitle || fallback.heading,
    paragraphs: p.paragraphs ? paras(p.paragraphs) : fallback.paragraphs,
    challengeTitle: p.factsTitle || fallback.challengeTitle,
    challengeText: p.factsText || fallback.challengeText,
    checks: p.checks ? lines(p.checks) : fallback.checks,
    resultTitle: fallback.resultTitle,
    resultText: p.result || fallback.resultText,
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
  const idx = FALLBACK_HOMES.findIndex((h) => h.slug === slug);
  if (apiItem) return mapHome(apiItem, idx >= 0 ? idx : 0);
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
