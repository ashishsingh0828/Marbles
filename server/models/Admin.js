const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    resetHash: String,
    resetExpires: Date,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", schema);

/* Creates the admin account from .env the first time the server runs */
Admin.ensure = async () => {
  if (await Admin.countDocuments()) return;
  const email = process.env.ADMIN_EMAIL || "admin@marble.com";
  await Admin.create({ email, passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || "admin123", 10) });
  console.log(`Admin account created  →  ${email}`);
};

module.exports = Admin;
