import { IMG } from "./images";

/* UNCHANGED – this is your original data file, byte for byte in content and shape.
   Nothing else in the project needs to change because of it. */

export const JOURNEY_INTRO = {
  // eyebrow: "Our Process",
  title: "Our Process",
  // text: "A disciplined, six-stage architectural journey. Architectural drafting, builder interior design, and licensed boutique construction remain unified under one Perth team from concept to completion.",
};

export const JOURNEY_STEPS = [
  {
    num: "01",
    title: "Site Appraisal & Brief",
    kicker: "Listening & Feasibility",
    image: IMG.livingCalm,
    text: "Every bespoke residence begins with a detailed lifestyle brief and site appraisal. We analyse block orientation, prevailing breezes, topography, and council zoning (R-Codes) before drafting commences.",
  },
  {
    num: "02",
    title: "Architectural Concept",
    kicker: "Architecture & Spatial Flow",
    image: IMG.bedroomWave,
    text: "Custom floor layouts and 3D architectural elevations are resolved alongside interior volume. Alfresco courtyards, natural light paths, and structural lines are composed as a single cohesive design.",
  },
  {
    num: "03",
    title: "Statutory Approvals",
    kicker: "Permits, Engineering & Fixed Pricing",
    image: IMG.stoneTall || IMG.bathroomModern,
    text: "We manage complete Development Applications (DA), certified engineering, energy compliance assessments, and local council building permits, accompanied by a transparent, fixed-price contract.",
  },
  {
    num: "04",
    title: "Precision Construction",
    kicker: "Licensed Boutique Building",
    image: IMG.joinery,
    text: "Dedicated on-site supervision by our licensed Perth building team. The same multidisciplinary designers who drafted your home direct construction to ensure uncompromised structural integrity.",
  },
  {
    num: "05",
    title: "Interior Selections",
    kicker: "Joinery, Lighting & Surface Finishes",
    image: IMG.diningFormal,
    text: "Bespoke cabinetry, natural stone slabs, architectural lighting fixtures, and surface finishes curated to harmonize with the structural geometry and coastal environment.",
  },
  {
    num: "06",
    title: "Turnkey Handover",
    kicker: "Complete Quality Delivery",
    image: IMG.diningLight,
    text: "A meticulous quality audit precedes client handover. You receive keys to a fully realized architectural residence — built to the highest Western Australian building standards.",
  },
];