/* One config object per content type drives its list page AND its form.
   Australia uses a luxury-homes layout (suburb, status, specs, floor plans).
   India keeps the stone / interiors project fields. */
import { getSite } from "./api";

const opts = (a) => a.map((v) => ({ value: v, label: v }));
const publishing = { title: "Publishing", fields: [{ name: "published", label: "Published (visible on the website)", type: "switch" }] };

const indiaProjects = {
  key: "projects", label: "Project", plural: "Projects", icon: "folder", color: "#B38A45",
  titleField: "title", imageField: "imageA", categoryField: "category",
  defaults: { heading: "Here to Know About This Project", factsTitle: "Interesting Facts In Approach", published: true },
  sections: [
    { title: "Basics", fields: [
      { name: "title", label: "Title", required: true },
      { name: "category", label: "Category", type: "select", options: opts(["Residential", "Commercial", "Flooring", "Kitchen & Countertops", "Bathrooms", "Wall Cladding"]) },
      { name: "client", label: "Client", placeholder: "Client or company name" },
      { name: "projectType", label: "Project Type", placeholder: "Marble Flooring" },
      { name: "date", label: "Date", placeholder: "15 January 2026" },
      { name: "website", label: "Website", placeholder: "yourdomain.com" },
    ] },
    { title: "Images", desc: "The gallery shows the first image and swaps to the second on hover.", cols: 3, fields: [
      { name: "imageA", label: "Gallery image", type: "image", required: true },
      { name: "imageB", label: "Gallery hover image", type: "image", required: true },
      { name: "heroImage", label: "Detail page top image", type: "image" },
    ] },
    { title: "Detail page content", fields: [
      { name: "heading", label: "Main heading", wide: true },
      { name: "paragraphs", label: "Paragraphs", type: "textarea", rows: 7, help: "Leave a blank line between paragraphs." },
      { name: "factsTitle", label: "Facts title", wide: true },
      { name: "factsText", label: "Facts text", type: "textarea", rows: 4 },
      { name: "checks", label: "Checklist", type: "textarea", rows: 5, help: "One item per line." },
    ] },
    publishing,
  ],
};

const australiaProjects = {
  key: "projects", label: "Home", plural: "Homes", icon: "folder", color: "#B38A45",
  titleField: "title", imageField: "imageA", categoryField: "category",
  defaults: {
    heading: "A boutique home composed as one complete living environment",
    factsTitle: "Architecture & interior, designed as one",
    client: "Private residence",
    location: "Western Australia",
    status: "In Delivery",
    published: true,
  },
  sections: [
    { title: "Basics", desc: "Name the home. Use a suburb or region only — never a street address.", fields: [
      { name: "title", label: "Home name", required: true, placeholder: "Sharma Residence" },
      { name: "category", label: "Type", type: "select", options: opts(["Boutique Home", "Upcoming", "In Delivery", "Completed", "Architecture", "Interior Design"]) },
      { name: "status", label: "Status", type: "select", options: opts(["Upcoming", "In Delivery", "Completed"]) },
      { name: "location", label: "Location", placeholder: "Western Australia", help: "Suburb or region only. Do not enter a street address." },
      { name: "client", label: "Client", placeholder: "Private residence" },
      { name: "date", label: "Date or phase", placeholder: "In delivery" },
    ] },
    { title: "Home specifications", desc: "Shown on the cinematic home page like a luxury builder spec strip. Leave blank if not public.", cols: 3, fields: [
      { name: "storeys", label: "Storeys", placeholder: "3" },
      { name: "beds", label: "Beds" },
      { name: "baths", label: "Baths" },
      { name: "cars", label: "Cars" },
      { name: "floorArea", label: "Composition / area note", placeholder: "Marble main floors · pool & alfresco", wide: true },
      { name: "specLine", label: "Short spec line", placeholder: "Three storeys · Pool & alfresco", wide: true },
      { name: "conceptHeadline", label: "Concept line", placeholder: "The beauty of indoor-outdoor living", wide: true, help: "The large line on the hero, e.g. indoor–outdoor living." },
    ] },
    { title: "Photography & plans", desc: "Hero photography on listing pages. Floor plans appear on the home detail page.", cols: 3, fields: [
      { name: "imageA", label: "Listing / hero image", type: "image", required: true },
      { name: "imageB", label: "Secondary image", type: "image" },
      { name: "heroImage", label: "Detail page hero", type: "image" },
      { name: "floorPlanA", label: "Floor plan — ground", type: "image" },
      { name: "floorPlanB", label: "Floor plan — upper", type: "image" },
      { name: "floorPlanC", label: "Floor plan — undercroft", type: "image" },
    ] },
    { title: "Story", fields: [
      { name: "heading", label: "Story heading", wide: true },
      { name: "paragraphs", label: "Paragraphs", type: "textarea", rows: 8, help: "Leave a blank line between paragraphs. Do not include the client street address." },
      { name: "factsTitle", label: "Approach heading", wide: true },
      { name: "factsText", label: "Approach text", type: "textarea", rows: 4 },
      { name: "checks", label: "Highlights", type: "textarea", rows: 5, help: "One item per line." },
    ] },
    publishing,
  ],
};

