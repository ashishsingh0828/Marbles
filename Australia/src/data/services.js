import { IMG } from "./images";

const ksd = (title, hero, extra = {}) => ({
  title,
  heroImage: hero,
  image: hero,
  videoUrl: "",
  videoHeading: "",
  videoText: "",
  faqHeading: "Questions",
  faqs: [
    { q: "Where is KSD Homes based?", a: "171 Star Street, Carlisle, Perth WA 6101. Call AJ on +61 414 029 695 or Karl on +61 468 429 212, or email admin@ksdhomes.com.au." },
    { q: "Is KSD a new company?", a: "Yes. KSD Homes Pty Ltd is starting in 2026. Our builder interior design team brings 28+ years of combined professional experience." },
  ],
  ...extra,
});

export const FALLBACK_SERVICES_MAP = {
  "architecture-design": ksd("Architecture & Design", IMG.livingOutlook, {
    shortDescription: "Form, proportion and how the family lives, resolved before a brick is laid.",
    paragraphs: [
      "KSD Homes Pty Ltd designs boutique Western Australian homes as complete compositions. Architecture is not a drawing set handed to someone else — it sits with builder interior design under one roof.",
      "Every commission begins with listening. We plan arrival, living and rest so the house fits how you live today and tomorrow.",
    ],
    strategyHeading: "Combined visionary",
    strategyText: "Licensed boutique building and interior design as one brief, one team, one home.",
    features: [
      { title: "Site and brief", text: "Western Australian light, privacy and how the household wants to live." },
      { title: "Composition", text: "Levels, rooms and outdoor living resolved together, not as add-ons." },
    ],
    processHeading: "How a KSD home is composed",
    steps: [
      { title: "Listen", text: "Lifestyle, preferences and vision — before plans harden." },
      { title: "Compose", text: "Architecture and builder interior design as one set of drawings." },
      { title: "Build", text: "Licensed boutique delivery with a customer-centred process." },
      { title: "Handover", text: "A complete living environment, not disconnected parts." },
    ],
  }),
  "builder-interior-design": ksd("Builder Interior Design", IMG.bedroom, {
    shortDescription: "Materials, joinery and light considered with the architecture, so every room feels like part of the same home.",
    paragraphs: [
      "Builder interior design is the combined visionary of KSD Homes: the people who build the house also compose how it is lived in.",
      "Furniture, finishes, lighting and joinery are not a later layer. They are specified with the architecture so the home feels one.",
    ],
    strategyHeading: "Under one roof",
    strategyText: "No split between ‘the builder’ and ‘the interior designer’. One team, 28+ years combined experience.",
    features: [
      { title: "Materials with climate", text: "Marble, timber, stone and concrete chosen for Western Australian light and touch." },
      { title: "Personal rooms", text: "Mandir, guest rooms, kitchen and alfresco planned as part of the house, not extras." },
    ],
    processHeading: "From brief to finish",
    steps: [
      { title: "Brief", text: "How you live, not a catalogue of trends." },
      { title: "Drawings", text: "Interiors on the same set as architecture." },
      { title: "Specify", text: "Finishes selected with the build, not after it." },
      { title: "Install", text: "The same team that designed the rooms sees them made." },
    ],
  }),
  "complete-home-solutions": ksd("Complete Home Solutions", IMG.diningFormal, {
    shortDescription: "One brief, one team, one finished residence.",
    paragraphs: [
      "A KSD home is architecture, builder interior design, lighting, furniture and finishes designed as one complete home solution.",
      "We are a licensed builder for high-end boutique homes in Perth, starting in 2026, with a team that already carries 28+ years of combined professional experience.",
    ],
    strategyHeading: "Complete, not assembled",
    strategyText: "The house is planned as a living environment — from undercroft to roof, from street arrival to pool.",
    features: [
      { title: "New homes", text: "Three-storey boutique residences composed as complete environments." },
      { title: "Renovations", text: "Transformations that keep architecture and interiors in one conversation." },
    ],
    processHeading: "The KSD sequence",
    steps: [
      { title: "Listen", text: "Every project begins with how you want to live." },
      { title: "Design", text: "Architecture and builder interior design together." },
      { title: "Build", text: "Licensed boutique delivery from our Perth studio." },
      { title: "Live", text: "A home that feels finished because it was composed that way." },
    ],
  }),
  "licensed-boutique-building": ksd("Licensed Boutique Building", IMG.joinery, {
    shortDescription: "High-end Western Australian homes delivered by a licensed builder, with a customer-centred process.",
    paragraphs: [
      "KSD Homes Pty Ltd is a licensed builder for high-end boutique homes. We build from 171 Star Street, Carlisle, Perth WA 6101.",
      "The company is new in 2026. The team is not: 28+ years of combined builder interior design experience, under the Eagle Group of Companies.",
    ],
    strategyHeading: "Licensed, personal, Perth",
    strategyText: "Boutique scale, licensed delivery, and a process that starts with listening.",
    features: [
      { title: "Perth studio", text: "AJ +61 414 029 695 · Karl +61 468 429 212 · admin@ksdhomes.com.au" },
      { title: "Eagle Group", text: "A brand of the Eagle Group of Companies." },
    ],
    processHeading: "How we build",
    steps: [
      { title: "Brief and site", text: "Western Australia first, with a personal brief." },
      { title: "Drawings", text: "Architecture and interiors as one set." },
      { title: "Construction", text: "Licensed boutique building, customer-centred." },
      { title: "Handover", text: "A complete home, not a shell plus a fit-out." },
    ],
  }),
  "indoor-outdoor-living": ksd("Indoor–Outdoor Living", IMG.diningLight, {
    shortDescription: "Alfresco, pool and garden composed with the house so Western Australian light and privacy work together.",
    paragraphs: [
      "Western Australian living asks for indoor and outdoor as one room. We plan alfresco, pool and garden with the architecture — not as later add-ons.",
      "Residence, now in delivery, opens a 90 sqm colour-concrete alfresco to a 32 sqm pool from the marble main floor. That is the standard we design to.",
    ],
    strategyHeading: "Climate first",
    strategyText: "Light, breeze, privacy and material underfoot, resolved with the house.",
    features: [
      { title: "Alfresco", text: "Planned with the main floor, not stuck on." },
      { title: "Pool and garden", text: "Part of the composition, including plant and hardstand." },
    ],
    processHeading: "Outside as architecture",
    steps: [
      { title: "Orient", text: "Northern light, privacy and prevailing breeze." },
      { title: "Open", text: "Thresholds from living to alfresco to water." },
      { title: "Material", text: "Concrete, pool tiles and stone chosen for climate." },
      { title: "Live", text: "Indoor–outdoor as daily life, not a weekend feature." },
    ],
  }),
  "materials-finishes": ksd("Materials & Finishes", IMG.bathroomMarble, {
    shortDescription: "Marble, timber, stone and concrete chosen for climate, touch and how they catch the light.",
    paragraphs: [
      "Materials are specified with the build. Marble main floors, onyx stair, colour-concrete alfresco and pool tiles each sit where they belong.",
      "We do not treat stone as a separate trade story. Finishes are builder interior design — chosen for Western Australian light and how they feel underfoot.",
    ],
    strategyHeading: "The right material in the right place",
    strategyText: "A complete composition, not a showroom of slabs.",
    features: [
      { title: "Floors and stairs", text: "Marble floors with an onyx core where the house turns vertical." },
      { title: "Outdoor", text: "Concrete, pool tiles and hardstand planned with the rooms they serve." },
    ],
    processHeading: "Specify with the drawings",
    steps: [
      { title: "Place", text: "Each finish has a job in the plan." },
      { title: "Sample", text: "Chosen for climate and touch, with you." },
      { title: "Build", text: "Installed by the same team that designed the rooms." },
      { title: "Live", text: "Materials that belong to the house, not a catalogue." },
    ],
  }),
};

export const DEFAULT_FALLBACK = FALLBACK_SERVICES_MAP["architecture-design"];

export const SERVICE_SIDEBAR = [
  { label: "Architecture & Design", href: "/services/architecture-design" },
  { label: "Builder Interior Design", href: "/services/builder-interior-design" },
  { label: "Complete Home Solutions", href: "/services/complete-home-solutions" },
  { label: "Licensed Boutique Building", href: "/services/licensed-boutique-building" },
  { label: "Indoor–Outdoor Living", href: "/services/indoor-outdoor-living" },
  { label: "Materials & Finishes", href: "/services/materials-finishes" },
];
