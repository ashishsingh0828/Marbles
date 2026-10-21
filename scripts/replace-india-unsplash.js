const fs = require("fs");
const path = require("path");

const locals = [
  "/Images/Banner Slider images/1.png",
  "/Images/Banner Slider images/2.png",
  "/Images/Banner Slider images/3.png",
  "/Images/Banner Slider images/4.png",
  "/Images/About Us images/Calacatta Crema Marble.png",
  "/Images/About Us images/Calacatta Viola Marble.png",
  "/Images/About Us images/Statuario Baratini Marble.png",
  "/Images/About Us images/Thasos Velluto Marble.png",
  "/Images/Our gallery/Bianco Vogue Marble.png",
  "/Images/Our gallery/Fossana Marble.png",
  "/Images/Our gallery/Paonazzo Marble.png",
  "/Images/Our gallery/Pirgon Marble.png",
  "/Images/Our gallery/Thassos White Marble.png",
  "/Images/Our gallery/Tortuga Marble.png",
  "/Images/Service/Bianco Vogue Marble.png",
  "/Images/Service/Dover White Marble.png",
  "/Images/Service/Omini Bianco Marble.png",
  "/Images/Service/Tempest Marble.png",
  "/Images/Client feedback/Client feedback-1.png",
  "/Images/Client feedback/Client feedback-2.png",
  "/Images/Video section Images/Video section Images.png",
];

let i = 0;
const next = () => locals[i++ % locals.length];
const re = /https:\/\/images\.unsplash\.com\/[^"'\\\s)]+/g;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|jsx|css)$/.test(entry.name)) {
      const src = fs.readFileSync(full, "utf8");
      const out = src.replace(re, next);
      if (out !== src) {
        fs.writeFileSync(full, out);
        console.log("updated", full);
      }
    }
  }
}

walk(path.join(__dirname, "..", "India", "src"));
