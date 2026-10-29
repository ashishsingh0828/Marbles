/* ONE-TIME CLEAN-UP for projects already saved in your database.
   Put this file in Australia-server/scripts/fix-projects.js

   1) Back up your database first.
   2) Dry run (changes NOTHING, only prints what would change):
        node scripts/fix-projects.js
   3) Apply:
        node scripts/fix-projects.js --apply

   It only edits plain text fields of the "australia" projects:
     - every "Upcoming" becomes "Ongoing"
     - blocked words (client surnames, suppliers) are removed
   It never edits slug, image paths, links or the published flag. */
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const models = require("../models/content");

const APPLY = process.argv.includes("--apply");
const SITE = ((process.argv.find((a) => a.startsWith("--site=")) || "--site=australia").split("=")[1]) || "australia";

/* add supplier, brand or client names here */
const BLOCKED = ["sharma"];

const SKIP = new Set(["_id", "site", "slug", "createdAt", "updatedAt", "__v", "published"]);
const isPath = (s) => /^(\/|https?:|data:)/.test(s);
const hasBlocked = (s) => BLOCKED.some((w) => s.toLowerCase().includes(w.toLowerCase()));

const clean = (s) => {
  let t = s;
  BLOCKED.forEach((w) => { t = t.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), ""); });
  t = t.replace(/\bupcoming\b/gi, (m) => (m[0] === "U" ? "Ongoing" : "ongoing"));
  return t.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\s+([,.;:])/g, "$1").trim();
};

(async () => {
  await connectDB();
  const docs = await models.projects.find({ site: SITE }).lean();
  console.log(`${APPLY ? "APPLYING" : "DRY RUN"} on ${docs.length} project(s) for site "${SITE}"\n`);
  let changed = 0;

  for (const doc of docs) {
    const set = {};
    const warn = [];
    for (const [k, v] of Object.entries(doc)) {
      if (typeof v !== "string") continue;
      if (k === "slug" || isPath(v)) {
        if (hasBlocked(v)) warn.push(`${k} = ${v}`);
        continue;
      }
      if (SKIP.has(k)) continue;
      const n = clean(v);
      if (n !== v && !(k === "title" && !n)) set[k] = n;
    }

    console.log(`• ${doc.title}  (/${doc.slug})`);
    Object.entries(set).forEach(([k, n]) => console.log(`    ${k}: "${String(doc[k]).slice(0, 60)}" → "${n.slice(0, 60)}"`));
    if (!Object.keys(set).length) console.log("    nothing to change");
    warn.forEach((w) => console.log(`    ⚠ needs a manual fix (slug or file name): ${w}`));

    if (Object.keys(set).length) {
      changed += 1;
      if (APPLY) await models.projects.updateOne({ _id: doc._id }, { $set: set });
    }
  }

  console.log(`\n${APPLY ? "Updated" : "Would update"} ${changed} project(s).`);
  if (!APPLY) console.log("Run again with --apply to save.");
  await mongoose.disconnect();
})();
