import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ServiceDetails from "../components/Services/ServiceDetails";
import GallerySlider from "../components/GallerSlider/GallerySlider";
import Faq from "../components/FAQ/Faq";
import { useApi, asset, paras, pairs, youtubeId } from "../api";

const FALLBACK_SERVICES_MAP = {
  "architectural-home-building": {
    title: "Architectural Home Building",
    heroImage: "/images/ksd-stone-15.jpg",
    image: "/images/ksd-stone-16.jpg",
    shortDescription: "Master-crafted bespoke luxury residences, modern estates, and custom builds engineered to the highest Australian standards.",
    paragraphs: [
      "KSD Homes specializes in the full-scale construction of luxury residential estates across Australia. Working alongside premier architects, our builders bring complex structural visions to reality with immaculate precision.",
      "From monolithic concrete framing and thermal acoustic building envelopes to integrated cantilevered stone balconies, every phase adheres strictly to the National Construction Code and NSW Master Builder guidelines.",
      "We believe that a bespoke home must balance breathtaking visual drama with everyday effortless comfort, durable materials, and exceptional energy efficiency suited to Australian micro-climates."
    ],
    strategyHeading: "Turnkey Luxury Construction & Structural Excellence",
    strategyText: "Our integrated construction management model oversees architectural engineering, council approvals, custom carpentry, and artisanal stonemasonry under a single dedicated Australian project director.",
    features: [
      { title: "Direct Quarry Stone Sourcing", text: "Imported Italian and Greek natural marble slabs inspected and dry-laid for continuous vein flow." },
      { title: "Rigorous Engineering Standards", text: "Commercial-grade thermal insulation, acoustic glazing, and reinforced foundation systems." },
      { title: "Fixed-Price Turnkey Delivery", text: "Transparent itemised schedules of work with transparent milestone reporting throughout." },
      { title: "Master Builder Warranty", text: "Full statutory structural building warranties and comprehensive post-handover care." }
    ],
    processHeading: "Our Four-Stage Architectural Construction Journey",
    steps: [
      { title: "Concept & Spatial Masterplanning", text: "Feasibility review, architectural alignment, site surveying, and initial finishes curation." },
      { title: "Statutory Approvals & Structural Detail", text: "DA / CDC approvals, 3D BIM structural coordination, and acoustic thermal engineering." },
      { title: "Master Craftsmanship & On-Site Build", text: "Structural erection, services rough-in, precision stonemasonry, and custom joinery fitting." },
      { title: "White-Glove Commissioning & Handover", text: "Comprehensive defect inspection, mechanical commissioning, and key handover." }
    ],
    videoHeading: "Experience KSD Homes Craftsmanship",
    videoText: "Take a virtual tour behind the scenes of our luxury architectural builds and master stonemasonry across Sydney.",
    videoUrl: "https://www.youtube.com/watch?v=hddwAIXbKZo",
    faqHeading: "Architectural Building FAQs",
    faqs: [
      { q: "Do you construct fully custom architectural home plans?", a: "Yes, we work closely with your chosen architect or provide full design-and-construct services from concept to handover." },
      { q: "How are project timelines and budgets managed?", a: "Every project is managed via cloud-based construction scheduling with weekly milestone reports, site photography, and fixed-price contracts." },
      { q: "Can we inspect the natural stone slabs before installation?", a: "Absolutely. We host client dry-lay inspections at our studio where you can review bookmatched slabs and vein continuities in person." }
    ]
  },
  "luxury-stone-flooring": {
    title: "Luxury Natural Stone Flooring",
    heroImage: "/images/ksd-stone-16.jpg",
    image: "/images/ksd-stone-15.jpg",
    shortDescription: "Large-format imported Italian & Greek marble tiles, dry-laid with tight hairline joints and continuous vein alignment.",
    paragraphs: [
      "Natural stone flooring establishes the foundational elegance of a luxury residence. KSD Homes imports calibrated, large-format marble and limestone tiles directly from prestigious European quarries.",
      "Before a single tile is bonded, our masons perform a full dry-lay mapping in our facility, coordinating vein continuity, tonal movement, and seamless thresholds from room to room.",
      "Installed over laser-levelled screeds using high-performance stone adhesives, every floor receives precision diamond polishing and deep fluoropolymer nano-sealing for enduring beauty."
    ],
    strategyHeading: "Sub-Millimeter Hairline Joint Calibration",
    strategyText: "Using European laser alignment and diamond edge bevelling, we achieve ultra-tight hairline joints that feel silky-smooth underfoot with zero lippage.",
    features: [
      { title: "Calibrated Large Format", text: "Tiles cut up to 1200x1200mm and oversized custom slabs for seamless expansive rooms." },
      { title: "Continuous Vein Harmony", text: "Computerized dry-lay mapping so vein movement flows harmoniously throughout." },
      { title: "Heated Floor Compatibility", text: "Engineered installation systems fully compatible with in-slab hydronic and electric heating." },
      { title: "Anti-Stain Penetrating Seal", text: "Fluoropolymer nano-barrier protecting against red wine, citrus, and everyday spills." }
    ],
    processHeading: "Our Flooring Installation Process",
    steps: [
      { title: "Subfloor Laser Survey", text: "Laser-levelling substrate screeds to eliminate all lippage and uneven deflection." },
      { title: "Studio Dry-Lay Mapping", text: "Laying out every tile dry to perfect tone balance and vein continuity." },
      { title: "Precision Adhesive Bonding", text: "Using flexible European polymer stone mortars for lifetime adhesion." },
      { title: "Diamond Honing & Sealing", text: "Multi-stage diamond polishing to the desired sheen followed by nano-sealing." }
    ],
    videoHeading: "Precision Stone Flooring in Motion",
    videoText: "Watch our master stonemasons lay and calibrate large-format marble flooring in a Sydney waterfront residence.",
    videoUrl: "https://www.youtube.com/watch?v=hddwAIXbKZo",
    faqHeading: "Natural Stone Flooring FAQs",
    faqs: [
      { q: "How do you maintain natural marble floors?", a: "We apply commercial-grade penetrating nano-sealers that protect for 3–5 years, and recommend pH-neutral stone cleaners for daily care." },
      { q: "Can natural stone be used with underfloor heating?", a: "Yes, natural stone is an exceptional thermal conductor and retains warmth evenly for hours." }
    ]
  },
  "waterfall-islands-vanities": {
    title: "Waterfall Islands & Vanities",
    heroImage: "/images/ksd-stone-17.jpg",
    image: "/images/ksd-stone-18.jpg",
    shortDescription: "CNC waterjet fabricated natural quartzite, Calacatta marble, and granite kitchen islands with 45° mitered edges.",
    paragraphs: [
      "A waterfall kitchen island is the sculptural centerpiece of the modern Australian luxury home. KSD Homes specializes in 45-degree mitered edge waterfall islands fabricated from monolithic natural marble and quartzite.",
      "Using computerized 5-axis waterjet cutters, we fold the natural vein 90 degrees over the countertop gable so the grain appears to waterfall down to the floor without interruption.",
      "Completed with integrated stone sinks, recessed LED shadowlines, and heavy-duty steel sub-framing, each island is custom engineered for functional elegance."
    ],
    strategyHeading: "Architectural 5-Axis Waterjet Craftsmanship",
    strategyText: "Our Sydney fabrication workshop utilizes digital templating and 5-axis CNC equipment to achieve hairline joints and mirror-matched waterfall edges.",
    features: [
      { title: "Vein-Folded Waterfall Ends", text: "Continuous natural vein alignment wrapping down island gables." },
      { title: "Integrated Stone Sinks", text: "Hand-crafted seamless stone sinks with mitered base slopes and concealed drainage." },
      { title: "Cantilevered Breakfast Bars", text: "Concealed structural steel brackets supporting expansive floating breakfast overhangs." },
      { title: "High-Heat & Acid Resistance", text: "Premium quartzite and protected marble surfaces built for gourmet entertaining." }
    ],
    processHeading: "Our Creation Journey",
    steps: [
      { title: "Slab Hand-Selection", text: "Inspecting full slabs in person to choose the most striking veining." },
      { title: "3D Digital Laser Templating", text: "Measuring cabinetry on-site to 0.2mm precision using 3D laser digitizers." },
      { title: "Waterjet Cutting & Miter Folding", text: "Precision 45° bevel cutting and seamless epoxy join bonding." },
      { title: "On-Site Installation & Nano-Seal", text: "Structural placement, seam blending, and heavy-duty fluoropolymer sealing." }
    ],
    videoHeading: "The Art of Waterfall Fabrication",
    videoText: "See how our craftsmen create seamless 45-degree mitered waterfall islands for luxury Australian kitchens.",
    videoUrl: "https://www.youtube.com/watch?v=hddwAIXbKZo",
    faqHeading: "Waterfall Island FAQs",
    faqs: [
      { q: "How do you achieve seamless waterfall joints?", a: "We cut both the top and the gable from the same contiguous slab section with 45-degree bevels, binding them with pigment-matched epoxy." },
      { q: "Is quartzite better than marble for kitchen countertops?", a: "Quartzite provides the beauty of marble with extreme resistance to acids and scratching, making it ideal for busy kitchens." }
    ]
  },
  "bookmatched-feature-walls": {
    title: "Bookmatched Feature Walls",
    heroImage: "/images/ksd-stone-18.jpg",
    image: "/images/ksd-stone-19.jpg",
    shortDescription: "Grand floor-to-ceiling vertical marble slab installations for luxury entry foyers, penthouse living, and hotel suites.",
    paragraphs: [
      "Bookmatching transforms natural stone into a monumental piece of fine art. By mirroring sequential slabs like the open pages of a book, KSD Homes creates symmetrical patterns that command attention in penthouse living rooms and entry foyers.",
      "Each slab is selected from sequential blocks in Italy, dry-laid vertically in our workshop, and engineered onto concealed aluminum substructures.",
      "From backlit translucent onyx feature walls to floor-to-ceiling fireplace surrounds, our vertical stone installations become the architectural signature of the residence."
    ],
    strategyHeading: "Concealed Mechanical Sub-Framing & Lighting",
    strategyText: "We engineer structural mechanical clip systems and optional high-CRI LED backlight panels that illuminate crystalline stone veins from within.",
    features: [
      { title: "Mirror-Image Vein Alignment", text: "Sequential block-cut slabs creating symmetrical geometric natural art." },
      { title: "Concealed Clip Framing", text: "Heavy-duty non-combustible substructures ensuring lifetime structural safety." },
      { title: "Backlit Translucent Onyx", text: "Evenly diffused warm LED light panels highlighting translucent crystalline bands." },
      { title: "Integrated Fireplace Hearths", text: "Thermal expansion joints engineered for modern gas and ethanol fireplaces." }
    ],
    processHeading: "Our Installation Methodology",
    steps: [
      { title: "Block Vein Curation", text: "Selecting adjacent mirror-cut slabs in European quarries." },
      { title: "3D Spatial Alignment", text: "Mapping the exact wall symmetry to align with room sightlines and ceiling heights." },
      { title: "Sub-Frame Structural Mount", text: "Installing vibration-damped concealed clip brackets on structural framing." },
      { title: "Precision Slab Hanging & Polish", text: "Lifting slabs into position, hairline joint blending, and final high-gloss polish." }
    ],
    videoHeading: "Bookmatched Masterpieces",
    videoText: "Witness the installation of a grand four-slab bookmatched Calacatta feature wall in a Sydney penthouse.",
    videoUrl: "https://www.youtube.com/watch?v=hddwAIXbKZo",
    faqHeading: "Bookmatched Wall FAQs",
    faqs: [
      { q: "Can any marble slab be bookmatched?", a: "No, bookmatching requires sequential slabs cut from the same block and polished on opposite faces." },
      { q: "How are heavy vertical slabs safely secured?", a: "We use engineered mechanical anchor clips and structural epoxy rated for seismic and wind loads." }
    ]
  },
  "facades-alfresco-paving": {
    title: "Facades & Alfresco Paving",
    heroImage: "/images/ksd-stone-19.jpg",
    image: "/images/ksd-stone-20.jpg",
    shortDescription: "Premium travertine, granite, and limestone exterior cladding, pool copings, and outdoor architectural entertaining pavilions.",
    paragraphs: [
      "Australian luxury living is defined by the seamless dialogue between interior spaces and sunlit alfresco terraces. KSD Homes delivers exterior stone facades, salt-safe pool copings, and expansive outdoor entertainment pavilions.",
      "We source dense, UV-stable natural travertine and Australian coastal limestones that stay comfortable under bare feet during hot Australian summers.",
      "Engineered with slip-resistant honed and exfoliated textures, our outdoor surfaces withstand coastal sea-spray and saltwater pools with minimal maintenance."
    ],
    strategyHeading: "Salt-Safe & Slip-Rated Exterior Engineering",
    strategyText: "Every exterior stone specification complies with Australian slip-resistance standards (P4/P5) and is treated with deep penetrating silane-siloxane impregnators.",
    features: [
      { title: "Salt-Safe Coastal Limestone", text: "Dense, non-crumbling stone rated for coastal chlorine and saltwater pools." },
      { title: "Thermal Comfort Underfoot", text: "Light-toned limestones that reflect heat, staying cool during summer heatwaves." },
      { title: "Drop-Face Pool Coping", text: "Custom one-piece rebated pool coping stones with smooth bullnose or pencil edges." },
      { title: "Ventilated Rainscreen Facades", text: "Architectural facade cladding allowing air circulation and moisture protection." }
    ],
    processHeading: "Our Outdoor Creation Process",
    steps: [
      { title: "Slip & Chemical Testing", text: "Validating stone suitability against pool chemicals and Australian slip codes." },
      { title: "Sub-Base Drainage Planning", text: "Grading substrates to ensure rapid rainwater runoff and zero ponding." },
      { title: "Expansion Joint Mapping", text: "Incorporating flexible movement joints to accommodate thermal shifts." },
      { title: "Deep Impregnating Sealing", text: "Applying UV-resistant penetrating barrier seals for long-term protection." }
    ],
    videoHeading: "Seamless Outdoor Entertaining",
    videoText: "Explore our outdoor travertine pavilions and cantilevered pool copings across coastal NSW.",
    videoUrl: "https://www.youtube.com/watch?v=hddwAIXbKZo",
    faqHeading: "Alfresco Stone FAQs",
    faqs: [
      { q: "Will natural stone get too hot around our pool?", a: "Certain natural limestones and honed travertines reflect high amounts of solar heat, remaining significantly cooler than artificial paving." },
      { q: "Are outdoor stones slippery when wet?", a: "We specify P4 or P5 slip-rated honed, brushed, or sandblasted finishes that provide confident traction even when wet." }
    ]
  },
  "custom-stonemasonry": {
    title: "Custom Stonemasonry & Detailing",
    heroImage: "/images/ksd-stone-20.jpg",
    image: "/images/ksd-stone-15.jpg",
    shortDescription: "Artisanal stonemasonry, cantilevered stone staircases, carved fireplace hearths, and precision brass inlay details.",
    paragraphs: [
      "True luxury lives in the bespoke details that cannot be mass-produced. KSD Homes brings generational artisan stonemasonry to architectural statement pieces throughout the home.",
      "From monolithic cantilevered marble stair treads floating off structural steel to custom-carved stone basins and fluted dining table plinths, our artisans execute bespoke commissions with sculptural mastery.",
      "We frequently integrate brass, aged bronze, and brushed stainless steel inlays into stone surfaces, creating bespoke geometric medallions and transitions."
    ],
    strategyHeading: "Sculptural Masonry & Metallurgical Inlays",
    strategyText: "Blending traditional chisel carving with 5-axis CNC shaping and laser metal inlays, we deliver one-of-a-kind architectural statements.",
    features: [
      { title: "Floating Cantilevered Stairs", text: "Solid stone stair treads concealing structural steel stringers with invisible joins." },
      { title: "Artisan Fluting & Ribbing", text: "Three-dimensional fluted wall panels, curved island bases, and column cladding." },
      { title: "Brass & Bronze Metal Inlays", text: "Hairline metallic inlays embedded flush into natural stone floor and wall patterns." },
      { title: "Monolithic Carved Basins", text: "Bath and powder room basins hand-sculpted from single solid natural stone blocks." }
    ],
    processHeading: "Our Artisan Commission Workflow",
    steps: [
      { title: "Custom Concept Sculpting", text: "Developing 3D photorealistic mockups and structural engineering details." },
      { title: "Block & Metal Selection", text: "Choosing the exact stone block and coordinating custom brass or bronze alloys." },
      { title: "Artisan Hand-Carving & Milling", text: "5-axis CNC roughing followed by painstaking hand-finishing and edge profiling." },
      { title: "Precision On-Site Fitting", text: "Delivering and anchoring the finished sculpture with millimeter calibration." }
    ],
    videoHeading: "Artisan Masonry in Action",
    videoText: "Watch our master stonemasons hand-carve and polish bespoke architectural commissions in our Sydney workshop.",
    videoUrl: "https://www.youtube.com/watch?v=hddwAIXbKZo",
    faqHeading: "Custom Stonemasonry FAQs",
    faqs: [
      { q: "Can you create custom stone furniture like dining tables and plinths?", a: "Yes, we custom design and craft monolithic dining tables, coffee tables, and console plinths in any natural stone." },
      { q: "How are cantilevered floating stone stairs supported?", a: "They are built around a hidden structural steel frame anchored to load-bearing walls, with stone cladding mitred around the structure." }
    ]
  }
};

