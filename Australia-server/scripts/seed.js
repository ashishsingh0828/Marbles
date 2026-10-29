require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const Contact = require("../models/Contact");
const models = require("../models/content");
const { slugify } = require("../utils/helpers");
const { SITES } = require("../middleware/guards");

const FORCE = process.argv.includes("--force");
const IMG = {
  floor: ["1600607687939-ce8a6c25118c", "1618221195710-dd6b41faaea6", "1600210492486-724fe5c67fb0", "1616486338812-3dadae4b4ace"],
  kitchen: ["1507089947368-19c1da9775ae", "1541123437800-1bb1317badc2", "1484154218962-a197022b5858"],
  bath: ["1620626011761-996317b8d101", "1584622650111-993a426fbf0a", "1600566752355-35792bedcfea"],
  wall: ["1604014237800-1c9102c219da", "1615529182904-14819c35db37", "1600573472550-8090b5e0745e"],
};
const ORDER = ["floor", "bath", "kitchen", "wall"];
const pic = (group, n = 0, w = 1200, h = 800) => {
  const list = IMG[group];
  return `https://images.unsplash.com/photo-${list[n % list.length]}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
};
const g = (i) => ORDER[i % ORDER.length];
const text = "Marble has defined luxury interiors for centuries. Our team selects each slab by hand, plans every cut to follow the natural veining, and installs it with precision so the finished surface looks effortless and lasts for decades.";
const text2 = "From the first site visit to the final polish we keep you informed at every step, with clear timelines, transparent pricing and a finish we are proud to put our name on.";
const day = 86400000;

const PROJECTS = [
  ["Italian Marble Villa Flooring", "Flooring"], ["Statuario Bathroom Vanity", "Bathrooms"],
  ["Granite Kitchen Countertops", "Kitchen & Countertops"], ["Onyx Feature Wall", "Wall Cladding"],
];
const SERVICES = [
  ["Marble Flooring Installation", "Premium marble flooring, cut and laid to perfection for homes and offices."],
  ["Countertops & Vanities", "Custom kitchen and bathroom surfaces in marble, granite and quartz."],
  ["Polishing & Restoration", "Bring dull, stained or scratched stone back to a mirror finish."],
  ["Wall Cladding", "Elegant book-matched marble and stone cladding for feature walls."],
];
const BLOGS = [
  ["How to Choose the Right Marble for Your Home", "Materials"], ["Marble vs Granite: What’s the Difference?", "Materials"],
  ["Easy Ways to Maintain Polished Marble", "Care & Maintenance"], ["Marble Design Ideas for Modern Interiors", "Design"],
];

const AUS_PROJECTS = [
  ["Residence", "Boutique Home"],
  ["Port Coogee Residence", "Ongoing"],
];
const AUS_SERVICES = [
  ["Architecture & Design", "A complete composition — form, proportion and how the family lives, resolved before a brick is laid."],
  ["Interior Design", "Materials, joinery and light considered with the architecture, so every room feels like part of the same home."],
  ["Complete Home Solutions", "Builder and interior design under one roof — one brief, one team, one finished residence."],
  ["Indoor–Outdoor Living", "Alfresco, pool and garden composed with the house so Western Australian light and privacy work together."],
];
const AUS_BLOGS = [
  ["Design and build under one roof", "Process"],
  ["Indoor–outdoor living in Western Australia", "Architecture"],
  ["Materials chosen for climate and light", "Materials"],
  ["Planning a boutique family home", "Interior Design"],
];
/* Plan drawings and any file name containing a client name were removed. */
const FRONT_PHOTO = ""; // e.g. "/images/your-front-elevation.jpg"
const BACK_PHOTO = "";  // e.g. "/images/your-back-elevation.jpg"
const AUS_PUBLIC = {
  dining: "/images/ksd-stone-02.jpg",
  diningLight: "/images/ksd-stone-03.jpg",
  livingOutlook: "/images/ksd-stone-07.jpg",
  livingCalm: "/images/ksd-stone-08.jpg",
  bedroom: "/images/ksd-stone-09.jpg",
  diningFormal: "/images/ksd-stone-27.jpg",
  joinery: "/images/ksd-stone-38.jpg",
  bathroomMarble: "/images/ksd-stone-40.jpg",
};

const project = (site, label, [title, category], i) => (
  site === "australia"
    ? {
      site, title, slug: slugify(title), category, published: true,
      client: "Private residence", projectType: category,
      suburb: i === 1 ? "Port Coogee" : "Residence",
      shortCode: "",
      featured: true,
      status: i === 1 ? "Ongoing" : "In Delivery",
      collection: i === 1 ? "Ongoing" : "Residence",
      location: "Western Australia", date: i === 1 ? "Ongoing" : "In delivery",
      storeys: "3", specLine: i === 1 ? "Ongoing · Three storeys · Coastal WA" : "Three storeys · Pool & alfresco · Marble floors",
      conceptHeadline: i === 1 ? "Conceptual design of an ongoing home" : "The beauty of indoor-outdoor living",
      planLabels: "",
      /* KSD residence = front and back photos only */
      frontBackOnly: i !== 1,
      beforeImage: i === 1 ? "" : FRONT_PHOTO,
      afterImage: i === 1 ? "" : BACK_PHOTO,
      imageA: i === 1 ? AUS_PUBLIC.livingOutlook : FRONT_PHOTO,
      imageB: i === 1 ? AUS_PUBLIC.livingCalm : BACK_PHOTO,
      heroImage: i === 1 ? AUS_PUBLIC.livingOutlook : FRONT_PHOTO,
      heading: "A boutique home composed as one complete living environment",
      paragraphs: `${text}\n\n${text2}`,
      factsTitle: "Architecture & interior, designed as one", factsText: text2,
      checks: "Architecture and interior design together\nLicensed boutique builder\nIndoor–outdoor living\nClient address remains private",
    }
    : {
      site, title, slug: slugify(title), category, published: true,
      client: `${label} Design Studio`, projectType: category, date: `1${i + 1} January 2026`, website: "yourdomain.com",
      imageA: pic(g(i), 0, 900, 1000), imageB: pic(g(i), 1, 900, 1000), heroImage: pic(g(i), 2, 1400, 900),
      heading: "Here to Know About This Project", paragraphs: `${text}\n\n${text2}`,
      factsTitle: "Interesting Facts In Approach", factsText: text2,
      checks: "Hand-selected slabs\nPrecision cutting\nFast and reliable service\nAffordable solutions\nExpert installers\nModern equipment",
    }
);
const AUS_SERVICE_IMAGES = [
  AUS_PUBLIC.livingOutlook,
  AUS_PUBLIC.bedroom,
  AUS_PUBLIC.diningFormal,
  AUS_PUBLIC.diningLight,
];
const service = (site, label, [title, shortDescription], i) => ({
  site, title, slug: slugify(title), shortDescription, published: true,
  image: site === "australia" ? AUS_SERVICE_IMAGES[i % AUS_SERVICE_IMAGES.length] : pic(g(i), 0, 800, 800),
  heroImage: site === "australia" ? AUS_SERVICE_IMAGES[i % AUS_SERVICE_IMAGES.length] : pic(g(i), 1, 1400, 900),
  paragraphs: `${text}\n\n${text2}`, strategyHeading: "Our Approach", strategyText: text2,
  features: "Expert Installation | Skilled fitters with years of stone experience.\nFlooring Upgrades | Refresh any room with a premium stone finish.",
  processHeading: "Service Process",
  steps: "Request For Service | Tell us about your space and what you have in mind.\nService Planning | We measure, plan the cuts and agree a timeline.\nQuality Control | Every slab is checked before and after installation.\nFollow-up & Support | We stay in touch to make sure you are delighted.",
  videoHeading: "See How We Work", videoText: text2, videoUrl: "https://www.youtube.com/watch?v=hddwAIXbKZo",
  faqHeading: "Frequently Asked Questions",
  faqs: "What services do you provide? | We supply and install marble, granite and quartz for floors, walls and countertops.\nDo you offer emergency repair? | Yes, we repair cracked or water-damaged stone quickly to prevent further damage.\nDo you work on homes and businesses? | Yes, we handle residential and commercial projects of every size.",
});
const blog = (site, label, [title, category], i) => ({
  site, title, slug: slugify(title), category, published: true, author: "admin", tags: `${category}, Marble`,
  date: new Date(Date.now() - i * 5 * day).toISOString().slice(0, 10), excerpt: text.slice(0, 140) + "…",
  image: site === "australia" ? AUS_SERVICE_IMAGES[i % AUS_SERVICE_IMAGES.length] : pic(g(i + 1), 0, 800, 800),
  heroImage: site === "australia" ? AUS_SERVICE_IMAGES[i % AUS_SERVICE_IMAGES.length] : pic(g(i + 1), 1, 1400, 900),
  introHeading: "Premium stone for stylish spaces", introText: text,
  galleryA: site === "australia" ? AUS_PUBLIC.diningLight : pic(g(i + 2), 0, 900, 700),
  galleryB: site === "australia" ? AUS_PUBLIC.bedroom : pic(g(i + 3), 1, 900, 700),
  secondHeading: "Why homeowners trust our stone experts", secondText: text2,
  approachHeading: "Our Personal Approach",
  approachItems: "Expert installation for homes and offices\nDurable materials built for daily wear\nSkilled craftsmanship for lasting results\nRegular care and maintenance advice",
  approachImage: site === "australia" ? AUS_PUBLIC.joinery : pic(g(i), 2, 800, 600),
});

(async () => {
  await connectDB();
  await Admin.ensure();
  const setsFor = (site) => site === "australia"
    ? { projects: [AUS_PROJECTS, project], services: [AUS_SERVICES, service], blogs: [AUS_BLOGS, blog] }
    : { projects: [PROJECTS, project], services: [SERVICES, service], blogs: [BLOGS, blog] };

  for (const site of SITES) {
    const label = site[0].toUpperCase() + site.slice(1);
    const sets = setsFor(site);
    for (const [name, [rows, build]] of Object.entries(sets)) {
      const M = models[name];
      if (FORCE) await M.deleteMany({ site });
      else if (await M.countDocuments({ site })) { console.log(`skip   ${site}/${name} (already has content)`); continue; }
      await M.insertMany(rows.map((r, i) => ({ ...build(site, label, r, i), createdAt: new Date(Date.now() - i * day) })));
      console.log(`added  ${site}/${name}: ${rows.length}`);
    }
    if (FORCE) await Contact.deleteMany({ site });
    if (!(await Contact.countDocuments({ site }))) {
      await Contact.insertMany([
        { site, name: "Aarav Mehta", email: "aarav@example.com", phone: "+91 98765 43210", subject: "Marble flooring quote", message: "Hi, I'd like a quote for 1,200 sq ft of Italian marble flooring." },
        { site, name: "Sophie Turner", email: "sophie@example.com", subject: "Kitchen benchtop", message: "Do you supply and install marble benchtops? I'd like to book a site visit." },
      ]);
      console.log(`added  ${site}/contacts: 2`);
    }
  }
  console.log("\nSeed finished.");
  await mongoose.disconnect();
})();