const indiaServices = {
  key: "services", label: "Service", plural: "Services", icon: "layers", color: "#6F6252",
  titleField: "title", imageField: "image", categoryField: null,
  defaults: { strategyHeading: "Our Approach", processHeading: "Service Process", faqHeading: "Frequently Asked Questions", published: true },
  sections: [
    { title: "Basics", fields: [
      { name: "title", label: "Service title", required: true, wide: true },
      { name: "shortDescription", label: "Short description", type: "textarea", rows: 3, required: true, help: "Shown on the services list page." },
    ] },
    { title: "Images", cols: 2, fields: [
      { name: "image", label: "List page image", type: "image", required: true },
      { name: "heroImage", label: "Detail page top image", type: "image" },
    ] },
    { title: "Detail page content", fields: [
      { name: "paragraphs", label: "Intro paragraphs", type: "textarea", rows: 6, help: "Leave a blank line between paragraphs." },
      { name: "strategyHeading", label: "Second heading" },
      { name: "strategyText", label: "Second text", type: "textarea", rows: 4 },
      { name: "features", label: "Feature cards", type: "textarea", rows: 4, help: "One per line:  Title | Description (shown next to the image)" },
      { name: "steps", label: "Process steps", type: "textarea", rows: 6, help: "One per line:  Title | Description" },
      { name: "videoUrl", label: "YouTube video link", type: "url", placeholder: "https://www.youtube.com/watch?v=..." },
      { name: "videoHeading", label: "Video heading", wide: true },
      { name: "videoText", label: "Video text", type: "textarea", rows: 3 },
      { name: "faqs", label: "FAQs", type: "textarea", rows: 6, help: "One per line:  Question | Answer" },
    ] },
    publishing,
  ],
};

const australiaServices = {
  key: "services", label: "Service", plural: "Services", icon: "layers", color: "#6F6252",
  titleField: "title", imageField: "image", categoryField: "category",
  defaults: { strategyHeading: "Our Approach", processHeading: "Design & Build Process", faqHeading: "Frequently Asked Questions", published: true },
  sections: [
    { title: "Basics", fields: [
      { name: "title", label: "Service title", required: true },
      { name: "category", label: "Category", type: "select", options: opts(["Architecture", "Interior Design", "Complete Home", "Builder", "Outdoor Living"]) },
      { name: "shortDescription", label: "Short description", type: "textarea", rows: 3, required: true, help: "Shown on the services list and homepage cards." },
      { name: "conceptHeadline", label: "Concept line", placeholder: "Design and build under one roof", wide: true },
    ] },
    { title: "Images", cols: 2, fields: [
      { name: "image", label: "List page image", type: "image", required: true },
      { name: "heroImage", label: "Detail page top image", type: "image" },
    ] },
    { title: "Detail page content", fields: [
      { name: "paragraphs", label: "Intro paragraphs", type: "textarea", rows: 6, help: "Leave a blank line between paragraphs." },
      { name: "strategyHeading", label: "Second heading" },
      { name: "strategyText", label: "Second text", type: "textarea", rows: 4 },
      { name: "features", label: "Feature cards", type: "textarea", rows: 4, help: "One per line:  Title | Description" },
      { name: "steps", label: "Process steps", type: "textarea", rows: 6, help: "One per line:  Title | Description — the design-and-build process." },
      { name: "videoUrl", label: "YouTube video link", type: "url", placeholder: "https://www.youtube.com/watch?v=..." },
      { name: "videoHeading", label: "Video heading", wide: true },
      { name: "videoText", label: "Video text", type: "textarea", rows: 3 },
      { name: "faqs", label: "FAQs", type: "textarea", rows: 6, help: "One per line:  Question | Answer" },
    ] },
    publishing,
  ],
};

const indiaBlogs = {
  key: "blogs", label: "Blog post", plural: "Blog posts", icon: "doc", color: "#8A6E4B",
  titleField: "title", imageField: "image", categoryField: "category",
  defaults: { published: true },
  sections: [
    { title: "Basics", fields: [
      { name: "title", label: "Post title", required: true, wide: true },
      { name: "category", label: "Category", type: "select", required: true, options: opts(["Materials", "Design", "Care & Maintenance", "Installation Tips", "Residential", "Commercial"]) },
      { name: "tags", label: "Tags", placeholder: "Design, Materials", help: "Separate with commas." },
      { name: "author", label: "Author", placeholder: "admin" },
      { name: "date", label: "Publish date", type: "date" },
      { name: "excerpt", label: "Short excerpt", type: "textarea", rows: 3 },
    ] },
    { title: "Images", desc: "Only the thumbnail is required. The others fill the blog details page.", cols: 3, fields: [
      { name: "image", label: "List thumbnail", type: "image", required: true },
      { name: "heroImage", label: "Post top image", type: "image" },
      { name: "galleryA", label: "Gallery image 1", type: "image" },
      { name: "galleryB", label: "Gallery image 2", type: "image" },
      { name: "approachImage", label: "Side image (next to the list)", type: "image" },
    ] },
    { title: "Post content", fields: [
      { name: "introHeading", label: "First heading", wide: true },
      { name: "introText", label: "First text", type: "textarea", rows: 5 },
      { name: "secondHeading", label: "Second heading", wide: true },
      { name: "secondText", label: "Second text", type: "textarea", rows: 5 },
      { name: "approachHeading", label: "List heading", wide: true },
      { name: "approachItems", label: "List items", type: "textarea", rows: 5, help: "One item per line." },
    ] },
    publishing,
  ],
};

const australiaBlogs = {
  ...indiaBlogs,
  sections: indiaBlogs.sections.map((section) => (
    section.title !== "Basics" ? section : {
      ...section,
      fields: section.fields.map((field) => (
        field.name !== "category" ? field : {
          ...field,
          options: opts(["Architecture", "Interior Design", "Process", "Materials", "Design", "Western Australia"]),
        }
      )),
    }
  )),
};

export function getResources(site = getSite()) {
  const aus = site === "australia";
  return {
    projects: aus ? australiaProjects : indiaProjects,
    services: aus ? australiaServices : indiaServices,
    blogs: aus ? australiaBlogs : indiaBlogs,
  };
}

export const RESOURCES = getResources();
export const RESOURCE_KEYS = ["projects", "services", "blogs"];
