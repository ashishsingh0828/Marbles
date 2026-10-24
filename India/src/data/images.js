/** Public assets under India/public, plus online fallbacks so no slot stays blank. */
export const IMG = {
  logo: "/Images/logo.png",
  hero1: "/Images/Banner Slider images/1.png",
  hero2: "/Images/Banner Slider images/2.png",
  hero3: "/Images/Banner Slider images/3.png",
  hero4: "/Images/Banner Slider images/4.png",
  aboutCrema: "/Images/About Us images/Calacatta Crema Marble.png",
  aboutViola: "/Images/About Us images/Calacatta Viola Marble.png",
  aboutStatuario: "/Images/About Us images/Statuario Baratini Marble.png",
  aboutThasos: "/Images/About Us images/Thasos Velluto Marble.png",
  galleryBianco: "/Images/Our gallery/Bianco Vogue Marble.png",
  galleryFossana: "/Images/Our gallery/Fossana Marble.png",
  galleryPaonazzo: "/Images/Our gallery/Paonazzo Marble.png",
  galleryPirgon: "/Images/Our gallery/Pirgon Marble.png",
  galleryThassos: "/Images/Our gallery/Thassos White Marble.png",
  galleryTortuga: "/Images/Our gallery/Tortuga Marble.png",
  serviceBianco: "/Images/Service/Bianco Vogue Marble.png",
  serviceDover: "/Images/Service/Dover White Marble.png",
  serviceOmini: "/Images/Service/Omini Bianco Marble.png",
  serviceTempest: "/Images/Service/Tempest Marble.png",
  feedback1: "/Images/Client feedback/Client feedback-1.png",
  feedback2: "/Images/Client feedback/Client feedback-2.png",
  video: "/Images/Video section Images/Video section Images.png",
};

export const ONLINE = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1615874959471-b67b1c1c857c?auto=format&fit=crop&w=1600&q=80",
];

const LOCAL = [
  IMG.hero1, IMG.hero2, IMG.hero3, IMG.hero4,
  IMG.aboutCrema, IMG.aboutViola, IMG.aboutStatuario, IMG.aboutThasos,
  IMG.galleryBianco, IMG.galleryFossana, IMG.galleryPaonazzo, IMG.galleryPirgon,
  IMG.galleryThassos, IMG.galleryTortuga,
  IMG.serviceBianco, IMG.serviceDover, IMG.serviceOmini, IMG.serviceTempest,
  IMG.feedback1, IMG.feedback2, IMG.video,
];

const POOL = [...LOCAL, ...ONLINE];

/** Always returns a real image path. Empty/missing values get a local or online fallback. */
export function pic(src, i = 0) {
  const value = src && String(src).trim();
  if (value && value !== "undefined" && value !== "null") return value;
  return POOL[Math.abs(Number(i) || 0) % POOL.length];
}