const DEFAULT_FALLBACK = FALLBACK_SERVICES_MAP["waterfall-islands-vanities"];

export default function ServiceDetail() {
  const { slug } = useParams();
  const serviceApi = useApi(slug ? `/services/${slug}` : null);
  const allServicesApi = useApi("/services");

  // Format the service data from the backend or fallback
  const service = useMemo(() => {
    const raw = serviceApi.data;
    const fallback = FALLBACK_SERVICES_MAP[slug] || DEFAULT_FALLBACK;

    if (!raw) {
      return {
        title: fallback.title,
        hero: fallback.heroImage,
        contactImage: fallback.image,
        sideImage: fallback.image,
        shortDescription: fallback.shortDescription,
        paragraphs: fallback.paragraphs,
        strategyHeading: fallback.strategyHeading,
        strategyText: fallback.strategyText,
        features: fallback.features,
        processHeading: fallback.processHeading,
        steps: fallback.steps,
        videoHeading: fallback.videoHeading,
        videoText: fallback.videoText,
        video: fallback.videoUrl ? { thumb: fallback.heroImage, youtubeId: youtubeId(fallback.videoUrl) } : null,
        faqHeading: fallback.faqHeading,
        faqs: fallback.faqs,
      };
    }

    const vid = youtubeId(raw.videoUrl);
    const parsedFeatures = (Array.isArray(raw.features) && typeof raw.features[0] === "object" && !Array.isArray(raw.features[0]))
      ? raw.features
      : (raw.features ? pairs(raw.features).map(([title, text]) => ({ title, text })) : fallback.features);

    const parsedSteps = (Array.isArray(raw.steps) && typeof raw.steps[0] === "object" && !Array.isArray(raw.steps[0]))
      ? raw.steps
      : (raw.steps ? pairs(raw.steps).map(([title, text]) => ({ title, text })) : fallback.steps);

    const parsedFaqs = (Array.isArray(raw.faqs) && typeof raw.faqs[0] === "object" && !Array.isArray(raw.faqs[0]))
      ? raw.faqs
      : (raw.faqs ? pairs(raw.faqs).map(([q, a]) => ({ q, a })) : fallback.faqs);

    return {
      title: raw.title || fallback.title,
      hero: raw.heroImage ? asset(raw.heroImage) : (raw.image ? asset(raw.image) : fallback.heroImage),
      contactImage: raw.image ? asset(raw.image) : fallback.image,
      sideImage: raw.image ? asset(raw.image) : (raw.heroImage ? asset(raw.heroImage) : fallback.image),
      shortDescription: raw.shortDescription || fallback.shortDescription,
      paragraphs: raw.paragraphs ? paras(raw.paragraphs) : (raw.description ? [raw.description] : fallback.paragraphs),
      strategyHeading: raw.strategyHeading || fallback.strategyHeading,
      strategyText: raw.strategyText || fallback.strategyText,
      features: parsedFeatures && parsedFeatures.length > 0 ? parsedFeatures : fallback.features,
      processHeading: raw.processHeading || fallback.processHeading,
      steps: parsedSteps && parsedSteps.length > 0 ? parsedSteps : fallback.steps,
      videoHeading: raw.videoHeading || fallback.videoHeading,
      videoText: raw.videoText || fallback.videoText,
      video: vid ? { thumb: raw.heroImage ? asset(raw.heroImage) : fallback.heroImage, youtubeId: vid } : null,
      faqHeading: raw.faqHeading || fallback.faqHeading,
      faqs: parsedFaqs && parsedFaqs.length > 0 ? parsedFaqs : fallback.faqs,
    };
  }, [serviceApi.data, slug]);

  // Sidebar links: dynamically populated from live backend services or fallback
  const sidebarLinks = useMemo(() => {
    if (allServicesApi.data && allServicesApi.data.length > 0) {
      return allServicesApi.data.map((item) => ({
        label: item.title,
        href: `/services/${item.slug || item.id}`,
      }));
    }
    return [
      { label: "Architectural Home Building", href: "/services/architectural-home-building" },
      { label: "Luxury Natural Stone Flooring", href: "/services/luxury-stone-flooring" },
      { label: "Waterfall Islands & Vanities", href: "/services/waterfall-islands-vanities" },
      { label: "Bookmatched Feature Walls", href: "/services/bookmatched-feature-walls" },
      { label: "Facades & Alfresco Paving", href: "/services/facades-alfresco-paving" },
      { label: "Custom Stonemasonry & Detailing", href: "/services/custom-stonemasonry" },
    ];
  }, [allServicesApi.data]);

  return (
    <div>
      <Breadcrumb title={service.title} />
      <ServiceDetails service={service} links={sidebarLinks} />
      <GallerySlider />
      <Faq />
    </div>
  );
}
